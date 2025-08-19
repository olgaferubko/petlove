import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import petsReducer from './pets/slice';
import viewedReducer from './viewed/slice';

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
  pets: {
    items: [],
    totalPages: 1,
    isLoading: false,
    error: null,
    favorites: [],
    lastRequestId: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petsReducer,
    viewed: viewedReducer,
  },
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;