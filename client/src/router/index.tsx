import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useAppSelector } from "./../hooks/redux";
import { publicPages, authPages } from "./../utils/pages/pages";
import { PageLoader } from "../components";
import { IPage } from "../utils/pages/pages.interfaces";

export function Router(): JSX.Element {
  const { user } = useAppSelector(state => state.auth);

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
  
  return (
    <BrowserRouter>
      <Routes>
        {publicRouters}
        {user && authRouters}
      </Routes>
    </BrowserRouter>
  );
}
