import { Validatestr } from '../../configs/validator'
import { TCreateUserDTO, TLoginDTO } from '../../dto'
import { hashPassword } from '../bcrypt'

export const loginValidator = (loginBody: TLoginDTO): TLoginDTO => {
  const { username, password } = loginBody
  return {
    username: new Validatestr(username, 'username').notEmpty().length(0).value(),
    password: new Validatestr(password, 'password').notEmpty().length(0).value(),
  }
}

export const createUserValidator = (createUserData: TCreateUserDTO): TCreateUserDTO => {
  const { name, username, password } = createUserData
  return {
    name: new Validatestr(name, 'name').notEmpty().length(0).value(),
    username: new Validatestr(username, 'username').notEmpty().length(0).value(),
    password: hashPassword(new Validatestr(password, 'password').notEmpty().length(0).value()),
  }
}

export const usernameValidator = (username: string) => new Validatestr(username, 'username').notEmpty().value()
