import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  updateUser,
  addFavoriteToBackend,
  deleteFavoriteFromBackend
} from './operations';
import type { User, AuthState, AuthResponse, CurrentUserResponse } from './auth-types';

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
    updateAvatar(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? null;
      })

      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? null;
      })

      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('token');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? null;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(fetchCurrentUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        if (!state.user || JSON.stringify(state.user) !== JSON.stringify(action.payload)) {
          state.user = action.payload;
        }
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.fulfilled, (state, action: PayloadAction<CurrentUserResponse>) => {
        state.user = { ...action.payload };
      })

      .addCase(addFavoriteToBackend.fulfilled, (state, action: PayloadAction<CurrentUserResponse>) => {
        state.user = action.payload;
      })

      .addCase(deleteFavoriteFromBackend.fulfilled, (state, action: PayloadAction<CurrentUserResponse>) => {
        state.user = action.payload;
      });
  },
});

export const { clearAuthError, updateAvatar } = authSlice.actions;
export default authSlice.reducer;