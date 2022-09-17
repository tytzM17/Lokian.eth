import React from 'react'
import { Route } from 'react-router-dom'
import { SharedToMe } from '../components'

const SharedToMeRoute = ({ otherCryptomons, account, isStopSharingLoading, stopSharing }) => {
  return (
    <Route
      path="/sharedToMe"
      element={
        <SharedToMe
          otherCryptomons={otherCryptomons}
          account={account}
          isStopSharingLoading={isStopSharingLoading}
          stopSharingFunc={stopSharing}
        />
      }
    />
  )
}

export default SharedToMeRoute
