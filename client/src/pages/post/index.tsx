import dayjs from "dayjs";
import parse from 'html-react-parser';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import "./post.css";
import { error404, home } from "../../utils/pages/pages";
import { Button, Container, ErrorMsg, Header, Loader } from "../../components";
import { useAppSelector } from "../../hooks/redux";
import { IErrorResponse } from "../../interfaces/error.interfaces";
import { getImgHelpers } from "../../helpers/getImg.helpers";
import { ReactNode, useState } from "react";
import { dataTestIds } from "../../tests/utils/dataTestIds";
import { usePostApiContext } from "../../contexts/postApi.context";

export default function Post(): JSX.Element {
  const { id } = useParams();
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  /**
   * @info 
   * if id = undefined
   */
  if(!id) <Navigate to={error404.path} replace={true} />

  const postAPI = usePostApiContext();
  /**
   * @info 
   * delete post data
   */
  const [deletePost, { isLoading: isLoadingDeletePost, error: errorDeletePost }] = postAPI.useDeletePostMutation();
  const [isSuccessDelete, setIsSuccessDelete] = useState<boolean>(false);
  
  async function postDeleteHandler() {
    if(!id) return;

    const isConfirm = window.confirm("Are you sure you want to delete this post");
    if(isConfirm) {
      try {
        await deletePost({ id });
        navigate(home.path, { replace: true });
        setIsSuccessDelete(true);
        setTimeout(() => {
          setIsSuccessDelete(false);
          navigate(home.path, { replace: true });
        }, 2000);
      } catch (error) {
        console.error("Post Create", error);
      }
    }
  }

  /**
   * @info 
   * get post data
   */
  const { data: post, error, isLoading } = postAPI.useFetchPostByIdQuery(id as string, { skip: isSuccessDelete });

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

        {user && <div className="delete-btn">
          <Button onClick={postDeleteHandler}>Delete Post</Button>
        </div>
       }

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
   * get Post handler error
   */  
  const errorGetPost = JSON.stringify(error);
  const parseErrorGetPost = errorGetPost && JSON.parse(errorGetPost) as IErrorResponse;
  parseErrorGetPost 
    && parseErrorGetPost.status === 500 && <Navigate to={home.path} />;

 /**
   * @info 
   * delete Post handler error
   */  
  const errorDeletePostHandler = () => {
    let errorMsg = "";
    const errorDeletePostParse = JSON.stringify(errorDeletePost);
    const parseErrorDeletePost = errorDeletePostParse && JSON.parse(errorDeletePostParse) as IErrorResponse;
    parseErrorDeletePost && parseErrorDeletePost.status === 500 && <Navigate to={home.path} />;
    parseErrorDeletePost &&
      parseErrorDeletePost.data &&
        parseErrorDeletePost.data.message &&
          (errorMsg = parseErrorDeletePost.data.message);

    if(error) errorMsg = (error as any).error;

    return <ErrorMsg>{errorMsg}</ErrorMsg>
  }

  return (
    <>
      <Header />
      <Container>
        <div className="post-wrapper" data-testid={dataTestIds.contentPostPage}>
          {(isLoading || isLoadingDeletePost) && <Loader />}
          {isSuccessDelete && <div>Post success deleted, you will redirect to home</div>}
          {parseErrorGetPost && !isSuccessDelete  && <ErrorMsg>{parseErrorGetPost.data.message}</ErrorMsg>}
          {errorDeletePostHandler()}
          {renderPost()}
        </div>
      </Container>
    </>
  )
}
