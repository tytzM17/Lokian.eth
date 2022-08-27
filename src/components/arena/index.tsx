import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
// import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Spinner from '../spinner'
import { Container, Row, Col, Table } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import './arena.css'
// import WebSocket from 'isomorphic-ws'

const btnStyle = {
  height: '38px',
}

const URL = 'ws://localhost:40510'

const acctFormat = (acct) => {
  if (!acct) return
  return `${acct.substring(0, 6)}`
}

const Arena = ({ account }) => {
  const [online, setOnline] = useState(0)
  const [duels, setDuels] = useState('1')
  const [toggleChatbox, setToggleChatbox] = useState(false)
  const [arenaChatMsgs, setArenaChatMsgs] = useState('')
  const [arenaChatInput, setArenaChatInput] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [ws, setWs] = useState(new WebSocket(URL))

  const showMessage = (message: string) => {
    let messages = arenaChatMsgs
    messages += `\n${message}`
    console.log(messages)

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
    showMessage(`${acctFormat(account)}: ${arenaChatInput}`)
  }

  const createRoom = () => {
    if (!ws) return
    ws.send('{"type":"create"}')
  }

  const joinRoom = () => {
    if (!ws) return
    const code = roomCode
    const obj = { type: 'join', params: { code } }
    ws.send(JSON.stringify(obj))
  }

  const leaveRoom = () => {
    if (!ws) return 
    ws.send('{"type":"leave"}')   
  }

  useEffect(() => {
    ws.onopen = function open() {
      console.log('connected')
      if(ws)
      ws.send(
        JSON.stringify({
          type: 'online',
          msg: 'connected',
          acct: acctFormat(account),
        })
      )
    }

    ws.onmessage = function incoming(data) {
      console.log('data',data);
      
      if (!data || !data.data) return

      const parsed = JSON.parse(data.data)
      console.log(parsed);  
      const showMsg = parsed?.type === 'info' ? `${parsed.type}: room ${parsed.params?.room}, clients ${parsed.params?.clients || ''}` : `${parsed?.acct}: ${parsed?.msg}`
      showMessage(showMsg)
      const _online = parsed?.type === 'online' ? parsed.online : 0
      setOnline(_online)
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
                  {
                    
                  }
                  <tr>
                    <td>1</td>
                    <td>0x12345abcde, 0x22345abcde</td>
                    <td>3</td>
                    <td>Waiting</td>
                    <td>
                      <button className="rpgui-button" type="button" onClick={() => leaveRoom()} style={{ maxHeight: btnStyle.height }} >
                        Leave
                      </button>
                      <button className="rpgui-button" type="button" onClick={() => joinRoom()} style={{ maxHeight: btnStyle.height }}>
                        Join
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>0x32345abcde, 0x42345abcde</td>
                    <td>123456</td>
                    <td>Waiting</td>
                    <td>
                      <button className="rpgui-button" type="button" style={{ maxHeight: btnStyle.height }}>
                        Leave
                      </button>
                      <button className="rpgui-button" type="button" style={{ maxHeight: btnStyle.height }}>
                        Join
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>0x52345abcde, 0x62345abcde</td>
                    <td>12345</td>
                    <td>Waiting</td>
                    <td>
                      <button className="rpgui-button" type="button" style={{ maxHeight: btnStyle.height }}>
                        Leave
                      </button>
                      <button className="rpgui-button" type="button" style={{ maxHeight: btnStyle.height }}>
                        Join
                      </button>
                    </td>
                  </tr>
                  {/* create pagination */}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Rooms */}
      <div className="rpgui-container framed-grey table-container">
        <Container fluid>
          <Row style={{ marginBottom: '12px' }}>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
              <span className="my-duels">My Rooms: {duels || '0'}</span>
            </Col>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}></Col>
          </Row>

          <Row>
            <Col>
              <Table striped bordered hover variant="dark" responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Players</th>
                    <th>Rounds</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>0x12345abcde, 0x22345abcde</td>
                    <td>3</td>
                    <td>Waiting</td>
                    <td>
                      <button className="rpgui-button" type="button" style={{ maxHeight: btnStyle.height }}>
                        Leave
                      </button>
                      <button className="rpgui-button" type="button" style={{ maxHeight: btnStyle.height }}>
                        Start
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>

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
