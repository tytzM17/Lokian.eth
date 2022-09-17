import React from 'react'
import { Route } from 'react-router-dom'
import { Marketplace } from '../components'

const MarketplaceRoute = ({ otherCryptomons, isBuyMonLoading, buyMon, library }) => {
  return (
    <Route
      path="/marketplace"
      element={
        <Marketplace
          otherCryptomons={otherCryptomons}
          isBuyMonLoading={isBuyMonLoading}
          buyMon={buyMon}
          nativeTok={library?._network?.name}
        />
      }
    />
  )
}

export default MarketplaceRoute
