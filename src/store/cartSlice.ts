import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../types';

const loadCartFromStorage = (): CartState => {
  try {
    const serializedCart = localStorage.getItem('pizzaCart');
    if (serializedCart === null) {
      return { items: [], total: 0, totalDiscount: 0 };
    }
    const parsed = JSON.parse(serializedCart);
    // Ensure totalDiscount exists in loaded state
    return {
      ...parsed,
      totalDiscount: parsed.totalDiscount || 0,
    };
  } catch {
    return { items: [], total: 0, totalDiscount: 0 };
  }
};

const saveCartToStorage = (state: CartState) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem('pizzaCart', serializedCart);
  } catch {
    // Ignore write errors
  }
};

const initialState: CartState = loadCartFromStorage();

// Helper to recalculate totals
const calculateTotals = (items: CartItem[]) => {
  let total = 0;
  let totalDiscount = 0;

  const updatedItems = items.map((item) => {
    const lineTotal = item.price * item.quantity;
    let discount = 0;

    // Discount Rule: 10% off if quantity >= 3
    if (item.quantity >= 3) {
      discount = lineTotal * 0.1;
    }

    total += lineTotal - discount;
    totalDiscount += discount;

    return { ...item, discount };
  });

  return { updatedItems, total, totalDiscount };
};

// Re-calculate on load to ensure consistency
const {
  updatedItems: initialItems,
  total: initialTotal,
  totalDiscount: initialTotalDiscount,
} = calculateTotals(initialState.items);
initialState.items = initialItems;
initialState.total = initialTotal;
initialState.totalDiscount = initialTotalDiscount;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, 'id' | 'discount'>>
    ) => {
      const newItem = action.payload;
      const id = `${newItem.pizzaId}-${newItem.size}`;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push({ ...newItem, id, discount: 0 });
      }

      const { updatedItems, total, totalDiscount } = calculateTotals(
        state.items
      );
      state.items = updatedItems;
      state.total = total;
      state.totalDiscount = totalDiscount;

      saveCartToStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      const { updatedItems, total, totalDiscount } = calculateTotals(
        state.items
      );
      state.items = updatedItems;
      state.total = total;
      state.totalDiscount = totalDiscount;

      saveCartToStorage(state);
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

      const { updatedItems, total, totalDiscount } = calculateTotals(
        state.items
      );
      state.items = updatedItems;
      state.total = total;
      state.totalDiscount = totalDiscount;

      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalDiscount = 0;
      localStorage.removeItem('pizzaCart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
