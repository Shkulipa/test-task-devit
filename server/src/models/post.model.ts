import { IPostModel } from '../interfaces/post.interfaces';
import { Schema, model, Types } from "mongoose";
import { NameModel } from '../interfaces/nameModels.interfaces';

const postSchema = new Schema<IPostModel>(
	{
    userId: {
      type: Types.ObjectId,
      ref: NameModel.USERS
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    img: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    parsed: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false
  }
);

export const PostModel = model<IPostModel>(NameModel.POSTS, postSchema);
