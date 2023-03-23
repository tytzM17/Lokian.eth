import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import erc20Interface from '../abis/erc20Interface.json'
import { ERC20_CONTRACT_ADDRESS } from '../App'
import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { toastErrParams } from './toastErrParams'

/**
 * Format lokians token balance
 *
 * @param  {Web3Provider} _library
 * @param  {string} _account
 *
 * @return {Promise<boolean>} approve promise
 */
export async function getTokenBalance(_library: Web3Provider, _account: string): Promise<string> {
  if (!_library || !_account) {
    return
  }
  try {
    const erc20Contr = new Contract(
      ERC20_CONTRACT_ADDRESS,
      erc20Interface,
      _library.getSigner(_account),
    )
    if (!erc20Contr) {
      return '0'
    }
    const bal = await erc20Contr.balanceOf(_account)
    return formatEther(BigNumber.from(bal?._hex).toBigInt())
  } catch (error) {
    console.log(error)
    toast.error('Error, please check the network', toastErrParams)
    return '0'
  }
}
