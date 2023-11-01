import { PrismaClient } from "@prisma/client";
import { TUserRepository } from "./User.repo.type";

export default class UserRepository implements TUserRepository {
	private select = {
		id: true,
		name: true,
		username: true,
		registeredAt: true,
	};
	constructor(private prisma: PrismaClient) {}

	getOne: TUserRepository["getOne"] = async (id) => {
		const result = await this.prisma.user.findUniqueOrThrow({
			where: { id },
			select: this.select,
		});
		return result;
	};
	getOneByUsername: TUserRepository["getOneByUsername"] = async (username) => {
		const result = await this.prisma.user.findFirst({
			where: { username },
		});
		return result;
	};

	create: TUserRepository["create"] = async (createBody) => {
		const createdUser = await this.prisma.user.create({
			data: createBody,
			select: this.select,
		});
		return createdUser;
	};
}
