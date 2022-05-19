import React from 'react'
import { nameDiv, imgDiv, statDiv } from '../common'
import Spinner from '../spinner'

const Share = ({
  myCryptomons,
  shareId,
  onHandleShareId,
  onHandleShareAddress,
  shareAddress,
  isShareLoading,
  startSharingFunc,
  account,
  isStopSharingLoading,
  stopSharingFunc,
}) => {
  return (
    <>
      <div className="p1 green-glow">Sharing Management</div>

      <div className="sharing-area" style={{marginTop: '24px'}}>
        <div className="form-line">
          <label className="form-label">Creature Id:</label>
          <input className="form-input" value={shareId} onChange={(e) => onHandleShareId(e)} />
        </div>
        <div className="form-line">
          <label className="form-label">Share to address:</label>
          <input className="form-input" value={shareAddress} onChange={(e) => onHandleShareAddress(e)} />
        </div>
        <div className="form-line">
          {isShareLoading ? (
            <button className="rpgui-button" type="button" style={{ width: '100%' }}>
              <Spinner color="#000" />
            </button>
          ) : (
            <button
              className="rpgui-button"
              type="button"
              style={{ float: 'right' }}
              onClick={() => startSharingFunc(shareId, shareAddress)}
            >
              Share
            </button>
          )}
        </div>
      </div>

      {myCryptomons &&
        myCryptomons
          .filter((mon) => mon.sharedTo.toLowerCase() !== account?.toString().toLocaleLowerCase() && !mon.forSale)
          .map((mon) => (
            <React.Fragment key={mon.id}>
              <div className="mon">
                <figure className="my-figure">
                  {nameDiv(mon)}
                  {imgDiv(mon)}
                  <figcaption>{statDiv(mon)}</figcaption>
                </figure>
                <div className="sharing-div">
                  <div className="shareTo-owner">Shared to address: {mon.sharedTo} </div>
                  {isStopSharingLoading ? (
                    <button className="rpgui-button" type="button" style={{ width: '100%' }}>
                      <Spinner color="#000" />
                    </button>
                  ) : (
                    <button
                      className="stop-sharing-btn rpgui-button"
                      type="button"
                      style={{ float: 'right' }}
                      onClick={() => stopSharingFunc(mon.id)}
                    >
                      Stop sharing
                    </button>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
    </>
  )
}

export default Share
