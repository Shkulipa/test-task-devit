import { connect, disconnect } from "mongoose";
import { IPost } from "../interfaces/post.interfaces";
import { PostsModel } from "../models";
import logger from "../utils/logger";

class DBService {
	private async connectDB() {
		try {
			if (process.env.DB_URL) {
				await connect(process.env.DB_URL);
				logger.info("✅ DB connected");
			} else {
				throw new Error("❌ Url to database isn't correct, check your .env");
			}
		} catch (err) {
			logger.error("❌ Clound't connect to DB", err);
			process.exit(1);
		}
	}

  private async disconnect() {
    try {
      await disconnect();
      logger.info("✅ DB was disconnected");
		} catch (err) {
			logger.error("❌ An error occurred while disconnecting from the DB", err);
			process.exit(1);
		}
  }

  private async findPostByTitle(title: string) {
    try {
			return await PostsModel.findOne({ title, parsed: true });
		} catch (err) {
      throw err;
		}
  }

  private async addPost(post: IPost) {
    const { title, author, content, createdAt, description, img } = post;
    
    try {
      if(!content) return;
			await PostsModel.create({
        title,
        description,
        content,
        author,
        img,
        createdAt,
        parsed: true
      });
      logger.info(`✅ Post with title <${title}> added in DB`);
		} catch (err) {
      throw err;
		}
  }

  async savePosts(posts: IPost[]) {
    try {
      this.connectDB();

      for (const post of posts) {
        const isExsist = await this.findPostByTitle(post.title);

        if(isExsist) {
          logger.error(`⛔️ Post with title <${post.title}> has already added in DB`);
          continue;
        }

        await this.addPost(post);
      }

      this.disconnect();

      logger.info(`✅ Posts were added in DB`);
    } catch (err) {
      throw err;
    }
  }
}

export default new DBService();