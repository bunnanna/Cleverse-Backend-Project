import { Validatestr } from '../../configs/validator'
import { TCreateUserDTO, TLoginDTO } from '../../dto'
import { hashPassword } from '../bcrypt'

export class AuthValidator {
  private username = new Validatestr('username').notEmpty()
  private password = new Validatestr('password').notEmpty()
  private name = new Validatestr('name').notEmpty()

  loginValidator = (loginBody: TLoginDTO): TLoginDTO => {
    const { username, password } = loginBody
    return {
      username: this.username.apply(username),
      password: this.password.apply(password),
    }
  }

  createUserValidator = (createUserData: TCreateUserDTO): TCreateUserDTO => {
    const { name, username, password } = createUserData
    return {
      name: this.name.apply(name),
      username: this.username.apply(username),
      password: hashPassword(this.password.apply(password)),
    }
  }

  usernameValidator = (username: string) => this.username.apply(username)
}
