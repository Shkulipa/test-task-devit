import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import UserService from "./../services/user.service";
import CookieService from "./../services/cookie.service";
import { omit } from "lodash";

class AuthController {
	async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const input = req.body;
			const newUser = await UserService.signup(input);
			CookieService.setRefreshToken(res, newUser.refreshToken);
			return res.status(200).send(newUser);
		} catch (err: any) {
			logger.error(err);
			next(err);
		}
	}

	async signin(req: Request, res: Response, next: NextFunction) {
		try {
			const input = req.body;
			const user = await UserService.signin(input);
			CookieService.setRefreshToken(res, user.refreshToken);
      const userResponse = omit(user, ["refreshToken"])
			return res.status(200).send(userResponse);
		} catch (err: any) {
			logger.error(err);
			next(err);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { REFRESH_TOKEN } = req.cookies;
			if (!REFRESH_TOKEN) return res.status(200).send("Token isn't exsist");
			await UserService.logout(REFRESH_TOKEN);
			CookieService.deleteRefreshToken(res);
			return res.status(200).send("You success logout");
		} catch (err: any) {
			logger.error(err);
			next(err);
		}
	}
}

export default new AuthController();
