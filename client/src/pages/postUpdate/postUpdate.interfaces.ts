import { IPost } from "../../interfaces/post";

export interface IUpdatePost extends Pick<IPost, "title" | "description" | "content" | "_id">  {}

export interface IUpdatePostProps {
  id: string;
  post?: IPost;
}