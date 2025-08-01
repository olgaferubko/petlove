import { createSlice } from '@reduxjs/toolkit';
import { Pet, PetsState } from './pets-types';
import {
  fetchPets,
  getUserPets,
  deleteUserPet,
  addUserPet,
} from './operations';

const initialState: PetsState = {
  items: [],
  totalPages: 0,
  isLoading: false,
  error: null,
  favorites: [],
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder

      .addCase(fetchPets.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch pets';
      })

      .addCase(addUserPet.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUserPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addUserPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to add pet';
      })

      .addCase(deleteUserPet.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserPet.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.payload;
        state.items = state.items.filter(pet => pet._id !== id);
      })
      .addCase(deleteUserPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete pet';
      });
  },
});

export default petsSlice.reducer;