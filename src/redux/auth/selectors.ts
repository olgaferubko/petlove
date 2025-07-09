import { RootState } from '../store';

export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => selectAuthState(state).user;
export const selectToken = (state: RootState) => selectAuthState(state).token;
export const selectIsLoggedIn = (state: RootState) => selectAuthState(state).isLoggedIn;
export const selectIsRefreshing = (state: RootState) => selectAuthState(state).isRefreshing;
export const selectAuthLoading = (state: RootState) => selectAuthState(state).isLoading;
export const selectAuthError = (state: RootState) => selectAuthState(state).error;
