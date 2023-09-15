import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { CONTRACT_ADDRESS } from '../App'
import { parseEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { approve, txFail, txSuccess } from '../utils'

type BuyItemObj = {
  buyItem: Promise<Any>
}

const useBuyItem = (
  library: Web3Provider,
  account: string,
  setDisableBuyItem: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMons: () => void
): BuyItemObj => {
  const buyItem = async (units: string, price: string, itemNumber: string, data = '0x00') => {
    setDisableBuyItem(true)

    if (!units || !price || !itemNumber) {
      return
    }

    const overrides = {
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
          toast.error(`Error in approving`, toastErrParams)
        }
        setDisableBuyItem(false)
      })
      .catch((e) => {
        toast.error(`Error: ${e?.message}`, toastErrParams)
        setDisableBuyItem(false)
      })
  }

  return { buyItem }
}

export default useBuyItem
