export type TUserDTO = {
	id: string;
	username: string;
	name: string;
	registeredAt: string;
};

export type CreateUserDTO = {
	username: string;
	name: string;
	password: string;
};
