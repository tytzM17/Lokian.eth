import React from 'react'
import { nameDiv, imgDiv, statDiv } from '../common'

const MySparringMons = ({ mons, setFightChoiceFunc, account, choice }) => {
  const yourLokimonsCond = (mon) =>
    (mon.owner.toString().toLowerCase() === account?.toString()?.toLowerCase() && !mon.forSale) ||
    (mon.sharedTo.toString().toLowerCase() === account?.toString()?.toLowerCase() &&
      mon.owner.toString().toLowerCase() !== account?.toString()?.toLowerCase())

  const opponentCond = (mon) => !mon.forSale && mon.sharedTo.toLowerCase() !== account?.toString().toLowerCase()
  
  let cond = choice === '1' ? yourLokimonsCond : opponentCond

  return (
    <>
      {mons &&
        mons.filter(cond).map((mon) => (
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
                  // style={{ float: 'right' }}
                  onClick={() => {
                    setFightChoiceFunc(mon.id)
                  }}
                >
                  Choice {choice}
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  )
}

export default MySparringMons
