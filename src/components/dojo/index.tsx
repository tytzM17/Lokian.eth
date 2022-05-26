import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { breedOption } from '../common'
import './dojo.css'

const Dojo = ({ fightChoice1, fightChoice2, myCryptomons=[] }) => {
  return (
    <>
     <div className="p1 green-glow">Dojo</div>
      <div
        className="rpgui-container framed-grey table-container"
      >
 <Container fluid>
 <Row className="justify-content-md-center">
    <Col xs md="2" className='pull-right text-right'>
      {breedOption(fightChoice1, myCryptomons)}
    </Col>
    <Col xs md="2">VS</Col>
    <Col xs md="2">
    {breedOption(fightChoice2, myCryptomons)}
    </Col>
  </Row>
          </Container>

          <div>{' '}</div>
      </div>
    </>
  )
}

export default Dojo