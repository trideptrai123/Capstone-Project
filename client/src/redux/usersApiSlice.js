import { apiSlice } from './apiSlice';
import { USERS_URL } from '../utils/constnats';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    likeUniversity: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/like/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    unlikeUniversity: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/unlike/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
    compareUniversity: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/compare/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
    unlikecompareUniversity: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/uncompare/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
  useLikeUniversityMutation,
  useUnlikeUniversityMutation,
  useGetUserProfileQuery,
  useCompareUniversityMutation,
  useUnlikecompareUniversityMutation,

} = userApiSlice;
