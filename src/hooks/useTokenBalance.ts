import { SetStateAction, useEffect, useState } from 'react'
import { TokenBalanceParam } from '../components/common/interfaces'

/**
 * Token balance of user
 *
 * @param  {TokenBalanceParam} props
 */
const useTokenBalance = ({
  account,
  library,
  getTokenBalance,
  refreshMons,
}: TokenBalanceParam): Record<string, unknown> => {
  const [tokenBalance, setTokenBalance] = useState('0')

  useEffect(() => {
    let mounted = true

    getTokenBalance(library, account)?.then((result: SetStateAction<string>) => {
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
