import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pet } from './pets-types';
import { fetchCurrentUser } from '../auth/operations';
import { RootState } from '../store';

interface FetchPetsParams {
  filters: {
    search: string;
    category?: string;
    sex?: string;
    species?: string;
    city?: string;
    sort: string;
  };
  page: number;
}

interface FetchPetsResponse {
  results: Pet[];
  totalPages: number;
}

const BASE_URL = 'https://petlove.b.goit.study/api';

export const fetchPets = createAsyncThunk<FetchPetsResponse, FetchPetsParams>(
  'pets/fetchPets',
  async ({ filters, page }) => {
    const params = new URLSearchParams();

    params.append('page', page.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.sex) params.append('sex', filters.sex);
    if (filters.species) params.append('species', filters.species);
    if (filters.city) params.append('city', filters.city);
    params.append('sort', filters.sort);

    const response = await axios.get<FetchPetsResponse>(
      `${BASE_URL}/notices?${params.toString()}`
    );

    return response.data;
  }
);

type AddPetResponse = {
  pets: Pet[];
};

export const addUserPet = createAsyncThunk<
  Pet,
  Omit<Pet, '_id'>,
  { rejectValue: string }
>(
  'pets/addUserPet',
  async (petData, { rejectWithValue }) => {
    try {
      const response = await axios.post<AddPetResponse>(
        `${BASE_URL}/users/current/pets/add`,
        petData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

    const newPet = response.data.pets.at(-1);
    if (!newPet) {
      return rejectWithValue('Server did not return a new pet');
    }
    return newPet;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUserPets = createAsyncThunk(
  'pets/getUserPets',
  async (_, thunkAPI) => {
    try {
    const res = await fetch(`${BASE_URL}/users/current/full`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

      if (!res.ok) throw new Error('Failed to fetch user data');

      const user = await res.json();
      return user.pets;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const deleteUserPet = createAsyncThunk<string, string, { rejectValue: string }>(
  'pets/deleteUserPet',
  async (petId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/users/current/pets/remove/${petId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return petId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addFavoriteToBackend = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'pets/addFavorite',
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/notices/favorites/add/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const deleteFavoriteFromBackend = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'pets/deleteFavorite',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/notices/favorites/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);