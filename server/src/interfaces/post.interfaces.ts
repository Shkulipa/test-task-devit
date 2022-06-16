import { Types } from "mongoose";
import { IUserModel } from "../interfaces/user.interfaces";

export enum IPostKeys {
	_id = "_id",
	userId = "userId",
	title = "title",
	description = "description",
	author = "author",
	createdAt = "createdAt",
	img = "img",
	content = "content",
	parsed = "parsed"
}

export interface IPost {
  _id: Types.ObjectId;
  userId: IUserModel;
  title: string,
  description: string,
  author: string;
  createdAt: Date,
  img: string,
  content: string,
  parsed: boolean
}

export interface IPostModel extends Document, IPost {}

export interface IPostInput {
	title: string;
	content: string;
}

export interface IPostUpdateValues {
	title?: string;
  description?: string;
	content?: string;
}