export abstract class HttpCodeError extends Error {
  readonly statuscode: number = 500
}

export class BadRequest400Error extends HttpCodeError {
  readonly statuscode = 400
}
export class UnAuthorized401Error extends HttpCodeError {
  readonly statuscode = 401
}
export class Forbidden403Error extends HttpCodeError {
  readonly statuscode = 403
}
export class NotFound404Error extends HttpCodeError {
  readonly statuscode = 404
}
export class ImaTeapot418Error extends HttpCodeError {
  readonly statuscode = 418
}

export class Conflict409Error extends HttpCodeError {
  readonly statuscode = 409
}
