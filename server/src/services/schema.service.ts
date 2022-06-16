import { Types } from "mongoose";
import { string } from "zod";

class SchemaService {
	private nameMax = 32;
	private nameMin = 4;
	private passMin = 6;

	private postTitleMax = 100;
	private postContentMax = 2500;
	private postDescriptionMax = 250;

	private searchMax = 50;

	name() {
		return string({
			required_error: "name is required"
		})
			.min(
				this.nameMin,
				`Name too long - maximum can be ${this.nameMin} chars`
			)
			.max(
				this.nameMax,
				`Name too long - maximum can be ${this.nameMax} chars`
			)
	}

	password(nameField = "Password") {
		return string({
			required_error: `${nameField} is required`
		})
			.min(this.passMin, `${nameField} too short - should be 6 chars minimum`)
			.refine((val: string) => !(val.indexOf(" ") >= 0), {
				message: `${nameField} can't contain white space`
			});
	}

	email() {
		return string({
			required_error: "Email is required"
		}).email("Email isn't valid");
	}

	validIdParam(param: string) {
		return string({
			required_error: `${param} is required like param`
		}).refine(param => Types.ObjectId.isValid(param), {
			message: `Please provide a valid ${param}`
		});
	}

	postTitle(options?: { optional?: boolean }) {
		const validate = string({
			required_error: "Title is required"
		}).max(
			this.postTitleMax,
			`Title too long - maximum can be ${this.postTitleMax} chars`
		);

		if (options && options.optional) return validate.optional();
    
		return validate;
	}

	postContent(options?: { optional?: boolean }) {
		const validate = string({
			required_error: "Content is required"
		}).refine(
      htmlContent => {
        const content = htmlContent.replace(/<[^>]*>?/gm, '');
        if(content.length > this.postContentMax) return false;
        return true;
      },
      {
        message: `Content too long - maximum can be ${this.postContentMax} chars`
      }
    )

    if (options && options.optional) return validate.optional();
		return validate;
	}

  postDescription(options?: { optional?: boolean }) {
		const validate = string({
			required_error: "Description is required"
		}).max(
			this.postDescriptionMax,
			`Description too long - maximum can be ${this.postDescriptionMax} chars`
		);

    if (options && options.optional) return validate.optional();
		return validate;
	}

	search() {
		return string({
			required_error: "Search field is required"
		}).max(
			this.searchMax,
			`Search field too long - maximum can be ${this.searchMax} chars`
		).optional();
	}
}

export default new SchemaService();
