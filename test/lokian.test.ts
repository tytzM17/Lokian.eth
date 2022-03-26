import { expect, use } from 'chai'
import { Contract } from 'ethers'
import { deployContract, MockProvider, solidity } from 'ethereum-waffle'
import Lokian from '../build/Cryptomons.json'
import Nft from '../build/LokianItems.json'
import Token from '../build/Lokians.json'

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

  beforeEach(async () => {
    await token.mint(wallet.address, 99999)
  })

  // beforeEach nft transfer from owner to contract 

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
  //   it('Assigns initial contract token balances', async () => {
  // await nft.safeTransferFrom(wallet, token, 0, '99000000000000000000', '0x00') // healing, 99
  // await nft.safeTransferFrom(wallet, token, 1, '99000000000000000000', '0x00') // mana, 99
  // await nft.safeTransferFrom(wallet, token, 2, '99000000000000000000', '0x00') // magic, 99
  // await nft.safeTransferFrom(wallet, token, 3, '99000000000000000000', '0x00') // sword, 99
  // await nft.safeTransferFrom(wallet, token, 4, '99000000000000000000', '0x00') // shield, 99

  // expect(await nft.balanceOf(lokian, 0)).to.equal(BigNumber.from('99000000000000000000')) // 99
  // expect(await nft.balanceOf(lokian, 1)).to.equal(BigNumber.from('99000000000000000000')) // 99
  // expect(await nft.balanceOf(lokian, 2)).to.equal(BigNumber.from('99000000000000000000')) // 99
  // expect(await nft.balanceOf(lokian, 3)).to.equal(BigNumber.from('99000000000000000000')) // 99
  // expect(await nft.balanceOf(lokian, 4)).to.equal(BigNumber.from('99000000000000000000')) // 99
  // })
  //   it('Must be able to buy a potion', async () => {
  // await lokian.buyItem(1, '50000000000000000000', 0, '0x00')
  // expect(await nft.balanceOf(wallet, 0)).to.equal(1)
  //   })
})
