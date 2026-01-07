import React, { type PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import menuReducer from './store/menuSlice';
import cartReducer from './store/cartSlice';
import type { RootState, AppStore } from './store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                menu: menuReducer as any,
                cart: cartReducer as any,
            },
            preloadedState,
        }) as AppStore,
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): React.JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }

    // Return an object with the store
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
