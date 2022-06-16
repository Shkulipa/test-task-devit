import { NextFunction, Request, Response } from "express";
import PostService from "../services/post.service";
import { IQueryValues } from "../interfaces/pagination.interfaces";
import logger from "../utils/logger";
import { queryHandler } from "../handlers/query.handler";

class PostController {
	async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
			const { search } = req.body;
      
			const query: IQueryValues = req.query;
			const { limit, page, sort, sortType } = queryHandler({
				limit: query.limit,
				page: query.page,
        sort: query.sort,
        sortType: query.sortType
			});

			const result = await PostService.getPosts(search, page, limit, sort, sortType);

			return res.status(200).send(result);
		} catch (err: any) {
			logger.error(err);
			next(err);
		}
	}

	async getPostById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const post = await PostService.getAPostById(id);
			return res.status(200).send(post);
		} catch (err: any) {
			logger.error(err);
			next(err);
		}
	}

	async addPost(req: Request, res: Response, next: NextFunction) {
		try {
			await PostService.addPost(req.body, req.user, req.files);
			return res.status(200).send(req.body);
		} catch (err: any) {
			logger.error(err);
			next(err);
		}
	}

	async deletePost(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			await PostService.deletePost(id);
			return res.status(200).send(`Post ${id} was success deleted`);
		} catch (err: any) {
			logger.error(err);
			next(err);
		}
	}

	async updatePost(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const post = await PostService.updatePost(req.body, id);
			return res.status(200).send(post);
		} catch (err: any) {
			logger.error(err);
			next(err);
		}
	}
}

export default new PostController();
