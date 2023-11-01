import { TCreateUserDTO, TCredentialDTO, TLoginDTO } from "../../dto";
import { TUserRepository } from "../../repositories/User";
import { verifyPassword } from "../../utils/bcrypt";
import { TAuthService } from "./Auth.type";

export default class AuthService implements TAuthService {
	constructor(private repo: TUserRepository) {}
	private validateCreateUser = (createUserData: TCreateUserDTO) => {
		const { name, username, password } = createUserData;
		if (!name || name.length === 0) throw new Error("name field required");
		if (!username || username.length === 0)
			throw new Error("username field required");
		if (!password || password.length === 0)
			throw new Error("password field required");
		return { name, username, password };
	};
	createUser: TAuthService["createUser"] = async (createUserData) => {
		const validatedUserData = this.validateCreateUser(createUserData);

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
		const { username, password } = await this.validateLogin(loginBody);
		const user = await this.repo.getOneByUsername(username).catch(() => {
			throw new Error("Invalid username or password");
		});
		if (!verifyPassword(password, user.password)) {
			throw new Error("Invalid username or password");
		}
		// TODO JWT
		return { accessToken: "sfmd;smcs" };
	};

	// getMyDetail:TAuthService= (credential: TCredentialDTO)=>{

	// }
}
