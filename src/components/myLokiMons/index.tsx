import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import MonImages from '../../sprites-copy'
import { nameDiv, imgDiv, statDiv, addForSaleDiv, monName } from '../common'
import getMonsOrder from '../common/getMonsOrder'
import ListRender from '../common/listRender'
import { Lokimon } from '../../models'
import Spinner from '../spinner'
import './mylokimons.css'
import { useAddForSale } from '../../app-functions'

const MyLokiMons = ({ myCryptomons, contract, refreshMons }) => {
  const [display, setDisplay] = useState('grid')
  const [orderBy, setOrderBy] = useState(null)
  const [myLokimons, setMyLokimons] = useState(myCryptomons)
  const [price, setPrice] = useState(0)
  const [isAddForSaleLoading, setIsAddForSaleLoading] = useState<boolean>(false)

  const { addForSale } = useAddForSale(contract, setIsAddForSaleLoading, refreshMons)

  useEffect(() => {
    if (!myCryptomons) return
    setMyLokimons(myCryptomons)
  }, [myCryptomons])

  useEffect(() => {
    if (!orderBy) return
    const _lokimons = getMonsOrder(orderBy, myLokimons)
    setMyLokimons([..._lokimons])
  }, [orderBy])

  function handleChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
    const parsedValue = parseFloat(event?.target?.value) || 0
    setPrice(parsedValue)
  }


  return (
    <>
      <ListRender
        pageName={'My LokiMons'}
        onSetDisplay={(value: string) => setDisplay(value)}
        onSetOrder={(evtKey: string) => setOrderBy(evtKey)}
      />

      {display === 'grid' && (
        <div className="mylokimons-container">
          {myLokimons &&
            myLokimons
              .filter((mon: Lokimon) => !mon.forSale)
              .map((mon: Lokimon) => (
                <React.Fragment key={mon.id}>
                  <div className="mon">
                    <figure className="my-figure">
                      {nameDiv(mon)}
                      {imgDiv(mon)}
                      <figcaption>{statDiv(mon)}</figcaption>
                    </figure>
                    {addForSaleDiv(mon, price, handleChangePrice, isAddForSaleLoading, addForSale)}
                  </div>
                </React.Fragment>
              ))}
        </div>
      )}

      {display === 'list' && (
        <Table striped bordered hover variant="dark" responsive className="mylokimons-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Img</th>
              <th>Name</th>
              <th>Stats</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myLokimons &&
              myLokimons
                .filter((mon: Lokimon) => !mon.forSale)
                .map((mon: Lokimon) => (
                  <tr key={mon.id}>
                    <td>{mon?.id}</td>
                    <td>
                      {' '}
                      <div style={{ border: '2px solid gray', padding: '3px', borderRadius: '4px' }}>
                        <img
                          className="mylokimons-img"
                          src={MonImages[`${parseInt(mon?.species?.toString()) + 1}`]}
                          alt={mon?.species?.toString()}
                          height="45"
                          width="45"
                        />
                      </div>
                    </td>
                    <td>{monName(mon?.species) || ''} </td>
                    <td>{`HP ${mon?.hp}, ATK ${mon?.atk}, DEF ${mon?.def}, SPD ${mon?.speed}`}</td>
                    <td>
                      <input
                        type="number"
                        className="add-for-sale-input"
                        value={price}
                        onChange={(e) => {
                          // onHandlePriceChange(e)
                          handleChangePrice(e)
                        }}
                      />
                    </td>
                    <td>
                      <button
                        className="rpgui-button mylokimons-sell-btn"
                        type="button"
                        value={price}
                        onClick={() => addForSale(mon?.id, price)}
                      >
                        {isAddForSaleLoading ? <Spinner color="#000" /> : 'Sell'}
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default MyLokiMons
