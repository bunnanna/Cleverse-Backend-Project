import express from "express";
import UserRepository from "../repositories/User";
import AuthService from "../services/Auth";
import AuthController from "../controllers/Auth";
import client from "../configs/db";
import authProtectMiddleware from "../middlewares/protectedMiddleware";

const userRepo = new UserRepository(client);
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

const authRouter = express.Router();

authRouter.post("/", authController.createUser);
authRouter.post("/login", authController.login);
authRouter.get("/me", authProtectMiddleware, authController.me);

export default authRouter;
