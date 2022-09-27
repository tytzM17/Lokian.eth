interface RoomType {
  room: string, // or room code
  players: string[],
  creator: string,
  clients: number
}

interface DisconAcct {
  room: RoomType,
  leaver: string
}

interface UseLocDiscon {
  pathname: string,
  search: string,
  hash: string,
  state: object,
  key: string
}

export type { RoomType, UseLocDiscon, DisconAcct }
