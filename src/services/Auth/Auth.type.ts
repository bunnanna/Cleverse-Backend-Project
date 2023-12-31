import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from '../../dto'
import { TCredential } from '../../types'
import { TUser } from '../../types/user'

export type TAuthService = {
  createUser: (createUserData: TCreateUserDTO) => Promise<TUser>
  login: (loginBody: TLoginDTO) => Promise<TCredentialDTO>
  logout: (token: string, exp: number) => Promise<void>
  getMyDetail: (locals: TCredential) => Promise<TUser>
  getUserDetail: (username: string) => Promise<TUser>
}
