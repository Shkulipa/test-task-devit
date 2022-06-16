import * as Yup from 'yup';

class ValidationSchema {
  email() {
    return Yup.string()
    .email()
    .required()
  }

  password(min: number, max: number) {
    return Yup.string()
    .min(min, `Must be at least ${min} characters`)
    .max(max, `Must be less  than ${max} characters`)
    .required('Required Field')
    .matches(/^\w+$/, "Only alphabets are allowed for this field ")
    .test("check on spaces", "Shouldn't have spaces", value => {
      const checkSpaces = new RegExp(/ /g);
      return !checkSpaces.test(value!)
    });
  }

  length(max: number) {
    return Yup.string()
    .required()
    .max(max, `Must be less than ${max} characters`)
  }
}

export default new ValidationSchema();