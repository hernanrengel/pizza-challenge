export interface PizzaSize {
  size: 'Small' | 'Medium' | 'Large';
  price: number;
}

export interface Pizza {
  id: string;
  name: string;
  price: number;
  ingredients: string[];
  imageUrl: string;
  category: string;
}

export interface MenuState {
  pizzas: Pizza[];
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  id: string;
  pizzaId: string;
  name: string;
  price: number;
  quantity: number;
  size: PizzaSize['size'];
  imageUrl: string;
  discount?: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  totalDiscount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  totalDiscount: number;
  date: string;
}

export interface OrdersState {
  orders: Order[];
}
