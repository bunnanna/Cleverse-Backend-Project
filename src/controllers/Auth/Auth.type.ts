import { RequestHandler } from 'express'
import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from '../../dto'
import { TLocal } from '../../types'
import { TUser } from '../../types/user'

export type TAuthController = {
  createUser: RequestHandler<{}, TUser, TCreateUserDTO>
  login: RequestHandler<{}, TCredentialDTO, TLoginDTO>
  me: RequestHandler<{}, TUser, unknown, unknown, TLocal>
}
