import { Types } from "mongoose";
import { IPost } from "../../interfaces/post.interfaces";
import { IUserModel } from "../user/user.interfaces";

export interface IPostDB extends Omit<IPost, 'createdAt'> {
	_id: Types.ObjectId;
  userId: IUserModel;
  createdAt: Date,
  parsed: boolean
}


export interface IPostModel extends Document, IPostDB {}