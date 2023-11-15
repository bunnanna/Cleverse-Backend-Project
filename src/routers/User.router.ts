import express from 'express'
import { client, redis } from '../configs/db'
import AuthController from '../controllers/Auth'
import BacklistRepository from '../repositories/Backlist'
import UserRepository from '../repositories/User'
import AuthService from '../services/Auth'

const blacklistRepo = new BacklistRepository(redis)
const userRepo = new UserRepository(client)
const authService = new AuthService(userRepo, blacklistRepo)
const authController = new AuthController(authService)

const userRouter = express.Router()

userRouter.post('/', authController.createUser)
userRouter.get('/:username', authController.getUserDetail)

export default userRouter
