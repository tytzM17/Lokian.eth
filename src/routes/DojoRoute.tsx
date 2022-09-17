import React from 'react'
import { Route } from 'react-router-dom'
import { names } from '../components/common'
import Dojo from '../components/dojo'

const DojoRoute = ({
  account,
  fightChoice1,
  fightChoice2,
  setFightChoice1,
  setFightChoice2,
  cryptomons,
  myCryptomons,
  otherCryptomons,
  winner,
  fightTxDone,
  rewards,
  rounds,
  disableFightBtn,
  fight,
}) => {
  return (
    <Route
      path="/dojo"
      element={
        <Dojo
          myCryptomons={myCryptomons}
          account={account}
          setFightChoice1Func={setFightChoice1}
          setFightChoice2Func={setFightChoice2}
          otherCryptomons={otherCryptomons}
          cryptomons={cryptomons}
          fightChoice1={fightChoice1}
          fightChoice2={fightChoice2}
          winner={winner}
          monNames={names}
          fightTxDone={fightTxDone}
          rewards={rewards}
          rounds={rounds}
          disableFightBtn={disableFightBtn}
          fight={fight}
        />
      }
    />
  )
}

export default DojoRoute
