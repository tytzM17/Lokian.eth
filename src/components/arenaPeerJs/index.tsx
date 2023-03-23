import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import '../arena/arena.css'
import React, { useEffect, useState } from 'react'
import { getFirst7AndLast4CharOfAcct } from '../arena'
import { getAccount } from '../../utils'
import MyFightingMons from '../arena/myFightingMons'
import { RoomType } from '../common/interfaces'
import { Lokimon } from '../../models'
import { breedOption } from '../common'
import { Peer } from 'peerjs'

interface Ready {
  monSelectedId?: string | number
  otherPlayer?: string
  room?: RoomType
  creator?: string
  playerType?: string
  account?: string
}

interface Player {
  monSelectedId?: string | number
  account?: string
  playerType?: string
}

const btnStyle = {
  height: '38px',
  color: '#000',
}

// change to real online server
const URL = 'ws://localhost:40510'

const ArenaPeerJs = ({
  account,
  // fightRouteProps,
  // commonRouteProps,
  // mainContract,
  fightChoice1,
  fightChoice2,
  monNames,
  cryptomons,
  setFightChoice2Func,
  setFightChoice1Func,
}) => {
  const [toggleChatbox, setToggleChatbox] = useState<boolean>(false)
  const [arenaChatMsgs, setArenaChatMsgs] = useState<string>('')
  const [arenaChatInput, setArenaChatInput] = useState<string>('')
  const [ws, setWs] = useState<WebSocket>(new WebSocket(URL))

  const showMessage = (message: string) => {
    let messages = arenaChatMsgs
    messages += `\n${message}`
    setArenaChatMsgs(messages)
  }

  const sendMsg = () => {
    if (!ws) return
    ws.send(
      JSON.stringify({
        type: 'chat',
        msg: arenaChatInput,
        acct: getFirst7AndLast4CharOfAcct(account),
      }),
    )
    showMessage(`YOU: ${arenaChatInput}`)
  }

  async function getMyAccount() {
    return await getAccount()
  }

  useEffect(() => {
    if (!ws) return

    ws.onopen = function open() {
      console.log('connected')
      let _account = account

      if (!_account) {
        getMyAccount().then((result) => {
          _account = result

          if (ws) {
            ws.send(
              JSON.stringify({
                type: 'online',
                msg: 'connected',
                acct: _account,
              }),
            )
          }
        })
      }
    }

    ws.onmessage = function incoming(data) {
      if (!data || !data.data) return
      const parsed = JSON.parse(data.data)

      let chatMsg = ''

      switch (parsed.type) {
        case 'chat': {
          chatMsg = `${parsed?.acct || 'unknown'}: ${parsed?.msg}`
          break
        }
      }

      showMessage(chatMsg)
    }

    return () => {
      ws.onclose = () => {
        console.log('WebSocket Disconnected')
        setWs(new WebSocket(URL))
      }
    }
  }, [ws, ws.onmessage, ws.onopen, ws.onclose, account])

  // clicked arena, create peer id if not on localstorage
  const [peerId, setPeerId] = useState()
  // if (localStorage.get('peerId')) set peer id else new Peer()
  const [thePeer] = useState(new Peer())
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [connectionPeer, setConnectionPeer] = useState<any>()

  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (thePeer) {
        thePeer.on('open', function (id) {
          console.log('My peer ID is: ' + id)

          setPeerId(id)
        })

        // on receive connection
        // peer will connect
        // peer will appear, and choose lokimon
        thePeer.on('connection', function (conn) {
          console.log(conn)
        })
      }
    }

    return () => {
      mounted = false
    }
  }, [thePeer])

  // set in modal
  const [destinationPeerId, setDestinationPeerId] = useState('')

  // when connecting to peer
  const connectToPeer = () => {
    // get Destination peer id from modal
    handleShow()

    // const conn = thePeer.connect(destinationPeerId)
    // setConnectionPeer(conn)
  }

  const [joinerData, setJoinerData] = useState({ joinerAccount: '' })

  useEffect(() => {
    let mounted = true

    if (mounted && connectionPeer) {
      // Receive data/messages
      connectionPeer.on('data', function (data) {
        console.log('Received data', data)

        // set data

        setJoinerData(data)
      })

      // Send messages
      connectionPeer.send({
        joinerAccount: account,
      })
    }

    return () => {
      mounted = false
    }
  }, [connectionPeer])

  const [joinerMons, setJoinerMons] = useState<Lokimon[]>(null)
  const [creatorMons, setCreatorMons] = useState<Lokimon[]>(null)

  useEffect(() => {
    if (!cryptomons) return
    const otherPlayerMons = cryptomons.filter(
      (mon: Lokimon) => joinerData?.joinerAccount === mon.owner,
    )

    setJoinerMons(otherPlayerMons)
    setCreatorMons(cryptomons.filter((mon: Lokimon) => account === mon.owner))
  }, [cryptomons, joinerData, joinerData?.joinerAccount, account])

  const [show, setShow] = useState(false)

  const handleDestiPeerId = (e) => {
    setDestinationPeerId(e?.target?.value || '')
  }

  function ConnectPeerModal({ show, handleClose, onChange, destinationPeerId, title }) {
    return (
      <>
        <Modal className='generic-modal' show={show} onHide={() => handleClose(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Peer ID: </Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => onChange(e)}
                value={destinationPeerId}
                placeholder='peer id input'
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={() => handleClose(true)}>
              Confirm
            </Button>
            <Button variant='secondary' onClick={() => handleClose(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  const genericModalProps = {
    show,
    handleClose: (state: boolean) => handleClose(state),
    title: 'Connect to peer',
    onChange: (e) => handleDestiPeerId(e),
    destinationPeerId,
  }

  const handleClose = (state: boolean) => {
    
    setShow(false)

    if(state) {
    const conn = thePeer.connect(destinationPeerId)
    setConnectionPeer(conn)
    }
  }
  const handleShow = () => {
    setShow(true)
  }

  const announcePeerId = () => {
    alert(peerId)
  }

  return (
    <>
      <div className='p1-arena green-glow'>Arena P2P</div>
      <ConnectPeerModal {...genericModalProps} />

      <div className='rpgui-container framed-grey table-container'>
        <Container fluid>
          <Row className='online-create-room-row'>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
              <span className='online-count'>
                Peer ID: {peerId || ''} (connect or announce id at chatbox)
              </span>
              <button className='rpgui-button' type='button' onClick={() => announcePeerId()}>
                 Announce Peer ID 
                </button>
            </Col>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
              <div className='create-room-btn'>
                <button className='rpgui-button' type='button' onClick={() => connectToPeer()}>
                  <span style={{ fontSize: '18px' }}>+</span> Connect to Peer 
                </button>
              </div>
            </Col>
          </Row>
          <Row></Row>
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
                          {fightChoice1
                            ? `no.${fightChoice1}`
                            : fightChoice1 == '0'
                            ? `no.${0}`
                            : ''}
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
                          mons={joinerMons || []}
                          setFightChoiceFunc={setFightChoice2Func}
                          account={joinerData?.joinerAccount || ''}
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
      </div>

      <div className='arena-chat-box'>
        <button
          className='rpgui-button golden'
          type='button'
          onClick={() => setToggleChatbox(!toggleChatbox)}
        >
          ChatBox
        </button>
        <textarea
          className='arena-chat-textarea'
          style={{ '--visible': toggleChatbox ? 'block' : 'none' } as unknown}
          rows={6}
          cols={100}
          value={arenaChatMsgs}
          readOnly
        ></textarea>
      </div>
      <div className='arena-chat-controls'>
        <input
          onChange={(e) => setArenaChatInput(e.target?.value)}
          type='text'
          name='arenaChatInput'
          placeholder='message'
          value={arenaChatInput}
        />
        <button className='rpgui-button' type='button' onClick={() => sendMsg()}>
          Send
        </button>
      </div>
    </>
  )
}

export default ArenaPeerJs
