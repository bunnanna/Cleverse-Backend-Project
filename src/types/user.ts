import { TaccessToken } from ".";
import { TUserDTO } from "../dto";

export type TUser = Omit<TUserDTO, "registeredAt"> & { registeredAt: Date };

export type TLocal = { user?: TaccessToken };
