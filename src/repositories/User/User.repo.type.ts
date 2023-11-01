import { User } from "@prisma/client";
type TCreateUser = {
	username: string;
	name: string;
	password: string;
};
export type TUserRepository = {
	getOne: (id: string) => Promise<User>;
	create: (createUserBody: TCreateUser) => Promise<User>;
};
