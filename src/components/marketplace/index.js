import React from 'react'
import { Button, Col, Row, Dropdown } from 'react-bootstrap'
import { nameDiv, imgDiv, statDiv, buyDiv } from '../common'
import ListIcon from '../common/listIcon'
import GridIcon from '../common/gridIcon'
import './marketplace.css'

const Marketplace = ({ otherCryptomons, isBuyMonLoading, buyMon }) => {
  return (
    <>
      <div style={{ marginTop: '1.5em' }}>
        <Row>
          <Col xs sm={6}>
            <div className="p1 green-glow">Marketplace</div>
          </Col>
          <Col xs sm={6}>
            <Button className="display-style-btn" variant="outline-dark">
              <ListIcon />
            </Button>
            <Button className="display-style-btn" variant="outline-dark">
              <GridIcon />
            </Button>
            <Dropdown className="order-dropdown" onSelect={(ek, e) => console.log(ek,e)}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Order
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="pricehilo">By Price High-Low</Dropdown.Item>
                <Dropdown.Item eventKey="pricelohi">By Price Low-High</Dropdown.Item>
                <Dropdown.Item eventKey="idhilo">By ID High-Low</Dropdown.Item>
                <Dropdown.Item eventKey="idlohi">By ID Low-High </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      {otherCryptomons &&
        otherCryptomons
          .filter((mon) => mon.forSale)
          .map((mon) => (
            <React.Fragment key={mon.id}>
              <div className="mon">
                <figure className="my-figure">
                  {nameDiv(mon)}
                  {imgDiv(mon)}
                  <figcaption>{statDiv(mon)}</figcaption>
                </figure>
                {buyDiv(mon, isBuyMonLoading, buyMon)}
              </div>
            </React.Fragment>
          ))}
    </>
  )
}

export default Marketplace
