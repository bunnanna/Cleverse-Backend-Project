import { TUserDTO } from './user'

export type TContentDTO = {
  id: number
  videoTitle: string
  videoUrl: string
  comment: string
  rating: number
  thumbnailUrl: string
  createdAt: Date
  updatedAt: Date
  postedBy: TUserDTO
}

export type TContentsDTO = TContentDTO[]

export type TCreateContentDTO = {
  videoUrl: string
  comment: string
  rating: string
}

export type TUpdateContentDTO = {
  comment: string
  rating: string
}
