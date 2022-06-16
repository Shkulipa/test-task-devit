import dayjs from "dayjs";
import parse from 'html-react-parser';
import { Link, Navigate, useParams } from 'react-router-dom';
import "./post.css";
import { postAPI } from "../../services/postAPI.service";
import { error404, home } from "../../utils/pages/pages";
import { Button, Container, ErrorMsg, Header, Loader } from "../../components";
import { useAppSelector } from "../../hooks/redux";
import { IErrorResponse } from "../../interfaces/error.interfaces";
import { getImgHelpers } from "../../helpers/getImg.helpers";
import { ReactNode } from "react";

export default function Post(): JSX.Element {
  const { id } = useParams();
  const { user } = useAppSelector(state => state.auth);

  /**
   * @info 
   * if id = undefined
   */
  if(!id) <Navigate to={error404.path} replace={true} />

  /**
   * @info 
   * get post data
   */
  const { data: post, error, isLoading } = postAPI.useFetchPostByIdQuery(id as string);

  /**
   * @info 
   * post visual
   */
  const renderPost = () => {
    if(!error && post ) {
      const isImg = (): ReactNode => {
        const link = getImgHelpers(post.img, post.parsed);
    
        return <div className="postImgWrapper">
          <img className="postImg" src={link} alt="" />
        </div>
      }
  
      const parsedCreatedAt = dayjs(post.createdAt).format("DD.MM.YY | HH:mm");

      return <div className="post">
        {user &&
          <Link className="update-post-btn" to={`/post/update/${post._id}`}>
            <Button>Update</Button>
          </Link>}

       {post.img && isImg()}
      
        <div className="info">
          <div>
            id: {post._id}
          </div>
          <div>
            CreatedAt: {parsedCreatedAt}
          </div>
          <div>
            Author: {parse(post.author)}
          </div>
          <div>
            Description: {post.description}
          </div>
          <h2 className="title">
            {post.title}
          </h2>
          <div>
             {parse(post.content)}
          </div>
        </div>
      </div>
    }

    return <></>
  }

  /**
   * @info 
   * createPost handler error
   */  
  const errorGetPost = JSON.stringify(error);
  const parseErrorGetPost = errorGetPost && JSON.parse(errorGetPost) as IErrorResponse;
  parseErrorGetPost && parseErrorGetPost.status === 500 && <Navigate to={home.path} />;

  return (
    <>
      <Header />
      <Container>
        <div className="post-wrapper">
          {isLoading && <Loader />}
          {parseErrorGetPost && <ErrorMsg>{parseErrorGetPost.data.message}</ErrorMsg>}
          {renderPost()}
        </div>
      </Container>
    </>
  )
}
