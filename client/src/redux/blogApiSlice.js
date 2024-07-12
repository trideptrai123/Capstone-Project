import { apiSlice } from "./apiSlice";
import { POST_URL } from "../utils/constnats";

export const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListPost: builder.query({
      query: (filter) => {
        console.log(filter)
        const queryString = new URLSearchParams(filter).toString();
        return {
         
            url:`${POST_URL}?${queryString}`,
        
        }
      }
    }),
    getPostDetail: builder.query({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
      }),
    }),
    getListCateGory: builder.query({
      query: () => ({
        url: `/api/category`,
      }),
    }),
  }),
});

export const { useGetListPostQuery, useGetPostDetailQuery ,useGetListCateGoryQuery} = postSlice;
