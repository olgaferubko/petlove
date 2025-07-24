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
}

export interface PetsState {
    items: Pet[];
    favorites: string[];
    totalPages: number; 
    isLoading: boolean;
    error: string | null;
}