import { RefreshTokensModel } from './../models/refresh-tokens.model';
import { Types } from "mongoose";
import Jwt from "./jwt.service";
import { IJtwData, ITokensDecode } from "../interfaces/jwt.interfaces";
import { UserModel } from '../models/user.model';

class TokenService {
	async refresh(token: string) {
		try {
			if (!token) throw new Error("Token wasn't provided");

			if (!process.env.SECRET_REFRESH_TOKEN)
				throw new Error(
					"Please create variable <SECRET_REFRESH_TOKEN> in your .env file"
				);

			const tokenData = Jwt.verifyJwtToken(
				token,
				process.env.SECRET_REFRESH_TOKEN
			) as ITokensDecode;

			const tokenDB = await RefreshTokensModel.findOne({
				refreshToken: token
			});

			if (!tokenDB) throw new Error("Token in DB wasn't find");

			if (tokenData.expired)
				throw new Error("Your token is expired, please login again");

			const user = await UserModel.findOne({
				_id: tokenData.decoded._id
			});
			if (!user)
				throw new Error(
					`User with email:${tokenData.decoded.email} didn't found`
				);

			const jwtDataPayload: IJtwData = {
				name: user.name,
				email: user.email,
				_id: new Types.ObjectId(user._id)
			};

			const { refreshToken, accessToken } = await Jwt.createTokens(jwtDataPayload);
		  const userData = {
        ...jwtDataPayload,
        refreshToken,
        accessToken
      }

			await RefreshTokensModel.findOneAndUpdate(
				{ userId: user._id },
				{ refreshToken }
			);

			return userData;
		} catch (err: any) {
			throw new Error(err);
		}
	}
}

export default new TokenService();
