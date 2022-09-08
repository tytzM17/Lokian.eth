import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import erc20Interface from '../abis/erc20Interface.json' 
import { ERC20_CONTRACT_ADDRESS } from '../App'

export async function getTokenBalance(_library, _account) {
  if (!_library || !_account) {
    return
  }
  const erc20Contr = new Contract(ERC20_CONTRACT_ADDRESS, erc20Interface, _library.getSigner(_account))
  const bal = await erc20Contr.balanceOf(_account)
  return formatEther(BigNumber.from(bal?._hex).toBigInt())
}
