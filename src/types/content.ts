import { Content } from "@prisma/client";
import { TUser } from "./user";

export type TContent = Content & { postBy: TUser };
export type TCreateContent = Pick<Content, "videoUrl" | "comment" | "rating">;
export type TCreateContentData = Omit<
	Content,
	"id" | "createdAt" | "updatedAt"
>;
export type TUpdateContent = {
	comment: string;
	rating: number;
};
