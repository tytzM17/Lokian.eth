import React, { useState, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ArenaV2, Dojo, Breed, Marketplace, MyLokiMons, MyShop, Share, SharedToMe, Spinner, Token } from './components'
import Room from './components/arena/room'
import { RoomType } from './components/common/interfaces'

const MenuRoutes = ({ commonRouteProps, fightRouteProps }) => {
  // arena
  // const WsContext = createContext(null)
  // const [ws, setWs] = useState(null)
  const [startedRoom, setStartedRoom] = useState(null)
  // const [otherPlayerReady, setOtherPlayerReady] = useState(null)
  // const [acceptedAndReadyPlayer, setAcceptedAndReadyPlayer] = useState(false)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MyLokiMons
            myCryptomons={commonRouteProps.myCryptomons}
            contract={commonRouteProps.mainContract}
            refreshMons={commonRouteProps.refreshMons}
          />
        }
      />
      <Route
        path="/myLokiMons"
        element={
          <MyLokiMons
            myCryptomons={commonRouteProps.myCryptomons}
            contract={commonRouteProps.mainContract}
            refreshMons={commonRouteProps.refreshMons}
          />
        }
      />
      <Route
        path="/myShop"
        element={
          <MyShop
            myCryptomons={commonRouteProps.myCryptomons}
            contract={commonRouteProps.mainContract}
            refreshMons={commonRouteProps.refreshMons}
            nativeTok={commonRouteProps.library?._network?.name}
          />
        }
      />
      <Route
        path="/marketplace"
        element={
          <Marketplace
            otherCryptomons={commonRouteProps.otherCryptomons}
            contract={commonRouteProps.mainContract}
            refreshMons={commonRouteProps.refreshMons}
            nativeTok={commonRouteProps.library?._network?.name}
          />
        }
      />
      <Route
        path="/breed"
        element={
          <Breed
            myCryptomons={commonRouteProps.myCryptomons}
            contract={commonRouteProps.mainContract}
            refreshMons={commonRouteProps.refreshMons}
          />
        }
      />
      <Route
        path="/dojo"
        element={
          <Dojo
            myCryptomons={commonRouteProps.myCryptomons}
            account={commonRouteProps.account}
            setFightChoice1Func={fightRouteProps.setFightChoice1}
            setFightChoice2Func={fightRouteProps.setFightChoice2}
            otherCryptomons={commonRouteProps.otherCryptomons}
            cryptomons={commonRouteProps.cryptomons}
            fightChoice1={fightRouteProps.fightChoice1}
            fightChoice2={fightRouteProps.fightChoice2}
            winner={fightRouteProps.winner}
            monNames={commonRouteProps.names}
            fightTxDone={fightRouteProps.fightTxDone}
            rewards={fightRouteProps.rewards}
            rounds={fightRouteProps.rounds}
            disableFightBtn={fightRouteProps.disableFightBtn}
            fight={fightRouteProps.fight}
          />
        }
      />
      <Route
        path="/arena"
        element={
          // <WsContext.Provider value={ws}>
            <ArenaV2
              // onSetWs={(ws: object) => setWs(ws)}
              account={commonRouteProps.account}
              hasStartedRoom={!!startedRoom}
              onStartedRoom={(value: RoomType) => {
                setStartedRoom(value)
              }}
              // otherPlayerReady={otherPlayerReady}
              // isAcceptedAndReadyPlayer={(state: boolean) => setAcceptedAndReadyPlayer(state)}
            />
          // </WsContext.Provider>
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
              account={commonRouteProps.account}
              fightChoice1={fightRouteProps.fightChoice1}
              fightChoice2={fightRouteProps.fightChoice2}
              setFightChoice1Func={fightRouteProps.setFightChoice1}
              setFightChoice2Func={fightRouteProps.setFightChoice2}
              cryptomons={commonRouteProps.cryptomons}
              monNames={commonRouteProps.names}
              // acceptedAndReadyPlayer={acceptedAndReadyPlayer}
              // onOtherPlayerReady={(room: RoomType, otherPlayer: string) => {
              //   setOtherPlayerReady({ room, otherPlayer })
              // }}
            />
          }
        />
      </Route>
      <Route
        path="/share"
        element={
          <Share
            myCryptomons={commonRouteProps.myCryptomons}
            account={commonRouteProps.account}
            library={commonRouteProps.library}
            refreshMons={commonRouteProps.refreshMons}
          />
        }
      />
      <Route
        path="/sharedToMe"
        element={
          <SharedToMe
            library={commonRouteProps.library}
            refreshMons={commonRouteProps.refreshMons}
            otherCryptomons={commonRouteProps.otherCryptomons}
            account={commonRouteProps.account}
          />
        }
      />
      <Route
        path="/token"
        element={
          <Token
            tokenBalance={commonRouteProps.tokenBalance}
            library={commonRouteProps.library}
            refreshMons={commonRouteProps.refreshMons}
            account={commonRouteProps.account}
          />
        }
      />
    </Routes>
  )
}

export default MenuRoutes
