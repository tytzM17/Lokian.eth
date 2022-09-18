import React from 'react'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'

const useBreedMons = (
  contr: Contract,
  setIsBreedMonLoading: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMons: () => void
) => {
  const breedMons = async (id1: number, id2: number) => {
    setIsBreedMonLoading(true)
    const tx = await contr?.breedMons(id1, id2).catch(() => setIsBreedMonLoading(false))
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
