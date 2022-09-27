import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import App from './App'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

// eslint-disable-next-line react/display-name
export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )
}
