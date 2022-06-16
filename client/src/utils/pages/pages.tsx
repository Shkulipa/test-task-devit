import { lazy } from "react";
import { IPage } from "./pages.interfaces";

/**
 * @info public pages
 */
const LazyHome = lazy(() => import("../../pages/home"));
const LazyLogin = lazy(() => import("../../pages/login"));
const LazyPost = lazy(() => import("../../pages/post"));
const LazyError404 = lazy(() => import("../../pages/error404"));
const LazyError500 = lazy(() => import("../../pages/error500"));

export const home: IPage = {
  path: "/",
  element: <LazyHome />
};
export const login: IPage = {
  path: "/login",
  element: <LazyLogin />
};
export const post: IPage = {
  path: "/post/get/:id",
  element: <LazyPost />
};
export const error404: IPage = {
  path: "*",
  element: <LazyError404 />
};
export const error500: IPage = {
  path: "/error500",
  element: <LazyError500 />
};

/**
 * @info auth pages
 */
const LazyPostUpdate = lazy(() => import("../../pages/postUpdate"));
const LazyPostCreate = lazy(() => import("../../pages/postCreate"));

export const postCreate: IPage = {
  path: "/post/create",
  element: <LazyPostCreate />
};
export const postUpdate: IPage = {
  path: "/post/update/:id",
  element: <LazyPostUpdate />
};


export const authPages: IPage[] = [postUpdate, postCreate];
export const publicPages: IPage[] = [home, login, post, error404, error500];
