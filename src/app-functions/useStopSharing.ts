import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { CONTRACT_ADDRESS } from '../App'
import { VoidFunction } from '../components/common/interfaces'

/**
 * User stops lokimon sharing
 *
 * @param  {Web3Provider} library
 * @param  {string} account
 * @param  {React.Dispatch<React.SetStateAction<boolean>>} setIsStopSharingLoading
 * @param  {VoidFunction} refreshMons
 * @return {Record<string, unknown} stopSharing
 */
const useStopSharing = (
  library: Web3Provider,
  account: string,
  setIsStopSharingLoading: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMons: VoidFunction,
): Record<string, unknown> => {
  const stopSharing = async (id: number) => {
    setIsStopSharingLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library.getSigner(account))
    const overrides = {
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
