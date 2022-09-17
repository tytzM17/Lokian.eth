import React from 'react'
import { Route } from 'react-router-dom'
import { MyLokiMons } from '../components'

const MyLokiMonsRoute = ({ myCryptomons, isAddForSaleLoading, addForSale }) => {
  return (
    <Route
      path="/myLokiMons"
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

export default MyLokiMonsRoute
