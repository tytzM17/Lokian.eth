import React from 'react'
import { Route } from 'react-router-dom'
import { MyShop } from '../components'

const MyShopRoute = ({ myCryptomons, isRemoveFromSaleLoading, removeFromSale, library }) => {
  return (
    <Route
      path="/myShop"
      element={
        <MyShop
          myCryptomons={myCryptomons}
          isRemoveFromSaleLoading={isRemoveFromSaleLoading}
          removeFromSale={removeFromSale}
          nativeTok={library?._network?.name}
        />
      }
    />
  )
}

export default MyShopRoute
