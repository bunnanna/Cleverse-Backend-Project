import { RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../configs'
import { Forbidden403Error } from '../utils/error.class'

export default class JWTMiddleware {
  constructor() {}

  decode: RequestHandler = (req, res, next) => {
    const AuthHeader = req.headers?.authorization
    if (!AuthHeader) return next()
    const token = AuthHeader.replace('Bearer ', '')

    try {
      const userTokenData = verify(token, JWT_SECRET!)
      res.locals = { credential: userTokenData }
      next()
    } catch (error) {
      if (error instanceof Error) throw new Forbidden403Error(error.message)
    }
  }
}
