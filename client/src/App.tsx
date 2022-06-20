import "./styles/app.css";
import { Router } from './router';
import { useEffect } from "react";
import { authSlice } from "./store/slices/auth/auth.slice";
import { useAppDispatch } from "./hooks/redux";
import { CONST } from "./interfaces/consts.interfaces";
import { IUser } from "./interfaces/user";
import { PostApiContext } from "./contexts/postApi.context";

export function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { setUser } = authSlice.actions;

  useEffect(() => {
    const user = localStorage.getItem(CONST.LOCAL_STORAGE_USER) as unknown as IUser;
    if(user) dispatch(setUser(user));
  }, [])

  return (
    <PostApiContext>
      <Router />
    </PostApiContext>
  )
}
