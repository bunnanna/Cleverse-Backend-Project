import { TContentDTO, TCreateContentDTO } from "../../dto";
import {
	TContent,
	TCreateContentData,
	TUpdateContent,
} from "../../types/content";

export type TContentRepository = {
	getAll: () => Promise<TContent[]>;
	getOne: (id: number) => Promise<TContent | null>;
	create: (contentBody: TCreateContentData) => Promise<TContent>;
	update: (id: number, updateBody: TUpdateContent) => Promise<TContent>;
	delete: (id: number) => Promise<TContent>;
};
