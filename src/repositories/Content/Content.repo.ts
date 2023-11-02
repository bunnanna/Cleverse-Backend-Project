import { PrismaClient } from "@prisma/client";
import { TContentRepository } from "./Content.repo.type";
import { TContent } from "../../types/content";
import { TContentDTO } from "../../dto";

export default class ContentRepository implements TContentRepository {
	private readonly defaultquery = {
		select: {
			id: true,
			videoTitle: true,
			videoUrl: true,
			comment: true,
			rating: true,
			thumbnailUrl: true,
			creatorName: true,
			creatorUrl: true,
			postBy: {
				select: {
					id: true,
					name: true,
					username: true,
					registeredAt: true,
				},
			},
			createdAt: true,
			updatedAt: true,
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
		const currentTime = new Date();
		return this.prisma.content.create({
			data: {
				...contentData,
				createdAt: currentTime,
				updatedAt: currentTime,
				postBy: { connect: { id: ownerId } },
			},
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
