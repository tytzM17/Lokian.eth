import { Contract } from '@ethersproject/contracts'
import { parseEther } from '@ethersproject/units'
import erc20Interface from '../abis/erc20Interface.json'
import { ERC20_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from '../App'

export async function approve(_library, _account, _amount) {
  const erc20Contr = new Contract(ERC20_CONTRACT_ADDRESS, erc20Interface, _library.getSigner(_account))
  const newAmount = `${parseEther(_amount)}`
  return await erc20Contr.approve(CONTRACT_ADDRESS, newAmount)
}
