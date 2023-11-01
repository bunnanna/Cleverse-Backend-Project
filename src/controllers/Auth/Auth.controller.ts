import { TAuthService } from "../../services/Auth";
import { TAuthController } from "./Auth.type";

export default class AuthController implements TAuthController {
	constructor(private service: TAuthService) {}
	createUser: TAuthController["createUser"] = async (req, res) => {
		const createUserBody = req.body;
		const newUser = await this.service.createUser(createUserBody);
		res.status(201).json(newUser);
	};
}
