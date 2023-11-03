export type TUserDTO = {
  id: string
  username: string
  name: string
  registeredAt: Date
}

export type TCreateUserDTO = {
  username: string
  name: string
  password: string
}
