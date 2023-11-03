import express from 'express'
import client from '../configs/db'
import AuthController from '../controllers/Auth'
import authProtectMiddleware from '../middlewares/protectedMiddleware'
import UserRepository from '../repositories/User'
import AuthService from '../services/Auth'

const userRepo = new UserRepository(client)
const authService = new AuthService(userRepo)
const authController = new AuthController(authService)

const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.get('/me', authProtectMiddleware, authController.me)

export default authRouter
