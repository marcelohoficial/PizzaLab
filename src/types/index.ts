export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'customer';
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'classica' | 'brasileira' | 'especial' | 'vegetariana';
  ingredients: string[];
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pendente' | 'preparando' | 'entregue' | 'cancelado';
  createdAt: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageTicket: number;
  pizzasSold: number;
  dailySales: Array<{
    date: string;
    value: number;
    orders: number;
  }>;
  topPizzas: Array<{
    pizza: Pizza;
    sales: number;
    ranking: number;
  }>;
}