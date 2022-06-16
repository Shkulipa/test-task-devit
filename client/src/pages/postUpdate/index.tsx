import "./postUpdate.css";
import { Navigate, useParams } from "react-router-dom";
import { Header, Container, Loader } from "../../components";
import { IErrorResponse } from "../../interfaces/error.interfaces";
import { postAPI } from "../../services/postAPI.service";
import { error404, home } from "../../utils/pages/pages";
import UpdatPost from "./updatePost";

export default function PostUpdate(): JSX.Element {
  const { id } = useParams();

  /**
   * @info 
   * if id = undefined
   */
  if(!id) <Navigate to={error404.path} replace={true} />

  /**
   * @info 
   * get post data
   */
  const { data: post, isLoading: isLoadingFetchPost, error: errorFetchPost } = postAPI.useFetchPostByIdQuery(id as string);

  /**
   * @info 
   * updatePost handler error
   */  
  const errorGetPost = JSON.stringify(errorFetchPost);
  const parseErrorGetPost = errorGetPost && JSON.parse(errorGetPost) as IErrorResponse;
  parseErrorGetPost && parseErrorGetPost.status === 500 && <Navigate to={home.path} />;

  if(isLoadingFetchPost) return (
    <>
      <Header />
      <Container>
        <div className="post-wrapper">
          <Loader />
        </div>
      </Container>
    </>
  ) 
  
  return (
    <>
      <Header />
      <Container>
        <div className="post-wrapper">
          <UpdatPost post={post} id={id || ""} />
        </div>
      </Container>
    </>
  )
}
