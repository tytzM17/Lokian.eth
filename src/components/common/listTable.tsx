import React from 'react'
import { Table } from "react-bootstrap";
import { monName } from '.';
import MonImages from '../../sprites-copy';
import Spinner from '../spinner';

const ListTable = ({ display, myLokimons, typeValue, onTypeHandleChange, isTypeLoading }) => {
  return (
    <>
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
                        value={typeValue}
                        onChange={(e) => onTypeHandleChange(mon?.id, e)}
                      />
                    </td>
                    <td>
                      <button className="rpgui-button" type="button" onClick={() => addForSale(mon?.id, value)}>
                        {isTypeLoading ? (
                          <button className="rpgui-button" type="button" style={{ width: '100%' }}>
                            <Spinner color="#000" />
                          </button>
                        ) : (
                          'Add for sale'
                        )}
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

export default ListTable