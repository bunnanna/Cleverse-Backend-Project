import { RequestHandler } from 'express'
import { Forbidden403Error } from '../configs/error'
import { verifyJWT } from '../utils'

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
