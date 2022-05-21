import React from 'react'
import MonImages from '../../sprites'
import { Container, Row, Col } from 'react-bootstrap'
import './token.css'
import NftItem from './nftItem'

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
      <div className="p1 green-glow" style={{display:'flex', justifyContent: 'center'}}>Your Tokens</div>

      <Container style={{ marginTop: '24px' }}>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Row>
              <Col lg={12} xl={12}>
                <div className="rpgui-container framed-grey">
                  <span style={{ fontSize: '1.5em' }}> {tokenBalance} </span>Lokians
                </div>
              </Col>
              <Col lg={12} xl={12}>
                <div className="rpgui-container framed-grey">
                  <div className="" style={{ marginTop: '12px' }}>
                    <span>Inventory</span>
                    <Row style={{ marginTop: '12px' }}>
                      <Col>
                        {swords && <NftItem item={swords} icon="sword" slot="weapon-slot" />}
                        {shields && <NftItem item={shields} icon="shield" slot="shield-slot" />}
                        {healingPotions && <NftItem item={healingPotions} icon="potion-red" slot="potion-slot" />}
                        {manaPotions && <NftItem item={manaPotions} icon="potion-blue" slot="potion-slot" />}
                        {magicPotions && <NftItem item={magicPotions} icon="potion-green" slot="potion-slot" />}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={12} xl={12}>
                <div className="rpgui-container framed-grey">
                  <span>Give to the skellies </span> burn token
                  {/* <div className="">note: if transaction fails, set gas fees above 100k</div> */}
                  <div className="skellies">
                    <img className="monImg" src={MonImages['skelly']} alt="skeleton-people-1" />
                    <img className="monImg" src={MonImages['skelly2']} alt="skeleton-people-1" />
                    <img className="monImg" src={MonImages['skellyrip']} alt="skeleton-people-1" />
                  </div>
                  <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
                    <div className="form-line with-burn">
                      <label className="form-label">Units</label>
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
              <div className="p1" style={{ marginBottom: '24px' }}>
                Buy Items (NFT)
              </div>
              <div className="sharing-area">
                <span>
                  <div className="rpgui-icon sword"></div> Sword
                </span>{' '}
                500 Loks
                <div className="buy-item-input-container">
                  <div className="with-buy-item-input">
                    <label className="form-label">Units</label>
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => onHandleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
                    <button
                      className="rpgui-button token-input-btn"
                      type="button"
                      onClick={() => buyItemFunc(buyItemAmount, '500', '3')}
                      disabled={disableBuyItemBtn}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>

              <div className="sharing-area" style={{ marginTop: '24px' }}>
                <span>
                  <div className="rpgui-icon shield"></div> Shield
                </span>{' '}
                500 Loks
                <div className="buy-item-input-container">
                  <div className="with-buy-item-input">
                    <label className="form-label">Units</label>
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => onHandleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
                    <button
                      className="rpgui-button token-input-btn"
                      type="button"
                      onClick={() => buyItemFunc(buyItemAmount, '500', '4')}
                      disabled={disableBuyItemBtn}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>

              <div className="sharing-area" style={{ marginTop: '24px' }}>
                <span>
                  <div className="rpgui-icon potion-red"></div>Healing Potion
                </span>{' '}
                50
                <div className="buy-item-input-container">
                  <div className="with-buy-item-input">
                    <label className="form-label">Units</label>
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => onHandleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
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
              </div>

              <div className="sharing-area" style={{ marginTop: '24px' }}>
                <span>
                  <div className="rpgui-icon potion-blue"></div>Mana Potion
                </span>{' '}
                50
                <div className="buy-item-input-container">
                  <div className="with-buy-item-input">
                    <label className="form-label">Units</label>
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => onHandleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
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
              </div>

              <div className="sharing-area" style={{ marginTop: '24px' }}>
                <span>
                  <div className="rpgui-icon potion-green"></div>Magic Potion
                </span>{' '}
                50
                <div className="buy-item-input-container">
                  <div className="with-buy-item-input">
                    <label className="form-label">Units</label>
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => onHandleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
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
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Token
