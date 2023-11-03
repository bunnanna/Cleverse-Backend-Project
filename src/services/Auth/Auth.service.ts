import { TUserRepository } from '../../repositories/User'
import { hashPassword, signJWT, verifyPassword } from '../../utils'
import { BadRequest400Error, Conflict409Error } from '../../utils/error'
import { Validatestr } from '../../utils/validator'
import { TAuthService } from './Auth.type'
export default class AuthService implements TAuthService {
  constructor(private repo: TUserRepository) {}

  createUser: TAuthService['createUser'] = async (createUserData) => {
    const { name, username, password } = createUserData
    const validatedUserData = {
      name: new Validatestr(name, 'name').notEmpty().length(0).value(),
      username: new Validatestr(username, 'username').notEmpty().length(0).value(),
      password: hashPassword(new Validatestr(password, 'password').notEmpty().length(0).value()),
    }
    const duplicate = await this.repo.getOneByUsername(validatedUserData.username)
    if (duplicate) throw new Conflict409Error('Duplicate data')

    const newUser = await this.repo.create(validatedUserData)

    return newUser
  }

  login: TAuthService['login'] = async (loginBody) => {
    const { username, password } = loginBody
    const validatedLoginBody = {
      username: new Validatestr(username, 'username').notEmpty().length(0).value(),
      password: new Validatestr(password, 'password').notEmpty().length(0).value(),
    }
    const user = await this.repo.getOneByUsername(validatedLoginBody.username)
    if (!user) throw new BadRequest400Error('Invalid username or password')

    if (!verifyPassword(password, user.password)) {
      throw new BadRequest400Error('Invalid username or password')
    }
    return signJWT({ id: user.id })
  }

  getMyDetail: TAuthService['getMyDetail'] = async (credential) => {
    const { id } = credential

    const user = await this.repo.getOne(id)
    return user
  }
}
