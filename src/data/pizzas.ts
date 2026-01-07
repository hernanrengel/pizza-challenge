import type { Pizza } from '../types';
import { INGREDIENTS, CATEGORIES } from './constants';

export const pizzas: Pizza[] = [
    {
        id: '1',
        name: 'Margherita',
        price: 12,
        ingredients: [INGREDIENTS.Tomato, INGREDIENTS.Mozzarella, INGREDIENTS.Basil],
        imageUrl:
            'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
        category: CATEGORIES.Vegetarian,
    },
    {
        id: '2',
        name: 'Pepperoni',
        price: 14,
        ingredients: [INGREDIENTS.Tomato, INGREDIENTS.Mozzarella, INGREDIENTS.Pepperoni],
        imageUrl:
            'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
        category: CATEGORIES.Meat,
    },
    {
        id: '3',
        name: 'Hawaiian',
        price: 13,
        ingredients: [
            INGREDIENTS.Tomato,
            INGREDIENTS.Mozzarella,
            INGREDIENTS.Ham,
            INGREDIENTS.Pineapple,
        ],
        imageUrl:
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        category: CATEGORIES.Meat,
    },
    {
        id: '4',
        name: 'Veggie',
        price: 13,
        ingredients: [
            INGREDIENTS.Tomato,
            INGREDIENTS.Mozzarella,
            INGREDIENTS.Peppers,
            INGREDIENTS.Onions,
            INGREDIENTS.Mushrooms,
        ],
        imageUrl:
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        category: CATEGORIES.Vegetarian,
    },
    {
        id: '5',
        name: 'Meat Lovers',
        price: 16,
        ingredients: [
            INGREDIENTS.Tomato,
            INGREDIENTS.Mozzarella,
            INGREDIENTS.Pepperoni,
            INGREDIENTS.Sausage,
            INGREDIENTS.Bacon,
        ],
        imageUrl:
            'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
        category: CATEGORIES.Meat,
    },
    {
        id: '6',
        name: 'Spicy Chicken',
        price: 15,
        ingredients: [
            INGREDIENTS.Tomato,
            INGREDIENTS.Mozzarella,
            INGREDIENTS.Chicken,
            INGREDIENTS.Jalapenos,
            INGREDIENTS.HotSauce,
        ],
        imageUrl:
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        category: CATEGORIES.Spicy,
    },
    {
        id: '7',
        name: 'Seafood Delight',
        price: 17,
        ingredients: [
            INGREDIENTS.Tomato,
            INGREDIENTS.Mozzarella,
            INGREDIENTS.Shrimp,
            INGREDIENTS.Calamari,
            INGREDIENTS.Garlic,
        ],
        imageUrl:
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        category: CATEGORIES.Seafood,
    },
];
