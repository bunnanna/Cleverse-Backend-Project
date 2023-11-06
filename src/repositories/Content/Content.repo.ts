import { PrismaClient } from '@prisma/client'
import { SELECT_CONTENT } from '../../configs'
import { TContentRepository } from './Content.repo.type'

export default class ContentRepository implements TContentRepository {
  constructor(private prisma: PrismaClient) {}
  getAll: TContentRepository['getAll'] = () => {
    return this.prisma.content.findMany({ select: SELECT_CONTENT })
  }
  getOne: TContentRepository['getOne'] = (id) => {
    return this.prisma.content.findUnique({ select: SELECT_CONTENT, where: { id } })
  }
  create: TContentRepository['create'] = (contentBody) => {
    const { ownerId, ...contentData } = contentBody
    const currentTime = new Date()
    return this.prisma.content.create({
      data: {
        ...contentData,
        createdAt: currentTime,
        updatedAt: currentTime,
        postedBy: { connect: { id: ownerId } },
      },
      select: SELECT_CONTENT,
    })
  }
  update: TContentRepository['update'] = (id, updateBody) => {
    return this.prisma.content.update({
      where: { id },
      data: { ...updateBody, updatedAt: new Date() },
      select: SELECT_CONTENT,
    })
  }
  delete: TContentRepository['delete'] = (id) => {
    return this.prisma.content.delete({ where: { id }, select: SELECT_CONTENT })
  }
}
