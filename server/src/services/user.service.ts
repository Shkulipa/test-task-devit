import { UserModel } from './../models/user.model';
import { RefreshTokensModel } from './../models/refresh-tokens.model';
import { Types } from "mongoose";
import Jwt from "./jwt.service";
import PasswordService from "./passwrod.service";
import logger from "../utils/logger";
import { IUserInput } from "../interfaces/user.interfaces";
import { ITokensModel } from '../interfaces/token.interfaces';
import { ISigninInput } from '../interfaces/signin.interfaces';
import { ApiError } from '../utils/error';

class UserService {
	async signup(input: IUserInput) {
		const { name, password, email } = input;
    
		try {
			const emailExist = await UserModel.findOne({ email });
			if (emailExist)
        throw ApiError.badRequest(`User with email:${email} has already taken`);

			const nameExist = await UserModel.findOne({ name });
			if (nameExist)
        throw ApiError.badRequest(`User with name:${name} has already taken`);

			const encryptPassword = await PasswordService.encrypt(password);
			const user = await UserModel.create({
				email,
				name,
				password: encryptPassword
			});

			const jwtUserPayload = {
        _id: user._id, 
        name, 
        email
      }

			const { refreshToken, accessToken } = await Jwt.createTokens(jwtUserPayload);

			await RefreshTokensModel.create({
				userId: new Types.ObjectId(user._id),
				refreshToken
			});

      const userData = {
        ...jwtUserPayload,
        refreshToken,
        accessToken
      }

			return userData;
		} catch (err: any) {
			logger.error(err);
			throw new Error(err.message);
		}
	}

	async signin(input: ISigninInput) {
		const { email, password } = input;
    const encryptPassword = await PasswordService.encrypt(password);
    console.log("encryptPassword", encryptPassword);
    
		const user = await UserModel.findOne({ email });
		if (!user) throw ApiError.badRequest("User with this email was't found");

		const isCorrectPassword = await PasswordService.compare(
			password,
			user.password!
		);
		if (!isCorrectPassword) throw ApiError.badRequest("Password isn't correct");

    const jwtUserPayload = {
      _id: user._id, 
      name: user.name,
      email
    }

		const { refreshToken, accessToken } = await Jwt.createTokens(jwtUserPayload);

		try {
      const isToken = await RefreshTokensModel.findOne(
				{ userId: new Types.ObjectId(user._id) },
				{ refreshToken }
			);

      if(isToken) {
        await RefreshTokensModel.findOneAndUpdate(
          { userId: new Types.ObjectId(user._id) },
          { refreshToken }
        );
      } else {
        await RefreshTokensModel.create({
          userId: new Types.ObjectId(user._id),
          refreshToken
        });
      }
		} catch (err: any) {
			logger.error(err);
			throw new Error(err.message);
		}

    const userData = {
      ...jwtUserPayload,
      refreshToken,
      accessToken
    }

		return userData;
	}

	async logout(refreshToken: string): Promise<ITokensModel | null> {
		try {
			return await RefreshTokensModel.findOneAndDelete({ refreshToken });
		} catch (err: any) {
			logger.error(err);
			throw new Error(err.message);
		}
	} 

}

export default new UserService();
