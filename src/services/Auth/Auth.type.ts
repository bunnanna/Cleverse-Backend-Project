import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from "../../dto";
import { TCredential } from "../../types";
import { TUser, TLocal } from "../../types/user";

export type TAuthService = {
	createUser: (createUserData: TCreateUserDTO) => Promise<TUser>;
	login: (loginBody: TLoginDTO) => Promise<TCredentialDTO>;
	getMyDetail: (locals: TCredential) => Promise<TUser>;
};
