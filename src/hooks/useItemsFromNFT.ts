import { Contract } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import nftInterface from '../abis/project.nft.abi.json'
import { ERC1155_CONTRACT_ADDRESS } from '../App'

const useItemsFromNFT = ({ library, account, disableBuyItemBtn }) => {
  const [healingPotions, setHealingPotions] = useState(null)
  const [manaPotions, setManaPotions] = useState(null)
  const [magicPotions, setMagicPotions] = useState(null)
  const [swords, setSwords] = useState(null)
  const [shields, setShields] = useState(null)

  useEffect(() => {
    if (!library || !account) {
      return
    }

    let mounted = true

    ;(async function () {
      if (mounted) {
        const nftContr = new Contract(ERC1155_CONTRACT_ADDRESS, nftInterface, library.getSigner(account))
        const healpot = await nftContr.balanceOf(account, 0)
        const manapot = await nftContr.balanceOf(account, 1)
        const magicpot = await nftContr.balanceOf(account, 2)
        const _swords = await nftContr.balanceOf(account, 3)
        const _shields = await nftContr.balanceOf(account, 4)

        setHealingPotions(BigNumber.from(healpot._hex).toBigInt())
        setManaPotions(BigNumber.from(manapot._hex).toBigInt())
        setMagicPotions(BigNumber.from(magicpot._hex).toBigInt())
        setSwords(BigNumber.from(_swords._hex).toBigInt())
        setShields(BigNumber.from(_shields._hex).toBigInt())
      }
    })()

    return () => {
      mounted = false
    }
  }, [library, account, disableBuyItemBtn])

  return {
    healingPotions,
    magicPotions,
    manaPotions,
    swords,
    shields,
  }
}

export default useItemsFromNFT
