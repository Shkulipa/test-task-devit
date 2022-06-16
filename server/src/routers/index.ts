import { Router } from "express";
import postRouter from "./post.router";
import tokenRouter from "./token.router";
import authRouter from "./auth.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/refresh-token", tokenRouter);

router.use("/post", postRouter);

export default router;
