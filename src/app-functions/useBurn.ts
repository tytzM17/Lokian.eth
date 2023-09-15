import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { CONTRACT_ADDRESS } from '../App'
import { parseEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { approve, txFail, txSuccess } from '../utils'

type BurnObj = {
  burn: Promise<Any>
}

const useBurn = (
  library: Web3Provider,
  account: string,
  setDisableBuyItem: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMons: () => void
): BurnObj => {
  const burn = async (amount: string) => {
    setDisableBuyItem(true)

    if (!amount) {
      return
    }

    const _amount = parseEther(amount)
    const amountInWei = `${BigNumber.from(_amount._hex).toBigInt()}`

    const overrides = {
      gasLimit: 120000,
    }

    approve(library, account, amountInWei)
      .then(async (results) => {
        if (results) {
          const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
          const tx = await contr?.burn(amountInWei, overrides)
          const recpt = await tx.wait()
          txSuccess(recpt, toast, refreshMons)
          txFail(recpt, toast)
        } else {
          toast.error(`Error in approving`, toastErrParams)
        }
        setDisableBuyItem(false)
      })
      .catch((e) => {
        toast.error(`Error: ${e?.message}`, toastErrParams)
        setDisableBuyItem(false)
      })
  }

  return { burn }
}

export default useBurn
