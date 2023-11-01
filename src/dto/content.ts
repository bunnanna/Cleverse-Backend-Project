import { TUserDTO } from "./user";

export type TContentDTO = {
	id: number;
	videoTitle: string;
	videoUrl: string;
	comment: string;
	rating: string;
	thumbnailUrl: string;
	creatorAt: string;
	updatedAt: string;
	postBy: TUserDTO;
};

export type TContents = TContentDTO[];

export type TCreateContentDTO = {
	videoUrl: string;
	comment: string;
	rating: string;
};
