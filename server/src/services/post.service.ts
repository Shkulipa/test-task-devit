import { ApiError } from './../utils/error';
import { Types } from "mongoose";
import { PostModel } from "../models/post.model";
import { IUserDecode, IUserKeys } from "../interfaces/user.interfaces";
import logger from "../utils/logger";
import { IPostInput, IPostKeys, IPostUpdateValues } from "../interfaces/post.interfaces";
import { FileArray } from "express-fileupload";
import FileService from "./../services/file.service";
import { ESort, TSortType } from '../interfaces/sort.interfaces';
import { sortHandler } from '../handlers/sort.handler';

class PostService {
  async getPosts(search: string = "", page: number, limit: number, sort: ESort, sortType: TSortType) {
		try {
			const regex = new RegExp(`${search}`, "gi");

      const sortKey = sortHandler(sort);
      
			const posts = await PostModel.find({
				$or: [{ title: { $regex: regex } }, { content: { $regex: regex } }]
			})
				.sort({ [sortKey]: sortType })
				.skip(limit * page - limit)
				.limit(limit);

			const count = await PostModel.find({
				$or: [{ title: { $regex: regex } }, { content: { $regex: regex } }]
			}).count();

			return {
				posts,
				count
			};
		} catch (err: any) {
			logger.error(err);
			throw new Error(err);
		}
	}

  async getAPostById(id: string) {
		try {
			const post = await PostModel.findOne({ _id: new Types.ObjectId(id) });
      if(!post) throw ApiError.badRequest("Post wasn't found");
      return post;
		} catch (err: any) {
			logger.error(err);
			throw new Error(err);
		}
	} 

	async addPost(
		input: IPostInput,
		user: IUserDecode,
		files: FileArray | undefined
	) {
		try {      
			let filesName: string[] = [];
			if (files && files.img) {
				const path = `${__dirname}/../statics/images/posts/`;
				const uploadedFiles = FileService.parseUploadFile(files.img);
				filesName = FileService.uploadFiles(uploadedFiles, path);
			}
      
			const post = await (
				await PostModel.create({
					...input,
					img: filesName[0],
          author: user.name,
					userId: new Types.ObjectId(user._id)
				})
			).populate({
				path: IPostKeys.userId,
				select: [
					IUserKeys.email,
					IUserKeys.name,
					IUserKeys._id
				]
			});

			return post;
		} catch (err: any) {
			logger.error(err);
			throw new Error(err);
		}
	}

	async updatePost(input: IPostUpdateValues, postId: string) {
		try {
			const newValues: IPostUpdateValues = {};
			if (input.title) newValues.title = input.title;
			if (input.description) newValues.description = input.description;
			if (input.content) newValues.content = input.content;

			const post = await PostModel.findByIdAndUpdate(
				postId,
				{
					$set: { ...newValues }
				},
				{ new: true }
			);

			return post;
		} catch (err: any) {
			logger.error(err);
			throw new Error(err);
		}
	}

	async deletePost(id: string): Promise<void> {
		try {
			const post = await PostModel.findById(id);
			if (!post) throw new Error("Post dosen't exist");
      
			if (post.img && !post.parsed) {
				const pathFolder = __dirname + "/../statics/images/posts/";
        FileService.deleteFile(pathFolder + post.img);
			}

			await PostModel.findByIdAndDelete(id);
		} catch (err: any) {
			logger.error(err);
			throw new Error(err);
		}
	}
}

export default new PostService();
