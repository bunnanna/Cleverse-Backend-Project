import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from "../../dto";
import { TUser, TLocal } from "../../types/user";

export type TAuthService = {
	createUser: (createUserData: TCreateUserDTO) => Promise<TUser>;
	login: (loginBody: TLoginDTO) => Promise<TCredentialDTO>;
	getMyDetail: (locals: TLocal) => Promise<TUser>;
};
