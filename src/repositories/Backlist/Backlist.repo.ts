import { RedisClientType } from 'redis'
import { TBacklistRepository } from './Backlist.repo.type'

export class BacklistRepository implements TBacklistRepository {
  constructor(private redis: RedisClientType) {}
  checkInBacklist: TBacklistRepository['checkInBacklist'] = async (token) => {
    const val = await this.redis.GET(`bl_${token}`)
    return val !== null
  }
  addToBacklist: TBacklistRepository['addToBacklist'] = async (token, exp) => {
    this.redis.SET(`bl_${token}`, 1, { PXAT: +exp })
    return
  }
}
