import * as Yup from 'yup';
import ValidationSchema from "./../services/validationSchema";

export const postSchema = Yup.object().shape({
  title: ValidationSchema.length(100),
  description: ValidationSchema.length(250),
});

export const maxLengthContent = 2500;