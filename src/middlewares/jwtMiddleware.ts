import { RequestHandler } from 'express'
import { verifyJWT } from '../utils'
import { Forbidden403Error } from '../utils/error'

export default class JWTMiddleware {
  constructor() {}

  decode: RequestHandler = (req, res, next) => {
    const AuthHeader = req.headers?.authorization
    if (!AuthHeader) return next()
    const token = AuthHeader.replace('Bearer ', '')

    try {
      const userTokenData = verifyJWT(token)
      res.locals = { credential: userTokenData }
      next()
    } catch (error) {
      if (error instanceof Error) throw new Forbidden403Error(error.message)
    }
  }
}
