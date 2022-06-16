import { useAppDispatch, useAppSelector } from "./../../hooks/redux";
import { useFormik, FormikHelpers } from 'formik';
import "./login.css";
import { Input, Button, ErrorMsg, Container, Header } from "../../components";
import { loginSchema } from '../../validation/login.schema';
import { IAuthData } from '../../interfaces/authData';
import { loginAsync } from "./../../store/actions/login";
import { useCheckAuth } from "../../hooks/useCheckAuth";

export default function Login(): JSX.Element {
  useCheckAuth();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const formLogin = useFormik<IAuthData>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: loginHandler,
  });

  function loginHandler(
    { email, password }: IAuthData,
    { setSubmitting, resetForm }: FormikHelpers<IAuthData>
  ) {
    dispatch(loginAsync({ email, password }));
    setSubmitting(false);
    resetForm();
  }

  const errorEmail = formLogin.errors.email && formLogin.touched.email && 
    <ErrorMsg className='err-msg'>{formLogin.errors.email}</ErrorMsg>;
  const errorPassword = formLogin.errors.password && formLogin.touched.password && 
    <ErrorMsg className='err-msg'>{formLogin.errors.password}</ErrorMsg>;

  return (
    <>
      <Header />
      <Container>
        <div className="login-wrapper">
          <form onSubmit={formLogin.handleSubmit} className="login-form">
            {error && <ErrorMsg className="response-err">{error}</ErrorMsg>}
            <div className="input-wrapper">
              <Input 
                className={"login-input"}
                name="email"
                placeholder="Your email..."
                type="text"
                onChange={formLogin.handleChange}
                value={formLogin.values.email}
              />
              {errorEmail}
            </div>
            <div className="input-wrapper">
              <Input 
                className={"login-input"}
                name="password"
                placeholder="Your password..."
                type="password"
                onChange={formLogin.handleChange}
                value={formLogin.values.password}
              />
              {errorPassword}
            </div>
            <Button className={"login-btn"} type="submit" disabled={isLoading}>
              {isLoading ? "isLoading..." : "login" }
            </Button>
          </form>
        </div>
      </Container>
    </>
  )
}
