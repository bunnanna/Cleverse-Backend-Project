import { JWT_SECRET } from "../../configs";
import { TCreateUserDTO, TLoginDTO } from "../../dto";
import { TUserRepository } from "../../repositories/User";
import { TUserLocal } from "../../types/user";
import { hashPassword, verifyPassword } from "../../utils/bcrypt";
import {
	Conflict409Error,
	UnAuthorized401Error,
} from "../../utils/error.class";
import { TAuthService } from "./Auth.type";
import { sign } from "jsonwebtoken";
export default class AuthService implements TAuthService {
	constructor(private repo: TUserRepository) {}
	private validateCreateUser = (createUserData: TCreateUserDTO) => {
		const { name, username, password } = createUserData;
		if (!name || name.length === 0) throw new Error("name field required");
		if (!username || username.length === 0)
			throw new Error("username field required");
		if (!password || password.length === 0)
			throw new Error("password field required");
		return { name, username, password: hashPassword(password) };
	};
	createUser: TAuthService["createUser"] = async (createUserData) => {
		const validatedUserData = this.validateCreateUser(createUserData);
		const duplicate = await this.repo.getOneByUsername(
			validatedUserData.username
		);
		if (duplicate) throw new Conflict409Error("Duplicate data");

		const newUser = await this.repo.create(validatedUserData);

		return newUser;
	};

	private validateLogin = (loginBody: TLoginDTO) => {
		const { username, password } = loginBody;
		if (!username || username.length === 0)
			throw new Error("username field required");
		if (!password || password.length === 0)
			throw new Error("password field required");
		return { username, password };
	};
	login: TAuthService["login"] = async (loginBody) => {
		const { username, password } = this.validateLogin(loginBody);
		const user = await this.repo.getOneByUsername(username);
		if (!user) throw new Error("Invalid username or password");

		console.log(user);

		if (!verifyPassword(password, user.password)) {
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
