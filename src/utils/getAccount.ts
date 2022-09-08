import { ethers } from 'ethers'

const getAccount = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const accounts = await provider?.listAccounts()
  return accounts ? accounts[0] : null
}

export default getAccount
