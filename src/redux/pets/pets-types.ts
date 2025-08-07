export interface Pet {
  _id: string;
  imgURL: string;
  title: string;
  popularity: number;
  name: string;
  birthday: string;
  sex: string;
  species: string;
  category: string;
  comment: string;
  price: string;
    isFavorite: boolean;
    owner?: string;
}

export interface PetsState {
  items: Pet[];
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  favorites: string[];
}

export type AddPetRequest = {
  imgURL: string;
  title: string;
  name: string;
  birthday: string;
  species: string;
  sex: 'male' | 'female' | 'unknown' | 'multiple';
};