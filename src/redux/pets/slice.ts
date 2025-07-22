import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PetsState, Pet } from './pets-types';
import { saveFavoritesToLocalStorage, getFavoritesFromLocalStorage } from '../../utils/localStorage';

import { fetchPets } from './operations';

const initialState: PetsState = {
  items: [],
  totalPages: 1,   
  isLoading: false,
  error: null,
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const petId = action.payload;
      const pet = state.items.find(p => p._id === petId);
      if (pet) {
        pet.isFavorite = !pet.isFavorite;
        saveFavoritesToLocalStorage(state.items);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        const favoriteIds = getFavoritesFromLocalStorage();
        state.items = action.payload.results.map(pet => ({
          ...pet,
          isFavorite: favoriteIds.includes(pet._id),
        }));
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error fetching pets';
        state.isLoading = false;
      });
  },
});

export const { toggleFavorite } = petsSlice.actions;
export default petsSlice.reducer;