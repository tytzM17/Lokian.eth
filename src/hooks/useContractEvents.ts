import { useEffect, useState } from 'react'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { CONTRACT_ADDRESS } from '../App'
import { BigNumber } from 'ethers'

const useContractEvents = ({ fightTxDone, library, account, refreshMons, setDisableFightBtn }) => {
  const [rewards, setRewards] = useState(0)
  const [winner, setWinner] = useState(null)
  const [rounds, setRounds] = useState(null)

  useEffect(() => {
    if (!library || !account) {
      return
    }

    let mounted = true

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
        console.log('rewards winner', _winnerId);
        
      }
    })

    return () => {
      contr.off('FightResults', (_winnerId, _round) => {
        setDisableFightBtn(false)
        console.log(_winnerId, _round);
      })
      contr.off('Rewards', (_winnerId, _round) => {
        setDisableFightBtn(false)
        console.log(_winnerId, _round);
      })

      mounted = false
    }
  }, [fightTxDone, library, account])

  return { winner, rounds, rewards, setWinner, setRounds }
}

export default useContractEvents
