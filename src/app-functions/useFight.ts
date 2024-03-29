import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'

type FightObj = {
  fightObj: Promise<Any>
}

const useFight = (
  contr: Contract,
  setDisableFightBtn: React.Dispatch<React.SetStateAction<boolean>>,
  setFightTxDone: React.Dispatch<React.SetStateAction<boolean>>
): FightObj => {
  const fight = async (id1: number, id2: number) => {
    setDisableFightBtn(true)
    if (id1 === null || id2 === null) {
      return
    }
    const overrides = {
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
        toast.error(`Error, Tx hash: ${recpt.transactionHash}`, toastErrParams)
        setFightTxDone(false)
      }
    } catch (error) {
      toast.error(`Fight function error: ${error.data?.message || ''}`, toastErrParams)
      setFightTxDone(false)
      setDisableFightBtn(false)
    }
  }

  return { fight }
}

export default useFight
