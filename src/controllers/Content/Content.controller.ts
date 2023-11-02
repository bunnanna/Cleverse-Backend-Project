import { TContentService } from "../../services/Content";
import { TContentController } from "./Content.controller.type";

export default class ContentController implements TContentController {
	constructor(private service: TContentService) {}
	getAll: TContentController["getAll"] = async (req, res) => {
		const contents = await this.service.getAll();
		return res.status(200).json(contents);
	};
	getOne: TContentController["getOne"] = async (req, res) => {
		const { id } = req.params;
		const content = await this.service.getOne(id);
		return res.status(200).json(content).end();
	};
	update: TContentController["update"] = async (req, res) => {
		const { id } = req.params;
		const updateBody = req.body;
		const { credential } = res.locals;
		const content = await this.service.update(id, updateBody, credential);
		return res.status(200).json(content).end();
	};
	delete: TContentController["delete"] = async (req, res) => {
		const { id } = req.params;
		const { credential } = res.locals;
		const content = await this.service.delete(id, credential);
		return res.status(200).json(content).end();
	};
}
