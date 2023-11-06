import express from 'express'
import client from '../configs/db'
import AuthController from '../controllers/Auth'
import UserRepository from '../repositories/User'
import AuthService from '../services/Auth'

const userRepo = new UserRepository(client)
const authService = new AuthService(userRepo)
const authController = new AuthController(authService)

const userRouter = express.Router()

userRouter.post('/', authController.createUser)
userRouter.get('/:username', authController.getUserDetail)

export default userRouter
