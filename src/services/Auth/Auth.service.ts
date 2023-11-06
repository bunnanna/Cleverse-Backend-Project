import { BadRequest400Error, Conflict409Error, NotFound404Error } from '../../configs/error'
import { TUserRepository } from '../../repositories/User'
import { signJWT, verifyPassword } from '../../utils'
import { AuthValidator } from '../../utils/Validator'
import { TAuthService } from './Auth.type'
export default class AuthService implements TAuthService {
  private validator = new AuthValidator()
  constructor(private repo: TUserRepository) {}

  createUser: TAuthService['createUser'] = async (createUserData) => {
    const validatedUserData = this.validator.createUserValidator(createUserData)

    const duplicate = await this.repo.getOneByUsername(validatedUserData.username)
    if (duplicate) throw new Conflict409Error('This username aleady exist.')

    const newUser = await this.repo.create(validatedUserData)

    return newUser
  }

  login: TAuthService['login'] = async (loginBody) => {
    const validatedLoginBody = this.validator.loginValidator(loginBody)

    const user = await this.repo.getOneByUsername(validatedLoginBody.username)
    if (!user) throw new BadRequest400Error('Invalid username or password')

    if (!verifyPassword(validatedLoginBody.password, user.password)) {
      throw new BadRequest400Error('Invalid username or password')
    }

    return signJWT({ id: user.id })
  }

  getMyDetail: TAuthService['getMyDetail'] = async (credential) => {
    const { id } = credential

    const user = await this.repo.getOne(id).catch(() => {
      throw new NotFound404Error('Can not get data')
    })
    return user
  }
  getUserDetail: TAuthService['getUserDetail'] = async (username) => {
    const result = await this.repo.getOneByUsername(this.validator.usernameValidator(username))
    if (!result) throw new NotFound404Error('username not found.')
    const { password, ...user } = result
    return user
  }
}
