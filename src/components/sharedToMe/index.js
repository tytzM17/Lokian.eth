import React from 'react'
import { nameDiv, imgDiv, statDiv } from '../common'
import Spinner from '../spinner'
import { Row, Col } from "react-bootstrap";

const SharedToMe = ({ otherCryptomons, account, isStopSharingLoading, stopSharingFunc }) => {
  return (
    <>
      <div className="p1A p1-shared-to-u green-glow">Shared To You</div>

      <div className="rpgui-container framed-grey table-container">
        <Row>
          <Col xs md={12}>
            <div className="dojo-selection">
              {otherCryptomons &&
                otherCryptomons
                  .filter((mon) => mon?.sharedTo === account)
                  .map((mon) => (
                    <React.Fragment key={mon?.id}>
                      <div className="mon">
                        <figure className="my-figure">
                          {nameDiv(mon)}
                          {imgDiv(mon)}
                          <figcaption>{statDiv(mon)}</figcaption>
                        </figure>
                        <div className="sharing-div">
                          <label className="shared-owner">Creature Owner: {mon?.owner} </label>
                          {isStopSharingLoading ? (
                            <button className="rpgui-button" type="button" style={{ width: '100%' }}>
                              <Spinner color="#000" />
                            </button>
                          ) : (
                            <button
                              className="stop-sharing-btn rpgui-button"
                              type="button"
                              style={{ float: 'right' }}
                              onClick={() => stopSharingFunc(mon?.id)}
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

export default SharedToMe
