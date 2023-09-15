import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import App from './App'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers'
import { ErrorBoundary } from './ErrorBoundary'

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

// eslint-disable-next-line react/display-name
export default function (): JSX.Element {
  return (
    <ErrorBoundary fallback={<p>something went wrong</p>}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
    </ErrorBoundary>
  )
}
