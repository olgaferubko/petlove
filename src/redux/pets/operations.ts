import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pet, AddPetRequest } from './pets-types';

interface FetchPetsParams {
  filters: {
    search: string;
    category?: string;
    sex?: 'unknown' | 'female' | 'male' | 'multiple';
    species?: string;
    city?: string; 
    sort: '' | 'popular' | 'unpopular' | 'cheap' | 'expensive';
  };
  page: number;
  limit?: number;
  clientMode?: boolean; 
}

interface FetchPetsResponse {
  results: Pet[];
  totalPages: number;
}

const BASE_URL = 'https://petlove.b.goit.study/api';

export const fetchPets = createAsyncThunk<FetchPetsResponse, FetchPetsParams>(
  'pets/fetchPets',
  async ({ filters, page, limit }) => {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('limit', String(limit ?? 6));

    if (filters.search) params.append('keyword', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.sex) params.append('sex', filters.sex);
    if (filters.species) params.append('species', filters.species);
    if (filters.city) params.append('locationId', filters.city);

    let byDate = 'true';

    if (filters.sort === 'popular' || filters.sort === 'unpopular') {
      params.append('byPopularity', 'true');
      byDate = 'false';
    } else if (filters.sort === 'expensive') {
      params.append('byPrice', 'true');
      byDate = 'false';
    }
    params.append('byDate', byDate);

    const { data } = await axios.get<FetchPetsResponse>(
      `${BASE_URL}/notices?${params.toString()}`
    );
    return data;
  }
);

type AddPetResponse = { pets: Pet[] };

export const addUserPet = createAsyncThunk<Pet, AddPetRequest, { rejectValue: string }>(
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
      if (!newPet) return rejectWithValue('Server did not return a new pet');
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return petId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addFavoriteToBackend = createAsyncThunk<string, string, { rejectValue: string }>(
  'pets/addFavorite',
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/notices/favorites/add/${id}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);

export const deleteFavoriteFromBackend = createAsyncThunk<string, string, { rejectValue: string }>(
  'pets/deleteFavorite',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/notices/favorites/remove/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Server error');
    }
  }
);
