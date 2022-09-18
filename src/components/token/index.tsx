import React, { useState } from 'react'
import MonImages from '../../sprites-copy'
import { Container, Row, Col } from 'react-bootstrap'
import './token.css'
import NftItem from './nftItem'
import { useBurn, useBuyItem } from '../../app-functions'
import { useItemsFromNFT } from '../../hooks'

const Token = ({
  tokenBalance,
  library,
  account,
  refreshMons,
}) => {
  const [burnAmount, setBurnAmount] = useState('0')
  const [buyItemAmount, setBuyItemAmount] = useState('0')
  const [disableBuyItemBtn, setDisableBuyItemBtn] = useState(false)

  const { buyItem } = useBuyItem(library, account, setDisableBuyItemBtn, refreshMons)
  const { burn } = useBurn(library, account, setDisableBuyItemBtn, refreshMons)

  // Get items from nft contract
  const { healingPotions, magicPotions, manaPotions, swords, shields } = useItemsFromNFT({
    library,
    account,
    disableBuyItemBtn,
  })

  function handleBuyItemAmount(event: React.ChangeEvent<HTMLInputElement>) {
    setBuyItemAmount(event.target?.value)
  }

  function handleBurn(event: React.ChangeEvent<HTMLInputElement>) {
    setBurnAmount(event.target?.value)
  }

  return (
    <>
      <div className="p1-token green-glow">Your Tokens</div>

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
                    <span className="titles-token">Inventory</span>
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
                  <span className="titles-token">Give to the skellies </span> burn token
                  <div className="skellies">
                    <img className="monImg" src={MonImages['skelly']} alt="skeleton-people-1" />
                    <img className="monImg" src={MonImages['skelly2']} alt="skeleton-people-1" />
                    <img className="monImg" src={MonImages['skellyrip']} alt="skeleton-people-1" />
                  </div>
                  <div className="give-to-skellies-input-btn">
                    <div className="form-line with-burn burn-input">
                      <input
                        className="form-input"
                        placeholder="0"
                        value={burnAmount}
                        onChange={(e) => handleBurn(e)}
                      />
                    </div>
                    <div className="form-line with-burn burn-btn">
                      <button
                        className="rpgui-button token-input-btn"
                        type="button"
                        onClick={() => burn(burnAmount)}
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
              <div className="" style={{ marginBottom: '24px' }}>
                <span className="titles-token">Buy Items (NFT)</span>
              </div>
              <div className="sharing-area">
                <div style={{ marginBottom: '24px' }}>Equipment</div>
                <span className="item-label">
                  <div className="rpgui-icon sword"></div> Sword
                </span>{' '}
                500
                <div className="buy-item-input-container">
                  <div className="with-buy-item-input">
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => handleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
                    <button
                      className="rpgui-button token-input-btn"
                      type="button"
                      onClick={() => buyItem(buyItemAmount, '500', '3')}
                      disabled={disableBuyItemBtn}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>

              <div className="sharing-area" style={{ marginTop: '24px' }}>
                <span className="item-label">
                  <div className="rpgui-icon shield"></div> Shield
                </span>{' '}
                500
                <div className="buy-item-input-container">
                  <div className="with-buy-item-input">
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => handleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
                    <button
                      className="rpgui-button token-input-btn"
                      type="button"
                      onClick={() => buyItem(buyItemAmount, '500', '4')}
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
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => handleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
                    <button
                      className="rpgui-button token-input-btn"
                      type="button"
                      style={{ float: 'right' }}
                      onClick={() => buyItem(buyItemAmount, '50', '0')}
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
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => handleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
                    <button
                      className="rpgui-button token-input-btn"
                      type="button"
                      style={{ float: 'right' }}
                      onClick={() => buyItem(buyItemAmount, '50', '1')}
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
                    <input
                      className="form-input"
                      placeholder="0"
                      value={buyItemAmount}
                      onChange={(e) => handleBuyItemAmount(e)}
                    />
                  </div>
                  <div className="with-buy-item">
                    <button
                      className="rpgui-button token-input-btn"
                      type="button"
                      style={{ float: 'right' }}
                      onClick={() => buyItem(buyItemAmount, '50', '2')}
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
