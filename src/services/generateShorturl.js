import Hashids from 'hashids'

const SALT = 'SOMETHING'

const hashids = new Hashids(SALT, 6)

let counter = 0

export const generateShortUrl = () => {
  counter += 1
  const modifiedCounter = hashids.encode(counter)

  return modifiedCounter
}
