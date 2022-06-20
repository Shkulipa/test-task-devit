import { createApi } from '@reduxjs/toolkit/query/react';
import { IPost, IPostsPayload } from '../../../../interfaces/post';
import { IUpdatePost } from '../../../../pages/postUpdate/postUpdate.interfaces';
import { IFetchPayload } from '../../../../interfaces/fetchPosts.interfaces';
import { posts } from '../../posts';
import { waitMs } from '../../../helper/waitMs';

export const serviceURL = "https://fake-url.com/";

export const postAPIMock = createApi({
  reducerPath: 'postAPIMock',
  baseQuery: async (args: any) => {
    await waitMs();
    const { url, method } = args;

    if(url === "/post" && method === "GET") {
      const { limit = 5, page = 1, search = "", sort, sortType } = args;
      const slice = page * limit;

      return { 
        data: {
          posts: posts.slice(slice - limit, slice),
          count: posts.length
        }
      } 
    }
    /* if (arg?.body && 'amount' in arg.body) {
      amount += 1
    }

    if (arg?.body && 'forceError' in arg.body) {
      return {
        error: {
          status: 500,
          data: null,
        },
      }
    }

    return {
      data: arg?.body ? { ...arg.body, ...(amount ? { amount } : {}) } : {},
    } 
    */
    return {
      data: {},
    } 
  },
  tagTypes: ["Post"],

  endpoints: (build) => ({
    fetchPosts: build.query<IPostsPayload, IFetchPayload>({
      query: ({ limit = 5, page = 1, search = "", sort, sortType}) => ({

        url: `/post`,
        method: "GET",
        params: {
          limit,
          page,
          sort,
          sortType
        },
        body: {
          search
        },
      }),
      providesTags: () => ["Post"]
    }),
    fetchPostById: build.query<IPost, string>({
      query: (id) => ({
        url: `/post/${id}`,
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
    }),
    deletePost: build.mutation<IUpdatePost, { id: string }>({
      query: (body) => {
        const { id } = body;

        const options = ({
          url: `/post/${id}`,
          method: "DELETE",
        });

        return options;
      },
      invalidatesTags: ["Post"]
    })
  })
});
