import { ErrorRequestHandler, Response } from 'express'
import { TErrorDTO } from '../dto'
import { HttpCodeError } from '../utils/error.class'
import { ValidationError } from '../utils/validator.class'

export default class ErrorHandler {
  httpErrorHandler: ErrorRequestHandler = (err: Error, req, res: Response<TErrorDTO>, next) => {
    if (err instanceof (HttpCodeError || ValidationError)) {
      console.log(`${err.statuscode || 400}\t${err.message}`)
      res
        .status(err.statuscode || 400)
        .json({ message: err.message })
        .end()
    } else {
      console.log(`${500}\tInternal Server Error`)
      res.status(500).json({ message: 'Internal Server Error' }).end()
    }

    next()
  }
}
