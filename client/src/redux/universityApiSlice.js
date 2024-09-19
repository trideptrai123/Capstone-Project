import { apiSlice } from "./apiSlice";
import { UNIVERSITIES_URL } from "../utils/constnats"; // Đảm bảo bạn có URL chính xác

export const universityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `${UNIVERSITIES_URL}/ranking/list?${queryString}`,

        }
      },
      providesTags: ["University"],
      keepUnusedDataFor: 5,
    }),
    getUniversityDetails: builder.query({
      query: (id) => ({
        url: `${UNIVERSITIES_URL}/${id}`,
      }),
      providesTags: ["University"],
      keepUnusedDataFor: 5,
    }),
    createUniversity: builder.mutation({
      query: (data) => ({
        url: UNIVERSITIES_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["University"],
    }),

    updateUniversity: builder.mutation({
      query: (data) => ({
        url: `${UNIVERSITIES_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["University"],
    }),
    deleteUniversity: builder.mutation({
      query: (id) => ({
        url: `${UNIVERSITIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["University"],
    }),

    getListUniversity: builder.query({
      query: () => ({
        url: `${UNIVERSITIES_URL}`,
      }),
    }),

    getMajors: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/api/major/?${queryString}`,

        }
      },
    }),
  }),
});

export const {
  useGetUniversitiesQuery,
  useGetUniversityDetailsQuery,
  useCreateUniversityMutation,
  useUpdateUniversityMutation,
  useDeleteUniversityMutation,
  useGetListUniversityQuery,
  useGetMajorsQuery,
} = universityApiSlice;
