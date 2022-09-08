import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json' 
import { CONTRACT_ADDRESS } from '../App'

export async function getMons(_library, _account) {
  const contr = new Contract(CONTRACT_ADDRESS, contrInterface, _library.getSigner(_account))
  const totalMons = parseInt(await contr.totalMons())
  return Promise.all([...Array(totalMons).keys()].map((id) => contr.mons(id)))
}
