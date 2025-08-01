
export const saveFavoritesToLocalStorage = (favoriteIds: string[]) => {
  localStorage.setItem('favoritePets', JSON.stringify(favoriteIds));
};

export const getFavoritesFromLocalStorage = (): string[] => {
  const stored = localStorage.getItem('favoritePets');
  return stored ? JSON.parse(stored) : [];
};