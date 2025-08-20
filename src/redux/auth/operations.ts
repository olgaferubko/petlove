import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthorizationHeader, clearAuthorizationHeader } from '../../utils/utils';
import type { RootState } from '../store';
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginCredentials,
  RegisterCredentials,
} from './auth-types';


export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse>(
        '/users/signup',
        credentials
      );
      setAuthorizationHeader(data.token);
      return data;
    } catch (err: any) {
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message;
      return rejectWithValue(msg);
    }
  }
);

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse>(
        '/users/signin',
        credentials
      );
      setAuthorizationHeader(data.token);
      return data;
    } catch (err: any) {
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        'Invalid credentials';
      return rejectWithValue(msg);
    }
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/users/signout');
      clearAuthorizationHeader();
    } catch (err: any) {
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message;
      return rejectWithValue(msg);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<
  CurrentUserResponse,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token, please login again');
    }
    setAuthorizationHeader(token);
    try {
      const { data } = await axios.get<CurrentUserResponse>(
        `/users/current/full`
      );
      return data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      return rejectWithValue(msg);
    }
  }
);

type UserUpdatePayload = {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
};

export const updateUser = createAsyncThunk<
  CurrentUserResponse,
  Partial<UserUpdatePayload>,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'auth/updateUser',
  async (userData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token, please login again');
    }

    setAuthorizationHeader(token);

    try {
      const filteredData: Partial<UserUpdatePayload> = {};
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          filteredData[key as keyof UserUpdatePayload] = value;
        }
      });

      const { data } = await axios.patch<CurrentUserResponse>(
        '/users/current/edit',
        filteredData
      );

      return data;
    } catch (err: any) {
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message;
      return rejectWithValue(msg);
    }
  }
);

export const addFavoriteToBackend = createAsyncThunk<
  CurrentUserResponse,
  string,
  { state: RootState; rejectValue: string }
>(
  'auth/addFavorite',
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue('No token');

    setAuthorizationHeader(token);

    try {
      await axios.post(`/notices/favorites/add/${id}`);
      const { data } = await axios.get<CurrentUserResponse>('/users/current/full');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteFavoriteFromBackend = createAsyncThunk<
  CurrentUserResponse,
  string,
  { state: RootState; rejectValue: string }
>(
  'auth/deleteFavorite',
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue('No token');

    setAuthorizationHeader(token);

    try {
      await axios.delete(`/notices/favorites/remove/${id}`);
      const { data } = await axios.get<CurrentUserResponse>('/users/current/full');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);