import { TCreateUserDTO, TCredentialDTO, TLoginDTO, TUserDTO } from "../../dto";
import { TUser } from "../../types/user";

export type TAuthService = {
	createUser: (createUserData: TCreateUserDTO) => Promise<TUser>;
	login: (loginBody: TLoginDTO) => Promise<TCredentialDTO>;
	// getMyDetail: (credential: TCredentialDTO) => Promise<TUser>;
};
