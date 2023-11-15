import express from 'express'
import { client, redis } from '../configs/db'
import AuthController from '../controllers/Auth'
import { authProtect } from '../middlewares'
import BacklistRepository from '../repositories/Backlist'
import UserRepository from '../repositories/User'
import AuthService from '../services/Auth'

const userRepo = new UserRepository(client)
const blacklistRepo = new BacklistRepository(redis)
const authService = new AuthService(userRepo, blacklistRepo)
const authController = new AuthController(authService)

const authRouter = express.Router()

authRouter.get('/me', authProtect.hasCredential)

authRouter.post('/login', authController.login)
authRouter.get('/me', authController.me)

export default authRouter
