import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { Token } from '../components'

const TokenRoute = ({
  tokenBalance,
  swords,
  shields,
  healingPotions,
  manaPotions,
  magicPotions,
  // buyItemAmount,
  // handleBuyItemAmount,
  buyItem,
  disableBuyItemBtn,
  // burnAmount,
  burn,
  // handleBurn,
}) => {
  const [burnAmount, setBurnAmount] = useState('0')
  const [buyItemAmount, setBuyItemAmount] = useState('0')

  function handleBuyItemAmount(event: React.ChangeEvent<HTMLInputElement>) {
    setBuyItemAmount(event.target?.value)
  }

  function handleBurn(event: React.ChangeEvent<HTMLInputElement>) {
    setBurnAmount(event.target?.value)
  }

  return (
    <Route
      path="/token"
      element={
        <Token
          tokenBalance={tokenBalance}
          swords={swords}
          shields={shields}
          healingPotions={healingPotions}
          manaPotions={manaPotions}
          magicPotions={magicPotions}
          buyItemAmount={buyItemAmount}
          onHandleBuyItemAmount={handleBuyItemAmount}
          buyItemFunc={buyItem}
          disableBuyItemBtn={disableBuyItemBtn}
          burnAmount={burnAmount}
          burnFunc={burn}
          onHandleBurn={handleBurn}
        />
      }
    />
  )
}

export default TokenRoute
