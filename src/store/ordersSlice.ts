import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Order, OrdersState } from '../types';

const loadOrdersFromStorage = (): OrdersState => {
    try {
        const serializedOrders = localStorage.getItem('pizzaOrders');
        if (serializedOrders === null) {
            return { orders: [] };
        }
        return JSON.parse(serializedOrders);
    } catch {
        return { orders: [] };
    }
};

const saveOrdersToStorage = (state: OrdersState) => {
    try {
        const serializedOrders = JSON.stringify(state);
        localStorage.setItem('pizzaOrders', serializedOrders);
    } catch {
        // Ignore write errors
        console.error('Failed to save orders to storage');
    }
};

const initialState: OrdersState = loadOrdersFromStorage();

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload);
            saveOrdersToStorage(state);
        },
    },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
