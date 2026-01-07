# Pizza Challenge

A React application for ordering pizzas.
## Project Overview

This application allows users to browse a menu of pizzas, customize their orders, manage a shopping cart, and view their order history with visual insights.

### Key Features
-   **Interactive Menu:** Browse pizzas with detailed descriptions and images.
-   **Shopping Cart:** Add/remove items, adjust quantities, and see real-time totals.
-   **Order History:** View past orders with a detailed summary.
-   **Insights Dashboard:** Visualize order data with charts (Pie Chart for categories, Bar Chart for spending).
-   **Responsive Design:** Fully optimized for mobile, tablet, and desktop.

## Setup and Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

4.  **Run Tests:**
    ```bash
    npm test
    ```

## Data Structure

### Pizza Menu
The pizza data is stored statically in `src/data/pizzas.ts`. This simulates a database or API response.
Each pizza object contains:
-   `id`: Unique identifier.
-   `name`: Name of the pizza.
-   `price`: Base price.
-   `ingredients`: Array of ingredients.
-   `imageUrl`: URL for the pizza image.
-   `category`: Category (e.g., Vegetarian, Meat, Spicy).

### Data Persistence
The application uses `localStorage` to persist user data:
-   **`pizzaCart`**: Stores the current state of the shopping cart (items, quantities).
-   **`pizzaOrders`**: Stores the history of completed orders.

## Discount Rules

The application implements a specific discount logic:
-   **Bulk Discount:** A **10% discount** is automatically applied to any individual item (pizza type + size) when the quantity is **3 or more**.
-   Discounts are calculated per line item and summed up for the total savings.

## Design Decisions

### State Management: Redux Toolkit
I chose **Redux Toolkit** over React Context for several reasons:
-   **Scalability:** It handles complex state logic (like cart calculations and order history) more efficiently.
-   **Predictability:** The unidirectional data flow makes debugging easier.
-   **Performance:** Selectors allow for optimized re-renders.

### UI Library: Material UI (MUI)
**MUI** was selected to ensure a polished, accessible, and consistent design system.
-   **Theming:** Easy customization of colors, typography, and spacing.
-   **Components:** Ready-to-use components (Grid, Card, Modal, Drawer) accelerated development.
-   **Responsiveness:** Built-in breakpoints make mobile-first design straightforward.

## Additional Libraries

-   **React Router DOM:** For client-side routing.
-   **Jest & React Testing Library:** For unit testing components and logic.
-   **UUID:** For generating unique IDs for orders.
