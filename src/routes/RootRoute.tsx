import React from 'react'
import { Route } from 'react-router-dom'
import { MyLokiMons } from '../components'

const RootRoute = ({ myCryptomons, isAddForSaleLoading, addForSale }) => {
  return (
    <Route
      path="/"
      element={
        <MyLokiMons
          myCryptomons={myCryptomons}
          isAddForSaleLoading={isAddForSaleLoading}
          addForSale={(id: number, price: number) => addForSale(id, price)}
        />
      }
    />
  )
}

export default RootRoute