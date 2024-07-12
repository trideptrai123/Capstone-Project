import { apiSlice } from "./apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoomsByUserId: builder.query({
      query: (id) => `/api/room?userId=${id}`,
      providesTags: ["room"],
    }),

    addRoom: builder.mutation({
      query: (body) => ({
        url: "/api/room",
        method: "POST",
        body,
      }),
      invalidatesTags: ["room"],
    }),
    renameRoom: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/room/rename/${id}`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["room"],
    }),
    updateImageRoom: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/room/image/${id}`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["room"],
    }),
    getListAllMessageByRoomId: builder.query({
      query: (id) => `/api/message/room/${id}`,
      providesTags: ["message"],
    }),
    sendMess: builder.mutation({
      query: (body) => ({
        url: "/api/message",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["message"],
    }),
    getAllMemberByRoom: builder.query({
      query: (id) => `/api/room/member/${id}`,
      providesTags: ["membernotRoom"],
    }),
    getAllMemberNotInRoom: builder.query({
      query: (id) => `/api/room/member/notInroom/${id}`,
      providesTags: ["membernotRoom"],
    }),
    addUserRoom: builder.mutation({
      query: ({ roomId, data }) => ({
        url: `/api/room/${roomId}/add-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["membernotRoom"],
    }),
    removeUser: builder.mutation({
      query: ({ roomId, data }) => ({
        url: `/api/room/${roomId}/remove-user`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["member"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/api/room/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useGetAllRoomsByUserIdQuery,
  useAddRoomMutation,
  useRenameRoomMutation,
  useUpdateImageRoomMutation,
  useGetListAllMessageByRoomIdQuery,
  useSendMessMutation,
  useGetAllMemberByRoomQuery,
  useGetAllMemberNotInRoomQuery,
  useAddUserRoomMutation,
  useRemoveUserMutation,
  useDeleteRoomMutation,
} = chatApiSlice;
