import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, NavDropdown, Tab, Tabs } from 'react-bootstrap'
import StatBar from './StatBar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MyLokiMons, ArenaV2, Breed, MyShop, Marketplace, Spinner, Share, SharedToMe, Token  } from "./components";

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

// Load all the background images for the 10 different Cryptomon types
import bg0 from './sprites-copy/background/0.png'
import bg1 from './sprites-copy/background/1.png'
import bg2 from './sprites-copy/background/2.png'
import bg3 from './sprites-copy/background/3.png'
import bg4 from './sprites-copy/background/4.png'
import bg5 from './sprites-copy/background/5.png'
import bg6 from './sprites-copy/background/6.png'
import bg7 from './sprites-copy/background/7.png'
import bg8 from './sprites-copy/background/8.png'
import bg9 from './sprites-copy/background/9.png'
import bg10 from './sprites-copy/background/10.png'

import MonImages from './sprites-copy'

// util
import { Web3Provider } from '@ethersproject/providers'
import txSuccess from './utils/txSuccess'
import txFail from './utils/txFail'
import Dojo from './components/dojo';

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

// Add background images in an array for easy access
const bg = [bg0, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10]

// Add all 151 Cryptomon names in an array
const names = [
  'Dryad',
  'Hamadryad',
  'Leshy',
  'Santelmo',
  'Cerberus',
  'Efreet',
  'Fastitocalon',
  'Aspidochelone',
  'Zaratan',
  'Arachne',
  'Jorogumo',
  'Tsuchigumo',
  'Pabilsag',
  'Girtablilu',
  'Selket',
  'Tsikavats',
  'Munnin',
  'Huginn',
  'Azeban',
  'Ratatoskr',
  'Stratim',
  'Navka',
  'Apep',
  'Nidhoggr',
  'Raiju',
  'Raijin',
  'Amphivena',
  'Basilisk',
  'Wolpertinger',
  'Ramidreju',
  'Echinemon',
  'Mujina',
  'Kamaitachi',
  'Lavellan',
  'Vila',
  'Huldra',
  'Chimera',
  'Kyuubi',
  'Nixie',
  'Tuathan',
  'Minyades',
  'Camazotz',
  'Curupira',
  'Penghou',
  'Ghillie_Dhu',
  'Myrmecoleon',
  'Myrmidon',
  'Mothman',
  'Moth_King',
  'Grootslang',
  'Yaoguai',
  'Cait_Sidhe',
  'Cath_Balug',
  'Nakki',
  'Kappa',
  'Satori',
  'Shojo',
  'Skohl',
  'Haet',
  'Vodyanoy',
  'Undine',
  'Melusine',
  'Vukodlak',
  'Chernobog',
  'Djinn',
  'Bauk',
  'Troll',
  'Jotun',
  'Spriggan',
  'Jubokko',
  'Kodama',
  'Bukavak',
  'Kraken',
  'Clayboy',
  'Met',
  'Emet',
  'Sleipnir',
  'Todorats',
  'Scylla',
  'Charybdis',
  'Brontes',
  'Arges',
  'Hraesvelgr',
  'Berunda',
  'Cockatrice',
  'Selkie',
  'Rusalka',
  'Tarasque',
  'Meretseger',
  'Carbuncle',
  'Shen',
  'Boogeyman',
  'Banshee',
  'Mare',
  'Dilong',
  'Incubus',
  'Succubus',
  'Cancer',
  'Karkinos',
  'Druk',
  'Shenlong',
  'Gan_Ceann',
  'Oni',
  'Tairanohone',
  'Gashadokuro',
  'Yeren',
  'Yeti',
  'Yowie',
  'Nezhit',
  'Chuma',
  'Sigbin',
  'Gargoyle',
  'Caladrius',
  'Umibozu',
  'Callisto',
  'Kelpie',
  'Makara',
  'Morgen',
  'Merrow',
  'Naiad',
  'Nereid',
  'Pixiu',
  'Khepri',
  'Likho',
  'kitsune',
  'Caorthannach',
  'Kaggen',
  'Audumbla',
  'Lochness',
  'Jormungandr',
  'Leviathan',
  'Doppelganger',
  'Skvader',
  'Fossegrim',
  'Valkyrie',
  'Basan',
  'Tsukumogami',
  'Luska',
  'Hydra',
  'Afanc',
  'Cetus',
  'Vedfolnir',
  'Baku',
  'Alkonost',
  'Quetzalcoatl',
  'Anzu',
  'Zmey',
  'Azhdaya',
  'Fafnir',
  'Baba_Yaga',
  'Baba_Roga',
]

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

