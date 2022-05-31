import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { breedOption } from '../common'
import Spinner from '../spinner'
import './dojo.css'
import MySparringMons from './mySparringMons'

interface Params {
  fightChoice1: string
  fightChoice2: string
  cryptomons: any[]
  winner: number
  monNames: string[]
  fightTxDone: boolean
  rewards: number
  rounds: number
  disableFightBtn: boolean
  fight: (fightChoice1: string, fightChoice2: string) => void
  account: string
  myCryptomons: any[]
  otherCryptomons: any[]
  setFightChoice1Func: any
  setFightChoice2Func: any
}

const Dojo = (params: Params) => {
  const [matchWinner, setMatchWinner] = useState('')
  const [winnerID, setWinnerID] = useState('')
  const [matches, setMatches] = useState(0)
  const [rewardAmount, setRewardAmount] = useState(0)

  useEffect(() => {
    if (!params.fightTxDone) return
    if (!params.winner || !params.cryptomons || !params.monNames) return

    const tie = params.winner == 12345678911 || params.winner == 12345678910
    const winnerMon = params.cryptomons.find((mon) => mon.id === params.winner)

    if (tie) {
      setMatchWinner('Tie')
    } else {
      setMatchWinner(params.monNames[winnerMon.species] ?? 'Tie')
      setWinnerID(params.winner.toString())
      setMatches(params.rounds)
      if (params.rewards) setRewardAmount(params.rewards)
    }
  }, [params.fightTxDone])

  return (
    <>
      <div className="p1 green-glow">Dojo</div>

      <div className="rpgui-container framed-grey vs-container" style={{ marginTop: '24px' }}>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs lg="2" className="text-right">
              {
                params.monNames[
                  params.cryptomons.find((mon) => mon.id?.toString() === params.fightChoice1?.toString())?.species
                ]
              }{' '}
              {params.fightChoice1 ? `no.${params.fightChoice1}` : ''}
            </Col>
            <Col md="auto">VS</Col>
            <Col xs lg="2">
              {
                params.monNames[
                  params.cryptomons.find((mon) => mon.id?.toString() === params.fightChoice2?.toString())?.species
                ]
              }{' '}
              {params.fightChoice2 ? `no.${params.fightChoice2}` : ''}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="fighting-area" style={{ marginTop: '6px' }}>
        {breedOption(params.fightChoice1, params.cryptomons)}
        {breedOption(params.fightChoice2, params.cryptomons)}

        <Container fluid>
          <Row className="">
            <Col>
              <Table striped bordered hover variant="dark" responsive style={{ marginTop: '12px' }}>
                <thead>
                  <tr>
                    <th>Winner</th>
                    <th>ID</th>
                    <th>Rounds</th>
                    <th>Rewards</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{matchWinner}</td>
                    <td>{winnerID}</td>
                    <td>{matches}</td>
                    <td>{rewardAmount}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        <Row className="">
          <Col xs md="12">
            {params.disableFightBtn ? (
              <Spinner color="gray" style={{ marginLeft: '50%', marginRight: 'auto', padding: '8px' }} />
            ) : (
              <button
                style={{ width: '100%' }}
                id="fight-btn"
                className="rpgui-button"
                type="button"
                onClick={() => {
                  setMatchWinner('')
                  setWinnerID('')
                  setMatches(0)
                  setRewardAmount(0)
                  params.fight(params.fightChoice1, params.fightChoice2)
                }}
                disabled={params.disableFightBtn}
              >
                Start sparring!
              </button>
            )}
          </Col>
        </Row>
      </div>

      {/* fight mons area, fight against area */}
      <div className="rpgui-container framed-grey table-container">
        <Container fluid>
          <Row>
            <Col xs md={12}>
              <span>Select LokiMon</span>
            </Col>
          </Row>
          <Row>
            <Col xs md={12}>
              <MySparringMons
                mons={params.myCryptomons}
                setFightChoiceFunc={params.setFightChoice1Func}
                account={params.account}
                choice="1"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="rpgui-container framed-grey table-container">
        {/* <Container fluid> */}
        <Row>
          <Col xs md={12}>
            <span>Select Opponent</span>
          </Col>
        </Row>
        <Row>
          <Col xs md={12}>
            <div className="dojo-selection">
              <MySparringMons
                mons={params.otherCryptomons}
                setFightChoiceFunc={params.setFightChoice2Func}
                account={params.account}
                choice="2"
              />
            </div>
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    </>
  )
}

export default Dojo
