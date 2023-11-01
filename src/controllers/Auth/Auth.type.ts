import { RequestHandler } from "express";
import { TUser } from "../../types/user";
import { TCreateUserDTO, TLoginDTO } from "../../dto";

export type TAuthController = {
	createUser: RequestHandler<{}, TUser, TCreateUserDTO>;
};
