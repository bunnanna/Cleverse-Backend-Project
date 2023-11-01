import { PrismaClient } from "@prisma/client";
import { TUserRepository } from "./User.repo.type";

export default class UserRepository implements TUserRepository {
	constructor(private prisma: PrismaClient) {}

	getOne: TUserRepository["getOne"] = async (id) => {
		const result = await this.prisma.user.findUniqueOrThrow({ where: { id } });
		return result;
	};

	create: TUserRepository["create"] = async (createBody) => {
		const createdUser = await this.prisma.user.create({ data: createBody });
		return createdUser;
	};
}
