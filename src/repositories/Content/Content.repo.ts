import { PrismaClient } from "@prisma/client";
import { TContentRepository } from "./Content.repo.type";

export default class ContentRepository implements TContentRepository {
	private readonly defaultquery = {
		include: {
			Owner: {
				select: {
					id: true,
					name: true,
					username: true,
					registeredAt: true,
				},
			},
		},
	};
	constructor(private prisma: PrismaClient) {}
	getAll: TContentRepository["getAll"] = () => {
		return this.prisma.content.findMany(this.defaultquery);
	};
	getOne: TContentRepository["getOne"] = (id) => {
		const defaultquery = this.defaultquery;
		return this.prisma.content.findUnique({ ...defaultquery, where: { id } });
	};
	create: TContentRepository["create"] = (contentBody) => {
		const defaultquery = this.defaultquery;
		const { ownerId, ...contentData } = contentBody;
		return this.prisma.content.create({
			data: { ...contentData, Owner: { connect: { id: ownerId } } },
			...defaultquery,
		});
	};
	update: TContentRepository["update"] = (id, updateBody) => {
		const defaultquery = this.defaultquery;
		return this.prisma.content.update({
			where: { id },
			data: { ...updateBody, updatedAt: new Date() },
			...defaultquery,
		});
	};
	delete: TContentRepository["delete"] = (id) => {
		const defaultquery = this.defaultquery;
		return this.prisma.content.delete({ where: { id }, ...defaultquery });
	};
}
