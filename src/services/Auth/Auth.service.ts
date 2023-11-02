import { JWT_SECRET } from "../../configs";
import { TUserRepository } from "../../repositories/User";
import { TUserLocal } from "../../types/user";
import { hashPassword, verifyPassword } from "../../utils/bcrypt";
import {
	Conflict409Error,
	UnAuthorized401Error,
} from "../../utils/error.class";
import Validator from "../../utils/validator.class";
import { TAuthService } from "./Auth.type";
import { sign } from "jsonwebtoken";
export default class AuthService implements TAuthService {
	constructor(private repo: TUserRepository) {}

	createUser: TAuthService["createUser"] = async (createUserData) => {
		const { name, username, password } = createUserData;
		const validatedUserData = {
			name: new Validator.str(name, "name").notEmpty().length(0).value(),
			username: new Validator.str(username, "username")
				.notEmpty()
				.length(0)
				.value(),
			password: hashPassword(
				new Validator.str(password, "password").notEmpty().length(0).value()
			),
		};
		const duplicate = await this.repo.getOneByUsername(
			validatedUserData.username
		);
		if (duplicate) throw new Conflict409Error("Duplicate data");

		const newUser = await this.repo.create(validatedUserData);

		return newUser;
	};

	login: TAuthService["login"] = async (loginBody) => {
		const { username, password } = loginBody;
		const validatedLoginBody = {
			username: new Validator.str(username, "username")
				.notEmpty()
				.length(0)
				.value(),
			password: new Validator.str(password, "password")
				.notEmpty()
				.length(0)
				.value(),
		};
		const user = await this.repo.getOneByUsername(validatedLoginBody.username);
		if (!user) throw new Error("Invalid username or password");

		if (!verifyPassword(validatedLoginBody.password, user.password)) {
			throw new Error("Invalid  password");
		}
		const accessToken = sign({ id: user.id }, JWT_SECRET!, {
			algorithm: "HS512",
			expiresIn: "2d",
		});
		return { accessToken };
	};

	getMyDetail: TAuthService["getMyDetail"] = async (local: TUserLocal) => {
		const id = local.user?.id;
		if (!id) throw new UnAuthorized401Error("UnAuthorized");

		const user = await this.repo.getOne(id);
		return user;
	};
}
