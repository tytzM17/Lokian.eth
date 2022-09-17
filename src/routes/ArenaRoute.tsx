import React, { createContext, useState } from 'react'
import { Route } from 'react-router-dom'
import { ArenaV2 } from '../components'
import Room from '../components/arena/room'
import { names } from '../components/common'
import { RoomType } from '../components/common/interfaces'

const ArenaRoute = ({
  // WsContext,
  // ws,
  // setWs,
  account,
  // startedRoom,
  // setStartedRoom,
  // otherPlayerReady,
  // setOtherPlayerReady,
  // acceptedAndReadyPlayer,
  // setAcceptedAndReadyPlayer,
  fightChoice1,
  fightChoice2,
  setFightChoice1,
  setFightChoice2,
  cryptomons,
}) => {
  const WsContext = createContext(null)
  const [ws, setWs] = useState(null)
  const [startedRoom, setStartedRoom] = useState(null)
  const [otherPlayerReady, setOtherPlayerReady] = useState(null)
  const [acceptedAndReadyPlayer, setAcceptedAndReadyPlayer] = useState(false)

  return (
    <Route
      path="/arena"
      element={
        <WsContext.Provider value={ws}>
          <ArenaV2
            onSetWs={(ws: object) => setWs(ws)}
            account={account}
            hasStartedRoom={startedRoom}
            onStartedRoom={(value: RoomType) => {
              setStartedRoom(value)
            }}
            otherPlayerReady={otherPlayerReady}
            isAcceptedAndReadyPlayer={(state: boolean) => setAcceptedAndReadyPlayer(state)}
          />
        </WsContext.Provider>
      }
    >
      <Route
        path={'/arena/room/:code'}
        element={
          <Room
            room={startedRoom}
            onDisconnect={(room: RoomType) => {
              setStartedRoom(room)
            }}
            account={account}
            fightChoice1={fightChoice1}
            fightChoice2={fightChoice2}
            setFightChoice1Func={setFightChoice1}
            setFightChoice2Func={setFightChoice2}
            cryptomons={cryptomons}
            monNames={names}
            acceptedAndReadyPlayer={acceptedAndReadyPlayer}
            onOtherPlayerReady={(room: RoomType, otherPlayer: string) => {
              setOtherPlayerReady({ room, otherPlayer })
            }}
          />
        }
      />
    </Route>
  )
}

export default ArenaRoute
