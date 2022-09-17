import { useState, useEffect } from 'react'

const useRecognizeConnector = ({ connector, refreshMons }) => {
  const [activatingConnector, setActivatingConnector] = useState<any>()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
    refreshMons()
  }, [activatingConnector, connector])
  return { activatingConnector, setActivatingConnector }
}

export default useRecognizeConnector
