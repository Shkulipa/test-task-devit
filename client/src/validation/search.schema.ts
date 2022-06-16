import * as Yup from 'yup';
import ValidationSchema from "./../services/validationSchema";

export const searchSchema = Yup.object().shape({
  search: ValidationSchema.length(50)
});