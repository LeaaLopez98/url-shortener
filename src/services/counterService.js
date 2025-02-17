import redis from '../config/redis.js'

const counterKey = 'example'

export const getCounterValue = async () => {
  const currentValue = await redis.get(counterKey)
  await redis.incr(counterKey)

  console.log('Current -> ', currentValue)

  return parseInt(currentValue, 10) || 0
}
