import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  likedUniversities: localStorage.getItem('likedUniversities')
    ? JSON.parse(localStorage.getItem('likedUniversities'))
    : [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    setLikedUniversities: (state, action) => {
      state.likedUniversities = action.payload;
      localStorage.setItem('likedUniversities', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, setLikedUniversities, logout } =
  authSlice.actions;

export default authSlice.reducer;
