import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { authSlice } from './../store/slices/auth/auth.slice';
import { CONST } from '../interfaces/consts.interfaces';
import { IAuthResponse } from '../interfaces/user';
import { IPost, IPostsPayload } from '../interfaces/post';
import { IUpdatePost } from '../pages/postUpdate/postUpdate.interfaces';
import { IFetchPayload } from '../interfaces/fetchPosts.interfaces';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  prepareHeaders: (headers) => {
    const getUser = localStorage.getItem(CONST.LOCAL_STORAGE_USER) as string;
    const parsedUser = getUser && JSON.parse(getUser) as IAuthResponse;
    const accessToken = parsedUser && parsedUser.accessToken;
    if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
  credentials: 'include'
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery({
        url: '/refresh-token',
        method: 'POST'
      }, api, extraOptions);
  
      
      if (refreshResult.data) {
        localStorage.setItem(CONST.LOCAL_STORAGE_USER, JSON.stringify(refreshResult.data));

        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        const { setUser } = authSlice.actions;
        
        api.dispatch(setUser(null));
        localStorage.removeItem(CONST.LOCAL_STORAGE_USER);
      }
  }

  return result;
};

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],

  endpoints: (build) => ({
    fetchPosts: build.query<IPostsPayload, IFetchPayload>({
      query: ({ limit = 5, page = 1, search = "", sort, sortType}) => ({
        url: '/post/get',
        method: "POST",
        params: {
          limit,
          page,
          sort,
          sortType
        },
        body: {
          search
        }
      }),
      providesTags: () => ["Post"]
    }),
    fetchPostById: build.query<IPost, string>({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
      providesTags: () => ["Post"]
    }),
    createPost: build.mutation<FormData, FormData>({
      query: (body) => {
        const options = ({
          url: "/post",
          method: "POST",
          body
        });

        return options;
      },
      invalidatesTags: ["Post"]
    }),
    updatePost: build.mutation<IUpdatePost, IUpdatePost>({
      query: (body) => {
        const { _id, title, description, content } = body;

        const options = ({
          url: `/post/${_id}`,
          method: "PUT",
          body: {
            title, description, content
          }
        });

        return options;
      },
      invalidatesTags: ["Post"]
    })
  })
});
