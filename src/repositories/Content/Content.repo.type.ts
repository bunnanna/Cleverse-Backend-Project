import { TContentDTO, TCreateContentDTO } from "../../dto";
import {
	TContent,
	TCreateContentData,
	TUpdateContent,
} from "../../types/content";

export type TContentRepository = {
	getAll: () => Promise<TContentDTO[]>;
	getOne: (id: number) => Promise<TContentDTO | null>;
	create: (contentBody: TCreateContentData) => Promise<TContentDTO>;
	update: (id: number, updateBody: TUpdateContent) => Promise<TContentDTO>;
	delete: (id: number) => Promise<TContentDTO>;
};
