import { TUpdateContentDTO } from "../../dto";
import { TCredential } from "../../types";
import { TContent, TCreateContent, TUpdateContent } from "../../types/content";

export type TContentService = {
	getAll: () => Promise<TContent[]>;
	getOne: (contentId: string) => Promise<TContent>;
	create: (
		createBody: TCreateContent,
		credential: TCredential
	) => Promise<TContent>;
	update: (
		contentId: string,
		updateBody: TUpdateContentDTO,
		credential: TCredential
	) => Promise<TContent>;
	delete: (contentId: string, credential: TCredential) => Promise<TContent>;
};
