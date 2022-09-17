// core
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { createContext, useState } from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import './App.css'
// import MonImages from './sprites-copy'

// Library to work with Ethereum like blockchain
import { Web3Provider } from '@ethersproject/providers'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
// import {
//   NoEthereumProviderError,
//   UserRejectedRequestError as UserRejectedRequestErrorInjected,
// } from '@web3-react/injected-connector'
// import { injected } from './wallet/connectors'
import { useEagerConnect, useInactiveListener } from './wallet/hooks'

// abis

// components
// import { Nav, Navbar } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { ArenaV2, Breed, Marketplace, MyLokiMons, MyShop, Share, SharedToMe, Spinner, Token } from './components'
// import Room from './components/arena/room'
// import { names } from './components/common'
// import { RoomType } from './components/common/interfaces'
// import { Account } from './components/core/Account'
// import Dojo from './components/dojo'

// utils
import {
  useAddForSale,
  useBreedMons,
  useBurn,
  useBuyItem,
  useBuyMon,
  useFight,
  useRefreshMons,
  useRemoveFromSale,
  useStartSharing,
  useStopSharing,
} from './app-functions'
import { useContractEvents, useItemsFromNFT, useRecognizeConnector, useTokenBalance } from './hooks'
import { getTokenBalance } from './utils'
import Navigation from './Navigation'
import NavWallet from './NavWallet'
import {
  RootRoute,
  ArenaRoute,
  BreedRoute,
  DojoRoute,
  MarketplaceRoute,
  MyLokiMonsRoute,
  MyShopRoute,
  SharedToMeRoute,
  ShareRoute,
  TokenRoute,
} from './routes'

// wallet
// enum ConnectorNames {
//   Injected = 'Injected',
// }
// const connectorsByName: { [connectorName in ConnectorNames]: any } = {
//   [ConnectorNames.Injected]: injected,
// }
// function getErrorMessage(error: Error) {
//   if (error instanceof NoEthereumProviderError) {
//     return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
//   } else if (error instanceof UnsupportedChainIdError) {
//     return "You're connected to an unsupported network."
//   } else if (error instanceof UserRejectedRequestErrorInjected) {
//     return 'Please authorize this website to access your Ethereum account.'
//   } else {
//     console.error(error)
//     return 'An unknown error occurred. Check the console for more details.'
//   }
// }

// contracts
export let CONTRACT_ADDRESS: string
export let ERC20_CONTRACT_ADDRESS: string
export let ERC1155_CONTRACT_ADDRESS: string

