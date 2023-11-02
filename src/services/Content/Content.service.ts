import { TContentRepository } from "../../repositories/Content";
import { Forbidden403Error, NotFound404Error } from "../../utils/error.class";
import { TContentService } from "./Content.service.type";

export default class ContentService implements TContentService {
	constructor(private repo: TContentRepository) {}

	getAll: TContentService["getAll"] = () => {
		return this.repo.getAll();
	};

	getOne: TContentService["getOne"] = async (contentId) => {
		const content = await this.repo.getOne(+contentId);
		if (!content) throw new NotFound404Error("Content Not Found");
		return content;
	};

	// create:TContentService['create']= (createBody, accessToken) =>{

	// }
	update: TContentService["update"] = async (
		contentId,
		updateBody,
		accessToken
	) => {
		const content = await this.repo.getOne(+contentId);
		if (!content) throw new NotFound404Error("content not found");
		if (content.ownerId !== accessToken.userId)
			throw new Forbidden403Error("The content is not yours");
		const updatedContent = await this.repo.update(+contentId, updateBody);
		return updatedContent;
	};
	delete: TContentService["delete"] = async (contentId, accessToken) => {
		const content = await this.repo.getOne(+contentId);
		if (!content) throw new NotFound404Error("content not found");
		if (content.ownerId !== accessToken.userId)
			throw new Forbidden403Error("The content is not yours");
		const deletedContent = await this.repo.delete(+contentId);
		return deletedContent;
	};
}
