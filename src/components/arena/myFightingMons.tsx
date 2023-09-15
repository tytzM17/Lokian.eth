import React from 'react'
import { nameDiv, imgDiv, statDiv } from '../common'
import { Lokimon } from '../../models'

const MyFightingMons = ({ mons, setFightChoiceFunc, account, choice }) => {
  const cond = (mon: Lokimon) =>
    (mon?.owner === account && !mon?.forSale) || (mon?.sharedTo === account && mon?.owner !== account)

  return (
    <>
      {mons &&
        mons.filter(cond).map((mon: Lokimon) => (
          <React.Fragment key={'my-fighting-mons-' + mon?.id || '-'}>
            <div className="mon">
              <figure className="my-figure">
                {nameDiv(mon)}
                {imgDiv(mon)}
                <figcaption>{statDiv(mon)}</figcaption>
              </figure>
              <div className="fight-choice-div">
                <button
                  className="fight-Choice-btn rpgui-button rpgui-cursor-point"
                  type="button"
                  onClick={() => {
                    setFightChoiceFunc(mon?.id)
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

export default MyFightingMons
