import { getMons } from '../utils'
import { useState } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { toast } from 'react-toastify'
import { BigNumber } from 'ethers'
import { Lokimon, LokimonContract } from '../models'
import { toastErrParams } from '../utils/toastErrParams'

type RefreshMonsObj = {
  refreshMonsObj: Promise<Any>
}

const useRefreshMons = (library: Web3Provider, account: string): RefreshMonsObj => {
  const [cryptomons, setCryptomons] = useState([])
  const [myCryptomons, setMyCryptomons] = useState([])
  const [otherCryptomons, setOtherCryptomons] = useState([])

  const resetMons = () => {
    setCryptomons([])
    setMyCryptomons([])
    setOtherCryptomons([])
  }

  const refreshMons = async () => {
    await getMons(library, account)
      .then((_mons: LokimonContract[]) => {
        const monsMap: Lokimon[] = _mons.map((mon: LokimonContract) => ({
          atk: mon.atk,
          def: mon.def,
          evolve: mon.evolve,
          forSale: mon.forSale,
          hp: mon.hp,
          id: BigNumber.from(mon.id._hex).toNumber(),
          monType: mon.monType,
          owner: mon.owner,
          price: BigNumber.from(mon.price._hex).toBigInt(),
          sharedTo: mon.sharedTo,
          species: mon.species,
          speed: mon.speed,
        }))
        setCryptomons(monsMap)
        setMyCryptomons(monsMap.filter((mon) => mon.owner === account))
        setOtherCryptomons(monsMap.filter((mon) => mon.owner !== account))
      })
      .catch((err) => toast.error(err, toastErrParams))
  }

  return { cryptomons, myCryptomons, otherCryptomons, resetMons, refreshMons }
}

export default useRefreshMons
