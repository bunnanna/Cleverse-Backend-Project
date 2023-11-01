import { User } from "@prisma/client";
import { TUser } from "../../types/user";
type TCreateUser = {
	username: string;
	name: string;
	password: string;
};
export type TUserRepository = {
	getOne: (id: string) => Promise<TUser>;
	getOneByUsername: (username: string) => Promise<User | null>;
	create: (createUserBody: TCreateUser) => Promise<TUser>;
};
