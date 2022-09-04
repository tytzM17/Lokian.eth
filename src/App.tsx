import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, NavDropdown, Tab, Tabs } from 'react-bootstrap'
// import StatBar from './StatBar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MyLokiMons, ArenaV2, Breed, MyShop, Marketplace, Spinner, Share, SharedToMe, Token } from './components'

// Library to work with Ethereum like blockchain
import { injected } from './wallet/connectors'
import { useEagerConnect, useInactiveListener } from './wallet/hooks'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseEther, formatEther } from '@ethersproject/units'

// abis
import contrInterface from './interface.json' // Load contract json file
import erc20Interface from './erc20Interface.json' // Load erc20 contract json file
import nftInterface from './project.nft.abi.json'
import MonImages from './sprites-copy'

// util
import { Web3Provider } from '@ethersproject/providers'
import txSuccess from './utils/txSuccess'
import txFail from './utils/txFail'
import Dojo from './components/dojo'
import { names } from './components/common'
import Room from './components/arena/room'
import { RoomType } from './components/common/interfaces'

enum ConnectorNames {
  Injected = 'Injected',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
}

let CONTRACT_ADDRESS: string
let ERC20_CONTRACT_ADDRESS: string
let ERC1155_CONTRACT_ADDRESS: string
if (process && process.env) {
  CONTRACT_ADDRESS =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_MAIN_CONTRACT_ADDRESS
      : process.env.REACT_APP_TEST_CONTRACT_ADDRESS
  ERC20_CONTRACT_ADDRESS =
    process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MAIN_ERC20 : process.env.REACT_APP_TEST_ERC20
  ERC1155_CONTRACT_ADDRESS =
    process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MAIN_ERC1155 : process.env.REACT_APP_TEST_ERC1155
} else {
  // polygon mainnet
  CONTRACT_ADDRESS = '0x5148A559cFaaEC1A915ae41e00A8Dd2Fa17ba64f'
  ERC20_CONTRACT_ADDRESS = '0x4d8d24968458af521ef02aefD95f161dF3f9Ea01'
  ERC1155_CONTRACT_ADDRESS = '0x8227767903Fa90A90060E28a45506318E03997aD'
}

async function getMons(_library, _account) {
  const contr = new Contract(CONTRACT_ADDRESS, contrInterface, _library.getSigner(_account))
  const totalMons = parseInt(await contr.totalMons())
  return Promise.all([...Array(totalMons).keys()].map((id) => contr.mons(id)))
}

async function approve(_library, _account, _amount) {
  const erc20Contr = new Contract(ERC20_CONTRACT_ADDRESS, erc20Interface, _library.getSigner(_account))
  const newAmount = `${parseEther(_amount)}`
  return await erc20Contr.approve(CONTRACT_ADDRESS, newAmount)
}

function Account() {
  const { account } = useWeb3React()
  return (
    <span>
      {account === null ? '-' : account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ''}
    </span>
  )
}

