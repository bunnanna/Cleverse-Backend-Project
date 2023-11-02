import { RequestHandler } from "express";
import { TContentDTO, TCreateContentDTO, TUpdateContentDTO } from "../../dto";
import { TContent, TUpdateContent } from "../../types/content";
import { TCredential, TLocal } from "../../types";

export type TContentController = {
	getAll: RequestHandler<{}, TContent[]>;
	getOne: RequestHandler<{ id: string }, TContent>;
	// create: RequestHandler<{}, TContent, TCreateContentDTO, unknown, TLocal>;
	update: RequestHandler<
		{ id: string },
		TContent,
		TUpdateContentDTO,
		unknown,
		TLocal
	>;
	delete: RequestHandler<
		{ id: string },
		TContent,
		TCreateContentDTO,
		unknown,
		TLocal
	>;
};
