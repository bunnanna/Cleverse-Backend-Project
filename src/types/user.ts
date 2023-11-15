import { TUserDTO } from '../dto'

export type TUser = Omit<TUserDTO, 'registeredAt'> & { registeredAt: Date }
