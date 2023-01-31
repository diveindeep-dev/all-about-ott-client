import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserByToken } from '../../api';

const initialState: Auth = {
  isAuthenticated: false,
  signInUser: null,
};

export const fetchUser = createAsyncThunk('auth/fetchToken', async () => {
  const token = localStorage.getItem('token');
  const headers = { headers: { authorization: `Bearer ${token}` } };
  const response = await getUserByToken(headers);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem('token');
      state.signInUser = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload.code === 200) {
        state.signInUser = action.payload.signInUser;
        state.isAuthenticated = true;
      } else {
        localStorage.removeItem('token');
        state.signInUser = null;
        state.isAuthenticated = false;
      }
    });
    builder.addCase(fetchUser.rejected, (state) => {
      localStorage.removeItem('token');
      state.signInUser = null;
      state.isAuthenticated = false;
    });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
