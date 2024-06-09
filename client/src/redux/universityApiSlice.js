import { apiSlice } from './apiSlice';
import { UNIVERSITIES_URL } from '../utils/constnats'; // Đảm bảo bạn có URL chính xác

export const universityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query({
      query: () => ({
        url: UNIVERSITIES_URL,
      }),
      providesTags: ['University'],
      keepUnusedDataFor: 5,
    }),
    getUniversityDetails: builder.query({
      query: (id) => ({
        url: `${UNIVERSITIES_URL}/${id}`,
      }),
      providesTags: ['University'],
      keepUnusedDataFor: 5,
    }),
    createUniversity: builder.mutation({
      query: (data) => ({
        url: UNIVERSITIES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['University'],
    }),
    updateUniversity: builder.mutation({
      query: (data) => ({
        url: `${UNIVERSITIES_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['University'],
    }),
    deleteUniversity: builder.mutation({
      query: (id) => ({
        url: `${UNIVERSITIES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['University'],
    }),
  }),
});

export const {
  useGetUniversitiesQuery,
  useGetUniversityDetailsQuery,
  useCreateUniversityMutation,
  useUpdateUniversityMutation,
  useDeleteUniversityMutation,
} = universityApiSlice;
