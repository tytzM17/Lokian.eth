import React from 'react'
import { useNavigate } from 'react-router-dom'

const Room = ({ room, onDisconnect, account }) => {
  let navigate = useNavigate()
  return (
    <>
      <div className="p1-arena green-glow">Room {room?.room}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {' '}
        <button
          className="rpgui-button"
          type="button"
          onClick={() => {
            onDisconnect(null)
            navigate('/arena', { state: { room, leaver: account } })
          }}
        >
          {room?.creator === account ? 'Dissolve' : 'Disconnect'}
        </button>
      </div>
    </>
  )
}

export default Room
