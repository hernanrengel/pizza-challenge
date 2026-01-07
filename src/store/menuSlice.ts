import { createSlice } from '@reduxjs/toolkit';
import type { MenuState, Pizza } from '../types';
import pizzasData from '../data/pizzas.json';

const initialState: MenuState = {
  pizzas: pizzasData as Pizza[],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export default menuSlice.reducer;
