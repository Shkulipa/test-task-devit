import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PageLoader } from "../../components";
import { PostApiContext } from "../../contexts/postApi.context";
import { store } from "../__mocks__/mockRedux/store/store";
import { authPages, publicPages } from "../../utils/pages/pages";
import { IPage } from "../../utils/pages/pages.interfaces";

interface IRenderAuthRouters {
  initialRoute: string[];
}

export const renderRouter = ({ initialRoute = ["/"] }: IRenderAuthRouters): RenderResult => {
  const user = store.getState().auth.user;
  
  const authRouters = authPages.map(({ path, element }: IPage) => {
    return <Route key={path} path={path} element={
      <React.Suspense fallback={<PageLoader />}>
        {element}
      </React.Suspense>
      } />
  });

  const publicRouters = publicPages.map(({ path, element }: IPage) => {
    return <Route key={path} path={path} element={
      <React.Suspense fallback={<PageLoader />}>
        {element}
      </React.Suspense>
      } />
  });
  
  return render(
    <Provider store={store}>
      <PostApiContext mockAPI={true}>
        <MemoryRouter initialEntries={initialRoute} initialIndex={1}>
          <Routes>
            {publicRouters}
            {user && authRouters}
          </Routes>
        </MemoryRouter>
      </PostApiContext>
    </Provider>);
};