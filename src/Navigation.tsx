import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MonImages from './sprites-copy'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { UnsupportedChainIdError } from '@web3-react/core'

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

const Navigation = ({ error, children }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand as="li">
        <img alt="" src={MonImages['favicon32x32']} width="30" height="30" className="d-inline-block" />
        <Link to="/" className="LokiMons">
          Lokian Monsters
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto lokimons-nav">
          <Nav.Link as="li">
            <Link to="/myLokiMons">My LokiMons</Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/myShop">My Shop</Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/dojo">Dojo</Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/arena">Arena</Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/breed">Breed</Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/marketplace">Marketplace</Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/share">Share</Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/sharedToMe">Shared To Me</Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/token">Token</Link>
          </Nav.Link>
          <Nav.Link as="li">{!!error && <h4>{getErrorMessage(error)}</h4>}</Nav.Link>
        </Nav>
        <Nav className="lokimons-nav-wallet">{children}</Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
