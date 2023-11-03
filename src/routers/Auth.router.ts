import express from 'express'
import client from '../configs/db'
import AuthController from '../controllers/Auth'
import { authProtect } from '../middlewares'
import UserRepository from '../repositories/User'
import AuthService from '../services/Auth'

const userRepo = new UserRepository(client)
const authService = new AuthService(userRepo)
const authController = new AuthController(authService)

const authRouter = express.Router()

authRouter.get('/me', authProtect.hasCredential)

authRouter.post('/login', authController.login)
authRouter.get('/me', authController.me)

export default authRouter
