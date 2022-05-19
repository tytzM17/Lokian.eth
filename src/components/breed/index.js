import React from 'react'
import { nameDiv, imgDiv, statDiv, breedOption, breedDiv } from '../common'
import Spinner from '../spinner'

const Breed = ({
  myCryptomons,
  breedChoice1,
  breedChoice2,
  isBreedMonLoading,
  breedMons,
  setBreedChoice1Func,
  setBreedChoice2Func,
}) => {
  return (
    <>
      <div className="p1 green-glow">Breed</div>
      <div className="breeding-area">
        {breedOption(breedChoice1)}
        {breedOption(breedChoice2)}
        {isBreedMonLoading ? (
          <button className="rpgui-button" type="button" style={{ width: '100%' }}>
            <Spinner color="#000" />
          </button>
        ) : (
          <button
            className="rpgui-button"
            type="button"
            style={{ width: '420px' }}
            onClick={() => breedMons(breedChoice1, breedChoice2)}
          >
            Breed choosen creatures
          </button>
        )}
      </div>
      {myCryptomons &&
        myCryptomons
          .filter((mon) => !mon.forSale)
          .map((mon) => (
            <React.Fragment key={mon?.id}>
              <div className="mon">
                <figure className="my-figure">
                  {nameDiv(mon)}
                  {imgDiv(mon)}
                  <figcaption>{statDiv(mon)}</figcaption>
                </figure>
                {breedDiv(mon, setBreedChoice1Func, setBreedChoice2Func)}
              </div>
            </React.Fragment>
          ))}
    </>
  )
}

export default Breed
