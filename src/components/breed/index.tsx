import React from 'react'
import { nameDiv, imgDiv, statDiv, breedOption, breedDiv, monName } from '../common'
import Spinner from '../spinner'
import { Row, Col, Container } from 'react-bootstrap'
import { Lokimon } from '../../models'
import './breed.css'

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
      <div className="p1-breed green-glow">Breed</div>

      <div className="rpgui-container framed-grey vs-container" style={{ marginTop: '24px' }}>
        <Container fluid>
          <Row>
            <Col xs="12" lg="12" className="col-text-center">
              <span>
                {breedChoice1 !== null
                  ? monName(
                      myCryptomons?.find((mon: Lokimon) => mon.id?.toString() === breedChoice1?.toString())?.species
                    )
                  : ''}{' '}
                {breedChoice1 !== null ? `no.${breedChoice1}` : ''}
              </span>
            </Col>
            <Col md="12" className="col-text-center">
              {breedChoice1 !== null ? '+' : ''}
            </Col>
            <Col xs="12" lg="12" className="col-text-center">
              <span>
                {breedChoice2 !== null
                  ? monName(
                      myCryptomons?.find((mon: Lokimon) => mon.id?.toString() === breedChoice2?.toString())?.species
                    )
                  : ''}{' '}
                {breedChoice2 !== null ? `no.${breedChoice2}` : ''}
              </span>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="breeding-area" style={{ marginTop: '9px' }}>
      <div className='breed-selected-mons-img'>
        {breedOption(breedChoice1, myCryptomons)}
        {breedOption(breedChoice2, myCryptomons)}
        </div>
        {isBreedMonLoading ? (
          <button className="rpgui-button" type="button" style={{ width: '100%' }}>
            <Spinner color="#000" />
          </button>
        ) : (
          <button
            className="rpgui-button breed-btn"
            type="button"
            onClick={() => breedMons(breedChoice1, breedChoice2)}
            disabled={breedChoice1 === breedChoice2}
          >
            Breed choosen lokimons
          </button>
        )}
      </div>

      <div className="rpgui-container framed-grey table-container">
        <Row>
          <Col xs md={12}>
            <div style={{ textAlign: 'center' }}>Select Lokimon</div>
          </Col>
          <Col xs md={12}>
            <div className="dojo-selection">
              {myCryptomons &&
                myCryptomons
                  .filter((mon: Lokimon) => !mon.forSale)
                  .map((mon: Lokimon) => (
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
    </>
  )
}

export default Breed
