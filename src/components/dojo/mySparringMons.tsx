import React from 'react'
import { nameDiv, imgDiv, statDiv } from '../common'

const MySparringMons = ({ myCryptomons, setFightChoice1Func, account }) => {
  const cond = (mon) =>
    (mon.owner.toString().toLowerCase() === account?.toString()?.toLowerCase() && !mon.forSale) ||
    (mon.sharedTo.toString().toLowerCase() === account?.toString()?.toLowerCase() &&
      mon.owner.toString().toLowerCase() !== account?.toString()?.toLowerCase())

  return (
    <>
      {myCryptomons &&
        myCryptomons.filter(cond).map((mon) => (
          <React.Fragment key={mon.id}>
            <div className="mon">
              <figure className="my-figure">
                {nameDiv(mon)}
                {imgDiv(mon)}
                <figcaption>{statDiv(mon)}</figcaption>
              </figure>
              <div className="fight-choice-div">
                <button
                  className="fight-Choice-btn rpgui-button"
                  type="button"
                  style={{ float: 'right' }}
                  onClick={() => {
                    setFightChoice1Func(mon.id)
                  }}
                >
                  Choice 1
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  )
}

export default MySparringMons
