import React from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { CONTRACT_ADDRESS } from '../App'

const useBreedMons = (
  library: Web3Provider,
  account: string,
  setIsBreedMonLoading: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMons: () => void
) => {
  const breedMons = async (id1: number, id2: number) => {
    setIsBreedMonLoading(true)
    const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library?.getSigner(account))
    const tx = await contr.breedMons(id1, id2).catch(() => setIsBreedMonLoading(false))
    const recpt = await tx?.wait()
    if (recpt && recpt.status) {
      toast.success(`Success, Tx hash: ${recpt.transactionHash}`, toastErrParams)
      setIsBreedMonLoading(false)
    }

    if (recpt && !recpt.status) {
      toast.error(`Error, Tx hash: ${recpt.transactionHash}`, toastErrParams)
      setIsBreedMonLoading(false)
    }

    refreshMons()
  }

  return { breedMons }
}

export default useBreedMons
