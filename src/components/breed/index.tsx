import React from 'react'
import { nameDiv, imgDiv, statDiv, breedOption, breedDiv, monName } from '../common'
import Spinner from '../spinner'
import { Row, Col, Container } from 'react-bootstrap'

const Breed = ({
  myCryptomons,
  breedChoice1,
  breedChoice2,
  isBreedMonLoading,
  breedMons,
  setBreedChoice1Func,
  setBreedChoice2Func,
}) => {
  return (
    <>
      <div className="p1A green-glow">Breed</div>

      <div className="rpgui-container framed-grey vs-container" style={{ marginTop: '24px' }}>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs lg="2" className="text-right">
              {
                breedChoice1 !== null ? monName(myCryptomons?.find((mon) => mon.id?.toString() === breedChoice1?.toString())?.species) : ''
              }{' '}
              {breedChoice1 !== null ? `no.${breedChoice1}` : ''}
            </Col>
            <Col md="auto">+</Col>
            <Col xs lg="2">
            {
                breedChoice2 !== null ? monName(myCryptomons?.find((mon) => mon.id?.toString() === breedChoice2?.toString())?.species) : ''
              }{' '}
              {breedChoice2 !== null ? `no.${breedChoice2}` : ''}
            </Col>
          </Row>
        </Container>
      </div>

      <div className="breeding-area" style={{marginTop:'6px'}}>
        {breedOption(breedChoice1, myCryptomons)}
        {breedOption(breedChoice2, myCryptomons)}
        {isBreedMonLoading ? (
          <button className="rpgui-button" type="button" style={{ width: '100%' }}>
            <Spinner color="#000" />
          </button>
        ) : (
          <button
            className="rpgui-button"
            type="button"
            style={{ width: '420px' }}
            onClick={() => breedMons(breedChoice1, breedChoice2)}
          >
            Breed choosen creatures
          </button>
        )}
      </div>
      {/* <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'24px'}}> */}
      <div className="rpgui-container framed-grey table-container">
      <Row>
          <Col xs md={12}>
            <div className="dojo-selection">
      {myCryptomons &&
        myCryptomons
          .filter((mon) => !mon.forSale)
          .map((mon) => (
            <React.Fragment key={mon?.id}>
              <div className="mon">
                <figure className="my-figure">
                  {nameDiv(mon)}
                  {imgDiv(mon)}
                  <figcaption>{statDiv(mon)}</figcaption>
                </figure>
                {breedDiv(mon, setBreedChoice1Func, setBreedChoice2Func)}
              </div>
            </React.Fragment>
          ))}
          </div>
          </Col>
          </Row>
          </div>
          {/* </div> */}
    </>
  )
}

export default Breed
