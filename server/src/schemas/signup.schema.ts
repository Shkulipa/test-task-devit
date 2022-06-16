import { object, string } from "zod";
import SchemaService from "./../services/schema.service";

const signup = object({
	body: object({
		name: SchemaService.name(),
		password: SchemaService.password(),
		email: SchemaService.email()
	})
});

export default signup;