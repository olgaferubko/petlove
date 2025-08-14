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
  lastRequestId: null,
};

function mergeUniqueById(existing: Pet[], incoming: Pet[]): Pet[] {
  const map = new Map<string, Pet>();
  for (const x of existing) map.set(x._id as unknown as string, x);
  for (const x of incoming) map.set(x._id as unknown as string, x);
  return Array.from(map.values());
}

const pickError = (action: any) =>
  (action.payload as string) ??
  action.error?.message ??
  'Unknown error';

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      
      .addCase(fetchPets.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.lastRequestId = action.meta.requestId; 
        if (action.meta.arg.page === 1) state.items = [];
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        if (action.meta.requestId !== state.lastRequestId) return;
        state.isLoading = false;
        state.items = action.payload.results;    
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        if (action.meta.requestId !== state.lastRequestId) return;
        state.isLoading = false;
        state.error =
          (action.payload as string) ?? action.error?.message ?? 'Unknown error';
      })

      .addCase(addUserPet.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUserPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = mergeUniqueById([action.payload, ...state.items], []);
      })
      .addCase(addUserPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = pickError(action);
      })

      .addCase(deleteUserPet.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserPet.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.payload;
        state.items = state.items.filter(pet => (pet as any)._id !== id);
      })
      .addCase(deleteUserPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = pickError(action);
      })

      .addCase(getUserPets.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload as Pet[];
      })
      .addCase(getUserPets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = pickError(action);
      });
  },
});

export default petsSlice.reducer;