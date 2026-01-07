import { screen, fireEvent, waitFor, configure } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import AddPizzaModal from '../AddPizzaModal';
import userEvent from '@testing-library/user-event';
import type { Pizza } from '../../types';

// Mock uuid
jest.mock('uuid', () => ({
    v4: () => 'test-uuid',
}));

describe('AddPizzaModal', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        configure({ defaultHidden: true });
    });

    afterEach(() => {
        configure({ defaultHidden: false });
    });

    it('renders correctly when open', () => {
        renderWithProviders(<AddPizzaModal open={true} onClose={mockOnClose} />);

        expect(screen.getByText('Add New Pizza')).toBeInTheDocument();
        expect(screen.getByLabelText(/Pizza Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price \(Medium\)/i)).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        renderWithProviders(<AddPizzaModal open={false} onClose={mockOnClose} />);

        expect(screen.queryByText('Add New Pizza')).not.toBeInTheDocument();
    });

    it('validates required fields', async () => {
        renderWithProviders(<AddPizzaModal open={true} onClose={mockOnClose} />);

        // Submit form directly since button might be considered hidden/unclickable
        const form = document.querySelector('form');
        if (form) fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
            expect(screen.getByText('Price is required')).toBeInTheDocument();
            expect(screen.getByText('Category is required')).toBeInTheDocument();
            expect(screen.getByText('Select at least one ingredient')).toBeInTheDocument();
        });
    });

    it('submits form with valid data', async () => {
        const { store } = renderWithProviders(
            <AddPizzaModal open={true} onClose={mockOnClose} />
        );
        const user = userEvent.setup();

        // Fill Name
        await user.type(screen.getByLabelText(/Pizza Name/i), 'New Pizza');

        // Fill Price
        await user.type(screen.getByLabelText(/Price \(Medium\)/i), '15');

        // Select Category
        const categorySelect = screen.getByLabelText(/Category/i);
        fireEvent.mouseDown(categorySelect);
        const categoryOption = screen.getByText('Vegetarian');
        fireEvent.click(categoryOption);

        // Select Ingredients (Multi-select)
        const ingredientsSelect = screen.getByLabelText(/Ingredients/i);
        fireEvent.mouseDown(ingredientsSelect);
        const ingredientOption = screen.getByText('Tomato');
        fireEvent.click(ingredientOption);
        // Click outside to close select menu (MUI specific behavior sometimes needed, but let's try direct interaction)
        // For multi-select, we might need to click backdrop or another element, but let's assume simple click works for now or use fireEvent.

        // Submit
        const submitButton = await screen.findByRole('button', { name: /Add Pizza/i, hidden: true });
        await user.click(submitButton);

        await waitFor(() => {
            const state = store.getState();
            const addedPizza = state.menu.pizzas.find((p: Pizza) => p.name === 'New Pizza');
            expect(addedPizza).toBeDefined();
            expect(addedPizza?.price).toBe(15);
            expect(addedPizza?.category).toBe('Vegetarian');
            expect(addedPizza?.ingredients).toContain('Tomato');
            expect(mockOnClose).toHaveBeenCalled();
        });
    });
});
