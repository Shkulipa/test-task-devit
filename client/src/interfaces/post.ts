export interface IPost {
  _id: string;
  userdId: string;
  title: string,
  description: string,
  content: string,
  author: string,
  img: string,
  createdAt: string,
  parsed: boolean
}

export interface IPostsPayload {
  posts: IPost[];
  count: number;
}
