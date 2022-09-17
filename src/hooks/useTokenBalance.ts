import { useEffect, useState } from 'react'

const useTokenBalance = ({ account, library, disableBuyItemBtn, disableFightBtn, getTokenBalance, refreshMons }) => {
  const [tokenBalance, setTokenBalance] = useState('0')

  useEffect(() => {
    let mounted = true

    getTokenBalance(library, account).then((result) => {
      if (mounted) {
        setTokenBalance(result)
        refreshMons()
      }
    })

    return () => {
      mounted = false
    }
  }, [account, library, disableBuyItemBtn, disableFightBtn])

  return { tokenBalance }
}

export default useTokenBalance
