import { RequestHandler } from "express";
import { TUser } from "../../types/user";
import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from "../../dto";
import { TLocal } from "../../types";

export type TAuthController = {
	createUser: RequestHandler<{}, TUser, TCreateUserDTO>;
	login: RequestHandler<{}, TCredentialDTO, TLoginDTO>;
	me: RequestHandler<{}, TUser, unknown, unknown, TLocal>;
};
