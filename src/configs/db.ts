import { PrismaClient } from '@prisma/client'
import { RedisClientType, createClient } from 'redis'
const REDIS_URL = process.env.REDIS_URL
const client = new PrismaClient()
const redis: RedisClientType = createClient({ url: REDIS_URL ?? 'redis://localhost:6379' })
client
  .$connect()
  .then(() => redis.connect())
  .catch((err) => {
    console.error('Error', err)
  })
export { client, redis }
