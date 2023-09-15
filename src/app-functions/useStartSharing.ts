import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { CONTRACT_ADDRESS } from '../App'

const useStartSharing = (
  library: Web3Provider,
  account: string,
  setIsShareLoading: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMons: () => void
) => {
  const startSharing = async (id: number, address: string) => {
    setIsShareLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    const overrides = {
      gasLimit: 120000,
    }
    const tx = await contr.startSharing(id, address, overrides).catch(() => setIsShareLoading(false))
    const recpt = await tx?.wait()
    if (recpt && recpt.status) {
      toast.success(`Success, Tx hash: ${recpt.transactionHash}`, toastErrParams)
      refreshMons()
      setIsShareLoading(false)
    }
    if (recpt && !recpt.status) {
      toast.error(`Error, Tx hash: ${recpt.transactionHash}`, toastErrParams)
      setIsShareLoading(false)
    }
  }
  return { startSharing }
}

export default useStartSharing
