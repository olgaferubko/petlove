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
        '/users/current'
      );
      return data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      return rejectWithValue(msg);
    }
  }
);
