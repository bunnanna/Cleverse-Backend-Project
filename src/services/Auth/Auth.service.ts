import { BadRequest400Error, Conflict409Error, NotFound404Error } from '../../configs/error'
import { TUserRepository } from '../../repositories/User'
import { signJWT, verifyPassword } from '../../utils'
import { createUserValidator, loginValidator, usernameValidator } from '../../utils/Validator'
import { TAuthService } from './Auth.type'
export default class AuthService implements TAuthService {
  constructor(private repo: TUserRepository) {}

  createUser: TAuthService['createUser'] = async (createUserData) => {
    const validatedUserData = createUserValidator(createUserData)

    const duplicate = await this.repo.getOneByUsername(validatedUserData.username)
    if (duplicate) throw new Conflict409Error('This username aleady exist.')

    const newUser = await this.repo.create(validatedUserData)

    return newUser
  }

  login: TAuthService['login'] = async (loginBody) => {
    const validatedLoginBody = loginValidator(loginBody)

    const user = await this.repo.getOneByUsername(validatedLoginBody.username)
    if (!user) throw new BadRequest400Error('Invalid username or password')

    if (!verifyPassword(validatedLoginBody.password, user.password)) {
      throw new BadRequest400Error('Invalid username or password')
    }

    return signJWT({ id: user.id })
  }

  getMyDetail: TAuthService['getMyDetail'] = async (credential) => {
    const { id } = credential

    const user = await this.repo.getOne(id)
    return user
  }
  getUserDetail: TAuthService['getUserDetail'] = async (username) => {
    const result = await this.repo.getOneByUsername(usernameValidator(username))
    if (!result) throw new NotFound404Error('username not found.')
    const { password, ...user } = result
    return user
  }
}
