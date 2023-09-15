/* eslint-disable @typescript-eslint/no-explicit-any */


import { Nav } from 'react-bootstrap'
import { Account } from './components/core/Account'
import React from 'react'
import { Spinner } from './components'
import { injected } from './wallet/connectors'

const NavWallet = ({
  activatingConnector,
  setActivatingConnector,
  connector,
  triedEager,
  error,
  activate,
  account,
  active,
  deactivate,
  resetMons,
  setWinner,
  setRounds,
}: Any): JSX.Element => {
  enum ConnectorNames {
    Injected = 'Injected',
  }
  const connectorsByName: { [connectorName in ConnectorNames] } = {
    [ConnectorNames.Injected]: injected,
  }

  return (
    <>
      {/* wallet info */}
      {Object.keys(connectorsByName).map((name, idx) => {
        const currentConnector = connectorsByName[name]
        const activating = currentConnector === activatingConnector
        const connected = currentConnector === connector
        const disabled = !triedEager || !!activatingConnector || connected || !!error

        return (
          <Nav.Link key={name + idx} as="li">
            <button
              className="rpgui-button golden"
              type="button"
              style={{
                fontSize: '20px',
                paddingTop: '14px',
                width: '350px',
              }}
              onClick={() => {
                setActivatingConnector(currentConnector)
                activate(currentConnector)
              }}
              disabled={disabled}
              key={name}
            >
              {activating && (
                <Spinner color={'black'} style={{ height: '25%', marginLeft: '-1rem' }} animation={'border'} />
              )}
              <Account />
              <span>{!account ? 'Connect Wallet' : ''}</span>
            </button>
          </Nav.Link>
        )
      })}
      {/* wallet logout */}
      <Nav.Link as="li">
        {(active || error) && (
          <button
            className="rpgui-button"
            onClick={() => {
              deactivate()
              resetMons()
              setWinner(null)
              setRounds(null)
            }}
          >
            Logout
          </button>
        )}
      </Nav.Link>
    </>
  )
}

export default NavWallet
