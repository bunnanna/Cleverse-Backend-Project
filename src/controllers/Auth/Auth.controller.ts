import { TAuthService } from "../../services/Auth";
import { TTokenData } from "../../types/user";
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
		const local = res.locals;
		console.log(local);

		const user = await this.service.getMyDetail(local);
		return res.status(200).json(user).end();
	};
}
