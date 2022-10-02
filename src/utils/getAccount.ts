import { ethers } from 'ethers'

/**
 * Force get account or wallet address
 * 
 * @return {string} account
 */
const getAccount = async (): Promise<string>  => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const accounts = await provider?.listAccounts()
  return accounts ? accounts[0] : ''
}

export default getAccount
