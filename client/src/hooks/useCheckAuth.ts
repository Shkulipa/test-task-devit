import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "./redux";

export function useCheckAuth() {
  const { user } = useAppSelector(state => state.auth);
  const history = useNavigate();

  useEffect(() => {
    if(user) history('/');
  }, [user, history]);
}
