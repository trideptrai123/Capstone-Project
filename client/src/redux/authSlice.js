import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOCALSTORAGE_KEY } from '../components/Login/Login';

// Tạo createAsyncThunk để lấy thông tin người dùng
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":localStorage.getItem(LOCALSTORAGE_KEY.token)
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data; // Giả sử dữ liệu người dùng trả về từ API nằm trong response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  likedUniversities: localStorage.getItem('likedUniversities')
    ? JSON.parse(localStorage.getItem('likedUniversities'))
    : [],
  loading: false,
  error: null,
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
      state.likedUniversities = [];
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, setLikedUniversities, logout } = authSlice.actions;

export default authSlice.reducer;
