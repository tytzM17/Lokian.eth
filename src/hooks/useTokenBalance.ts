import { SetStateAction, useEffect, useState } from 'react'

const useTokenBalance = ({ account, library, getTokenBalance, refreshMons }) => {
  const [tokenBalance, setTokenBalance] = useState('0')

  useEffect(() => {
    let mounted = true

    getTokenBalance(library, account).then((result: SetStateAction<string>) => {
      if (mounted) {
        setTokenBalance(result)
        refreshMons()
      }
    })

    return () => {
      mounted = false
    }
  }, [account, library])

  return { tokenBalance }
}

export default useTokenBalance
