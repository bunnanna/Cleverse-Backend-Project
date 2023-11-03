import { RequestHandler } from 'express'
import { TLocalOrnull } from '../types'
import { UnAuthorized401Error } from '../utils/error'

export default class AuthProtectMiddleware {
  hasCredential: RequestHandler<unknown, unknown, unknown, unknown, TLocalOrnull> = (req, res, next) => {
    const { credential } = res.locals

    if (!credential) throw new UnAuthorized401Error('Unauthorized')
    next()
  }
}
