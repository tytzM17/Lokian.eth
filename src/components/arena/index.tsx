import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../spinner'
import { Container, Row, Col, Table } from 'react-bootstrap'
import React, { useState } from 'react'
import "./arena.css";

const btnStyle = {
  height: '38px',
}

const Arena = () => {
  const [online, setOnline] = useState('6')
  const [duels, setDuels] = useState('1')

  return (
    <>
      <div className="p1A green-glow">Arena</div>
      <div
        className="rpgui-container framed-grey table-container"
      >
        <Container fluid>
          <Row className='online-create-room-row'>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
              <span className='online-count'>
                Online: {online || '0'}
              </span>
            </Col>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
              <div className="create-room-btn">
                <button className="rpgui-button" type="button">
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
                        Join
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>0x32345abcde, 0x42345abcde</td>
                    <td>3</td>
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
                    <td>3</td>
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

              {/* My Duels */}
              <div
        className="rpgui-container framed-grey table-container"
      >
        <Container fluid>
        <Row style={{marginBottom: '12px'}}>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
              <span className="my-duels">
                My Duels: {duels || '0'}
              </span>
            </Col>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
            </Col>
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
    </>
  )
}

export default Arena
