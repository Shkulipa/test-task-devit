import React, { ReactNode, useContext } from 'react'
import { postAPI } from '../services/postAPI.service';
import { postAPIMock } from '../tests/__mocks__/mockRedux/services/postAPIMock.service';

const Context = React.createContext<typeof postAPIMock | typeof postAPI>(postAPI);

interface IPostApiContext {
  children: ReactNode,
  mockAPI?: boolean
}

export function PostApiContext({ children, mockAPI = false }: IPostApiContext): JSX.Element {
  const value = mockAPI ? postAPIMock : postAPI;

  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  )
}


export const usePostApiContext = () => useContext(Context);