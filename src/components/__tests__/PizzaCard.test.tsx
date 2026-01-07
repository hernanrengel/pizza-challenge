
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import PizzaCard from '../PizzaCard';
import { INGREDIENTS, CATEGORIES } from '../../data/constants';
import type { Pizza } from '../../types';

const mockPizza: Pizza = {
    id: '1',
    name: 'Test Pizza',
    price: 12, // Medium price
    ingredients: [INGREDIENTS.Tomato, INGREDIENTS.Mozzarella],
    imageUrl: 'test-image.jpg',
    category: CATEGORIES.Vegetarian,
};

describe('PizzaCard', () => {
    it('renders pizza details correctly', () => {
        renderWithProviders(<PizzaCard pizza={mockPizza} />);

        expect(screen.getByText('Test Pizza')).toBeInTheDocument();
        expect(screen.getByText('$ 12.00')).toBeInTheDocument();
        expect(screen.getByText('Vegetarian')).toBeInTheDocument();
        expect(screen.getByText(/Tomato, Mozzarella/)).toBeInTheDocument();
    });

    it('calculates price based on size', () => {
        renderWithProviders(<PizzaCard pizza={mockPizza} />);

        // Default is Medium ($12)
        expect(screen.getByText('$ 12.00')).toBeInTheDocument();

        // Change to Small ($10)
        fireEvent.click(screen.getByText('SMALL'));
        expect(screen.getByText('$ 10.00')).toBeInTheDocument();

        // Change to Large ($14)
        fireEvent.click(screen.getByText('LARGE'));
        expect(screen.getByText('$ 14.00')).toBeInTheDocument();
    });

    it('handles add to cart interaction', () => {
        const { store } = renderWithProviders(<PizzaCard pizza={mockPizza} />);

        // Initial state: Add to Cart button visible
        const addButton = screen.getByRole('button', { name: /Add to Cart/i });
        expect(addButton).toBeInTheDocument();

        // Click Add to Cart
        fireEvent.click(addButton);

        // Check if item is in store
        const state = store.getState();
        expect(state.cart.items).toHaveLength(1);
        expect(state.cart.items[0].name).toBe('Test Pizza');
        expect(state.cart.items[0].quantity).toBe(1);

        // Button should change to "In Cart"
        expect(screen.getByText(/In Cart/i)).toBeInTheDocument();
    });

    it('handles quantity updates', () => {
        renderWithProviders(<PizzaCard pizza={mockPizza} />);

        // Increase local quantity
        const incrementButton = screen.getAllByRole('button')[4]; // AddIcon button
        fireEvent.click(incrementButton);
        expect(screen.getByText('2')).toBeInTheDocument();

        // Decrease local quantity
        const decrementButton = screen.getAllByRole('button')[3]; // RemoveIcon button
        fireEvent.click(decrementButton);
        expect(screen.getByText('1')).toBeInTheDocument();
    });
});
