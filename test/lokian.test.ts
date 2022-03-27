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
    const _token = parseEther('10000')
    const tokenInWei = `${BigNumber.from(_token._hex).toBigInt()}`
    await token.mint(wallet.address, tokenInWei)
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
  // it('Assigns initial contract token balance', async () => {
  //   // transfer tokens and nft to contract
  //   const hasApprovedOwner = await token.approve(wallet.address, 99999)
  //   const hasApproved = await token.approve(lokian.address, 9999)
  //   if (hasApprovedOwner && hasApproved) {
  //     await token.transferFrom(wallet.address, lokian.address, 9999)
  //     expect(await token.balanceOf(lokian.address)).to.equal(9999)
  //   }
  // })

  // it('Deposits token', async () => {
  //   const hasApprovedOwner = await token.approve(wallet.address, 1)
  //   const hasApproved = await token.approve(lokian.address, 1)
  //   if (hasApprovedOwner && hasApproved) {
  //     await lokian.deposit(1)
  //     expect(await token.balanceOf(lokian.address)).to.equal(1)
  //   }
  // })

  // it('Withdraws token', async () => {
  //   await token.approve(wallet.address, 100)
  //   await token.approve(lokian.address, 100)
  //   const hasTransferred = await token.transferFrom(wallet.address, lokian.address, 100)
  //   if (hasTransferred) {
  //     await lokian.withdraw(100)
  //     expect(await token.balanceOf(lokian.address)).to.equal(0)
  //   }
  // })

  it('Burns token', async () => {
    const _token = parseEther('100')
    const tokenInWei = `${BigNumber.from(_token._hex).toBigInt()}`
    const _contrToken = parseEther('1000')
    const contrTokenInWei = `${BigNumber.from(_contrToken._hex).toBigInt()}`
    const hasTransferredToAnotherWallet = await token.transfer(walletTo.address, tokenInWei)
    await token.transfer(lokian.address, contrTokenInWei)

    token.connect(walletTo)
    lokian.connect(walletTo)
    if (hasTransferredToAnotherWallet) {

      const _price = parseEther('50')
      const priceInWei = `${BigNumber.from(_price._hex).toBigInt()}`

      const hasApproved = await token.approve(lokian.address, priceInWei) 

      if (hasApproved) {
        const tx = await lokian.burn(priceInWei)    
        const recpt = tx.wait()
        if (recpt?.status) expect(await token.balanceOf(walletTo.address)).to.equal(50)
      }
    
    }
  })

  // nft
  // it('Assigns initial contract nft balances', async () => {
  //   expect(await nft.balanceOf(lokian.address, 0)).to.equal(99)
  //   expect(await nft.balanceOf(lokian.address, 1)).to.equal(99)
  //   expect(await nft.balanceOf(lokian.address, 2)).to.equal(99)
  //   expect(await nft.balanceOf(lokian.address, 3)).to.equal(99)
  //   expect(await nft.balanceOf(lokian.address, 4)).to.equal(99)
  // })
  // it('Must be able to buy a potion', async () => {
  //   const _price = parseEther('50')
  //   const priceInWei = `${BigNumber.from(_price._hex).toBigInt()}`

  //   token.connect(walletTo)
  //   lokian.connect(walletTo)

  //   const hasApprovedOwner = await token.approve(walletTo.address, 1)
  //   const hasApproved = await token.approve(lokian.address, 1) // 1

  //   const contractNftBalance = nft.balanceOf(lokian.address, 0)
  //   const units = 1

  //   if (contractNftBalance >= units && hasApproved && hasApprovedOwner) {
  //     await lokian.buyItem(units, priceInWei, 0, '0x00')
  //     expect(await nft.balanceOf(walletTo.address, 0)).to.equal(1)
  //   }
  // })
})
