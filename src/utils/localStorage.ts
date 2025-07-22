import { Pet } from '../redux/pets/pets-types';

export const saveFavoritesToLocalStorage = (pets: Pet[]) => {
  const favorites = pets.filter(pet => pet.isFavorite).map(pet => pet._id);
  localStorage.setItem('favoritePets', JSON.stringify(favorites));
};

export const getFavoritesFromLocalStorage = (): string[] => {
  const stored = localStorage.getItem('favoritePets');
  return stored ? JSON.parse(stored) : [];
};