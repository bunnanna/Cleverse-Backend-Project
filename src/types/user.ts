import { TUserDTO } from "../dto";

export type TUser = Omit<TUserDTO, "registeredAt"> & { registeredAt: Date };

export type TUserLocal = { user?: { id: string } };
