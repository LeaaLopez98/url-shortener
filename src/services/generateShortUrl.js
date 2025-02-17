import Hashids from 'hashids'
import { getCounterValue } from './counterService.js'

const hashids = new Hashids(process.env.SALT, 6)

export const generateShortUrl = async () => {
  const counter = await getCounterValue()

  const modifiedCounter = hashids.encode(counter)

  return modifiedCounter
}
