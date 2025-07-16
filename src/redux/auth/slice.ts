import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
} from './operations';
import type { AuthState, AuthResponse, CurrentUserResponse } from './auth-types';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? null;
    });

    builder.addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? null;
    });

    builder.addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('token');
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? null;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
    });

    builder.addCase(fetchCurrentUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<CurrentUserResponse>) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      }
    );
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.isRefreshing = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;