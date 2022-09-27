import React from 'react'
import { toast } from 'react-toastify'
import { Contract } from '@ethersproject/contracts'
import { txFail, txSuccess } from '../utils'

const useBuyMon = (
    contr: Contract,
    setIsBuyMonLoading: React.Dispatch<React.SetStateAction<boolean>>,
    refreshMons: () => void
) => {

    const buyMon = async (id: number, price: bigint) => {
        setIsBuyMonLoading(true)
        const newprice = `${price}`
        const overrides = {
          value: newprice,
          gasLimit: 120000,
        }
    
        const tx = await contr?.buyMon(id, overrides)?.catch(() => setIsBuyMonLoading(false))
        const recpt = await tx?.wait()

        txSuccess(recpt, toast, refreshMons, (loadVal: boolean) => setIsBuyMonLoading(loadVal))
        txFail(recpt, toast, (loadVal: boolean) => setIsBuyMonLoading(loadVal))
      }

  return { buyMon }
}

export default useBuyMon