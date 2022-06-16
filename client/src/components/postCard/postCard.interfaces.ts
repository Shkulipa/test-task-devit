import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IPost } from "../../interfaces/post";

export interface IPostCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>   {
  post: IPost;
}