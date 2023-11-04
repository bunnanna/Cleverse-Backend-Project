export abstract class HttpCodeError extends Error {
  readonly name: string = 'UnknownError'
  readonly statuscode: number = 500
}

export class BadRequest400Error extends HttpCodeError {
  readonly name: string = 'BadRequest'
  readonly statuscode = 400
}
export class UnAuthorized401Error extends HttpCodeError {
  readonly name: string = 'UnAuthorized'
  readonly statuscode = 401
}
export class Forbidden403Error extends HttpCodeError {
  readonly name: string = 'Forbidden'
  readonly statuscode = 403
}
export class NotFound404Error extends HttpCodeError {
  readonly name: string = 'NotFound'
  readonly statuscode = 404
}
export class Conflict409Error extends HttpCodeError {
  readonly name: string = 'Conflict'
  readonly statuscode = 409
}
export class ImaTeapot418Error extends HttpCodeError {
  readonly name: string = 'ImaTeapot'
  readonly statuscode = 418
}
