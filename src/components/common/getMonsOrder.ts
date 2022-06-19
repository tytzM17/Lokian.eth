import { formatUnits } from '@ethersproject/units'
import { monName } from '.'
import { Lokimon } from '../models'

const getMonsOrder = (_orderBy: string, _myLokimons: Lokimon[]) => {
  if (!_orderBy) return

  let lokimons = _myLokimons

  switch (_orderBy) {
    case 'nameAZ':
      lokimons.sort((a, b) => {
        const speciesA1 = monName(a.species).toLowerCase()
        const speciesB1 = monName(b.species).toLowerCase()
        if (speciesA1 == speciesB1) return 0
        return speciesA1 < speciesB1 ? -1 : 1
      })
      break
    case 'nameZA':
      lokimons.sort((a, b) => {
        const speciesA2 = monName(a.species).toLowerCase()
        const speciesB2 = monName(b.species).toLowerCase()
        if (speciesA2 == speciesB2) return 0
        return speciesB2 < speciesA2 ? -1 : 1
      })
      break
    case 'idDesc':
      lokimons.sort((a, b) => b.id - a.id)
      break
    case 'idAsc':
      lokimons.sort((a, b) => a.id - b.id)
      break
    case 'priceDesc':
      lokimons.sort((a, b) => parseFloat(formatUnits(b.price, 18)) - parseFloat(formatUnits(a.price, 18)))
      break
    case 'priceAsc':
      lokimons.sort((a, b) => parseFloat(formatUnits(a.price, 18)) - parseFloat(formatUnits(b.price, 18)))
      break
    default:
      lokimons.sort((a, b) => {
        const speciesA3 = monName(a.species).toLowerCase()
        const speciesB3 = monName(b.species).toLowerCase()
        if (speciesA3 == speciesB3) return 0
        return speciesA3 < speciesB3 ? -1 : 1
      })
      break
  }

  return lokimons
}

export default getMonsOrder
