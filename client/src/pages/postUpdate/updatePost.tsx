import "./postUpdate.css";
import { Editor } from "@tinymce/tinymce-react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import parse from 'html-react-parser';
import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, ErrorMsg, Loader, Input } from "../../components";
import { getImgHelpers } from "../../helpers/getImg.helpers";
import { IErrorResponse } from "../../interfaces/error.interfaces";
import { postAPI } from "../../services/postAPI.service";
import { home } from "../../utils/pages/pages";
import { maxLengthContent, postSchema } from "../../validation/post.schema";
import { ICreatePostData } from "../postCreate/postCreate.interfaces";
import { IUpdatePostProps } from "./postUpdate.interfaces";

export default function UpdatPost({ post, id }: IUpdatePostProps ): JSX.Element {
  const [updatePost, { isLoading: isLoadingUpdatePost, error: errorUpdatePost }] = postAPI.useUpdatePostMutation();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  /**
   * @info 
   * updatePost handler error
   */  
  const errorHandler = () => {
    let errorMsg = "";
    const error = JSON.stringify(errorUpdatePost);
    const parseErrorPost = error && JSON.parse(error) as IErrorResponse;
    parseErrorPost && parseErrorPost.status === 500 && <Navigate to={home.path} />;

    parseErrorPost && 
      parseErrorPost.data &&
        parseErrorPost.data.message &&
          (errorMsg = parseErrorPost.data.message);
    
    
    return <ErrorMsg className="response-err-create-post">{errorMsg}</ErrorMsg>
  }

  /**
   * @info content field
   */
   const [content, setContent] = useState<string>("");
   const [contentError, setContentError] = useState<string>("");
   const [contentLength, setContentLength] = useState<number>(0);
   
   function contentHandlerChange(val: string, editor: any) {
     const length = editor.getContent({ format: 'text' }).length;
 
     if(length <= maxLengthContent) {
       setContentError("");
       setContentLength(length);
       setContent(val);
       return;
     }
   }
   
  /**
   * @info Formik
   */
  const formUpdatePost = useFormik<ICreatePostData>({
    enableReinitialize: true,
    initialValues: {
      title: post!.title,
      description: post!.description
    },
    validationSchema: postSchema, 
    onSubmit: postCreateHandler
  });

   async function postCreateHandler(
    { title, description }: ICreatePostData,
  ) {
    try {
      const dataPost = {
        _id: id,
        title,
        description,
        content
      }
      await updatePost(dataPost).unwrap();
      setContent("");
      formUpdatePost.resetForm();
      formUpdatePost.setSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1500);
    } catch (error) {
      console.error("Post Create", error);
    }
  }

  const handleSubmitCreaPost = (e?: React.FormEvent<HTMLFormElement> | undefined) =>{
    e?.preventDefault();
    if(content.length === 0) setContentError("content is a requried field");
    formUpdatePost.handleSubmit(e);
  }

  /**
   * @info
   * handler Update formik
   */
  const errorTitle = formUpdatePost.errors.title && formUpdatePost.touched.title && 
    <ErrorMsg className='err-msg'>{formUpdatePost.errors.title}</ErrorMsg>;
  const errorDescription = formUpdatePost.errors.description && formUpdatePost.touched.description && 
    <ErrorMsg className='err-msg'>{formUpdatePost.errors.description}</ErrorMsg>;

  /**
   * @info 
   * post visual
   */
  const renderPost = () => {
    if(post) {      
      const isImg = (): ReactNode => {
        const link = getImgHelpers(post.img, post.parsed);
    
        return <div className="postImgWrapper">
          <img className="postImg" src={link} alt="" />
        </div>
      }
  
      const parsedCreatedAt = dayjs(post.createdAt).format("DD.MM.YY | HH:mm");

      return <div className="post">
       {isImg()}
      
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
          <form onSubmit={handleSubmitCreaPost} className="post-create-wrapper">
            
            <div className="input-wrapper-post-create">
              <Input
                className="input-title"
                name="title"
                placeholder="Title..."
                onChange={formUpdatePost.handleChange}
                value={formUpdatePost.values.title}
              />
              {errorTitle}
            </div>

            <div className="input-wrapper-post-create">
              <Input
                className="input-description"
                name="description"
                placeholder="Description..."
                onChange={formUpdatePost.handleChange}
                value={formUpdatePost.values.description}
              />
              {errorDescription}
            </div>
            
            <div className="input-wrapper-textarea">
              <Editor
                onInit={(_evt, editor) => contentHandlerChange(post.content, editor)}
                onEditorChange={contentHandlerChange}
                value={content}
                textareaName="content"
              />
              <p>Max length: {contentLength} / {maxLengthContent}</p>
              {contentError}
            </div>
            
            <Button type="submit" className="post-create-btn" disabled={isLoadingUpdatePost}>
              {isLoadingUpdatePost ? "Loading..." : "Update Post"}
            </Button>
          </form>
          </div>
        </div>
      </div>
    }

    return <></>
  }

  if(isLoadingUpdatePost) return (
    <div className="post-wrapper">
      <Loader />
    </div>
  ) 
  
  return (
    <div className="post-wrapper">
      {isSuccess && <div>Success, Post was updated :)</div>}
      {errorHandler()}
      {renderPost()}
    </div>
  )
}
