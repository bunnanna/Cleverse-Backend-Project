import express from "express";
import UserRepository from "../repositories/User";
import AuthService from "../services/Auth";
import AuthController from "../controllers/Auth";
import client from "../configs/db";

const userRepo = new UserRepository(client);
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

const userRouter = express.Router();

userRouter.post("/", authController.createUser);

export default userRouter;
