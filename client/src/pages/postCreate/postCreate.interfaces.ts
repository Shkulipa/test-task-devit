import { IPost } from "../../interfaces/post";

export interface ICreatePostData extends Pick<IPost, "title" | "description"> {}