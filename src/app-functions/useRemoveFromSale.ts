import React from 'react'
import { toast } from 'react-toastify'
import { toastErrParams } from '../utils/toastErrParams'
import { Contract } from '@ethersproject/contracts'

type RemoveFromSaleObj = {
removeFromSale: Promise<Any>
}

const useRemoveFromSale = (
    contr: Contract,
    setIsRemoveFromSaleLoading: React.Dispatch<React.SetStateAction<boolean>>,
    refreshMons: () => void
): RemoveFromSaleObj => {

    const removeFromSale = async (id: number) => { 
            setIsRemoveFromSaleLoading(true)
            const overrides = {
              gasLimit: 120000,
            }
            const tx = await contr?.removeFromSale(id, overrides)?.catch((err) => {
              setIsRemoveFromSaleLoading(false)
              console.error(err);
            })
            const recpt = await tx?.wait()

            if (recpt && recpt.status === 1) {
              toast.success(`Success, Tx hash: ${recpt.transactionHash}`, toastErrParams)
              refreshMons()
              setIsRemoveFromSaleLoading(false)
            }
            if (recpt && recpt.status === 0) {
              toast.error(`Error, Tx hash: ${recpt.transactionHash}`, )
              setIsRemoveFromSaleLoading(false)
            }
     }

  return { removeFromSale }
}

export default useRemoveFromSale