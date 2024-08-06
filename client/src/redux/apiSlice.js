import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice'; // Import the logout action
import { LOCALSTORAGE_KEY } from '../components/Login/Login';
import { BASE_URL } from '../utils/constnats';

// NOTE: code here has changed to handle when our JWT and Cookie expire.
// We need to customize the baseQuery to be able to intercept any 401 responses
// and log the user out
// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#customizing-queries-with-basequery

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(LOCALSTORAGE_KEY.token);
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  }
});

const baseQueryWithAuth = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth, // Use the customized baseQuery
  tagTypes: ['User', 'University', 'Comment', 'Room', 'Message'],
  endpoints: (builder) => ({}),
});
