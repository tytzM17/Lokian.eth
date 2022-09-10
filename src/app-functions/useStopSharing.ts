import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { CONTRACT_ADDRESS } from '../App'

const useStopSharing = (
  library: Web3Provider,
  account: string,
  setIsStopSharingLoading: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMons: () => void
) => {
  const stopSharing = async (id: number) => {
    setIsStopSharingLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    let overrides = {
      gasLimit: 120000,
    }
    const tx = await contr.stopSharing(id, overrides).catch(() => setIsStopSharingLoading(false))
    const recpt = await tx?.wait()
    if (recpt && recpt.status) {
      toast.success(`Success, Tx hash: ${recpt.transactionHash}`, toastErrParams)
      refreshMons()
      setIsStopSharingLoading(false)
    }

    if (recpt && !recpt.status) {
      toast.error(`Error, Tx hash: ${recpt.transactionHash}`, toastErrParams)
      setIsStopSharingLoading(false)
    }
  }
  return { stopSharing }
}

export default useStopSharing
