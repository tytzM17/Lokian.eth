import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../spinner'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { useState } from 'react'

const btnStyle = {
  height: '38px',
}

const ArenaV2 = () => {
  const [online, setOnline] = useState('6')
  return (
    <>
      <div className="p1 green-glow">Arena V2</div>
      <div
        className="rpgui-container framed"
        style={{
          position: 'relative',
          width: '100%',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Container fluid>
          <Row>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
              <span style={{ fontSize: '18px' }} className="float-left">
                Online: {online || '0'}
              </span>
            </Col>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
              <div className="float-right">
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
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default ArenaV2
