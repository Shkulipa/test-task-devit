import { object } from "zod";
import SchemaService from "../services/schema.service";

const postAdd = object({
	body: object({
		title: SchemaService.postTitle(),
		description: SchemaService.postDescription(),
		content: SchemaService.postContent()
	})
});

export default postAdd;