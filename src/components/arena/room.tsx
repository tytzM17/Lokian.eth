/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Lokimon } from '../../models'
import MyFightingMons from './myFightingMons'
import { breedOption } from '../common'
import getAccount from '../../utils/getAccount'
import GenericModal from '../common/genericModal'
import { toast } from 'react-toastify'
import { toastErrParams } from '../../utils/toastErrParams'
import { getFirst7AndLast4CharOfAcct } from '.'
import { RoomType } from '../common/interfaces'
import { useFight } from '../../app-functions'
// import { useWs } from './index'
// import { waitForWsConnection } from '../../utils'

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

/**
 * Room UI
 *
 * @param {Object} props
 * @param {Object} props.room
 */
const Room = ({
  room,
  onDisconnect,
  account,
  fightChoice1,
  fightChoice2,
  monNames,
  cryptomons,
  setFightChoice2Func,
  setFightChoice1Func,
  // isDisbanded,
  ws,
  // onOtherPlayerReady,
  // acceptedAndReadyPlayer,
  // readyToStart,
  mainContract,
}) => {
  // const navigate = useNavigate()
  // const { ws } = useWs()

  const [otherPlayer, setOtherPlayer] = useState<string>(null)
  const [otherPlayerMons, setOtherPlayerMons] = useState<Lokimon[]>(null)
  const [creatorMons, setCreatorMons] = useState<Lokimon[]>(null)
  const [_account, setAccount] = useState<string>(account)

  useEffect(() => {
    let mounted = true
    if (!account && mounted) {
      ;(async () => {
        const acct = await getAccount()
        setAccount(acct)
      })()
    }

    return () => {
      mounted = false
    }
  }, [account])

  useEffect(() => {
    if (!room || !room.players) return
    const _otherPlayer = room.players.find((player: string) => player !== room.creator)
    setOtherPlayer(_otherPlayer)
  }, [room])

  useEffect(() => {
    if (!cryptomons || !otherPlayer || !room?.creator) return
    const _otherPlayerMons = cryptomons.filter((mon: Lokimon) => otherPlayer === mon.owner)

    setOtherPlayerMons(_otherPlayerMons)
    setCreatorMons(cryptomons.filter((mon: Lokimon) => room.creator === mon.owner))
  }, [cryptomons, otherPlayer, room?.creator])

  const [show, setShow] = useState(false)
  const [disconConfirm, setDisconConfirm] = useState(false)
  // const [otherPlayerReady, setOtherPlayerReady] = useState(false)
  const [disableBtn, setDisableBtn] = useState(false)

  const [readyToStart, setReadyToStart] = useState('ready')

  const [fightPlayersData, setFightPlayersData] = useState([])

  const handleClose = (state: boolean) => {
    setShow(false)
    setDisconConfirm(state)
  }
  const handleShow = () => {
    setShow(true)
  }

  const handlePlayerReady = () => {
    const playerType = _account === room?.creator ? 'creator' : 'otherPlayer'
    const acc = _account === room?.creator ? room?.creator : otherPlayer

    const paramObj: Ready = {
      room,
      otherPlayer,
      playerType,
      creator: room?.creator,
      account: acc,
      monSelectedId: fightChoice2 || fightChoice1,
    }

    const obj = { type: 'ready', params: paramObj }
    if (ws) {
      ws.send(JSON.stringify(obj))
    }
  }

  useEffect(() => {
    if (!ws) return

    ws.onmessage = function incoming(data) {
      if (!data || !data.data) return
      const parsed = JSON.parse(data.data)

      switch (parsed?.type) {
        case 'leave':
          console.log('room leave data', parsed)
          if (parsed?.params?.room === room?.room) {
            // if (parsed?.params?.isClosed && _account === otherPlayer) {
            // onDisconnect(null)

            toast.error(
              parsed?.params?.isClosed
                ? 'Room owner disconnected at room ' + parsed?.params?.room
                : getFirst7AndLast4CharOfAcct(parsed?.params?.leaver) +
                    ' disconnected at room ' +
                    parsed?.params?.room,
              toastErrParams,
            )

            const roomToLeave = { ...room }
            roomToLeave['leaver'] = getFirst7AndLast4CharOfAcct(_account)
            roomToLeave['isOtherPlayer'] = _account === otherPlayer
            onDisconnect(roomToLeave)

            // navigate('/arena', {
            //   state: { roomCode: parsed.params?.room , isDisbandedAndOtherPlayer: true },
            // })
            // }
          }
          break
        case 'ready':
          if (!parsed || !parsed.params) return
          console.log('inside room,', parsed)

          // filter readyPlayersData room data to 2, one for creator one for other player
          const _readyPlayersData = parsed.params?.readyPlayersData[parsed.params.room?.room] || []
                   
          const uniquePlayersData = [...new Set(_readyPlayersData.map(item => item.playerType))]
          console.log(uniquePlayersData);

          const newReadyPlayersData = [
            ...new Map(_readyPlayersData.map((item) => [item['playerType'], item])).values(),
          ]
          console.log(newReadyPlayersData)

         

          if (parsed?.params?.creator === account || parsed?.params?.creator === _account) {
            if (newReadyPlayersData?.length === 2) {
              setFightPlayersData(newReadyPlayersData)
              setReadyToStart('start fight')
            } else {
              setReadyToStart('waiting for other player')
            }
          }

          if (
            parsed?.params?.otherPlayer === account ||
            parsed?.params?.otherPlayer === _account
          ) {
            setReadyToStart('ready')
          }

          break

        case 'fight':
          if (parsed?.params) {
            console.log('fight func parsed results ', parsed)

            // run fight function here, fight func to call fight func at blockchain
            // e.g. fight(parsed.params[0].monSelectedId, arsed.params[1].monSelectedId)
          } else {
            console.log('no fight players data returned')
          }
          break
      }
    }
  }, [ws, ws.onmessage])

  useEffect(() => {
    if (!disconConfirm || !ws) return

    const roomToLeave = { ...room }
    roomToLeave['leaver'] = _account
    roomToLeave['isOtherPlayer'] = _account === otherPlayer

    onDisconnect(roomToLeave)
  }, [disconConfirm])

  const genericModalProps = {
    show,
    handleClose: (state: boolean) => handleClose(state),
    title: 'Disconnect',
    content: 'Are you sure ? This room will be disbanded or disconnected.',
  }

const [roomFightStatus, setRoomFightStatus] = useState('ongoing')
const [disableRoomFightBtn, setDisableRoomFightBtn] = useState(false)

  async function roomFight(id1: string | number, id2: string | number, contr) {
    setDisableRoomFightBtn(true)
    if (id1 === null || id2 === null) {
      return
    }
    const overrides = {
      gasLimit: 120000,
    }
    try {
      const tx = await contr?.fight(id1, id2, overrides)?.catch((err) => {
        console.log('Fight error, ', err?.toString())
        setDisableRoomFightBtn(false)
        setRoomFightStatus('done')
      })
      const recpt = await tx?.wait()
      if (recpt && recpt.status) {
        setRoomFightStatus('done')
      }

      if (recpt && !recpt.status) {
        toast.error(`Error, Tx hash: ${recpt.transactionHash}`, toastErrParams)
        setRoomFightStatus('done')
      }
    } catch (error) {
      toast.error(`Fight function error: ${error.data?.message || ''}`, toastErrParams)
      setRoomFightStatus('done')
      setDisableRoomFightBtn(false)
    }
  }

  const handleFightStart = () => {
    console.log('start fight, get choices to fight func in contract')
    setDisableBtn(false)

    if (fightPlayersData.length && mainContract) {

      const creatorData: Player = fightPlayersData.filter(playerData => playerData.playerType === 'creator')[0]
      const otherPlayerData: Player = fightPlayersData.filter(playerData => playerData.playerType === 'otherPlayer')[0]
       
      roomFight(creatorData.monSelectedId, otherPlayerData.monSelectedId, mainContract)

    } else {
      toast.error('Cannot start fight, Players data not found', toastErrParams)
    }

    // const paramObj: Ready = {
    //   room, creator: room.creator || _account , monSelectedId: fightChoice1
    // }

    // if (ws) {
    //   ws.send(
    //     JSON.stringify({
    //       type: 'fight',
    //       params: {},
    //     }),
    //   )
    // }
  }

  return (
    <div className='room-container'>
      <div className='p1-arena green-glow'>Room {room?.room}</div>
      <GenericModal {...genericModalProps} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          disabled={disableBtn}
          className='rpgui-button'
          type='button'
          onClick={() => handleShow()}
        >
          {room?.creator === account ? 'Disband' : 'Disconnect'}
        </button>

        {/* {_account === otherPlayer && ( */}
        <button
          className='rpgui-button'
          type='button'
          onClick={() => {

            if (readyToStart === 'start fight') {
              console.log('start')
              handleFightStart()
            } else {
            if (fightChoice1 || fightChoice2) {
              handlePlayerReady()
            } else {
              toast.warn('Please select a Lokimon', toastErrParams)
            }
          }
          }}
        >
          {/* {otherPlayerReady ? 'Waiting for start' : 'Ready'} */}
          {readyToStart || 'ready'}
        </button>
        {/* )} */}

        {/* {_account === room?.creator && readyToStart === 'start fight' && (
          <button
            className='rpgui-button'
            type='button'
            onClick={() => {
              console.log('start or wait')
              handleFightStart()
            }}
          >
            Start fight!
          </button> 
        )} */}
      </div>

      {/* upper isle */}
      <div className='rpgui-container framed-grey vs-container' style={{ marginTop: '24px' }}>
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

      {/* fight mons area, fight against area */}

      {_account === room?.creator && (
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
                  account={room?.creator}
                  choice='1'
                />
              </div>
            </Col>
          </Row>
        </div>
      )}

      {_account === otherPlayer && (
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
                  mons={otherPlayerMons}
                  setFightChoiceFunc={setFightChoice2Func}
                  account={otherPlayer}
                  choice='2'
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default Room
