import { TCreateUserDTO, TCredentialDTO, TUserDTO } from "../../dto";

export type TAuthServices = {
	createUser: (createUserData: TCreateUserDTO) => TUserDTO;
	login: (username: string, password: string) => TCredentialDTO;
	getMyDetail: (token: string) => TUserDTO;
};
