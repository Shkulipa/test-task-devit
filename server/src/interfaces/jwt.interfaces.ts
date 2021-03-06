import { Types } from "mongoose";

export interface IJtwData {
	_id: Types.ObjectId;
	email: string;
	name: string;
}

export interface IJwtTokens {
	accessToken: string;
	refreshToken: string;
}

export interface IDecoded {
	_id: string;
	name: string;
	email: string;
	iat: number;
	exp: number;
}

export interface ITokensDecode {
	decoded: IDecoded;
	err: string;
	expired: boolean;
}
