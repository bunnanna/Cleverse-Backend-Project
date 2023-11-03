import { sign, verify } from 'jsonwebtoken'
import { JWT_SECRET, JWT_SIGH_OPTION } from '../configs'
import { TCredentialDTO } from '../dto'
import { TCredential } from '../types'

export const verifyJWT = (token: string): TCredential => {
  return verify(token, JWT_SECRET) as TCredential
}

export const signJWT = (credential: TCredential): TCredentialDTO => {
  const accessToken = sign({ id: credential.id }, JWT_SECRET, JWT_SIGH_OPTION)
  return { accessToken }
}