function App() {
  if (process && process.env) {
    if (process.env.NODE_ENV === 'production') {
      CONTRACT_ADDRESS = process.env.REACT_APP_MAIN_CONTRACT_ADDRESS
      ERC20_CONTRACT_ADDRESS = process.env.REACT_APP_MAIN_ERC20
      ERC1155_CONTRACT_ADDRESS = process.env.REACT_APP_MAIN_ERC1155
    } else {
      CONTRACT_ADDRESS = process.env.REACT_APP_TEST_CONTRACT_ADDRESS
      ERC20_CONTRACT_ADDRESS = process.env.REACT_APP_TEST_ERC20
      ERC1155_CONTRACT_ADDRESS = process.env.REACT_APP_TEST_ERC1155
    }
    // CONTRACT_ADDRESS =
    //   process.env.NODE_ENV === 'production'
    //     ? process.env.REACT_APP_MAIN_CONTRACT_ADDRESS
    //     : process.env.REACT_APP_TEST_CONTRACT_ADDRESS
    // ERC20_CONTRACT_ADDRESS =
    //   process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MAIN_ERC20 : process.env.REACT_APP_TEST_ERC20
    // ERC1155_CONTRACT_ADDRESS =
    //   process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MAIN_ERC1155 : process.env.REACT_APP_TEST_ERC1155
  } else {
    // polygon mainnet
    CONTRACT_ADDRESS = '0x5148A559cFaaEC1A915ae41e00A8Dd2Fa17ba64f'
    ERC20_CONTRACT_ADDRESS = '0x4d8d24968458af521ef02aefD95f161dF3f9Ea01'
    ERC1155_CONTRACT_ADDRESS = '0x8227767903Fa90A90060E28a45506318E03997aD'
  }

  // Used in breeding tab
  const [breedChoice1, setBreedChoice1] = useState(null)
  const [breedChoice2, setBreedChoice2] = useState(null)
  // Used in fighting tab
  const [fightChoice1, setFightChoice1] = useState(null)
  const [fightChoice2, setFightChoice2] = useState(null)
  // const [winner, setWinner] = useState(null) // Used to display winner of the last fight
  // const [rounds, setRounds] = useState(null) // Used to display number of rounds the fight lasted
  const [shareId, setShareId] = useState('') // Used in shareId form input field
  const [shareAddress, setShareAddress] = useState('') // Used in shareAddress form input field
  // const [tokenBalance, setTokenBalance] = useState('0')
  const [fightTxDone, setFightTxDone] = useState(false)
  // const [rewards, setRewards] = useState(0)

  // Used in NFTs
  // const [healingPotions, setHealingPotions] = useState(null)
  // const [manaPotions, setManaPotions] = useState(null)
  // const [magicPotions, setMagicPotions] = useState(null)
  // const [swords, setSwords] = useState(null)
  // const [shields, setShields] = useState(null)

  const [disableFightBtn, setDisableFightBtn] = useState(false)
  // const [buyItemAmount, setBuyItemAmount] = useState('0')
  // const [burnAmount, setBurnAmount] = useState('0')
  const [disableBuyItemBtn, setDisableBuyItemBtn] = useState(false)

  // Loading spinner state
  const [isShareLoading, setIsShareLoading] = useState(false)
  const [isStopSharingLoading, setIsStopSharingLoading] = useState(false)
  const [isBreedMonLoading, setIsBreedMonLoading] = useState(false)
  const [isBuyMonLoading, setIsBuyMonLoading] = useState(false)
  const [isAddForSaleLoading, setIsAddForSaleLoading] = useState<boolean>(false)
  const [isRemoveFromSaleLoading, setIsRemoveFromSaleLoading] = useState(false)

  // wallet
  const context = useWeb3React<Web3Provider>()
  const { connector, account, library, activate, deactivate, active, error } = context

  // app functions
  const { cryptomons, myCryptomons, otherCryptomons, resetMons, refreshMons } = useRefreshMons(library, account)
  const { addForSale } = useAddForSale(library, account, setIsAddForSaleLoading, refreshMons)
  const { removeFromSale } = useRemoveFromSale(library, account, setIsRemoveFromSaleLoading, refreshMons)
  const { buyMon } = useBuyMon(library, account, setIsBuyMonLoading, refreshMons)
  const { breedMons } = useBreedMons(library, account, setIsBreedMonLoading, refreshMons)
  const { fight } = useFight(library, account, setDisableFightBtn, setFightTxDone)
  const { buyItem } = useBuyItem(library, account, setDisableBuyItemBtn, refreshMons)
  const { burn } = useBurn(library, account, setDisableBuyItemBtn, refreshMons)
  const { startSharing } = useStartSharing(library, account, setIsShareLoading, refreshMons)
  const { stopSharing } = useStopSharing(library, account, setIsStopSharingLoading, refreshMons)

  //  multiplayer
  // const [startedRoom, setStartedRoom] = useState(null)
  // const [ws, setWs] = useState(null)
  // const WsContext = createContext(null)
  // const [otherPlayerReady, setOtherPlayerReady] = useState(null)
  // const [acceptedAndReadyPlayer, setAcceptedAndReadyPlayer] = useState(false)

  // handle logic to recognize the connector currently being activated
  const { activatingConnector, setActivatingConnector } = useRecognizeConnector({ connector, refreshMons })
  // const [activatingConnector, setActivatingConnector] = useState<any>()
  // useEffect(() => {
  //   if (activatingConnector && activatingConnector === connector) {
  //     setActivatingConnector(undefined)
  //   }
  //   refreshMons()
  // }, [activatingConnector, connector])

  // Get token balance of user
  const { tokenBalance } = useTokenBalance({
    account,
    library,
    disableBuyItemBtn,
    disableFightBtn,
    getTokenBalance,
    refreshMons,
  })
  // useEffect(() => {
  //   let mounted = true

  //   getTokenBalance(library, account).then((res) => {
  //     if (mounted) {
  //       setTokenBalance(res)
  //       refreshMons()
  //     }
  //   })

  //   return () => {
  //     mounted = false
  //   }
  // }, [account, library, disableBuyItemBtn, disableFightBtn])

  // Get contract events
  const { winner, rounds, rewards, setWinner, setRounds } = useContractEvents({
    fightTxDone,
    library,
    account,
    refreshMons,
    setDisableFightBtn,
  })
  // useEffect(() => {
  //   if (!library || !account) {
  //     return
  //   }

  //   let mounted = true

  //   const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))

  //   contr.on('FightResults', (_winnerId, _round) => {
  //     if (mounted) {
  //       const winId = BigNumber.from(_winnerId._hex).toNumber()
  //       const round = BigNumber.from(_round._hex).toNumber()
  //       setWinner(winId)
  //       setRounds(round)
  //       refreshMons()
  //       setDisableFightBtn(false)
  //     }
  //   })

  //   contr.on('Rewards', (_winnerId, _rewards) => {
  //     if (mounted) {
  //       const rewards = BigNumber.from(_rewards._hex).toNumber()
  //       setRewards(rewards)
  //       refreshMons()
  //       setDisableFightBtn(false)
  //     }
  //   })

  //   return () => {
  //     contr.off('FightResults', (_winnerId, _round) => {
  //       setDisableFightBtn(false)
  //     })
  //     contr.off('Rewards', (_winnerId, _round) => {
  //       setDisableFightBtn(false)
  //     })

  //     mounted = false
  //   }
  // }, [fightTxDone, library, account])

  // Get items from nft contract
  const { healingPotions, magicPotions, manaPotions, swords, shields } = useItemsFromNFT({
    library,
    account,
    disableBuyItemBtn,
  })
  // useEffect(() => {
  //   if (!library || !account) {
  //     return
  //   }

  //   let mounted = true

  //   ;(async function () {
  //     if (mounted) {
  //       const nftContr = new Contract(ERC1155_CONTRACT_ADDRESS, nftInterface, library.getSigner(account))
  //       const healpot = await nftContr.balanceOf(account, 0)
  //       const manapot = await nftContr.balanceOf(account, 1)
  //       const magicpot = await nftContr.balanceOf(account, 2)
  //       const _swords = await nftContr.balanceOf(account, 3)
  //       const _shields = await nftContr.balanceOf(account, 4)

  //       setHealingPotions(BigNumber.from(healpot._hex).toBigInt())
  //       setManaPotions(BigNumber.from(manapot._hex).toBigInt())
  //       setMagicPotions(BigNumber.from(magicpot._hex).toBigInt())
  //       setSwords(BigNumber.from(_swords._hex).toBigInt())
  //       setShields(BigNumber.from(_shields._hex).toBigInt())
  //     }
  //   })()

  //   return () => {
  //     mounted = false
  //   }
  // }, [library, account, disableBuyItemBtn])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  // Handlers for form inputs
  function handleShareId(event: React.ChangeEvent<HTMLInputElement>) {
    setShareId(event.target?.value)
  }
  function handleShareAddress(event: React.ChangeEvent<HTMLInputElement>) {
    setShareAddress(event.target?.value)
  }
  // function handleBuyItemAmount(event: React.ChangeEvent<HTMLInputElement>) {
  //   setBuyItemAmount(event.target?.value)
  // }
  // function handleBurn(event: React.ChangeEvent<HTMLInputElement>) {
  //   setBurnAmount(event.target?.value)
  // }

  const navWalletProps = {
    activatingConnector,
    setActivatingConnector,
    connector,
    triedEager,
    error,
    activate,
    account,
    active,
    deactivate,
    resetMons,
    setWinner,
    setRounds,
  }
  const breedRouteProps = {
    myCryptomons,
    isBreedMonLoading,
    breedMons,
    setBreedChoice1,
    setBreedChoice2,
    breedChoice1,
    breedChoice2,
  }
  const dojoRouteProps = {
    account,
    fightChoice1,
    fightChoice2,
    setFightChoice1,
    setFightChoice2,
    cryptomons,
    myCryptomons,
    otherCryptomons,
    winner,
    fightTxDone,
    rewards,
    rounds,
    disableFightBtn,
    fight,
  }
  const arenaRouteProps = {
    account,
    fightChoice1,
    fightChoice2,
    setFightChoice1,
    setFightChoice2,
    cryptomons,
  }
  const shareRouteProps = {
    myCryptomons,
    shareId,
    handleShareAddress,
    handleShareId,
    shareAddress,
    isShareLoading,
    startSharing,
    account,
    isStopSharingLoading,
    stopSharing,
  }
  const tokenRouteProps = {
    tokenBalance,
    swords,
    shields,
    healingPotions,
    manaPotions,
    magicPotions,
    buyItem,
    disableBuyItemBtn,
    burn,
  }

  return (
    <div className="rpgui-content">
      <ToastContainer />
      <Router>
        <Navigation error={error}>
          <NavWallet {...navWalletProps} />
        </Navigation>
        {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
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
              <Nav.Link as="li">
                {(active || error) && (
                  <button
                    className="rpgui-button"
                    onClick={() => {
                      deactivate()
                      resetMons()
                      setWinner(null)
                      setRounds(null)
                    }}
                  >
                    Logout
                  </button>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}

        <Routes>
          <RootRoute myCryptomons={myCryptomons} isAddForSaleLoading={isAddForSaleLoading} addForSale={addForSale} />
          <MyLokiMonsRoute
            myCryptomons={myCryptomons}
            isAddForSaleLoading={isAddForSaleLoading}
            addForSale={addForSale}
          />
          <MyShopRoute
            myCryptomons={myCryptomons}
            isRemoveFromSaleLoading={isRemoveFromSaleLoading}
            removeFromSale={removeFromSale}
            library={library}
          />
          <MarketplaceRoute
            otherCryptomons={otherCryptomons}
            isBuyMonLoading={isBuyMonLoading}
            buyMon={buyMon}
            library={library}
          />
          <BreedRoute {...breedRouteProps} />
          <DojoRoute {...dojoRouteProps} />
          <ArenaRoute {...arenaRouteProps} />
          <ShareRoute {...shareRouteProps} />
          <SharedToMeRoute
            otherCryptomons={otherCryptomons}
            account={account}
            isStopSharingLoading={isStopSharingLoading}
            stopSharing={stopSharing}
          />
          <TokenRoute {...tokenRouteProps} />
        </Routes>
        {/* <Routes>
          <Route
            path="/"
            element={
              <MyLokiMons
                myCryptomons={myCryptomons}
                isAddForSaleLoading={isAddForSaleLoading}
                addForSale={(id: number, price: number) => addForSale(id, price)}
              />
            }
          />
          <Route
            path="/myLokiMons"
            element={
              <MyLokiMons
                myCryptomons={myCryptomons}
                isAddForSaleLoading={isAddForSaleLoading}
                addForSale={(id: number, price: number) => addForSale(id, price)}
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
              <WsContext.Provider value={ws}>
                <ArenaV2
                  onSetWs={(ws: object) => setWs(ws)}
                  account={account}
                  hasStartedRoom={startedRoom}
                  onStartedRoom={(value: RoomType) => {
                    setStartedRoom(value)
                  }}
                  otherPlayerReady={otherPlayerReady}
                  isAcceptedAndReadyPlayer={(state: boolean) => setAcceptedAndReadyPlayer(state)}
                />
              </WsContext.Provider>
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
                  fightChoice1={fightChoice1}
                  fightChoice2={fightChoice2}
                  setFightChoice1Func={setFightChoice1}
                  setFightChoice2Func={setFightChoice2}
                  cryptomons={cryptomons}
                  monNames={names}
                  acceptedAndReadyPlayer={acceptedAndReadyPlayer}
                  onOtherPlayerReady={(room: RoomType, otherPlayer: string) => {
                    setOtherPlayerReady({ room, otherPlayer })
                  }}
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
        </Routes> */}
      </Router>
    </div>
  )
}

export default App
