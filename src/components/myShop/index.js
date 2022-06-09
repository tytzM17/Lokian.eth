import React from 'react'
import { nameDiv, imgDiv, statDiv, removeFromSaleDiv } from '../common'
import ListRender from '../common/listRender'

const MyShop = ({ myCryptomons, isRemoveFromSaleLoading, removeFromSale }) => {
  return (
    <>
      <ListRender pageName={'My Shop'} />

      {myCryptomons &&
        myCryptomons
          .filter((mon) => mon.forSale)
          .map((mon) => (
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
    </>
  )
}

export default MyShop
