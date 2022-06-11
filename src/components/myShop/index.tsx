import React, { useState, useEffect } from 'react'
import { nameDiv, imgDiv, statDiv, removeFromSaleDiv } from '../common'
import ListRender from '../common/listRender'
import { Lokimon } from '../models'

const MyShop = ({ myCryptomons, isRemoveFromSaleLoading, removeFromSale }) => {
  const [display, setDisplay] = useState('grid')
  const [orderBy, setOrderBy] = useState(null)
  const [myLokimons, setMyLokimons] = useState(myCryptomons)

  return (
    <>
      <ListRender
        pageName={'My Shop'}
        onSetDisplay={(value: string) => setDisplay(value)}
        onSetOrder={(evtKey: string, e: any) => setOrderBy(evtKey)}
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

    </>
  )
}

export default MyShop
