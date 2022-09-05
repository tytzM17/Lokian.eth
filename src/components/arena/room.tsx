import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Lokimon } from '../models'
import MyFightingMons from './myFightingMons'

const Room = ({ room, onDisconnect, account, fightChoice1, fightChoice2, monNames, cryptomons, setFightChoice2Func, setFightChoice1Func }) => {
  let navigate = useNavigate()

  const [otherPlayer, setOtherPlayer] = useState(null)
  const [otherPlayerMons, setOtherPlayerMons] = useState(null)
  const [creatorMons, setCreatorMons] = useState(null)

  useEffect(() => {
   if(!room || !room.players) return
   const _otherPlayer = room.players.find((player: string) => player !== room.creator)
   setOtherPlayer(_otherPlayer)
  }, [room])
  
  useEffect(() => {
    if (!cryptomons || !otherPlayer || !room?.creator) return
    const _otherPlayerMons = cryptomons.filter((mon: Lokimon) => otherPlayer === mon.owner)
    setOtherPlayerMons(_otherPlayerMons)
    setCreatorMons(cryptomons.filter((mon: Lokimon) => room.creator === mon.owner))
  }, [cryptomons, otherPlayer, room?.creator])
  
  return (
    <>
      <div className="p1-arena green-glow">Room {room?.room}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {' '}
        <button
          className="rpgui-button"
          type="button"
          onClick={() => {
            onDisconnect(null)
            navigate('/arena', { state: { room, leaver: account } })
          }}
        >
          {room?.creator === account ? 'Dissolve' : 'Disconnect'}
        </button>
      </div>

       {/* fight mons area, fight against area */}
       <div className="rpgui-container framed-grey table-container">
        <Row>
          <Col xs md={12}>
            <div style={{ textAlign: 'center' }}>Player 1 Select</div>
          </Col>
        </Row>
        <Row>
          <Col xs md={12}>
            <div className="dojo-selection">
              <MyFightingMons
                mons={creatorMons}
                setFightChoiceFunc={setFightChoice1Func}
                account={room?.creator}
                choice="1"
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* center isle */}
      <div className="rpgui-container framed-grey vs-container" style={{ marginTop: '24px' }}>
        <Container fluid>
          <Row>
            <Col xs="12" lg="12" className="col-text-center">
              <span>
                {
                  monNames[
                    cryptomons.find((mon: Lokimon) => mon.id?.toString() === fightChoice1?.toString())?.species
                  ]
                }{' '}
                {fightChoice1 ? `no.${fightChoice1}` : fightChoice1 == '0' ? `no.${0}` : ''}
              </span>
            </Col>
            <Col xs md="12" className="col-text-center">
              VS
            </Col>
            <Col xs="12" lg="12" className="col-text-center">
              <span>
                {
                  monNames[
                    cryptomons.find((mon: Lokimon) => mon.id?.toString() === fightChoice2?.toString())?.species
                  ]
                }{' '}
                {fightChoice2 ? `no.${fightChoice2}` : ''}
              </span>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="rpgui-container framed-grey table-container">
        <Row>
          <Col xs md={12}>
            <div style={{ textAlign: 'center' }}>Player 2 Select</div>
          </Col>
        </Row>
        <Row>
          <Col xs md={12}>
            <div className="dojo-selection">
              <MyFightingMons
                mons={otherPlayerMons}
                setFightChoiceFunc={setFightChoice2Func}
                account={otherPlayer}
                choice="2"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Room
