import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import '../arena/arena.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
// import gameContext from '../../gameContext'
import MyFightingMons from '../arena/myFightingMons'
// import { RoomType } from '../common/interfaces'
import { Lokimon } from '../../models'
import { breedOption } from '../common'

const ArenaSocketIo = ({
  account,
  fightChoice1,
  fightChoice2,
  monNames,
  cryptomons,
  setFightChoice2Func,
  setFightChoice1Func,
}) => {
  const [roomName, setRoomName] = useState('')
  const [isJoining, setJoining] = useState(false)
  const [creatorMons, setCreatorMons] = useState<Lokimon[]>(null)

  //   const { setInRoom, isInRoom } = useContext(gameContext)

  useEffect(() => {
    if (cryptomons) {
      setCreatorMons(cryptomons.filter((mon: Lokimon) => account === mon.owner))
    }

    // return () => {
    //   second
    // }
  }, [])

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value
    setRoomName(value)
  }

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault()

    // const socket = socketService.socket
    // if (!roomName || roomName.trim() === '' || !socket) return

    // setJoining(true)

    // const joined = await gameService.joinGameRoom(socket, roomName).catch((err) => {
    //   alert(err)
    // })

    // if (joined) setInRoom(true)

    // setJoining(false)
  }

  return (
    <>
      <div className='p1-arena green-glow'>Arena P2P</div>
      <Container fluid>
        <Row className='online-create-room-row'>
          {/* <Col sm={12} xs={12} md={6} lg={6} xl={6}>
            <span className='online-count'>
              Peer ID: {peerId || ''} (connect or announce id at chatbox)
            </span>
          </Col> */}
          <Col>
            <div className='create-room-btn'>
              <form onSubmit={joinRoom}>
                <h4>Enter Room ID to Join a Game</h4>
                <div className='d-flex'>
                <input placeholder='Room ID' value={roomName} onChange={handleRoomNameChange} />
                <Button type='submit' disabled={isJoining}>
                  {isJoining ? 'Joining...' : 'Join'}
                </Button>
                </div>
      
              </form>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className='room-container'>
              {/* upper creator/player1/withPeerId select area */}
              <div className='rpgui-container framed-grey table-container'>
                <Row>
                  <Col xs md={12}>
                    <div style={{ textAlign: 'center' }}>Player 1 Select</div>
                  </Col>
                </Row>
                <Row>
                  <Col xs md={12}>
                    <div className='dojo-selection'>
                      <MyFightingMons
                        mons={creatorMons}
                        setFightChoiceFunc={setFightChoice1Func}
                        account={account}
                        choice='1'
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              {/* center fight isle */}
              <div
                className='rpgui-container framed-grey vs-container'
                style={{ marginTop: '24px' }}
              >
                <Container fluid>
                  <Row>
                    <Col xs md='12' className='col-text-center'>
                      Selected Lokimon
                    </Col>
                    <Col xs='12' lg='12' className='col-text-center'>
                      <span>
                        {
                          monNames[
                            cryptomons.find(
                              (mon: Lokimon) => mon.id?.toString() === fightChoice1?.toString(),
                            )?.species
                          ]
                        }{' '}
                        {fightChoice1 ? `no.${fightChoice1}` : fightChoice1 == '0' ? `no.${0}` : ''}
                      </span>
                    </Col>
                    <Col xs='12' lg='12' className='col-text-center'>
                      <span>
                        {
                          monNames[
                            cryptomons.find(
                              (mon: Lokimon) => mon.id?.toString() === fightChoice2?.toString(),
                            )?.species
                          ]
                        }{' '}
                        {fightChoice2 ? `no.${fightChoice2}` : ''}
                      </span>
                    </Col>
                  </Row>
                  <div className='dojo-spar-mons-img'>
                    {breedOption(parseInt(fightChoice1), cryptomons)}
                    {breedOption(parseInt(fightChoice2), cryptomons)}
                  </div>
                </Container>
              </div>

              {/* upper joiner/player2 select area */}
              <div className='rpgui-container framed-grey table-container'>
                <Row>
                  <Col xs md={12}>
                    <div style={{ textAlign: 'center' }}>Player 2 Select</div>
                  </Col>
                </Row>
                <Row>
                  <Col xs md={12}>
                    <div className='dojo-selection'>
                      <MyFightingMons
                        mons={[]}
                        setFightChoiceFunc={setFightChoice2Func}
                        account={''}
                        choice='2'
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* react version */}
      Made with ❤️‍🔥 react v{React.version}
    </>
  )
}

export default ArenaSocketIo
