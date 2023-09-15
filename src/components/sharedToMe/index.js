import React, {useState} from 'react'
import { nameDiv, imgDiv, statDiv } from '../common'
import Spinner from '../spinner'
import { Row, Col } from 'react-bootstrap'
import './sharedToMe.css'
import { useStopSharing } from '../../app-functions'

const SharedToMe = ({ otherCryptomons, account, library , refreshMons }) => {
  const [isStopSharingLoading, setIsStopSharingLoading] = useState(false)
  const { stopSharing } = useStopSharing(library, account, setIsStopSharingLoading, refreshMons)

  return (
    <>
      <div className="p1-shared-to-u green-glow">Shared To Me</div>

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
                              onClick={() => stopSharing(mon?.id)}
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
