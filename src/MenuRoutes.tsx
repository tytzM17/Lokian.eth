import React, { createContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  ArenaV2,
  ArenaPeerJs,
  Dojo,
  Breed,
  Marketplace,
  MyLokiMons,
  MyShop,
  Share,
  SharedToMe,
  Token,
  ArenaSocketIo,
} from './components'
import Room from './components/arena/room'
import { RoomType } from './components/common/interfaces'
import { Lokimon } from './models'

const MenuRoutes = ({ commonRouteProps, fightRouteProps }) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <MyLokiMons
            myCryptomons={commonRouteProps.myCryptomons as Lokimon[]}
            contract={commonRouteProps.mainContract}
            refreshMons={commonRouteProps.refreshMons}
          />
        }
      />
      <Route
        path='/myLokiMons'
        element={
          <MyLokiMons
            myCryptomons={commonRouteProps.myCryptomons}
            contract={commonRouteProps.mainContract}
            refreshMons={commonRouteProps.refreshMons}
          />
        }
      />
      <Route
        path='/myShop'
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
        path='/marketplace'
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
        path='/breed'
        element={
          <Breed
            myCryptomons={commonRouteProps.myCryptomons}
            contract={commonRouteProps.mainContract}
            refreshMons={commonRouteProps.refreshMons}
          />
        }
      />
      <Route
        path='/dojo'
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
        path='/arena'
        element={
          // <ArenaPeerJs
          //   account={commonRouteProps.account}
          //   fightChoice1={fightRouteProps.fightChoice1}
          //   fightChoice2={fightRouteProps.fightChoice2}
          //   setFightChoice1Func={fightRouteProps.setFightChoice1}
          //   setFightChoice2Func={fightRouteProps.setFightChoice2}
          //   cryptomons={commonRouteProps.cryptomons}
          //   monNames={commonRouteProps.names}
          // />
          <ArenaSocketIo
            account={commonRouteProps.account}
            fightChoice1={fightRouteProps.fightChoice1}
            fightChoice2={fightRouteProps.fightChoice2}
            setFightChoice1Func={fightRouteProps.setFightChoice1}
            setFightChoice2Func={fightRouteProps.setFightChoice2}
            cryptomons={commonRouteProps.cryptomons}
            monNames={commonRouteProps.names}
          />
        }
      />
      <Route
        path='/share'
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
        path='/sharedToMe'
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
        path='/token'
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
