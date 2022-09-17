import React from 'react'
import { Route } from 'react-router-dom'
import { Breed } from '../components'

const BreedRoute = ({
  myCryptomons,
  isBreedMonLoading,
  breedMons,
  setBreedChoice1,
  setBreedChoice2,
  breedChoice1,
  breedChoice2,
}) => {
  return (
    <Route
      path="/breed"
      element={
        <Breed
          myCryptomons={myCryptomons}
          isBreedMonLoading={isBreedMonLoading}
          breedMons={breedMons}
          setBreedChoice1Func={setBreedChoice1}
          setBreedChoice2Func={setBreedChoice2}
          breedChoice1={breedChoice1}
          breedChoice2={breedChoice2}
        />
      }
    />
  )
}

export default BreedRoute
