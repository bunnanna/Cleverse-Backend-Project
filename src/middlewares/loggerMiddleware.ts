import { ErrorRequestHandler, RequestHandler } from 'express'
import { TLocal } from '../types'
import { HttpCodeError } from '../utils/error'

export default class LoggerMiddleware {
  requestLog: RequestHandler<unknown, unknown, unknown, unknown, TLocal> = (req, res, next) => {
    console.log(
      `${req.method}\t${req.path}\t${res?.locals?.credential?.id || '00000000000'}\t${new Date().toISOString()}`,
    )
    next()
  }

  errorLog: ErrorRequestHandler = (err: HttpCodeError, req, res, next) => {
    console.log(`Error\t${err.statuscode || 500}\t${err.name}\t${err.message}\t${new Date().toISOString()}`)
    next(err)
  }
}
