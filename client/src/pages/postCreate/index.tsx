import "./postCreate.css";
import { useState, useRef, ChangeEvent } from 'react';
import { Editor } from '@tinymce/tinymce-react'; // https://www.tiny.cloud/docs/integrations/react/#oneditorchange
import { Button, Container, ErrorMsg, Header, Input, Loader } from '../../components';
import { postAPI } from "../../services/postAPI.service";
import { useFormik } from "formik";
import { IErrorResponse } from "../../interfaces/error.interfaces";
import { Navigate } from "react-router-dom";
import { home } from "../../utils/pages/pages";
import { ICreatePostData } from "./postCreate.interfaces";
import { maxLengthContent, postSchema } from "../../validation/post.schema";

export default function PostCreate(): JSX.Element {
  const [createPost, { isLoading, error }] = postAPI.useCreatePostMutation();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  /**
   * @info preview post
   */
   const inputPreviewImg = useRef<HTMLInputElement>(null);
   const [picture, setPicture] = useState<string | null>(null);
   const [imgFile, setImgFile] = useState<File | null>(null);
   const onChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return; 

    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
   };

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
  const formCreatePost = useFormik<ICreatePostData>({
    initialValues: {
      title: "",
      description: ""
    },
    validationSchema: postSchema, 
    onSubmit: postCreateHandler
  });

  async function postCreateHandler(
    { title, description }: ICreatePostData,
  ) {
    const newPost = new FormData();    
    newPost.append("title", title);
    newPost.append("description", description);
    newPost.append("content", content);
    imgFile && newPost.append("img", imgFile);
    try {
      await createPost(newPost).unwrap();
      setContent("");
      setPicture(null);
      setImgFile(null);
      inputPreviewImg!.current!.value = "";
      formCreatePost.resetForm();
      formCreatePost.setSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1500);
    } catch (error) {
      console.error("Post Create", error);
    }
  }

  const handleSubmitCreaPost = (e?: React.FormEvent<HTMLFormElement> | undefined) =>{
    e?.preventDefault();
    if(content.length === 0) setContentError("content is a requried field");
    formCreatePost.handleSubmit(e);
  }

  /**
   * @info 
   * content handler error
   */
  const errorContent = contentError &&
    <ErrorMsg className='err-msg'>{contentError}</ErrorMsg>;

  /**
   * @info 
   * createPost handler error
   */  
  const errorHandler = () => {
    let errorMsg = "";
    const errorCreatePost = JSON.stringify(error);
    const parseErrorCreatePost = errorCreatePost && JSON.parse(errorCreatePost) as IErrorResponse;
    parseErrorCreatePost && parseErrorCreatePost.status === 500 && <Navigate to={home.path} />;
    parseErrorCreatePost && 
      parseErrorCreatePost.data &&
        parseErrorCreatePost.data.message &&
          (errorMsg = parseErrorCreatePost.data.message);

    if(error) errorMsg = (error as any).error;

    return <ErrorMsg className="response-err-create-post">{errorMsg}</ErrorMsg>
  }
  
  /**
   * @info
   * handler formik
   */
  const errorTitle = formCreatePost.errors.title && formCreatePost.touched.title && 
    <ErrorMsg className='err-msg'>{formCreatePost.errors.title}</ErrorMsg>;
  const errorDescription = formCreatePost.errors.description && formCreatePost.touched.description && 
    <ErrorMsg className='err-msg'>{formCreatePost.errors.description}</ErrorMsg>;

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={handleSubmitCreaPost} className="post-create-wrapper">
          {isLoading && <Loader />}
          {isSuccess && <div>Success, Post was added :)</div>}
          {errorHandler()}
          <input ref={inputPreviewImg} style={{ display: "none" }} accept="image/png, image/jpeg" type="file" onChange={onChangePicture} />
          <Button
            className="preview-post-btn"
            type="button"
            onClick={() => inputPreviewImg.current?.click()}
          >{imgFile ? imgFile.name : "Choose preview image"}</Button>
          {picture && <img className="preview-post" src={picture} alt="" />}
          
          <div className="input-wrapper-post-create">
            <Input
              className="input-title"
              name="title"
              placeholder="Title..."
              onChange={formCreatePost.handleChange}
              value={formCreatePost.values.title}
            />
            {errorTitle}
          </div>

          <div className="input-wrapper-post-create">
            <Input
              className="input-description"
              name="description"
              placeholder="Description..."
              onChange={formCreatePost.handleChange}
              value={formCreatePost.values.description}
            />
            {errorDescription}
          </div>
          
          <div className="input-wrapper-textarea">
            <Editor
              onEditorChange={contentHandlerChange}
              value={content}
              textareaName="content"
            />
            <p>Max length: {contentLength} / {maxLengthContent}</p>
            {errorContent}
          </div>
          
          <Button type="submit" className="post-create-btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create Post"}
          </Button>
        </form>
      </Container>
    </>
  )
}
