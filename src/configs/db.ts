import { PrismaClient } from '@prisma/client'
import { RedisClientType, createClient } from 'redis'
export const client = new PrismaClient()
export const redis: RedisClientType = createClient()
