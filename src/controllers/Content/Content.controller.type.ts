import { RequestHandler } from "express";
import { TContentDTO, TCreateContentDTO, TUpdateContentDTO } from "../../dto";
import { TContent, TUpdateContent } from "../../types/content";
import { TCredential, TLocal } from "../../types";

export type TContentController = {
	getAll: RequestHandler<{}, TContentDTO[]>;
	getOne: RequestHandler<{ id: string }, TContentDTO>;
	create: RequestHandler<{}, TContentDTO, TCreateContentDTO, unknown, TLocal>;
	update: RequestHandler<
		{ id: string },
		TContentDTO,
		TUpdateContentDTO,
		unknown,
		TLocal
	>;
	delete: RequestHandler<
		{ id: string },
		TContentDTO,
		TCreateContentDTO,
		unknown,
		TLocal
	>;
};
