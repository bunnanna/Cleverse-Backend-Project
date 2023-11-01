import { RequestHandler } from "express";
import { TUser, TUserLocal } from "../../types/user";
import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from "../../dto";

export type TAuthController = {
	createUser: RequestHandler<{}, TUser, TCreateUserDTO>;
	login: RequestHandler<{}, TCredentialDTO, TLoginDTO>;
	me: RequestHandler<{}, TUser, unknown, unknown, TUserLocal>;
};
