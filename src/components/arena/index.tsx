import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Spinner from '../spinner'
import { Container, Row, Col, Table } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import './arena.css'
import { RoomType, UseLocDiscon } from '../common/interfaces'
// import WebSocket from 'isomorphic-ws'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'

const btnStyle = {
  height: '38px',
}

const URL = 'ws://localhost:40510'

const acctFormat = (acct: string) => {
  if (!acct) return
  return `${acct.substring(0, 6)}...${acct.substring(acct.length - 4)}`
}

const Arena = ({ account, onStartedRoom, hasStartedRoom }) => {
  let navigate = useNavigate()
  let useLoc: UseLocDiscon = useLocation()

  const [online, setOnline] = useState(0)
  const [toggleChatbox, setToggleChatbox] = useState(false)
  const [arenaChatMsgs, setArenaChatMsgs] = useState('')
  const [arenaChatInput, setArenaChatInput] = useState('')
  const [rooms, setRooms] = useState([])
  const [ws, setWs] = useState(new WebSocket(URL))

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
        acct: acctFormat(account),
      })
    )
    showMessage(`YOU: ${arenaChatInput}`)
  }

  const createRoom = () => {
    const obj = { type: 'create', params: { creator: account } }
    if (ws) ws.send(JSON.stringify(obj))
  }

  const joinRoom = (roomCode: string, creator: string) => {
    if (ws) {
      const obj = { type: 'join', params: { code: roomCode, player: account, creator } }
      ws.send(JSON.stringify(obj))
    }
  }

  const startRoom = (room: RoomType) => {
    if (!room || room.clients !== 2 || !room.clients) return

    const path = '/arena/room/' + room?.room || ''
    if (ws) {
      const obj = { type: 'start', params: { room, path } }
      ws.send(JSON.stringify(obj))
    }

    onStartedRoom(room)
  }

  const leaveRoom = (roomPlayers: string[], roomCreator: string, roomLeaver: string, roomCode: string) => {
    if (ws) {
      let isCreator = false
      if (account?.toString() === roomCreator) {
        isCreator = true
      }
      const obj = { type: 'leave', params: { players: roomPlayers, isCreator, leaver: roomLeaver, code: roomCode } }
      if (roomPlayers?.includes(account)) {
        ws.send(JSON.stringify(obj))
      }
    }
  }

  useEffect(() => {
    if (!useLoc || !useLoc.state) return
    // invoke leave room
    leaveRoom(useLoc.state?.room?.players, useLoc.state?.room?.creator, useLoc.state?.leaver, useLoc.state?.room?.room)
  }, [useLoc])

  useEffect(() => {
    ws.onopen = function open() {
      console.log('connected')
      if (ws)
        ws.send(
          JSON.stringify({
            type: 'online',
            msg: 'connected',
            acct: account,
          })
        )
    }

    ws.onmessage = function incoming(data) {
      if (!data || !data.data) return
      const parsed = JSON.parse(data.data)

      let chatMsg = ''
      switch (parsed.type) {
        case 'info':
          console.log('info data', parsed)
          toast.error(parsed?.params?.msg || 'Error')
          break
        case 'chat':
          console.log('chat data', parsed)

          chatMsg = `${parsed?.acct || 'unknown'}: ${parsed?.msg}`
          break
        case 'online':
          const _online = parsed?.type === 'online' ? parsed.online : null
          if (_online) setOnline(_online)
          break
        case 'create':
          console.log('create data', parsed)
          const prevRooms = [...rooms]
          if (parsed?.params) prevRooms.push(parsed.params)
          setRooms(prevRooms)
          break
        case 'join':
          console.log('join data', parsed)
          let updatedRooms = [...rooms]
          updatedRooms.every((room) => {
            if (room?.room === parsed?.params?.room) {
              room['clients'] = parsed.params?.clients
              room['players'] = parsed.params?.players
              return false
            }
            return true
          })
          setRooms(updatedRooms)
          break
        case 'leave':
          console.log('leave data', parsed)
          let leavedRooms = [...rooms]
          if (parsed?.params?.isClosed) {
            leavedRooms = leavedRooms.filter((room) => room?.room !== parsed.params.room)
            setRooms(leavedRooms)
          } else {
            leavedRooms.every((room) => {
              if (room?.room === parsed?.params?.room) {
                room['clients'] = parsed.params.clients
                room['players'] = parsed.params.players
                return false
              }
              return true
            })
            setRooms(leavedRooms)
          }
          onStartedRoom(null)
          break
        case 'start':
          console.log('start rooms data', parsed)
          // if not creator, navigate to room path
          if (parsed?.params?.room?.creator !== account) {
            onStartedRoom(parsed?.params?.room)
            navigate(parsed?.params?.path)
          }
          break
      }

      showMessage(chatMsg)
    }

    return () => {
      ws.onclose = () => {
        console.log('WebSocket Disconnected')
        setWs(new WebSocket(URL))
      }
    }
  }, [ws.onmessage, ws.onopen, ws.onclose])

  return (
    <>
      {hasStartedRoom ? (
        <div className="rpgui-container framed-grey">
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      ) : (
        <>
          <div className="p1-arena green-glow">Arena</div>
          <div className="rpgui-container framed-grey table-container">
            <Container fluid>
              <Row className="online-create-room-row">
                <Col sm={12} xs={12} md={6} lg={6} xl={6}>
                  <span className="online-count">Online: {online || '0'}</span>
                </Col>
                <Col sm={12} xs={12} md={6} lg={6} xl={6}>
                  <div className="create-room-btn">
                    <button className="rpgui-button" type="button" onClick={() => createRoom()}>
                      <span style={{ fontSize: '18px' }}>+</span> Create Room
                    </button>
                  </div>
                </Col>
              </Row>
              <Row></Row>
              <Row>
                <Col>
                  <Table striped bordered hover variant="dark" responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Players</th>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms &&
                        rooms.map((room, idx) => {
                          return (
                            <tr key={(room?.room || 'code') + '-' + idx}>
                              <td>{idx + 1}</td>
                              <td>{room?.players?.map((player: string) => acctFormat(player))?.join(', ')}</td>
                              <td>{room?.room || ''}</td>
                              <td>{room?.clients || 0}/2</td>
                              <td>
                                <button
                                  className="rpgui-button"
                                  type="button"
                                  onClick={() => leaveRoom(room?.players, room?.creator, account, room?.room)}
                                  style={{ maxHeight: btnStyle.height }}
                                >
                                  Leave
                                </button>
                                {room?.creator === account && (
                                  <button
                                    className="rpgui-button"
                                    type="button"
                                    onClick={() => startRoom(room)}
                                    style={{ maxHeight: btnStyle.height }}
                                    disabled={room.clients !== 2}
                                  >
                                    {room.clients !== 2 ? (
                                      'Waiting'
                                    ) : (
                                      <Link to={'/arena/room/' + room?.room || ''}>Start</Link>
                                    )}
                                  </button>
                                )}

                                {room?.creator !== account && (
                                  <button
                                    className="rpgui-button"
                                    type="button"
                                    onClick={() => joinRoom(room?.room || '', room?.creator)}
                                    style={{ maxHeight: btnStyle.height }}
                                  >
                                    Join
                                  </button>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      {/* create pagination */}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}

      {/* arena chat */}
      <div className="arena-chat-box">
        <button className="rpgui-button golden" type="button" onClick={() => setToggleChatbox(!toggleChatbox)}>
          ChatBox
        </button>
        <textarea
          className="arena-chat-textarea"
          style={{ '--visible': toggleChatbox ? 'block' : 'none' } as any}
          rows={6}
          cols={100}
          value={arenaChatMsgs}
        ></textarea>
      </div>
      <div className="arena-chat-controls">
        <input
          onChange={(e) => setArenaChatInput(e.target?.value)}
          type="text"
          name="arenaChatInput"
          placeholder="message"
          value={arenaChatInput}
        />
        <button className="rpgui-button" type="button" onClick={() => sendMsg()}>
          Send
        </button>
      </div>
    </>
  )
}

export default Arena
