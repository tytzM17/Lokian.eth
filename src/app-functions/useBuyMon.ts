import React from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { Contract } from '@ethersproject/contracts'
import contrInterface from '../abis/interface.json'
import { CONTRACT_ADDRESS } from '../App'
import { txFail, txSuccess } from '../utils'

const useBuyMon = (
    library: Web3Provider,
    account: string,
    setIsBuyMonLoading: React.Dispatch<React.SetStateAction<boolean>>,
    refreshMons: () => void
) => {

    const buyMon = async (id: number, price: number) => {
        setIsBuyMonLoading(true)
        const contr = new Contract(CONTRACT_ADDRESS, contrInterface, library?.getSigner(account))
        const newprice = `${BigInt(price)}`
        let overrides = {
          value: newprice,
          gasLimit: 120000,
        }
    
        const tx = await contr.buyMon(id, overrides).catch(() => setIsBuyMonLoading(false))
        const recpt = await tx?.wait()

        txSuccess(recpt, toast, refreshMons, (loadVal: boolean) => setIsBuyMonLoading(loadVal))
        txFail(recpt, toast, (loadVal: boolean) => setIsBuyMonLoading(loadVal))
      }

  return { buyMon }
}

export default useBuyMon