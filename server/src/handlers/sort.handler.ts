import { IPostKeys } from "../interfaces/post.interfaces";
import { ESort } from "../interfaces/sort.interfaces";

export const sortHandler = (sort: ESort) => {
  if(sort === ESort.TITLE) return IPostKeys.title;
  if(sort === ESort.AUTHOR) return IPostKeys.author;
  return IPostKeys.createdAt;
}