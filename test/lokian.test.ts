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
  let amountInWei: string

  beforeEach(async () => {
    token = await deployContract(wallet, Token)
    nft = await deployContract(wallet, Nft)
    lokian = await deployContract(wallet, Lokian, [token.address, nft.address])
  })

  // beforeEach nft transfer from owner to contract
  beforeEach(async () => {
    const _amount = parseEther('10000')
    const _amountInWei = `${BigNumber.from(_amount._hex).toBigInt()}`
    amountInWei = _amountInWei

    await token.mint(wallet.address, amountInWei)
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
  it('Assigns token balance', async () => {
    // transfer tokens and nft to contract
    const hasApprovedOwner = await token.approve(wallet.address, amountInWei)
    const hasApproved = await token.approve(lokian.address, amountInWei)
    if (hasApprovedOwner && hasApproved) {
      await token.transferFrom(wallet.address, lokian.address, amountInWei)
      expect(await token.balanceOf(lokian.address)).to.equal(amountInWei)
    }
  })

  it('Deposits token', async () => {
    const hasApprovedOwner = await token.approve(wallet.address, 1)
    const hasApproved = await token.approve(lokian.address, 1)
    if (hasApprovedOwner && hasApproved) {
      await lokian.deposit(1)
      expect(await token.balanceOf(lokian.address)).to.equal(1)
    }
  })

  it('Withdraws token', async () => {
    await token.approve(wallet.address, 100)
    await token.approve(lokian.address, 100)
    const hasTransferred = await token.transferFrom(wallet.address, lokian.address, 100)
    if (hasTransferred) {
      await lokian.withdraw(100)
      expect(await token.balanceOf(lokian.address)).to.equal(0)
    }
  })

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
  it('Assigns nft balances', async () => {
    expect(await nft.balanceOf(lokian.address, 0)).to.equal(99)
    expect(await nft.balanceOf(lokian.address, 1)).to.equal(99)
    expect(await nft.balanceOf(lokian.address, 2)).to.equal(99)
    expect(await nft.balanceOf(lokian.address, 3)).to.equal(99)
    expect(await nft.balanceOf(lokian.address, 4)).to.equal(99)
  })
  it('Buys a potion', async () => {
    const _price = parseEther('50')
    const priceInWei = `${BigNumber.from(_price._hex).toBigInt()}`

    token.connect(walletTo)
    lokian.connect(walletTo)

    const hasApprovedOwner = await token.approve(walletTo.address, 1)
    const hasApproved = await token.approve(lokian.address, 1) // 1

    const contractNftBalance = nft.balanceOf(lokian.address, 0)
    const units = 1

    if (contractNftBalance >= units && hasApproved && hasApprovedOwner) {
      await lokian.buyItem(units, priceInWei, 0, '0x00')
      expect(await nft.balanceOf(walletTo.address, 0)).to.equal(1)
    }
  })
  it('Set item prices', async () => {
    const _potionPrice = parseEther('50')
    const potionPrice = `${BigNumber.from(_potionPrice._hex).toBigInt()}`
    const _eqptPrice = parseEther('50')
    const equipmentPrice = `${BigNumber.from(_eqptPrice._hex).toBigInt()}`
    await lokian.setItemPrices(potionPrice, equipmentPrice)
    expect(await lokian.potionsPrice()).to.equal(potionPrice)
    expect(await lokian.equipmentsPrice()).to.equal(equipmentPrice)
  })
  it('Create mons', async () => {
    // param = species, price, forSale
    await lokian.createMon(0, 0, false)
    await lokian.createMon(1, 0, false)
    // already created 9 mons upon deployment, so should equal 11
    expect(await lokian.totalMons()).to.equal(11)
  })
  it('Add mon for sale', async () => {
    const _price = parseEther('5')
    const price = `${BigNumber.from(_price._hex).toBigInt()}`
    await lokian.addForSale(0, price)
    const mon = await lokian.mons(0)
    const totalMons = await lokian.totalMons()
    expect(mon.id).to.be.lt(totalMons)
    expect(mon.forSale).to.be.true
    expect(mon.price).to.be.equal(price)
  })
  it('Remove mon for sale', async () => {
    const _price = parseEther('5')
    const price = `${BigNumber.from(_price._hex).toBigInt()}`
    await lokian.addForSale(0, price)
    const mon = await lokian.mons(0)
    const totalMons = await lokian.totalMons()
    expect(mon.owner).to.be.equal(wallet.address)
    expect(mon.id).to.be.lt(totalMons)
    const tx = await lokian.removeFromSale(mon.id)
    const recpt = tx.wait()
    if (recpt?.status) expect(mon.forSale).to.be.false
  })
  it('Buys a mon', async () => {
    const _price = parseEther('50')
    const price = `${BigNumber.from(_price._hex).toBigInt()}`
    await lokian.addForSale(0, price)
    const mon = await lokian.mons(0)
    const totalMons = await lokian.totalMons()
    expect(mon.id).to.be.lt(totalMons)
    expect(mon.forSale).to.be.true
    const _token = parseEther('100')
    const tokenInWei = `${BigNumber.from(_token._hex).toBigInt()}`
    const _fee = parseEther('50')
    const feeInWei = `${BigNumber.from(_fee._hex).toBigInt()}`
    const hasTransferredToAnotherWallet = await token.transfer(walletTo.address, tokenInWei)
    if (hasTransferredToAnotherWallet) {
      token.connect(walletTo)
      lokian.connect(walletTo)
      let overrides = { value: feeInWei }
      const tx = await lokian.buyMon(0, overrides)
      const recpt = tx.wait()
      if (recpt?.status) {
        expect(mon.forSale).to.be.false
        expect(mon.sharedTo).to.be.equal(walletTo.address)
        expect(mon.owner).to.be.equal(walletTo.address)
        expect(await token.balanceOf(walletTo.address)).to.be.equal(50)
      }
    }
  })
  it('Breed mons', async () => {
    const mon1 = await lokian.mons(0)
    const mon2 = await lokian.mons(1)
    const totalMons = await lokian.totalMons()
    expect(mon1.id).to.be.lt(totalMons)
    expect(mon2.id).to.be.lt(totalMons)
    expect(mon1.owner).to.be.equal(wallet.address)
    expect(mon1.owner).to.be.equal(mon2.owner)
    expect(mon1.id != mon2.id).to.be.true
    expect(mon1.forSale).to.be.false
    expect(mon2.forSale).to.be.false
    const tx = await lokian.breedMons(mon1.id, mon2.id)
    const recpt = tx.wait()
    if (recpt?.status) {
      const newTotalMons = await lokian.totalMons()
      expect(newTotalMons).to.be.equal(10)
    }
  })
  it('Fight mons', async () => {
    const _price = parseEther('50')
    const price = `${BigNumber.from(_price._hex).toBigInt()}`
    await lokian.addForSale(1, price)
    const mon = await lokian.mons(1)
    const monEnemy = await lokian.mons(4)
    const totalMons = await lokian.totalMons()
    const _token = parseEther('100')
    const tokenInWei = `${BigNumber.from(_token._hex).toBigInt()}`
    const _fee = parseEther('50')
    const feeInWei = `${BigNumber.from(_fee._hex).toBigInt()}`
    const hasTransferredToAnotherWallet = await token.transfer(walletTo.address, tokenInWei)
    if (hasTransferredToAnotherWallet) {
      token.connect(walletTo)
      lokian.connect(walletTo)
      let overrides = { value: feeInWei }
      const tx = await lokian.buyMon(1, overrides)
      const recpt = tx.wait()
      if (recpt?.status) {
        expect(mon.id).to.be.lt(totalMons)
        expect(monEnemy.id).to.be.lt(totalMons)
        expect(mon.forSale).to.be.false
        expect(monEnemy.forSale).to.be.false
        const tx = await lokian.fight(mon.id, monEnemy.id)
        const recpt = await tx.wait()
        if (recpt?.status) {
          lokian.on('FightResults', (_winnerId, _round) => {
            const winId = BigNumber.from(_winnerId._hex).toNumber()
            const round = BigNumber.from(_round._hex).toNumber()
            expect(winId).to.be.gt(0)
            expect(round).to.be.gt(0)
          })
        }
      }
    }
  })
  it('Start sharing mons', async () => {
    const mon = await lokian.mons(0)
    const totalMons = await lokian.totalMons()
    expect(mon.id).to.be.lt(totalMons)
    expect(mon.forSale).to.be.false
    expect(mon.owner).to.be.equal(wallet.address)
    const tx = await lokian.startSharing(0, walletTo.address)
    const recpt = tx.wait()
    if (recpt?.status) {
      expect(mon.sharedTo).to.be.equal(walletTo.address)
    }
  })
  it('Stop sharing mons', async () => {
    const mon = await lokian.mons(0)
    const tx = await lokian.startSharing(0, walletTo.address)
    const recpt = tx.wait()
    if (recpt?.status) {
      expect(mon.sharedTo).to.be.equal(walletTo.address)
      const tx2 = await lokian.stopSharing(0)
      const recpt2 = tx2.wait()
      if (recpt2?.status) {
        expect(mon.sharedTo).to.be.equal(wallet.address)
      }
    }
  })
})
