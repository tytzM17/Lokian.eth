import React from 'react'
import { Route } from 'react-router-dom'
import { Share } from '../components'

const ShareRoute = ({
  myCryptomons,
  shareId,
  handleShareAddress,
  handleShareId,
  shareAddress,
  isShareLoading,
  startSharing,
  account,
  isStopSharingLoading,
  stopSharing,
}) => {
  return (
    <Route
      path="/share"
      element={
        <Share
          myCryptomons={myCryptomons}
          shareId={shareId}
          onHandleShareAddress={handleShareAddress}
          onHandleShareId={handleShareId}
          shareAddress={shareAddress}
          isShareLoading={isShareLoading}
          startSharingFunc={startSharing}
          account={account}
          isStopSharingLoading={isStopSharingLoading}
          stopSharingFunc={stopSharing}
        />
      }
    />
  )
}

export default ShareRoute
