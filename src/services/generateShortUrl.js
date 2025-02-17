import Hashids from 'hashids'
import { getCounterValue } from './counterService.js'

const SALT = 'SOMETHING'

const hashids = new Hashids(SALT, 6)

export const generateShortUrl = async () => {
  const counter = await getCounterValue()

  console.log('Counter -> ', counter)

  const modifiedCounter = hashids.encode(counter)

  return modifiedCounter
}
