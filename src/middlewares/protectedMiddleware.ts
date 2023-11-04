import { RequestHandler } from 'express'
import { UnAuthorized401Error } from '../configs/error'
import { TLocalOrnull } from '../types'

export default class AuthProtectMiddleware {
  hasCredential: RequestHandler<unknown, unknown, unknown, unknown, TLocalOrnull> = (req, res, next) => {
    const { credential } = res.locals

    if (!credential) throw new UnAuthorized401Error('Unauthorized')
    next()
  }
}
