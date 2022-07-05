import "./config/config";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { version } from "../package.json";
import logger from "./utils/logger";
import { API_VERSION } from "./utils/const";
import DBService from './services/db.service';
import router from "./routers";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const host = process.env.HOST;
const port = process.env.PORT;

const server: Application = express();
server.use(cors({
  origin: ['*'],
  credentials: true
}));
server.use(
	fileUpload({
		createParentPath: true,
		parseNested: true
	})
);
server.use(express.json());
server.use(cookieParser());
server.use(API_VERSION, router);
server.use(`${API_VERSION}/posts`, express.static(`${__dirname}/statics/images/posts`));
server.use(errorHandler);

server.listen(port, async (): Promise<void> => {
	logger.info(
		`🚀 Server(v${version}) started on the: http://${host}:${port} (mode: ${process.env.NODE_ENV})`
	);

	await DBService.connectDB();
});
