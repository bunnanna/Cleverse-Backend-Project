import { ErrorRequestHandler, Response } from 'express'
import { TErrorDTO } from '../dto'
import { HttpCodeError } from '../utils/error.class'
import { ValidationError } from '../utils/validator.class'

export default class ErrorHandler {
  httpErrorHandler: ErrorRequestHandler = (err: Error, req, res: Response<TErrorDTO>, next) => {
    if (err instanceof (HttpCodeError || err instanceof ValidationError)) {
      res
        .status(err.statuscode || 400)
        .json({ message: err.message })
        .end()
    } else {
      console.log(`${500}\t${err.message}`)
      res.status(500).json({ message: err.message }).end()
    }

    next()
  }
}
