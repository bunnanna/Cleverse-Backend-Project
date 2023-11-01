import { RequestHandler } from "express";
import { JWT_SECRET } from "../configs";
import { verify } from "jsonwebtoken";
import { Forbidden403Error, UnAuthorized401Error } from "../utils/error.class";
import { TUserLocal } from "../types/user";

export default class JWTMiddleware {
	constructor() {
		if (!JWT_SECRET) throw new Error("JWT_SECRET is undifined");
	}

	decode: RequestHandler = (req, res, next) => {
		const AuthHeader = req.headers?.authorization;
		if (!AuthHeader) return next();
		const token = AuthHeader.replace("Bearer ", "");
		try {
			const user = verify(token, JWT_SECRET!);
			res.locals = { user };
			next();
		} catch (error) {
			if (error instanceof Error) throw new Forbidden403Error(error.message);
		}
	};
}
