import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../types';

const loadCartFromStorage = (): CartState => {
  try {
    const serializedCart = localStorage.getItem('pizzaCart');
    if (serializedCart === null) {
      return { items: [], total: 0 };
    }
    return JSON.parse(serializedCart);
  } catch {
    return { items: [], total: 0 };
  }
};

const initialState: CartState = loadCartFromStorage();

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'id'>>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.pizzaId === newItem.pizzaId && item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        // Generate a unique ID for the cart item
        const id = `${newItem.pizzaId}-${newItem.size}`;
        state.items.push({ ...newItem, id });
      }
      state.total = calculateTotal(state.items);
      localStorage.setItem('pizzaCart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = calculateTotal(state.items);
      localStorage.setItem('pizzaCart', JSON.stringify(state));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      state.total = calculateTotal(state.items);
      localStorage.setItem('pizzaCart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('pizzaCart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
