import { PrismaClient } from '@prisma/client'
import { SELECT_USER } from '../../configs'
import { TUserRepository } from './User.repo.type'

export default class UserRepository implements TUserRepository {
  constructor(private prisma: PrismaClient) {}

  getOne: TUserRepository['getOne'] = async (id) => {
    const result = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: SELECT_USER,
    })
    return result
  }
  getOneByUsername: TUserRepository['getOneByUsername'] = async (username) => {
    const result = await this.prisma.user.findFirst({
      where: { username },
    })
    return result
  }

  create: TUserRepository['create'] = async (createBody) => {
    const createdUser = await this.prisma.user.create({
      data: createBody,
      select: SELECT_USER,
    })
    return createdUser
  }
}
