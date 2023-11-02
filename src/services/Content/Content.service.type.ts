import { TUpdateContentDTO } from "../../dto";
import { TaccessToken } from "../../types";
import { TContent, TCreateContent, TUpdateContent } from "../../types/content";

export type TContentService = {
	getAll: () => Promise<TContent[]>;
	getOne: (contentId: string) => Promise<TContent>;
	// create: (
	// 	createBody: TCreateContent,
	// 	accessToken: string
	// ) => Promise<TContent>;
	update: (
		contentId: string,
		updateBody: TUpdateContentDTO,
		accessToken: TaccessToken
	) => Promise<TContent>;
	delete: (contentId: string, accessToken: TaccessToken) => Promise<TContent>;
};
