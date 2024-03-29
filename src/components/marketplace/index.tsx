import { formatUnits } from '@ethersproject/units'
import React, { useState, useEffect } from 'react'
import MonImages from '../../sprites-copy'
import { nameDiv, imgDiv, statDiv, buyDiv, monName } from '../common'
import getMonsOrder from '../common/getMonsOrder'
import ListRender from '../common/listRender'
import { Lokimon } from '../../models'
import Spinner from '../spinner'
import { Table } from 'react-bootstrap'
import './marketplace.css'
import { useBuyMon } from '../../app-functions'
import { BigNumber } from 'ethers'

const Marketplace = ({ otherCryptomons, contract, refreshMons, nativeTok = '' }) => {
  const [display, setDisplay] = useState('grid')
  const [orderBy, setOrderBy] = useState(null)
  const [otherLokimons, setOtherLokimons] = useState(otherCryptomons)
  const [isBuyMonLoading, setIsBuyMonLoading] = useState(false)

  const { buyMon } = useBuyMon(contract, setIsBuyMonLoading, refreshMons)

  useEffect(() => {
    if (!otherCryptomons) return
    setOtherLokimons(otherCryptomons)
  }, [otherCryptomons])

  useEffect(() => {
    if (!orderBy) return
    const _otherLokimons = getMonsOrder(orderBy, otherCryptomons)
    setOtherLokimons([..._otherLokimons])
  }, [orderBy])

  return (
    <>
      <ListRender
        pageName={'Marketplace'}
        onSetDisplay={(value: string) => setDisplay(value)}
        onSetOrder={(evtKey: string) => setOrderBy(evtKey)}
      />

      {display === 'grid' && (
        <div className="mylokimons-container">
          {otherLokimons &&
            otherLokimons
              .filter((mon: Lokimon) => mon.forSale)
              .map((mon: Lokimon) => (
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
            {otherLokimons &&
              otherLokimons
                .filter((mon: Lokimon) => !mon.forSale)
                .map((mon: Lokimon, idx: number) => (
                  <tr key={'market' + idx}>
                    <td>{mon?.id?.toString()}</td>
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
                        onClick={() => (mon?.id && mon?.price ? buyMon(mon?.id, mon?.price) : null)}
                      >
                        {isBuyMonLoading ? <Spinner color="#000" /> : 'Buy'}
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

export default Marketplace
