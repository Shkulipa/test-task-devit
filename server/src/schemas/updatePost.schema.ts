import { object } from "zod";
import SchemaService from "../services/schema.service";

const postUpdate = object({
	body: object({
		title: SchemaService.postTitle({ optional: true }),
    description: SchemaService.postDescription({ optional: true }),
		content: SchemaService.postContent({ optional: true }),
	}),
  params: object({
		id: SchemaService.validIdParam("id")
	})
});

export default postUpdate;