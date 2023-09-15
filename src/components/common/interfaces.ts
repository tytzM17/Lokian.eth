import { Web3Provider } from '@ethersproject/providers'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface RoomType {
  room: string // or room code
  players: string[]
  creator: string
  clients: number
  leaver?: string
  isCreator?: string
  isOtherPlayer?: boolean
}

interface DisconAcct {
  room: RoomType
  leaver: string
}

interface UseLocDiscon {
  pathname: string
  search: string
  hash: string
  state: any
  key: string
}

interface TokenBalanceParam {
  account: string
  library: Web3Provider
  getTokenBalance: AnyFunction
  refreshMons: AnyFunction
}

export type AnyFunction = (...args: any[]) => any

export type VoidFunction = (...args: any[]) => void

export type WsSendFunction = (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void

export type { RoomType, UseLocDiscon, DisconAcct, TokenBalanceParam }
