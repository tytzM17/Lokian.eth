import React from 'react'
import { nameDiv, imgDiv, statDiv, addForSaleDiv } from "../common";

const MyLokiMons = ({ myCryptomons, value, onHandleChange, isAddForSaleLoading, addForSale  }) => {
  return (
    <>
    <div className="p1 green-glow">My LokiMons</div>
    {
        myCryptomons && myCryptomons
            .filter((mon) => !mon.forSale)
            .map((mon) => (
              <React.Fragment key={mon.id}>
                <div className="mon">
                  <figure className="my-figure">
                    {nameDiv(mon)}
                    {imgDiv(mon)}
                    <figcaption>{statDiv(mon)}</figcaption>
                  </figure>
                  {addForSaleDiv(mon, value, onHandleChange, isAddForSaleLoading, addForSale )}
                </div>
              </React.Fragment>
            ))
    }
    </>
  )
}

export default MyLokiMons