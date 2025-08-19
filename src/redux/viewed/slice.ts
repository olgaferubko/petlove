import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet } from '../pets/pets-types';

interface ViewedState {
  items: Pet[];
}

const initialState: ViewedState = {
  items: JSON.parse(localStorage.getItem('viewed') || '[]'),
};

const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    addViewed(state, action: PayloadAction<Pet>) {
      if (!state.items.find(pet => pet._id === action.payload._id)) {
        state.items.unshift(action.payload);
        if (state.items.length > 20) state.items.pop();
        localStorage.setItem('viewed', JSON.stringify(state.items));
      }
    },
    clearViewed(state) {
      state.items = [];
      localStorage.removeItem('viewed');
    }
  },
});

export const { addViewed, clearViewed } = viewedSlice.actions;
export default viewedSlice.reducer;