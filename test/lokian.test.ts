import { expect, use } from 'chai'
import { Contract } from 'ethers'
import { deployContract, MockProvider, solidity } from 'ethereum-waffle'
import Lokian from '../build/Cryptomons.json'
import Nft from '../build/LokianItems.json'
import Token from '../build/Lokians.json'
import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from '@ethersproject/units'

use(solidity)

describe('Lokian', () => {
  const [wallet, walletTo] = new MockProvider().getWallets()
  let lokian: Contract
  let token: Contract
  let nft: Contract

  beforeEach(async () => {
    token = await deployContract(wallet, Token)
    nft = await deployContract(wallet, Nft)
    lokian = await deployContract(wallet, Lokian, [token.address, nft.address])
  })

  // beforeEach nft transfer from owner to contract
  beforeEach(async () => {
    await nft.setApprovalForAll(lokian.address, true)
  })
  beforeEach(async () => {
    await nft.safeTransferFrom(wallet.address, lokian.address, 0, 99, '0x00') // healing, 99
    await nft.safeTransferFrom(wallet.address, lokian.address, 1, 99, '0x00') // mana, 99
    await nft.safeTransferFrom(wallet.address, lokian.address, 2, 99, '0x00') // magic, 99
    await nft.safeTransferFrom(wallet.address, lokian.address, 3, 99, '0x00') // sword, 99
    await nft.safeTransferFrom(wallet.address, lokian.address, 4, 99, '0x00') // shield, 99
  })

  // token
  it('Assigns initial contract token balance', async () => {
    // transfer tokens and nft to contract
    const hasApprovedOwner = await token.approve(wallet.address, 99999)
    const hasApproved = await token.approve(lokian.address, 9999)
    if (hasApprovedOwner && hasApproved) {
      await token.transferFrom(wallet.address, lokian.address, 9999) // 9,999
      expect(await token.balanceOf(lokian.address)).to.equal(9999)
    }
  })

  it('Must be able to deposit token', async () => {
    const hasApprovedOwner = await token.approve(wallet.address, 1)
    const hasApproved = await token.approve(lokian.address, 1) // 1
    if (hasApprovedOwner && hasApproved) {
      await token.transferFrom(wallet.address, lokian.address, 1) // 1
      expect(await token.balanceOf(lokian.address)).to.equal(1) // 1
    }
  })

  // nft
  it('Assigns initial contract nft balances', async () => {
    expect(await nft.balanceOf(lokian.address, 0)).to.equal(99) // 99
    expect(await nft.balanceOf(lokian.address, 1)).to.equal(99) // 99
    expect(await nft.balanceOf(lokian.address, 2)).to.equal(99) // 99
    expect(await nft.balanceOf(lokian.address, 3)).to.equal(99) // 99
    expect(await nft.balanceOf(lokian.address, 4)).to.equal(99) // 99
  })
  it('Must be able to buy a potion', async () => {
    const _price = parseEther('50')
    const priceInWei = `${BigNumber.from(_price._hex).toBigInt()}`

    const tokenFromOtherWallet = token.connect(walletTo)
    const contractFromOtherWallet = lokian.connect(walletTo)

    const hasApprovedOwner = await token.approve(walletTo.address, 1)
    const hasApproved = await token.approve(lokian.address, 1) // 1

    const contractNftBalance = nft.balanceOf(lokian.address, 0)
    const units = 1

    if (contractNftBalance >= units && hasApproved && hasApprovedOwner) {
      await lokian.buyItem(units, priceInWei, 0, '0x00')
      expect(await nft.balanceOf(walletTo.address, 0)).to.equal(1)
    }
  })
})
