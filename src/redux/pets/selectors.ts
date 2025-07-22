import { RootState } from '../store';

export const selectPets = (state: RootState) => state.pets.items;
export const selectIsLoading = (state: RootState) => state.pets.isLoading;
export const selectError = (state: RootState) => state.pets.error;
export const selectTotalPages = (state: RootState) => state.pets.totalPages