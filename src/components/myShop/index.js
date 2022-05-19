import React from 'react'
import { nameDiv, imgDiv, statDiv, removeFromSaleDiv } from '../common'

const MyShop = ({ myCryptomons, isRemoveFromSaleLoading, removeFromSale }) => {
  return (
    <>
      <div className="p1 green-glow">My Shop</div>
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
