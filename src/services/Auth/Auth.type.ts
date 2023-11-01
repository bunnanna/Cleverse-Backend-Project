import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from "../../dto";
import { TUser, TUserLocal } from "../../types/user";

export type TAuthService = {
	createUser: (createUserData: TCreateUserDTO) => Promise<TUser>;
	login: (loginBody: TLoginDTO) => Promise<TCredentialDTO>;
	getMyDetail: (locals: TUserLocal) => Promise<TUser>;
};