async function getTokenBalance(_library, _account) {
  if (!_library || !_account) {
    return
  }
  const erc20Contr = new Contract(ERC20_CONTRACT_ADDRESS, erc20Interface, _library.getSigner(_account))
  const bal = await erc20Contr.balanceOf(_account)
  return formatEther(BigNumber.from(bal?._hex).toBigInt())
}

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function App(props) {
  const [cryptomons, setCryptomons] = useState([])
  const [myCryptomons, setMyCryptomons] = useState([])
  const [otherCryptomons, setOtherCryptomons] = useState([])
  const [value, setValue] = useState(0) // Used in My Cryptomons tab for input in price text
  // Used in breeding tab
  const [breedChoice1, setBreedChoice1] = useState(null)
  const [breedChoice2, setBreedChoice2] = useState(null)
  // Used in fighting tab
  const [fightChoice1, setFightChoice1] = useState(null)
  const [fightChoice2, setFightChoice2] = useState(null)
  const [winner, setWinner] = useState(null) // Used to display winner of the last fight
  const [rounds, setRounds] = useState(null) // Used to display number of rounds the fight lasted
  const [shareId, setShareId] = useState('') // Used in shareId form input field
  const [shareAddress, setShareAddress] = useState('') // Used in shareAddress form input field
  const [tokenBalance, setTokenBalance] = useState('0')
  const [fightTxDone, setFightTxDone] = useState(false)
  const [rewards, setRewards] = useState(0)
  const [healingPotions, setHealingPotions] = useState(null)
  const [manaPotions, setManaPotions] = useState(null)
  const [magicPotions, setMagicPotions] = useState(null)
  const [swords, setSwords] = useState(null)
  const [shields, setShields] = useState(null)
  const [disableFightBtn, setDisableFightBtn] = useState(false)
  const [buyItemAmount, setBuyItemAmount] = useState('0')
  const [burnAmount, setBurnAmount] = useState('0')
  const [disableBuyItemBtn, setDisableBuyItem] = useState(false)
  const [isShareLoading, setIsShareLoading] = useState(false)
  const [isStopSharingLoading, setIsStopSharingLoading] = useState(false)
  const [isBreedMonLoading, setIsBreedMonLoading] = useState(false)
  const [isBuyMonLoading, setIsBuyMonLoading] = useState(false)
  const [isAddForSaleLoading, setIsAddForSaleLoading] = useState(false)
  const [isRemoveFromSaleLoading, setIsRemoveFromSaleLoading] = useState(false)
  const context = useWeb3React<Web3Provider>()
  const { connector, account, library, activate, deactivate, active, error } = context

  //  multiplayer
  const [startedRoom, setStartedRoom] = useState(null)
  const [disconAcct, setDisconAcct] = useState(null)

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }

    refreshMons()
  }, [activatingConnector, connector])

  // Get token balance of user
  useEffect(() => {
    let mounted = true

    getTokenBalance(library, account).then((res) => {
      if (mounted) {
        setTokenBalance(res)
        refreshMons()
      }
    })

    return () => {
      mounted = false
    }
  }, [account, library, disableBuyItemBtn, disableFightBtn])

  // Get contract events
  useEffect(() => {
    if (!library || !account) {
      return
    }

    let mounted = true

    // ;(async function fightResults() {
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))

    contr.on('FightResults', (_winnerId, _round) => {
      if (mounted) {
        const winId = BigNumber.from(_winnerId._hex).toNumber()
        const round = BigNumber.from(_round._hex).toNumber()
        setWinner(winId)
        setRounds(round)
        refreshMons()
        setDisableFightBtn(false)
      }
    })

    contr.on('Rewards', (_winnerId, _rewards) => {
      if (mounted) {
        const rewards = BigNumber.from(_rewards._hex).toNumber()
        setRewards(rewards)
        refreshMons()
        setDisableFightBtn(false)
      }
    })
    // })()

    return () => {
      // const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
      contr.off('FightResults', (_winnerId, _round) => {
        setDisableFightBtn(false)
      })
      contr.off('Rewards', (_winnerId, _round) => {
        setDisableFightBtn(false)
      })

      mounted = false
    }
  }, [fightTxDone, library, account])

  // Get items from nft contract
  useEffect(() => {
    if (!library || !account) {
      return
    }

    let mounted = true

    ;(async function () {
      if (mounted) {
        const nftContr = new Contract(ERC1155_CONTRACT_ADDRESS, nftInterface, library.getSigner(account))
        const healpot = await nftContr.balanceOf(account, 0)
        const manapot = await nftContr.balanceOf(account, 1)
        const magicpot = await nftContr.balanceOf(account, 2)
        const _swords = await nftContr.balanceOf(account, 3)
        const _shields = await nftContr.balanceOf(account, 4)

        setHealingPotions(BigNumber.from(healpot._hex).toBigInt())
        setManaPotions(BigNumber.from(manapot._hex).toBigInt())
        setMagicPotions(BigNumber.from(magicpot._hex).toBigInt())
        setSwords(BigNumber.from(_swords._hex).toBigInt())
        setShields(BigNumber.from(_shields._hex).toBigInt())
      }
    })()

    return () => {
      mounted = false
    }
  }, [library, account, disableBuyItemBtn])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  // Change the list of created Crypromons saved in the state so UI refreshes after this call
  async function refreshMons() {
    if (!library || !account) return
    await getMons(library, account)
      .then((_mons) => {
        const monsMap = _mons.map((mon) => ({
          atk: mon.atk,
          def: mon.def,
          evolve: mon.evolve,
          forSale: mon.forSale,
          hp: mon.hp,
          id: BigNumber.from(mon.id._hex).toNumber(),
          monType: mon.monType,
          owner: mon.owner,
          price: BigNumber.from(mon.price._hex).toBigInt(),
          sharedTo: mon.sharedTo,
          species: mon.species,
          speed: mon.speed,
        }))
        setCryptomons(monsMap)
        setMyCryptomons(monsMap.filter((mon) => mon.owner === account))
        setOtherCryptomons(monsMap.filter((mon) => mon.owner !== account))
      })
      .catch((err) => toast.error(err))
  }

  // Function that buys a Cryptomon through a smart contract function
  async function buyMon(id, price) {
    setIsBuyMonLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    const newprice = `${BigInt(price)}`
    let overrides = {
      value: newprice,
      gasLimit: 120000,
    }

    const tx = await contr.buyMon(id, overrides).catch((err) => setIsBuyMonLoading(false))
    const recpt = await tx?.wait()
    txSuccess(recpt, toast, refreshMons, (loadVal: boolean) => setIsBuyMonLoading(loadVal))
    txFail(recpt, toast, (loadVal: boolean) => setIsBuyMonLoading(loadVal))
  }

  // Function that adds a Cryptomon for sale through a smart contract function
  async function addForSale(id, price) {
    setIsAddForSaleLoading(true)
    if (price === 0 || price === '0') {
      toast.error('🦄 Price is 0')
      return
    }
    let overrides = {
      gasLimit: 120000,
    }
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    const tx = await contr
      .addForSale(id, parseEther(price.toString()), overrides)
      .catch((err) => setIsAddForSaleLoading(false))
    const receipt = await tx?.wait()
    if (receipt && receipt.status === 1) {
      toast.success(`Success, Tx hash: ${receipt.transactionHash}`)
      refreshMons()
      setIsAddForSaleLoading(false)
    }
    if (receipt && receipt.status === 0) {
      toast.error(`Error, Tx hash: ${receipt.transactionHash}`)
      setIsAddForSaleLoading(false)
    }
  }

  // Function that removes a Cryptomon from sale through a smart contract function
  async function removeFromSale(id: number) {
    setIsRemoveFromSaleLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    let overrides = {
      gasLimit: 120000,
    }
    const tx = await contr.removeFromSale(id, overrides).catch((err) => setIsRemoveFromSaleLoading(false))
    const recpt = await tx?.wait()
    if (recpt && recpt.status === 1) {
      toast.success(`Success, Tx hash: ${recpt.transactionHash}`)
      refreshMons()
      setIsRemoveFromSaleLoading(false)
    }
    if (recpt && recpt.status === 0) {
      toast.error(`Error, Tx hash: ${recpt.transactionHash}`)
      setIsRemoveFromSaleLoading(false)
    }
  }

  // Function that breeds 2 Cryptomons through a smart contract function
  async function breedMons(id1, id2) {
    setIsBreedMonLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    const tx = await contr.breedMons(id1, id2).catch((err) => setIsBreedMonLoading(false))
    const recpt = await tx?.wait()
    if (recpt && recpt.status) {
      toast.success(`Success, Tx hash: ${recpt.transactionHash}`)
      setIsBreedMonLoading(false)
    }

    if (recpt && !recpt.status) {
      toast.error(`Error, Tx hash: ${recpt.transactionHash}`)
      setIsBreedMonLoading(false)
    }

    await refreshMons()
  }

  // Function that allows 2 Cryptomons to fight through a smart contract function
  async function fight(id1, id2) {
    setDisableFightBtn(true)
    if (id1 === null || id2 === null) {
      return
    }
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    let overrides = {
      gasLimit: 120000,
    }
    try {
      const tx = await contr?.fight(id1, id2, overrides)?.catch((err) => {
        console.log('Fight error, ', err?.toString())
        setDisableFightBtn(false)
        setFightTxDone(false)
      })
      const recpt = await tx?.wait()
      if (recpt && recpt.status) {
        setFightTxDone(true)
      }

      if (recpt && !recpt.status) {
        toast.error(`Error, Tx hash: ${recpt.transactionHash}`)
        setFightTxDone(false)
      }
    } catch (error) {
      toast.error(`Fight function error: ${error.data?.message || ''}`)
      setFightTxDone(false)
      setDisableFightBtn(false)
    }
  }

  // Function that starts sharing a Cryptomon to another address through a smart contract function
  async function startSharing(id, address) {
    setIsShareLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    let overrides = {
      gasLimit: 120000,
    }
    const tx = await contr.startSharing(id, address, overrides).catch((err) => setIsShareLoading(false))
    const recpt = await tx?.wait()
    if (recpt && recpt.status) {
      toast.success(`Success, Tx hash: ${recpt.transactionHash}`)
      refreshMons()
      setIsShareLoading(false)
    }
    if (recpt && !recpt.status) {
      toast.error(`Error, Tx hash: ${recpt.transactionHash}`)
      setIsShareLoading(false)
    }
  }

  // Function that stops sharing a Cryptomon with other addresses through a smart contrct function
  async function stopSharing(id) {
    setIsStopSharingLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    let overrides = {
      gasLimit: 120000,
    }
    const tx = await contr.stopSharing(id, overrides).catch((err) => setIsStopSharingLoading(false))
    const recpt = await tx?.wait()
    if (recpt && recpt.status) {
      toast.success(`Success, Tx hash: ${recpt.transactionHash}`)
      refreshMons()
      setIsStopSharingLoading(false)
    }

    if (recpt && !recpt.status) {
      toast.error(`Error, Tx hash: ${recpt.transactionHash}`)
      setIsStopSharingLoading(false)
    }
  }

  // Handlers for form inputs
  function handleShareId(event) {
    setShareId(event.target?.value)
  }
  function handleShareAddress(event) {
    setShareAddress(event.target?.value)
  }

  function handleChange(event) {
    setValue(event.target?.value)
  }

  function handleBuyItemAmount(event) {
    setBuyItemAmount(event.target?.value)
  }
  function handleBurn(event) {
    setBurnAmount(event.target?.value)
  }

  async function buyItem(units: string, price: string, itemNumber: string, data: string = '0x00') {
    setDisableBuyItem(true)
    if (!units || !price || !itemNumber) {
      return
    }
    let overrides = {
      gasLimit: 120000,
    }
    const _price = parseEther(price)
    const priceInWei = `${BigNumber.from(_price._hex).toBigInt()}`
    approve(library, account, priceInWei)
      .then(async (results) => {
        if (results) {
          const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
          const tx = await contr.buyItem(units, priceInWei, itemNumber, data, overrides)
          const recpt = await tx?.wait()
          txSuccess(recpt, toast, refreshMons)
          txFail(recpt, toast)
        } else {
          toast.error(`Error in approving`)
        }
        setDisableBuyItem(false)
      })
      .catch((e) => {
        toast.error(`Error: ${e?.message}`)
        setDisableBuyItem(false)
      })
  }

  async function burn(amount: string) {
    setDisableBuyItem(true)
    if (!amount) {
      return
    }
    const _amount = parseEther(amount)
    const amountInWei = `${BigNumber.from(_amount._hex).toBigInt()}`
    let overrides = {
      gasLimit: 120000,
    }
    approve(library, account, amountInWei)
      .then(async (results) => {
        if (results) {
          const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
          const tx = await contr.burn(amountInWei, overrides)
          const recpt = await tx.wait()
          txSuccess(recpt, toast, refreshMons)
          txFail(recpt, toast)
        } else {
          toast.error(`Error in approving`)
        }
        setDisableBuyItem(false)
      })
      .catch((e) => {
        toast.error(`Error: ${e?.message}`)
        setDisableBuyItem(false)
      })
  }

  return (
    <div className="rpgui-content">
      <ToastContainer />
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
          <Navbar.Brand as="li">
            <img alt="" src={MonImages['favicon32x32']} width="30" height="30" className="d-inline-block" />
            <Link to="/" className="LokiMons">
              Lokian Monsters
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto lokimons-nav">
              <Nav.Link as="li">
                <Link to="/myLokiMons">My LokiMons</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/myShop">My Shop</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/dojo">Dojo</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/arena">Arena</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/breed">Breed</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/marketplace">Marketplace</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/share">Share</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/sharedToMe">Shared To Me</Link>
              </Nav.Link>
              <Nav.Link as="li">
                <Link to="/token">Token</Link>
              </Nav.Link>
              <Nav.Link as="li">{!!error && <h4>{getErrorMessage(error)}</h4>}</Nav.Link>
            </Nav>
            <Nav className="lokimons-nav-wallet">
              {/* wallet info */}
              {Object.keys(connectorsByName).map((name, idx) => {
                const currentConnector = connectorsByName[name]
                const activating = currentConnector === activatingConnector
                const connected = currentConnector === connector
                const disabled = !triedEager || !!activatingConnector || connected || !!error

                return (
                  <Nav.Link key={name + idx} as="li">
                    <button
                      className="rpgui-button golden"
                      type="button"
                      style={{
                        fontSize: '20px',
                        paddingTop: '14px',
                        width: '350px',
                      }}
                      onClick={() => {
                        setActivatingConnector(currentConnector)
                        activate(currentConnector)
                      }}
                      disabled={disabled}
                      key={name}
                    >
                      {activating && <Spinner color={'black'} style={{ height: '25%', marginLeft: '-1rem' }} />}
                      <Account />
                      <span>{!account ? 'Connect Wallet' : ''}</span>
                    </button>
                  </Nav.Link>
                )
              })}
              {/* wallet logout */}
              <Nav.Link as="li">
                {(active || error) && (
                  <button
                    className="rpgui-button"
                    onClick={() => {
                      deactivate()
                      setCryptomons([])
                      setMyCryptomons([])
                      setOtherCryptomons([])
                      setWinner(null)
                      setRounds(null)
                      setValue(0)
                    }}
                  >
                    Logout
                  </button>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <MyLokiMons
                myCryptomons={myCryptomons}
                value={value}
                onHandleChange={(e: Event) => handleChange(e)}
                isAddForSaleLoading={isAddForSaleLoading}
                addForSale={addForSale}
              />
            }
          />
          <Route
            path="/myLokiMons"
            element={
              <MyLokiMons
                myCryptomons={myCryptomons}
                value={value}
                onHandleChange={(e: Event) => handleChange(e)}
                isAddForSaleLoading={isAddForSaleLoading}
                addForSale={addForSale}
              />
            }
          />
          <Route
            path="/myShop"
            element={
              <MyShop
                myCryptomons={myCryptomons}
                isRemoveFromSaleLoading={isRemoveFromSaleLoading}
                removeFromSale={removeFromSale}
                nativeTok={library?._network?.name}
              />
            }
          />
          <Route
            path="/marketplace"
            element={
              <Marketplace
                otherCryptomons={otherCryptomons}
                isBuyMonLoading={isBuyMonLoading}
                buyMon={buyMon}
                nativeTok={library?._network?.name}
              />
            }
          />
          <Route
            path="/breed"
            element={
              <Breed
                myCryptomons={myCryptomons}
                isBreedMonLoading={isBreedMonLoading}
                breedMons={breedMons}
                setBreedChoice1Func={setBreedChoice1}
                setBreedChoice2Func={setBreedChoice2}
                breedChoice1={breedChoice1}
                breedChoice2={breedChoice2}
              />
            }
          />
          <Route
            path="/dojo"
            element={
              <Dojo
                myCryptomons={myCryptomons}
                account={account}
                setFightChoice1Func={setFightChoice1}
                setFightChoice2Func={setFightChoice2}
                otherCryptomons={otherCryptomons}
                cryptomons={cryptomons}
                fightChoice1={fightChoice1}
                fightChoice2={fightChoice2}
                winner={winner}
                monNames={names}
                fightTxDone={fightTxDone}
                rewards={rewards}
                rounds={rounds}
                disableFightBtn={disableFightBtn}
                fight={fight}
              />
            }
          />
          <Route
            path="/arena"
            element={
              <ArenaV2
                account={account}
                hasStartedRoom={startedRoom}
                onStartedRoom={(value: RoomType) => {
                  setStartedRoom(value)
                  setDisconAcct(null)
                }}
              />
            }
          >
            <Route
              path={'/arena/room/:code'}
              element={
                <Room
                  room={startedRoom}
                  onDisconnect={(room: RoomType) => {
                    setStartedRoom(room)
                  }}
                  account={account}
                />
              }
            />
          </Route>
          <Route
            path="/share"
            element={
              <Share
                myCryptomons={myCryptomons}
                shareId={shareId}
                onHandleShareAddress={handleShareAddress}
                onHandleShareId={handleShareId}
                shareAddress={shareAddress}
                isShareLoading={isShareLoading}
                startSharingFunc={startSharing}
                account={account}
                isStopSharingLoading={isStopSharingLoading}
                stopSharingFunc={stopSharing}
              />
            }
          />
          <Route
            path="/sharedToMe"
            element={
              <SharedToMe
                otherCryptomons={otherCryptomons}
                account={account}
                isStopSharingLoading={isStopSharingLoading}
                stopSharingFunc={stopSharing}
              />
            }
          />
          <Route
            path="/token"
            element={
              <Token
                tokenBalance={tokenBalance}
                swords={swords}
                shields={shields}
                healingPotions={healingPotions}
                manaPotions={manaPotions}
                magicPotions={magicPotions}
                buyItemAmount={buyItemAmount}
                onHandleBuyItemAmount={handleBuyItemAmount}
                buyItemFunc={buyItem}
                disableBuyItemBtn={disableBuyItemBtn}
                burnAmount={burnAmount}
                burnFunc={burn}
                onHandleBurn={handleBurn}
              />
            }
          />
        </Routes>
      </Router>
      {/* <Tabs defaultActiveKey="myCryptomons" id="uncontrolled-tab-example"></Tabs> */}
    </div>
  )
}

export default App
