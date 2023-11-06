import { RequestHandler } from 'express'
import { TContentDTO, TCreateContentDTO, TUpdateContentDTO } from '../../dto'
import { TLocal } from '../../types'
import { TEmptyParam, TIdParam } from '../utils'

export type TContentController = {
  getAll: RequestHandler<TEmptyParam, TContentDTO[]>
  getOne: RequestHandler<TIdParam, TContentDTO>
  create: RequestHandler<TEmptyParam, TContentDTO, TCreateContentDTO, unknown, TLocal>
  update: RequestHandler<TIdParam, TContentDTO, TUpdateContentDTO, unknown, TLocal>
  delete: RequestHandler<TIdParam, TContentDTO, TCreateContentDTO, unknown, TLocal>
}
