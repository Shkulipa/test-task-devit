import { Schema, model } from "mongoose";
import { NameModel } from "../namaModels.interfaces";
import { IUserModel } from "./user.interfaces";

const userSchema = new Schema<IUserModel>(
	{
    name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			trim: true
		}
	},
	{ timestamps: true, versionKey: false }
);

export const UserModel = model<IUserModel>(NameModel.USERS, userSchema);
