import cors from 'cors'
import { corsOption } from '../configs'
import ErrorHandler from './errorMiddleware'
import JWTMiddleware from './jwtMiddleware'
import LoggerMiddleware from './loggerMiddleware'
import AuthProtectMiddleware from './protectedMiddleware'

export const errorHandler = new ErrorHandler()
export const jwtMiddleware = new JWTMiddleware()
export const logger = new LoggerMiddleware()
export const authProtect = new AuthProtectMiddleware()
export const configedCors = cors(corsOption)
