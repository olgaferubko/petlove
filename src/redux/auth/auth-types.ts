import { Pet } from '../pets/pets-types';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone?: string | null;
  noticesFavorites: string[];
  noticesViewed?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CurrentUserResponse {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  noticesFavorites: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: string | null;
}