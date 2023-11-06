import { RequestHandler } from 'express'
import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from '../../dto'
import { TLocal, TUser } from '../../types'
import { TEmptyParam, TUsernameParam } from '../utils'

export type TAuthController = {
  createUser: RequestHandler<TEmptyParam, TUser, TCreateUserDTO>
  login: RequestHandler<TEmptyParam, TCredentialDTO, TLoginDTO>
  me: RequestHandler<TEmptyParam, TUser, unknown, unknown, TLocal>
  getUserDetail: RequestHandler<TUsernameParam, TUser>
}
