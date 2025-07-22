import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pet } from './pets-types';

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

    const response = await axios.get<FetchPetsResponse>(`https://petlove.b.goit.study/api/notices?${params.toString()}`);

    return response.data;
  }
);
