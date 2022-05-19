import React from 'react'
import MonImages from '../../sprites-copy'
import { Container, Row, Col } from 'react-bootstrap'

const Token = ({
  tokenBalance,
  swords,
  shields,
  healingPotions,
  manaPotions,
  magicPotions,
  buyItemAmount,
  onHandleBuyItemAmount,
  buyItemFunc,
  disableBuyItemBtn,
  burnAmount,
  burnFunc,
  onHandleBurn,
}) => {
  return (
    <>
      <div className="p1 green-glow">Your Tokens</div>

      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Row>
              <Col lg={12} xl={12}>
                <div className="rpgui-container framed-grey">
                  <div className=""> {tokenBalance} Lokians </div>
                  <div className="" style={{ marginTop: '12px' }}>
                    Inventory
                    <Row style={{ marginTop: '12px' }}>
                      <Col>
                        {swords ? (
                          <div className="rpgui-icon sword"></div>
                        ) : (
                          <div className="rpgui-icon sword-slot"></div>
                        )}
                        {shields ? (
                          <div className="rpgui-icon shield"></div>
                        ) : (
                          <div className="rpgui-icon shield-slot"></div>
                        )}
                        {healingPotions || manaPotions || magicPotions ? (
                          <div className="rpgui-icon potion-red"></div>
                        ) : (
                          <div className="rpgui-icon potion-slot"></div>
                        )}
                      </Col>
                    </Row>
                    <div className="row">
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                          padding: '12px',
                        }}
                      >
                        <p>You have {`${swords}`} swords!</p>
                        <p>You have {`${shields}`} shields!</p>
                        <p>You have {`${healingPotions}`} healing potions!</p>
                        <p>You have {`${manaPotions}`} mana potions!</p>
                        <p>You have {`${magicPotions}`} magic potions!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={12} xl={12}>
                <div className="rpgui-container framed-grey">
                  <div className="">Give to the skellies (burn token)</div>
                  {/* <div className="">note: if transaction fails, set gas fees above 100k</div> */}
                  <div className="skellies">
                    <img className="monImg" src={MonImages['skelly']} alt="skeleton-people-1" />
                    <img className="monImg" src={MonImages['skelly2']} alt="skeleton-people-1" />
                    <img className="monImg" src={MonImages['skellyrip']} alt="skeleton-people-1" />
                  </div>
                  <div className="" style={{display:'flex', justifyContent:'center', alignItems: 'end'}}>
                    <div className="form-line with-burn">
                      <label className="form-label">Amount</label>
                      <input
                        className="form-input"
                        placeholder="0"
                        value={burnAmount}
                        onChange={(e) => onHandleBurn(e)}
                      />
                    </div>
                    <div className="form-line with-burn">
                      <button
                        className="rpgui-button token-input-btn"
                        type="button"
                        onClick={() => burnFunc(burnAmount)}
                        disabled={disableBuyItemBtn}
                      >
                        Give
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="rpgui-container framed-grey">
              <div className="p1">Buy somethin (NFT)</div>
              <div className="p1">note: if transaction fails, set gas fees above 100k</div>
              <div className="sharing-area">
                <span>
                  <div className="rpgui-icon sword"></div> A Sword (500 Loks)
                </span>
                <div className="form-line with-buy-item">
                  <label className="form-label">Amount</label>
                  <input
                    className="form-input"
                    placeholder="0"
                    value={buyItemAmount}
                    onChange={(e) => onHandleBuyItemAmount(e)}
                  />
                </div>
                <div className="form-line with-buy-item">
                  <button
                    className="rpgui-button"
                    type="button"
                    style={{ float: 'right' }}
                    onClick={() => buyItemFunc(buyItemAmount, '500', '3')}
                    disabled={disableBuyItemBtn}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div className="sharing-area">
                <span>
                  <div className="rpgui-icon shield"></div> A Shield (500 Loks)
                </span>
                <div className="form-line with-buy-item">
                  <label className="form-label">Amount</label>
                  <input
                    className="form-input"
                    placeholder="0"
                    value={buyItemAmount}
                    onChange={(e) => onHandleBuyItemAmount(e)}
                  />
                </div>
                <div className="form-line with-buy-item">
                  <button
                    className="rpgui-button"
                    type="button"
                    style={{ float: 'right' }}
                    onClick={() => buyItemFunc(buyItemAmount, '500', '4')}
                    disabled={disableBuyItemBtn}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div className="sharing-area">
                <span>
                  <div className="rpgui-icon potion-red"></div>A Healing Potion (50 Loks)
                </span>
                <div className="form-line with-buy-item">
                  <label className="form-label">Amount</label>
                  <input
                    className="form-input"
                    placeholder="0"
                    value={buyItemAmount}
                    onChange={(e) => onHandleBuyItemAmount(e)}
                  />
                </div>
                <div className="form-line with-buy-item">
                  <button
                    className="rpgui-button"
                    type="button"
                    style={{ float: 'right' }}
                    onClick={() => buyItemFunc(buyItemAmount, '50', '0')}
                    disabled={disableBuyItemBtn}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div className="sharing-area">
                <span>
                  <div className="rpgui-icon potion-blue"></div> A Mana Potion (50 Loks)
                </span>
                <div className="form-line with-buy-item">
                  <label className="form-label">Amount</label>
                  <input
                    className="form-input"
                    placeholder="0"
                    value={buyItemAmount}
                    onChange={(e) => onHandleBuyItemAmount(e)}
                  />
                </div>
                <div className="form-line with-buy-item">
                  <button
                    className="rpgui-button"
                    type="button"
                    style={{ float: 'right' }}
                    onClick={() => buyItemFunc(buyItemAmount, '50', '1')}
                    disabled={disableBuyItemBtn}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div className="sharing-area">
                <span>
                  <div className="rpgui-icon potion-green"></div> A Magic Potion (50 Loks)
                </span>
                <div className="form-line with-buy-item">
                  <label className="form-label">Amount</label>
                  <input
                    className="form-input"
                    placeholder="0"
                    value={buyItemAmount}
                    onChange={(e) => onHandleBuyItemAmount(e)}
                  />
                </div>
                <div className="form-line with-buy-item">
                  <button
                    className="rpgui-button"
                    type="button"
                    style={{ float: 'right' }}
                    onClick={() => buyItemFunc(buyItemAmount, '50', '2')}
                    disabled={disableBuyItemBtn}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Token
