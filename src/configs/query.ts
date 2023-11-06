import { Prisma } from '@prisma/client'

export const SELECT_USER: Prisma.UserSelect = {
  id: true,
  name: true,
  username: true,
  registeredAt: true,
}

export const SELECT_CONTENT: Prisma.ContentSelect = {
  id: true,
  videoTitle: true,
  videoUrl: true,
  comment: true,
  rating: true,
  thumbnailUrl: true,
  creatorName: true,
  creatorUrl: true,
  postedBy: {
    select: SELECT_USER,
  },
  createdAt: true,
  updatedAt: true,
}
