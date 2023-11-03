import { RequestHandler } from 'express'
import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from '../../dto'
import { TLocal, TUser } from '../../types'

export type TAuthController = {
  createUser: RequestHandler<{}, TUser, TCreateUserDTO>
  login: RequestHandler<{}, TCredentialDTO, TLoginDTO>
  me: RequestHandler<{}, TUser, unknown, unknown, TLocal>
}
