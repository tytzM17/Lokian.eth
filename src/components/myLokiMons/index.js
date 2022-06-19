import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import MonImages from '../../sprites-copy'
import { nameDiv, imgDiv, statDiv, addForSaleDiv, monName } from '../common'
import ListRender from '../common/listRender'
import Spinner from '../spinner'
import './mylokimons.css'

const MyLokiMons = ({ myCryptomons, value, onHandleChange, isAddForSaleLoading, addForSale }) => {
  const [display, setDisplay] = useState('grid')
  const [orderBy, setOrderBy] = useState(null)
  const [myLokimons, setMyLokimons] = useState(myCryptomons)

  useEffect(() => {
    if (!myCryptomons) return
    setMyLokimons(myCryptomons)
  }, [myCryptomons])

  const getMonsOrder = (_orderBy) => {
    if (!_orderBy || !myLokimons) return

    let lokimons = myLokimons

    switch (_orderBy) {
      case 'nameAZ':
        lokimons.sort((a, b) => {
          const speciesA1 = monName(a.species).toLowerCase()
          const speciesB1 = monName(b.species).toLowerCase()
          if (speciesA1 == speciesB1) return 0
          return speciesA1 < speciesB1 ? -1 : 1
        })
        break
      case 'nameZA':
        lokimons.sort((a, b) => {
          const speciesA2 = monName(a.species).toLowerCase()
          const speciesB2 = monName(b.species).toLowerCase()
          if (speciesA2 == speciesB2) return 0
          return speciesB2 < speciesA2 ? -1 : 1
        })
        break
      case 'idDesc':
        lokimons.sort((a, b) => b.id - a.id)
        break
      case 'idAsc':
        lokimons.sort((a, b) => a.id - b.id)
        break
      // case 'priceDesc':
      //   lokimons.sort((a, b) => b.price - a.price)
      //   break;
      // case 'priceAsc':
      //   lokimons.sort((a, b) => a.price - b.price)
      //   break;
      default:
        lokimons.sort((a, b) => {
          const speciesA3 = monName(a.species).toLowerCase()
          const speciesB3 = monName(b.species).toLowerCase()
          if (speciesA3 == speciesB3) return 0
          return speciesA3 < speciesB3 ? -1 : 1
        })
        break
    }

    return lokimons
  }

  useEffect(() => {
    if (!orderBy) return
    const _lokimons = getMonsOrder(orderBy)
    setMyLokimons([..._lokimons])
  }, [orderBy])

  return (
    <>
      <ListRender
        pageName={'My LokiMons'}
        onSetDisplay={(value) => setDisplay(value)}
        onSetOrder={(evtKey, e) => setOrderBy(evtKey)}
      />

      {display === 'grid' && (
        <div className="mylokimons-container">
          {myLokimons &&
            myLokimons
              .filter((mon) => !mon.forSale)
              .map((mon) => (
                <React.Fragment key={mon.id}>
                  <div className="mon">
                    <figure className="my-figure">
                      {nameDiv(mon)}
                      {imgDiv(mon)}
                      <figcaption>{statDiv(mon)}</figcaption>
                    </figure>
                    {addForSaleDiv(mon, value, onHandleChange, isAddForSaleLoading, addForSale)}
                  </div>
                </React.Fragment>
              ))}
        </div>
      )}

      {display === 'list' && (
        <Table striped bordered hover variant="dark" responsive>
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
                .filter((mon) => !mon.forSale)
                .map((mon) => (
                  <tr key={mon.id}>
                    <td>{mon?.id}</td>
                    <td>
                      {' '}
                      <div style={{ border: '2px solid gray', padding: '3px', borderRadius: '4px' }}>
                        <img
                          className=""
                          src={MonImages[`${parseInt(mon?.species) + 1}`]}
                          alt={mon?.species}
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
                        value={value}
                        onChange={(e) => onHandleChange(mon?.id, e)}
                      />
                    </td>
                    <td>
                      <button
                        className="rpgui-button"
                        type="button"
                        onClick={() => (mon?.id ? addForSale(mon?.id, value) : null)}
                      >
                        {isAddForSaleLoading ? <Spinner color="#000" /> : 'Add for sale'}
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
