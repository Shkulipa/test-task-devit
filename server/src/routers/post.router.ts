import { Router } from "express";
import PostController from "../controllers/post.controller";
import checkAuth from "../middlewares/checkAuth.middleware";
import checkFiles from "../middlewares/checkFiles.middleware";
import validation from "../middlewares/validation.middleware";
import itemId from "../schemas/itemId";
import search from "../schemas/search.schema";
import postUpdate from "../schemas/updatePost.schema";
import { imgTypes } from "../utils/const";
import postAdd from './../schemas/postAdd.schema';

const postRouter = Router();

postRouter.post("/get", validation(search), PostController.getPosts)
postRouter.get("/:id", validation(itemId), PostController.getPostById);

postRouter.post(
	"/",
	[
    checkAuth(),
    validation(postAdd),
    /**
     * @params 
     * limit files
     * types
     * max size of images (5 = 5 Mb)
     */
    checkFiles(1, imgTypes, 5)
  ],
	PostController.addPost
);

postRouter.put(
	"/:id",
	[
		checkAuth(),
		validation(postUpdate),
	],
	PostController.updatePost
);

postRouter.delete(
	"/:id",
	[
		checkAuth(),
		validation(itemId),
	],
	PostController.deletePost
);

export default postRouter;
