import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import OrdersPage from '../OrdersPage';
import { BrowserRouter } from 'react-router-dom';

const renderOrdersPage = (preloadedState = {}) => {
    return renderWithProviders(
        <BrowserRouter>
            <OrdersPage />
        </BrowserRouter>,
        { preloadedState }
    );
};

describe('OrdersPage', () => {
    test('renders empty state when no orders exist', () => {
        renderOrdersPage({
            orders: { orders: [] },
        });

        expect(screen.getByText(/No orders yet/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Looks like you haven't ordered anything yet/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Browse Menu/i })
        ).toBeInTheDocument();
    });

    test('renders order history when orders exist', () => {
        const mockOrders = [
            {
                id: 'order-123',
                date: new Date().toISOString(),
                total: 25.5,
                totalDiscount: 2.5,
                items: [
                    {
                        id: 'item-1',
                        pizzaId: 'pizza-1',
                        name: 'Margherita',
                        price: 10,
                        quantity: 2,
                        size: 'Medium',
                        imageUrl: 'test.jpg',
                    },
                ],
            },
        ];

        renderOrdersPage({
            orders: { orders: mockOrders },
        });

        // Check Header
        expect(screen.getByText(/Order History/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Track your past delicious moments/i)
        ).toBeInTheDocument();

        // Check Summary Dashboard
        expect(screen.getByText('TOTAL ORDERS')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); // Count
        expect(screen.getByText('TOTAL SPENT')).toBeInTheDocument();
        const prices = screen.getAllByText('$25.50');
        expect(prices.length).toBeGreaterThan(0); // Should appear in summary and card
        expect(screen.getByText('PIZZAS ORDERED')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument(); // Total Pizzas

        // Check Order Card
        expect(screen.getByText(/#order-12/i)).toBeInTheDocument();
        expect(screen.getByText(/You saved \$2.50!/i)).toBeInTheDocument();

        // Check Items
        expect(screen.getByText(/2x Margherita/i)).toBeInTheDocument();
        expect(screen.getByText(/Medium • \$20.00/i)).toBeInTheDocument();
    });
});
