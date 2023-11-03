export * from './content'
export * from './user'
export type TCredential = { id: string }
export type TLocal = { credential: TCredential }
export type TLocalOrnull = Partial<TLocal>
