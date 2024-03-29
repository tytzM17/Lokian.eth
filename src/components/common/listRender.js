import React from 'react'
import { Button, Col, Dropdown } from 'react-bootstrap'
import ListIcon from '../common/listIcon'
import GridIcon from '../common/gridIcon'
import './common.css'

const ListRender = ({ pageName, onSetDisplay, onSetOrder }) => {
  return (
    <div className="list-render">
      <div>
        <Col xs sm={6} md={12}>
          <div className="p1 p1-for-centering green-glow">{pageName}</div>
        </Col>
        <Col
          xs
          sm={6}
          md={12}
          className={
            pageName === 'My LokiMons' || pageName === 'My Shop' || pageName === 'Marketplace'
              ? 'col-for-mylokimons'
              : 'col-for-centering'
          }
        >
          <Button
            className="display-style-btn"
            variant="outline-dark"
            onClick={() => {
              if (onSetDisplay) {
                onSetDisplay('list')
              }
            }}
          >
            <ListIcon />
          </Button>
          <Button
            className="display-style-btn"
            variant="outline-dark"
            onClick={() => {
              if (onSetDisplay) {
                onSetDisplay('grid')
              }
            }}
          >
            <GridIcon />
          </Button>
          <Dropdown
            className="order-dropdown"
            onSelect={(evtK, e) => {
              if (onSetOrder) onSetOrder(evtK, e)
            }}
          >
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Order
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {pageName === 'My LokiMons' && (
                <>
                  <Dropdown.Item eventKey="nameAZ">By Name A-Z</Dropdown.Item>
                  <Dropdown.Item eventKey="nameZA">By Name Z-A</Dropdown.Item>
                </>
              )}
              {(pageName === 'Marketplace' || pageName === 'My Shop') && (
                <>
                  <Dropdown.Item eventKey="priceDesc">By Price High-Low</Dropdown.Item>
                  <Dropdown.Item eventKey="priceAsc">By Price Low-High</Dropdown.Item>
                </>
              )}

              <Dropdown.Item eventKey="idDesc">By ID Descending</Dropdown.Item>
              <Dropdown.Item eventKey="idAsc">By ID Ascending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </div>
    </div>
  )
}

export default ListRender
