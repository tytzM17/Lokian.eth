import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { parseEther } from '@ethersproject/units'
import erc20Interface from '../abis/erc20Interface.json'
import { ERC20_CONTRACT_ADDRESS, CONTRACT_ADDRESS } from '../App'

export async function approve(_library: Web3Provider, _account: string, _amount: string) {
  const erc20Contr = new Contract(ERC20_CONTRACT_ADDRESS, erc20Interface, _library.getSigner(_account))
  const newAmount = `${parseEther(_amount)}`
  return await erc20Contr.approve(CONTRACT_ADDRESS, newAmount)
}
