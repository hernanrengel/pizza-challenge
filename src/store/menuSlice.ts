import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MenuState, Pizza } from '../types';
import { pizzas as pizzasData } from '../data/pizzas';

const initialState: MenuState = {
  pizzas: pizzasData,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<Pizza>) => {
      state.pizzas.push(action.payload);
    },
  },
});

export const { addPizza } = menuSlice.actions;

export default menuSlice.reducer;
