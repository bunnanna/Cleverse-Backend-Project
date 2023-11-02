import { RequestHandler } from "express";
import { TLocalOrnull } from "../types";
import { Forbidden403Error, UnAuthorized401Error } from "../utils/error.class";

const authProtectMiddleware: RequestHandler<
	unknown,
	unknown,
	unknown,
	unknown,
	TLocalOrnull
> = (req, res, next) => {
	const { user } = res.locals;
	if (!user) throw new UnAuthorized401Error("Unauthorized");
	next();
};
export default authProtectMiddleware;
