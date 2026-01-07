export const INGREDIENTS = {
  Tomato: 'Tomato',
  Mozzarella: 'Mozzarella',
  Basil: 'Basil',
  Pepperoni: 'Pepperoni',
  Ham: 'Ham',
  Pineapple: 'Pineapple',
  Peppers: 'Peppers',
  Onions: 'Onions',
  Mushrooms: 'Mushrooms',
  Sausage: 'Sausage',
  Bacon: 'Bacon',
  Chicken: 'Chicken',
  Jalapenos: 'Jalapeños',
  HotSauce: 'Hot Sauce',
  Shrimp: 'Shrimp',
  Calamari: 'Calamari',
  Garlic: 'Garlic',
  Olives: 'Olives',
  Spinach: 'Spinach',
  FetaCheese: 'Feta Cheese',
  BBQSauce: 'BBQ Sauce',
} as const;

export const AVAILABLE_INGREDIENTS = Object.values(INGREDIENTS);

export const CATEGORIES = {
  Vegetarian: 'Vegetarian',
  Meat: 'Meat',
  Spicy: 'Spicy',
  Seafood: 'Seafood',
  Vegan: 'Vegan',
  Specialty: 'Specialty',
} as const;

export const AVAILABLE_CATEGORIES = Object.values(CATEGORIES);
