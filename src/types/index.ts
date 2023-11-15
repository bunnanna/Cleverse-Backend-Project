import { JwtPayload } from 'jsonwebtoken'

export * from './content'
export * from './user'
export type TCredential = { id: string }
export type TLocal = { credential: TCredential & JwtPayload }
export type TLocalOrnull = Partial<TLocal>
