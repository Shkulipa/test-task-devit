import * as Yup from 'yup';
import ValidationSchema from "./../services/validationSchema";

export const loginSchema = Yup.object().shape({
  email: ValidationSchema.email(),
  password: ValidationSchema.password(4, 28)
});