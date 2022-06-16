import { IUserModel } from "./user.interfaces";

export interface ITokens {
	userId: IUserModel;
	refreshToken: string;
}

export interface ITokensModel extends Document, ITokens {}
