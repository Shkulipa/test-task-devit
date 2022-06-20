import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import "./postCard.css";
import { IPostCardProps } from "./postCard.interfaces";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { getImgHelpers } from "../../helpers/getImg.helpers";
import { dataTestIds } from "../../tests/utils/dataTestIds";

export function PostCard({ post, ...props }: IPostCardProps): JSX.Element {
  const { _id, author, createdAt, description, img, title, parsed } = post;

  const isImg = (): ReactNode => {
    const link = getImgHelpers(img, parsed);

    return <div className="postCardImgWrapper">
      <img className="postCardImg" src={link} alt="" />
    </div>
  }

  const parsedCreatedAt = dayjs(createdAt).format("DD.MM.YY | HH:mm")
  
  return (
    <div className="postCard" {...props}>
      {img && isImg()}
     
      <div className="info">
        <div>
          CreatedAt: {parsedCreatedAt}
        </div>
        <div>
          title: {title}
        </div>
        <div>
          Author: {parse(author)}
        </div>
        <div>
          Description: {description}
        </div>
        <div className="readMore">
          <Link to={`/post/get/${_id}`} data-testid={dataTestIds.readMore}>READ MORE</Link>
        </div>
      </div>
    </div>
  )
}
