import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/slice'

const tokenFromStorage = localStorage.getItem('token');
const initialState = {
  auth: {
    user: null,
    token: tokenFromStorage,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: initialState,
});

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch