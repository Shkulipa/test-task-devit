import { Schema, model, Types } from "mongoose";
import { NameModel } from "../interfaces/nameModels.interfaces";
import { ITokens } from "../interfaces/token.interfaces";

const refreshTokensSchema = new Schema<ITokens>(
	{
		userId: {
			type: Types.ObjectId,
			ref: NameModel.USERS
		},
		refreshToken: {
			type: String,
			required: true
		}
	},
	{ versionKey: false }
);

export const RefreshTokensModel = model<ITokens>(
	NameModel.REFRESH_TOKENS,
	refreshTokensSchema
);
