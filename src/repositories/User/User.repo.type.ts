import { User } from "@prisma/client";
import { TUser } from "../../types/user";
import { TUserDTO } from "../../dto";
type TCreateUser = {
	username: string;
	name: string;
	password: string;
};
export type TUserRepository = {
	getOne: (id: string) => Promise<User>;
	getOneByUsername: (username: string) => Promise<User>;
	create: (createUserBody: TCreateUser) => Promise<TUser>;
};