function App() {
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

    ;(async function fightResults() {
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
    })()

    return () => {
      const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
      contr.off('FightResults', (_winnerId, _round) => {
        setDisableFightBtn(false)
      })
      contr.off('Rewards', (_winnerId, _round) => {
        setDisableFightBtn(false)
      })

      mounted = false
    }
  }, [account, library, fightTxDone])

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
        // map result
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
    const tx = await contr.addForSale(id, parseEther(price), overrides).catch((err) => setIsAddForSaleLoading(false))
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
  async function removeFromSale(id) {
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
      const tx = await contr.fight(id1, id2, overrides).catch((err) => setDisableFightBtn(false))
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

  // Components
  // div that holds the name and id of each Cryptomon
  const nameDiv = (mon) => {
    return (
      <div>
        <label className="monName">{names[mon?.species]}</label>
        <label className="" style={{ float: 'right' }}>
          {'#' + mon?.id}
        </label>
      </div>
    )
  }

  // Function that  returns the style of the background image according to Cryptomons' type
  const bgStyle = (Type) => ({
    backgroundImage: 'url(' + bg[Type] + ')',
    backgroundSize: '210px 240px',
  })

  // div that holds the images (Cryptomon image and background image) of a Cryptomon
  const imgDiv = (mon) => {
    return (
      <div className="monBox" style={bgStyle(mon?.monType)}>
        <img className="monImg" src={MonImages[`${parseInt(mon?.species) + 1}`]} alt={mon?.species} />
      </div>
    )
  }

  // div that holds the stats of a Cryptomon
  const statDiv = (mon) => {
    return (
      <div className="stat-area">
        <div className="stat-line">
          <label className="stat-label">Hp: </label>
          <StatBar percentage={(mon?.hp * 100) / 140} />
        </div>
        <div className="stat-line">
          <label className="stat-label">Attack: </label>
          <StatBar percentage={(mon?.atk * 100) / 140} />
        </div>
        <div className="stat-line">
          <label className="stat-label">Defense: </label>
          <StatBar percentage={(mon?.def * 100) / 140} />
        </div>
        <div className="stat-line">
          <label className="stat-label">Speed: </label>
          <StatBar percentage={(mon?.speed * 100) / 140} />
        </div>
      </div>
    )
  }

  // Create the div with add for sale button
  const addForSaleDiv = (mon, value) => {
    return (
      <div className="selling-div">
        <label className="add-for-sale-label">Set lokimons price:</label>
        <input type="number" className="add-for-sale-input" value={value} onChange={(e) => handleChange(mon?.id, e)} />
        {isAddForSaleLoading ? (
          <button className="rpgui-button" type="button" style={{ width: '100%' }}>
            <Spinner color="#000" />
          </button>
        ) : (
          <button
            className="rpgui-button"
            type="button"
            style={{ float: 'right' }}
            onClick={() => addForSale(mon?.id, value)}
          >
            Add for sale
          </button>
        )}
      </div>
    )
  }

  // Create the div with remove from sale button
  const removeFromSaleDiv = (mon) => {
    return (
      <div className="selling-div">
        <label className="remove-from-sale-label">
          Price:
          <br />
          {formatUnits(mon?.price)}
        </label>
        {isRemoveFromSaleLoading ? (
          <button className="rpgui-button" type="button" style={{ width: '100%' }}>
            <Spinner color="#000" />
          </button>
        ) : (
          <button
            className="rpgui-button"
            type="button"
            style={{ float: 'right' }}
            onClick={() => removeFromSale(mon?.id)}
          >
            Remove from sale
            {isRemoveFromSaleLoading && <Spinner color="#000" />}
          </button>
        )}
      </div>
    )
  }

  // Create the div with buy button
  const buyDiv = (mon) => {
    return (
      <div className="buying-div">
        <div className="sale-price">
          Price:
          <br />
          {formatUnits(mon?.price, 18)}
        </div>
        <div className="sale-owner">Creature Owner: {mon?.owner} </div>
        {isBuyMonLoading ? (
          <button className="rpgui-button" type="button" style={{ width: '100%' }}>
            <Spinner color="#000" />
          </button>
        ) : (
          <button
            className="sale-btn rpgui-button"
            type="button"
            style={{ float: 'right' }}
            onClick={() => buyMon(mon?.id, mon?.price)}
          >
            Buy
          </button>
        )}
      </div>
    )
  }

  // Create the div with breed choice 1, choice 2 buttons
  const breedDiv = (mon) => {
    return (
      <div className="breed-choice-div">
        <button
          className="br-Choice-btn rpgui-button"
          type="button"
          style={{ float: 'right' }}
          onClick={() => {
            setBreedChoice1(mon?.id)
          }}
        >
          Choice 1
        </button>
        <button
          className="br-Choice-btn rpgui-button"
          type="button"
          style={{ float: 'right' }}
          onClick={() => {
            setBreedChoice2(mon?.id)
          }}
        >
          Choice 2
        </button>
      </div>
    )
  }

  const breedOption = (breedchoice) => {
    if (breedchoice === null) {
      return (
        <div className="mon">
          <figure className="my-figure">
            <figcaption>
              <div className="monBox">
                {' '}
                <img className="monImg" src={MonImages['0']} alt={'empty'} />
              </div>
            </figcaption>
          </figure>
        </div>
      )
    } else {
      return cryptomons
        .filter((mon) => mon.id === breedchoice)
        .map((mon) => (
          <React.Fragment key={mon.id}>
            <div className="mon">
              <figure className="my-figure">
                {imgDiv(mon)}
                <figcaption></figcaption>
              </figure>
            </div>
          </React.Fragment>
        ))
    }
  }

  // div with users Cryptomons
  const myCryptomonsDiv = myCryptomons
    .filter((mon) => !mon.forSale)
    .map((mon) => (
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>{statDiv(mon)}</figcaption>
          </figure>
          {addForSaleDiv(mon, value)}
        </div>
      </React.Fragment>
    ))

  // div with user's Cryptomons that are for sale
  const forSaleCryptomons = myCryptomons
    .filter((mon) => mon.forSale)
    .map((mon) => (
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>{statDiv(mon)}</figcaption>
          </figure>
          {removeFromSaleDiv(mon)}
        </div>
      </React.Fragment>
    ))

  // div with Cryptomons available for buy to the user
  const buyCryptomons = otherCryptomons
    .filter((mon) => mon.forSale)
    .map((mon) => (
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>{statDiv(mon)}</figcaption>
          </figure>
          {buyDiv(mon)}
        </div>
      </React.Fragment>
    ))

  // div with user's Cryptomons that can be used for breeding
  const forBreedCryptomons = myCryptomons
    .filter((mon) => !mon.forSale)
    .map((mon) => (
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>{statDiv(mon)}</figcaption>
          </figure>
          {breedDiv(mon)}
        </div>
      </React.Fragment>
    ))

  const cond = (mon) =>
    (mon.owner.toString().toLowerCase() === account?.toString()?.toLowerCase() && !mon.forSale) ||
    (mon.sharedTo.toString().toLowerCase() === account?.toString()?.toLowerCase() &&
      mon.owner.toString().toLowerCase() !== account?.toString()?.toLowerCase())

  // div with user's Cryptomons that can be used to fight with
  const forFightWithCryptomons = myCryptomons.filter(cond).map((mon) => (
    <React.Fragment key={mon.id}>
      <div className="mon">
        <figure className="my-figure">
          {nameDiv(mon)}
          {imgDiv(mon)}
          <figcaption>{statDiv(mon)}</figcaption>
        </figure>
        <div className="fight-choice-div">
          <button
            className="fight-Choice-btn rpgui-button"
            type="button"
            style={{ float: 'right' }}
            onClick={() => {
              setFightChoice1(mon.id)
            }}
          >
            Choice 1
          </button>
        </div>
      </div>
    </React.Fragment>
  ))

  // div with Cryptomons that user can fight against
  const forFightAgainstCryptomons = otherCryptomons
    .filter((mon) => !mon.forSale && mon.sharedTo.toLowerCase() !== account?.toString().toLowerCase())
    .map((mon) => (
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>{statDiv(mon)}</figcaption>
          </figure>
          <div className="fight-choice-div">
            <button
              className="fight-Choice-btn rpgui-button"
              type="button"
              style={{ float: 'right' }}
              onClick={() => {
                setFightChoice2(mon.id)
              }}
            >
              Choice 2
            </button>
          </div>
        </div>
      </React.Fragment>
    ))

  // div with user's shared Cryptomons
  const sharedByMe = myCryptomons
    .filter((mon) => mon.sharedTo.toLowerCase() !== account?.toString().toLocaleLowerCase() && !mon.forSale)
    .map((mon) => (
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>{statDiv(mon)}</figcaption>
          </figure>
          <div className="sharing-div">
            <div className="shareTo-owner">Shared to address: {mon.sharedTo} </div>
            {isStopSharingLoading ? (
              <button className="rpgui-button" type="button" style={{ width: '100%' }}>
                <Spinner color="#000" />
              </button>
            ) : (
              <button
                className="stop-sharing-btn rpgui-button"
                type="button"
                style={{ float: 'right' }}
                onClick={() => stopSharing(mon.id)}
              >
                Stop sharing
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    ))

  // div with Cryptomons shared to the user
  const sharedToMe = otherCryptomons
    .filter((mon) => mon.sharedTo === account)
    .map((mon) => (
      <React.Fragment key={mon.id}>
        <div className="mon">
          <figure className="my-figure">
            {nameDiv(mon)}
            {imgDiv(mon)}
            <figcaption>{statDiv(mon)}</figcaption>
          </figure>
          <div className="sharing-div">
            <label className="shared-owner">Creature Owner: {mon.owner} </label>
            {isStopSharingLoading ? (
              <button className="rpgui-button" type="button" style={{ width: '100%' }}>
                <Spinner color="#000" />
              </button>
            ) : (
              <button
                className="stop-sharing-btn rpgui-button"
                type="button"
                style={{ float: 'right' }}
                onClick={() => stopSharing(mon.id)}
              >
                Stop sharing
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    ))

  // Function that does all the rendering of the application
  return (
    // Creation of the different tabs of the UI
    <div className="rpgui-content">
      <ToastContainer />
      <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand as="li">
          <img alt="" src={MonImages['favicon32x32']} width="30" height="30" className="d-inline-block" /> 
          <Link to='/' className='LokiMons'>Lokian Monsters</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto lokimons-nav">
          <Nav.Link as="li"><Link to='/myLokiMons'>My LokiMons</Link></Nav.Link>
          <Nav.Link as="li"><Link to='/myShop'>My Shop</Link></Nav.Link>
          <Nav.Link as="li"><Link to='/dojo'>Dojo</Link></Nav.Link>
          <Nav.Link as="li"><Link to='/arena'>Arena</Link></Nav.Link>
          <Nav.Link as="li"><Link to='/breed'>Breed</Link></Nav.Link>
                 <Nav.Link as="li"><Link to='/marketplace'>Marketplace</Link></Nav.Link>
                 <Nav.Link as="li"><Link to='/share'>Share</Link></Nav.Link>
              <Nav.Link as="li"><Link to='/sharedToMe'>Shared To Me</Link></Nav.Link>
              <Nav.Link as="li"><Link to='/token'>Token</Link></Nav.Link>
            <Nav.Link as="li">
              {!!error && <h4>{getErrorMessage(error)}</h4>}
            </Nav.Link>
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
                      width: '100%',
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
                    <div style={{ display: 'none' }}>{name}</div>
                    {!account ? 'Connect Wallet' : ''}
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
      <Route path="/" element={<MyLokiMons myCryptomons={myCryptomons} value={value} onHandleChange={(e) => handleChange(e)} isAddForSaleLoading={isAddForSaleLoading} addForSale={addForSale}/>} />        
          <Route path="/myLokiMons" element={<MyLokiMons myCryptomons={myCryptomons} value={value} onHandleChange={(e) => handleChange(e)} isAddForSaleLoading={isAddForSaleLoading} addForSale={addForSale}/>} />        
          <Route path="/myShop" element={<MyShop myCryptomons={myCryptomons} isRemoveFromSaleLoading={isRemoveFromSaleLoading} removeFromSale={removeFromSale} />} />
          <Route path="/marketplace" element={<Marketplace otherCryptomons={otherCryptomons} isBuyMonLoading={isBuyMonLoading} buyMon={buyMon}/>} />
          <Route path="/breed"  element={<Breed myCryptomons={myCryptomons} isBreedMonLoading={isBreedMonLoading} breedMons={breedMons} setBreedChoice1Func={setBreedChoice1} setBreedChoice2Func={setBreedChoice2} breedChoice1={breedChoice1} breedChoice2={breedChoice2} />} />
          <Route path="/dojo" element={<Dojo myCryptomons={myCryptomons} account={account} setFightChoice1Func={setFightChoice1} setFightChoice2Func={setFightChoice2} otherCryptomons={otherCryptomons} cryptomons={cryptomons} fightChoice1={fightChoice1} fightChoice2={fightChoice2} winner={winner} monNames={names} fightTxDone={fightTxDone} rewards={rewards} rounds={rounds} disableFightBtn={disableFightBtn} fight={fight} />} />
          <Route path="/arena" element={<ArenaV2 />} />
          <Route path="/share" element={<Share myCryptomons={myCryptomons} shareId={shareId} onHandleShareAddress={handleShareAddress} onHandleShareId={handleShareId} shareAddress={shareAddress} 
            isShareLoading={isShareLoading} startSharingFunc={startSharing} account={account} isStopSharingLoading={isStopSharingLoading} stopSharingFunc={stopSharing}
          />} />
          <Route path="/sharedToMe" element={<SharedToMe otherCryptomons={otherCryptomons} account={account} isStopSharingLoading={isStopSharingLoading} stopSharingFunc={stopSharing} />} />
          <Route path="/token" element={<Token 
            tokenBalance={tokenBalance} swords={swords} shields={shields} healingPotions={healingPotions} manaPotions={manaPotions} magicPotions={magicPotions}
            buyItemAmount={buyItemAmount} onHandleBuyItemAmount={handleBuyItemAmount} buyItemFunc={buyItem} disableBuyItemBtn={disableBuyItemBtn} burnAmount={burnAmount} burnFunc={burn} onHandleBurn={handleBurn}
          />} />
        </Routes>
      </Router>
      <Tabs defaultActiveKey="myCryptomons" id="uncontrolled-tab-example">
        {/* <Tab className="x" eventKey="myCryptomons" title="My LokiMons">
          <div className="p1 green-glow">My LokiMons</div>
          {myCryptomonsDiv}
        </Tab> */}
        {/* <Tab eventKey="forSale" title="My Shop">
          <div className="p1 green-glow">My Shop</div>
          {forSaleCryptomons}
        </Tab>
        <Tab eventKey="buyCryptomons" title="Marketplace">
          <div className="p1 green-glow">Marketplace</div>
          {buyCryptomons}
        </Tab> */}
        {/* <Tab eventKey="breedCryptomons" title="Breed">
          <div className="p1 green-glow">Breed</div>
          <div className="breeding-area">
            {breedOption(breedChoice1)}
            {breedOption(breedChoice2)}
            {isBreedMonLoading ? (
              <button className="rpgui-button" type="button" style={{ width: '100%' }}>
                <Spinner color="#000" />
              </button>
            ) : (
              <button
                className="rpgui-button"
                type="button"
                style={{ width: '420px' }}
                onClick={() => breedMons(breedChoice1, breedChoice2)}
              >
                Breed choosen lokimons
              </button>
            )}
          </div>
          <br />
          {forBreedCryptomons}
        </Tab> */}
        {/* <Tab eventKey="fight" title="Arena">
          <div className="p1 green-glow">V S</div>
          <div className="fighting-area">
            {breedOption(fightChoice1)}
            {breedOption(fightChoice2)}

            <label className="winner-label">
              And the winner is...{' '}
              {fightTxDone ? names[cryptomons.find((mon) => mon.id?.toString() === winner?.toString())?.species] : ''}
              {!winner || winner == 12345678911 ? 'still unknown' : ''}
              {winner == 12345678910 ? "no one, it's a tie" : ''}
            </label>

            {fightTxDone && winner !== 12345678910 ? (
              <>
                <br />
                <label className="winner-label">Winning creature's Id: {winner}</label>
                <br />
                <label className="winner-label">Rounds the fight lasted: {rounds}</label>
                <br />

                {!fightTxDone && rewards === 0 && !winner ? (
                  ''
                ) : (
                  <label className="winner-label">{rewards === 0 ? '' : `You have won ${rewards} LOKs!`}</label>
                )}
              </>
            ) : (
              ''
            )}

            {disableFightBtn ? (
              <Spinner color="gray" style={{ marginLeft: '50%', marginRight: 'auto', padding: '8px' }} />
            ) : (
              <button
                id="fight-btn"
                className="rpgui-button"
                type="button"
                onClick={() => {
                  setWinner(null)
                  setRounds(null)
                  setFightTxDone(false)
                  setRewards(0)
                  fight(fightChoice1, fightChoice2)
                }}
                disabled={disableFightBtn}
              >
                Fight with choosen lokimons
              </button>
            )}
          </div>
          <div className="fight-mons-area">
            <div className="fightWith-area">
              <div className="p2">Your LokiMons</div>
              {forFightWithCryptomons}
            </div>
            <div className="fightAgainst-area">
              <div className="p2">Opponent LokiMons</div>
              {forFightAgainstCryptomons}
            </div>
          </div>
        </Tab> */}
        {/* <Tab eventKey="arenav2" title="ArenaV2">
          <ArenaV2 />
        </Tab> */}
        {/* <Tab eventKey="share" title="Share">
          <div className="p1 green-glow">Sharing Management</div>
          <div className="sharing-area">
            <div className="form-line">
              <label className="form-label">Creature Id:</label>
              <input className="form-input" value={shareId} onChange={(e) => handleShareId(e)} />
            </div>
            <div className="form-line">
              <label className="form-label">Share to address:</label>
              <input className="form-input" value={shareAddress} onChange={(e) => handleShareAddress(e)} />
            </div>
            <div className="form-line">
              {isShareLoading ? (
                <button className="rpgui-button" type="button" style={{ width: '100%' }}>
                  <Spinner color="#000" />
                </button>
              ) : (
                <button
                  className="rpgui-button"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => startSharing(shareId, shareAddress)}
                >
                  Share
                </button>
              )}
            </div>
          </div>
          {sharedByMe}
        </Tab> */}
        {/* <Tab eventKey="sharedToMe" title="Shared To Me">
          <div className="p1 green-glow">Shared To You</div>
          {sharedToMe}
        </Tab>
        <Tab eventKey="token" title="Token">
          <div className="p1 green-glow">Your tokens</div>

          <div className="p1" style={{ padding: '12px' }}>
            {tokenBalance} Lokians
          </div>
          <br />
          <br />
          <div className="p1 green-glow">
            Your items
            <div style={{ marginLeft: '45%', marginRight: 'auto' }}>
              <div className="row">
                <div className="column">
                  {!swords ? <div className="rpgui-icon weapon-slot"></div> : <div className="rpgui-icon sword"></div>}
                  {!shields ? (
                    <div className="rpgui-icon shield-slot"></div>
                  ) : (
                    <div className="rpgui-icon shield"></div>
                  )}
                  {healingPotions || manaPotions || magicPotions ? (
                    <div className="rpgui-icon potion-red"></div>
                  ) : (
                    <div className="rpgui-icon potion-slot"></div>
                  )}
                </div>
              </div>
            </div>
            <br />
            <div style={{ marginLeft: '40%', marginRight: 'auto' }}>
              <div className="row">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p>You have {`${swords}`} swords!</p>
                  <p>You have {`${shields}`} shields!</p>
                  <p>You have {`${healingPotions}`} healing potions!</p>
                  <p>You have {`${manaPotions}`} mana potions!</p>
                  <p>You have {`${magicPotions}`} magic potions!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rpgui-container framed-grey">
            <div className="p1">Buy somethin (NFT)</div>
            <div className="p1">note: if transaction fails, set gas fees above 100k</div>
            <div className="sharing-area">
              <span>
                <div className="rpgui-icon sword"></div> A Sword (500 Loks)
              </span>
              <div className="form-line with-buy-item">
                <label className="form-label">Amount</label>
                <input
                  className="form-input"
                  placeholder="0"
                  value={buyItemAmount}
                  onChange={(e) => handleBuyItemAmount(e)}
                />
              </div>
              <div className="form-line with-buy-item">
                <button
                  className="rpgui-button"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => buyItem(buyItemAmount, '500', '3')}
                  disabled={disableBuyItemBtn}
                >
                  Buy
                </button>
              </div>
            </div>

            <div className="sharing-area">
              <span>
                <div className="rpgui-icon shield"></div> A Shield (500 Loks)
              </span>
              <div className="form-line with-buy-item">
                <label className="form-label">Amount</label>
                <input
                  className="form-input"
                  placeholder="0"
                  value={buyItemAmount}
                  onChange={(e) => handleBuyItemAmount(e)}
                />
              </div>
              <div className="form-line with-buy-item">
                <button
                  className="rpgui-button"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => buyItem(buyItemAmount, '500', '4')}
                  disabled={disableBuyItemBtn}
                >
                  Buy
                </button>
              </div>
            </div>

            <div className="sharing-area">
              <span>
                <div className="rpgui-icon potion-red"></div>A Healing Potion (50 Loks)
              </span>
              <div className="form-line with-buy-item">
                <label className="form-label">Amount</label>
                <input
                  className="form-input"
                  placeholder="0"
                  value={buyItemAmount}
                  onChange={(e) => handleBuyItemAmount(e)}
                />
              </div>
              <div className="form-line with-buy-item">
                <button
                  className="rpgui-button"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => buyItem(buyItemAmount, '50', '0')}
                  disabled={disableBuyItemBtn}
                >
                  Buy
                </button>
              </div>
            </div>

            <div className="sharing-area">
              <span>
                <div className="rpgui-icon potion-blue"></div> A Mana Potion (50 Loks)
              </span>
              <div className="form-line with-buy-item">
                <label className="form-label">Amount</label>
                <input
                  className="form-input"
                  placeholder="0"
                  value={buyItemAmount}
                  onChange={(e) => handleBuyItemAmount(e)}
                />
              </div>
              <div className="form-line with-buy-item">
                <button
                  className="rpgui-button"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => buyItem(buyItemAmount, '50', '1')}
                  disabled={disableBuyItemBtn}
                >
                  Buy
                </button>
              </div>
            </div>

            <div className="sharing-area">
              <span>
                <div className="rpgui-icon potion-green"></div> A Magic Potion (50 Loks)
              </span>
              <div className="form-line with-buy-item">
                <label className="form-label">Amount</label>
                <input
                  className="form-input"
                  placeholder="0"
                  value={buyItemAmount}
                  onChange={(e) => handleBuyItemAmount(e)}
                />
              </div>
              <div className="form-line with-buy-item">
                <button
                  className="rpgui-button"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => buyItem(buyItemAmount, '50', '2')}
                  disabled={disableBuyItemBtn}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>

          <div className="rpgui-container framed-grey">
            <div className="p1">Give to the skeleton people (burn token)</div>
            <div className="p1">note: if transaction fails, set gas fees above 100k</div>
            <div className="skellies">
              <img className="monImg" src={MonImages['skelly']} alt="skeleton-people-1" />
              <img className="monImg" src={MonImages['skelly2']} alt="skeleton-people-1" />
              <img className="monImg" src={MonImages['skellyrip']} alt="skeleton-people-1" />
            </div>
            <div className="sharing-area">
              <div className="form-line with-burn">
                <label className="form-label">Amount</label>
                <input className="form-input" placeholder="0" value={burnAmount} onChange={(e) => handleBurn(e)} />
              </div>
              <div className="form-line with-burn">
                <button
                  className="rpgui-button"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => burn(burnAmount)}
                  disabled={disableBuyItemBtn}
                >
                  Give
                </button>
              </div>
            </div>
          </div>
        </Tab> */}
      </Tabs>
    </div>
  )
}

export default App
