import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { parseEther } from '@ethersproject/units'
import { CONTRACT_ADDRESS } from '../App'

const useAddForSale = (
  library: Web3Provider,
  account: string,
  setIsAddForSaleLoadingFunc: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMons: () => void
) => {
  const addForSale = async (id: number, price: number) => {
    setIsAddForSaleLoadingFunc(true)
    if (!price || !id || price === 0) {
      toast.error('Missing price or id')
      setIsAddForSaleLoadingFunc(false)
      return
    }
    let overrides = {
      gasLimit: 120000,
    }
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library?.getSigner(account))
    const tx = await contr
      .addForSale(id, parseEther(price?.toString()), overrides)
      .catch(() => setIsAddForSaleLoadingFunc(false))
    const receipt = await tx?.wait()
    if (receipt && receipt.status === 1) {
      toast.success(`Success, Tx hash: ${receipt.transactionHash}`, toastErrParams)
      refreshMons()

      setIsAddForSaleLoadingFunc(false)
    }
    if (receipt && receipt.status === 0) {
      toast.error(`Error, Tx hash: ${receipt.transactionHash}`, toastErrParams)
      setIsAddForSaleLoadingFunc(false)
    }
  }

  return { addForSale }
}

export default useAddForSale
