import { TAuthService } from "../../services/Auth";
import { TAuthController } from "./Auth.type";

export default class AuthController implements TAuthController {
	constructor(private service: TAuthService) {}
	createUser: TAuthController["createUser"] = async (req, res) => {
		const createUserBody = req.body;
		const newUser = await this.service.createUser(createUserBody);
		res.status(201).json(newUser);
	};
	login: TAuthController["login"] = async (req, res) => {
		const loginBody = req.body;

		const credential = await this.service.login(loginBody);
		return res.status(200).json(credential).end();
	};
	me: TAuthController["me"] = async (req, res) => {
		const { credential } = res.locals;
		const user = await this.service.getMyDetail(credential);
		return res.status(200).json(user).end();
	};
}
