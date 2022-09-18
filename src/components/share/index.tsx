import React, { useState } from 'react'
import { nameDiv, imgDiv, statDiv } from '../common'
import Spinner from '../spinner'
import './share.css'
import { Row, Col } from 'react-bootstrap'
import { useStartSharing, useStopSharing } from '../../app-functions'
import { Lokimon } from '../../models'

const Share = ({ myCryptomons, account, library, refreshMons }) => {
  const [shareId, setShareId] = useState<string>('')
  const [shareAddress, setShareAddress] = useState('')

  const [isShareLoading, setIsShareLoading] = useState(false)
  const [isStopSharingLoading, setIsStopSharingLoading] = useState(false)

  const { startSharing } = useStartSharing(library, account, setIsShareLoading, refreshMons)
  const { stopSharing } = useStopSharing(library, account, setIsStopSharingLoading, refreshMons)

  function handleShareId(event: React.ChangeEvent<HTMLInputElement>) {
    setShareId(event.target?.value)
  }

  function handleShareAddress(event: React.ChangeEvent<HTMLInputElement>) {
    setShareAddress(event.target?.value)
  }

  return (
    <>
      <div className="p1-share green-glow">Share</div>

      <div className="rpgui-container framed-grey vs-container" style={{ marginTop: '24px', marginBottom: '48px' }}>
        <div className="form-line-share">
          <label className="form-label">Creature Id:</label>
          <input className="form-input" value={shareId} onChange={(e) => handleShareId(e)} />
        </div>
        <div className="form-line-share">
          <label className="form-label">Share to address:</label>
          <input className="form-input" value={shareAddress} onChange={(e) => handleShareAddress(e)} />
        </div>
        <div className="form-line-share">
          {isShareLoading ? (
            <button className="rpgui-button" type="button" style={{ width: '100%' }}>
              <Spinner color="#000" />
            </button>
          ) : (
            <button
              className="rpgui-button share-btn"
              type="button"
              onClick={() => startSharing(parseInt(shareId), shareAddress)}
            >
              Share
            </button>
          )}
        </div>
      </div>

      <div className="rpgui-container framed-grey table-container">
        <Row>
          <Col xs md={12}>
            <div style={{ textAlign: 'center' }}>Shared LokiMon</div>
          </Col>
        </Row>
        <Row>
          <Col xs md={12}>
            <div className="dojo-selection">
              {myCryptomons &&
                myCryptomons
                  .filter(
                    (mon: Lokimon) =>
                      mon.sharedTo.toLowerCase() !== account?.toString().toLocaleLowerCase() && !mon.forSale
                  )
                  .map((mon: Lokimon) => (
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
                              onClick={() => stopSharing(mon.id)}
                            >
                              Stop sharing
                            </button>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Share
