// core
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

// Library to work with Ethereum like blockchain
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import contrInterface from './abis/interface.json'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from './wallet/hooks'

// components
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// utils
import { useFight, useRefreshMons } from './app-functions'
import { useContractEvents, useRecognizeConnector, useTokenBalance } from './hooks'
import { getTokenBalance } from './utils'
import Navigation from './Navigation'
import NavWallet from './NavWallet'
import MenuRoutes from './MenuRoutes'
import { names } from './components/common'

// contracts
export let CONTRACT_ADDRESS: string = process.env.REACT_APP_MAIN_CONTRACT_ADDRESS
export let ERC20_CONTRACT_ADDRESS: string = process.env.REACT_APP_MAIN_ERC20
export let ERC1155_CONTRACT_ADDRESS: string = process.env.REACT_APP_MAIN_ERC1155

// use for github pages default build and deploy workflow
// export let MAIN_CONTRACT_ADDRESS: string = '0x5148A559cFaaEC1A915ae41e00A8Dd2Fa17ba64f'
// export let MAIN_ERC20_CONTRACT_ADDRESS: string = '0x4d8d24968458af521ef02aefD95f161dF3f9Ea01'
// export let MAIN_ERC1155_CONTRACT_ADDRESS: string = '0x8227767903Fa90A90060E28a45506318E03997aD'

// export let TEST_CONTRACT_ADDRESS: string = '0xb1e821c9550463b0d3d2aA4846bE79D6aB5Ec6ea'
// export let TEST_ERC20_CONTRACT_ADDRESS: string = '0x2683EbB22FE772dB15C09b99897bD38B2Bf2487E'
// export let TEST_ERC1155_CONTRACT_ADDRESS: string = '0xC924448D65D0b20629eaAD25eE79bC2911E8690a'


const App = (): JSX.Element => {
  const [fightChoice1, setFightChoice1] = useState(null)
  const [fightChoice2, setFightChoice2] = useState(null)
  const [fightTxDone, setFightTxDone] = useState(false)
  const [disableFightBtn, setDisableFightBtn] = useState(false)

  // wallet
  const context = useWeb3React<Web3Provider>()
  const { connector, account, library, activate, deactivate, active, error } = context

  const [mainContract, setMainContract] = useState(
    new Contract(CONTRACT_ADDRESS, contrInterface, library?.getSigner(account))
  )

  useEffect(() => {
    if (!process || !process.env) return
    if (process.env.NODE_ENV !== 'production') {
      CONTRACT_ADDRESS = process.env.REACT_APP_TEST_CONTRACT_ADDRESS
      ERC20_CONTRACT_ADDRESS = process.env.REACT_APP_TEST_ERC20
      ERC1155_CONTRACT_ADDRESS = process.env.REACT_APP_TEST_ERC1155
    } 
  }, [])

  useEffect(() => {
    if (!library || !account) return
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library?.getSigner(account))
    if (!contr) return
    setMainContract(contr)
  }, [CONTRACT_ADDRESS])

  // app functions
  const { cryptomons, myCryptomons, otherCryptomons, resetMons, refreshMons } = useRefreshMons(library, account)
  const { fight } = useFight(mainContract, setDisableFightBtn, setFightTxDone)

  // handle logic to recognize the connector currently being activated
  const { activatingConnector, setActivatingConnector } = useRecognizeConnector({ connector, refreshMons })

  // Get token balance of user
  const { tokenBalance } = useTokenBalance({
    account,
    library,
    getTokenBalance,
    refreshMons,
  })

  // Get contract events
  const { winner, rounds, rewards, setWinner, setRounds } = useContractEvents({
    fightTxDone,
    library,
    account,
    refreshMons,
    setDisableFightBtn,
  })

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

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

  const fightRouteProps = {
    fightChoice1,
    fightChoice2,
    setFightChoice1,
    setFightChoice2,
    winner,
    fightTxDone,
    rewards,
    rounds,
    disableFightBtn,
    fight,
  }

  const commonRouteProps = {
    myCryptomons,
    otherCryptomons,
    cryptomons,
    refreshMons,
    resetMons,
    tokenBalance,
    mainContract,
    names,
    account,
  }

  const menuRouteProps = {
    commonRouteProps,
    fightRouteProps,
    mainContract,
  }

  return (
    <div className="rpgui-content">
      <ToastContainer />
      <Router>
        <Navigation error={error}>
          <NavWallet {...navWalletProps} />
        </Navigation>
        <MenuRoutes {...menuRouteProps} />
      </Router>
    </div>
  )
}

export default App
