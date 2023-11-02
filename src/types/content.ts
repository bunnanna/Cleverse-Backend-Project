import { Content } from "@prisma/client";
import { TUser } from "./user";

export type TContent = Content & { Owner: TUser };
export type TCreateContent = Pick<
	Content,
	"videoUrl" | "comment" | "rating" | "ownerId"
>;
export type TCreateContentData = Omit<Content, "id">;
export type TUpdateContent = {
	comment: string;
	rating: number;
};
