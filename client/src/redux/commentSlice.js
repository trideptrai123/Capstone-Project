import { apiSlice } from "./apiSlice";
import { COMMENT_URL } from "../utils/constnats"; // Đảm bảo bạn có URL chính xác

export const universityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListCommentByPostId: builder.query({
      query: (id) => ({
        url: `${COMMENT_URL}/${id}`,
      }),
      providesTags: ["list_comment"],
    }),

    addComment: builder.mutation({
      query: (data) => ({
        url: COMMENT_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["list_comment"],
    }),
    updateComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `${COMMENT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["list_comment"],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `${COMMENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["list_comment"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetListCommentByPostIdQuery,
  useUpdateCommentMutation,
} = universityApiSlice;
