import React, { useState, useEffect } from 'react'
import { nameDiv, imgDiv, statDiv, removeFromSaleDiv, monName } from '../common'
import getMonsOrder from '../common/getMonsOrder'
import ListRender from '../common/listRender'
import { Lokimon } from '../../models'
import { Table } from 'react-bootstrap'
import MonImages from '../../sprites-copy'
import Spinner from '../spinner'
import { formatUnits } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { useRemoveFromSale } from '../../app-functions'

const MyShop = ({ myCryptomons, contract, refreshMons, nativeTok = '' }) => {
  const [display, setDisplay] = useState('grid')
  const [orderBy, setOrderBy] = useState(null)
  const [myLokimons, setMyLokimons] = useState(myCryptomons)
  const [isRemoveFromSaleLoading, setIsRemoveFromSaleLoading] = useState(false)

  const { removeFromSale } = useRemoveFromSale(contract, setIsRemoveFromSaleLoading, refreshMons)

  useEffect(() => {
    if (!myCryptomons) return
    setMyLokimons(myCryptomons)
  }, [myCryptomons])

  useEffect(() => {
    if (!orderBy) return
    const _lokimons = getMonsOrder(orderBy, myCryptomons)
    setMyLokimons([..._lokimons])
  }, [orderBy])

  return (
    <>
      <ListRender
        pageName={'My Shop'}
        onSetDisplay={(value: string) => setDisplay(value)}
        onSetOrder={(evtKey: string) => setOrderBy(evtKey)}
      />

      {display === 'grid' && (
        <div className="mylokimons-container">
          {myCryptomons &&
            myCryptomons
              .filter((mon: Lokimon) => mon.forSale)
              .map((mon: Lokimon) => (
                <React.Fragment key={mon.id}>
                  <div className="mon">
                    <figure className="my-figure">
                      {nameDiv(mon)}
                      {imgDiv(mon)}
                      <figcaption>{statDiv(mon)}</figcaption>
                    </figure>
                    {removeFromSaleDiv(mon, isRemoveFromSaleLoading, removeFromSale)}
                  </div>
                </React.Fragment>
              ))}
        </div>
      )}

      {display === 'list' && (
        <Table striped bordered hover variant="dark" responsive className='mylokimons-table'>
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
                .filter((mon: Lokimon) => mon.forSale)
                .map((mon: Lokimon) => (
                  <tr key={mon.id}>
                    <td>{mon?.id}</td>
                    <td>
                      {' '}
                      <div style={{ border: '2px solid gray', padding: '3px', borderRadius: '4px' }}>
                        <img
                          className="mylokimons-img"
                          src={MonImages[`${mon.species + 1 || 0}`]}
                          alt={mon?.species?.toString() || 'none'}
                          height="45"
                          width="45"
                        />
                      </div>
                    </td>
                    <td>{monName(mon?.species) || ''} </td>
                    <td>{`HP ${mon?.hp}, ATK ${mon?.atk}, DEF ${mon?.def}, SPD ${mon?.speed}`}</td>
                    <td>{`${formatUnits(BigNumber.from(mon?.price || 0))} ${nativeTok}`}</td>
                    <td>
                      <button
                        className="rpgui-button mylokimons-sell-btn"
                        type="button"
                        onClick={() => (mon?.id ? removeFromSale(mon?.id) : null)}
                      >
                        {isRemoveFromSaleLoading ? <Spinner color="#000" /> : 'Delist'}
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

export default MyShop
