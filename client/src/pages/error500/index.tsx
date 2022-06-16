import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { authSlice } from "../../store/slices/auth/auth.slice";

export default function Error500(): JSX.Element {
  const dispatch = useAppDispatch();
  const { closeError  } = authSlice.actions;

  useEffect(() => {
    dispatch(closeError());
  }, [])

  return (
    <div>Sorry, smth went wrong on the server side</div>
  )
}
