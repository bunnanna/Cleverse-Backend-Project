import { TUserDTO } from "../dto";

export type TUser = Omit<TUserDTO, "registeredAt"> & { registeredAt: Date };

export type TTokenData = { user?: { id: string } };
