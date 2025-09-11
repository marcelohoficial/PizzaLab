import axios from 'axios';
import { User, Pizza, Order, DashboardMetrics } from '../types';

const API_BASE_URL = 'https://api.pizzalab.com'; // Replace with actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/', credentials);
    return response.data;
  },
  
  registerAdmin: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register/admin/', userData);
    return response.data;
  },
};

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/user');
    return response.data;
  },
  
  create: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post('/user', userData);
    return response.data;
  },
  
  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },
  
  update: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/user/${id}`);
  },
};

export const pizzaApi = {
  getAll: async (): Promise<Pizza[]> => {
    const response = await api.get('/pizza');
    return response.data;
  },
  
  create: async (pizzaData: Omit<Pizza, 'id'>): Promise<Pizza> => {
    const response = await api.post('/pizza', pizzaData);
    return response.data;
  },
  
  getById: async (id: string): Promise<Pizza> => {
    const response = await api.get(`/pizza/${id}`);
    return response.data;
  },
  
  update: async (id: string, pizzaData: Partial<Pizza>): Promise<Pizza> => {
    const response = await api.put(`/pizza/${id}`, pizzaData);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/pizza/${id}`);
  },
};

export const orderApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  create: async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  update: async (id: string, orderData: Partial<Order>): Promise<Order> => {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`);
  },
};

// Mock data for development
export const mockPizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Molho de tomate, mozzarella fresca, manjericão e azeite extra virgem',
    price: 32.90,
    image: 'https://images.pexels.com/photos/845808/pexels-photo-845808.jpeg',
    category: 'classica',
    ingredients: ['molho de tomate', 'mozzarella', 'manjericão', 'azeite']
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Molho de tomate, mozzarella e generosas fatias de pepperoni',
    price: 38.90,
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg',
    category: 'classica',
    ingredients: ['molho de tomate', 'mozzarella', 'pepperoni']
  },
  {
    id: '3',
    name: 'Quattro Stagioni',
    description: 'Molho de tomate, mozzarella, presunto, cogumelos, alcachofras e azeitonas',
    price: 42.90,
    image: 'https://images.pexels.com/photos/4109842/pexels-photo-4109842.jpeg',
    category: 'especial',
    ingredients: ['molho de tomate', 'mozzarella', 'presunto', 'cogumelos', 'alcachofras', 'azeitonas']
  },
  {
    id: '4',
    name: 'Calabresa Especial',
    description: 'Molho de tomate, mozzarella, calabresa artesanal, cebola roxa e pimentão',
    price: 35.90,
    image: 'https://images.pexels.com/photos/5639533/pexels-photo-5639533.jpeg',
    category: 'brasileira',
    ingredients: ['molho de tomate', 'mozzarella', 'calabresa', 'cebola', 'pimentão']
  }
];

export const mockDashboardData: DashboardMetrics = {
  totalRevenue: 21023.85,
  totalOrders: 366,
  averageTicket: 57.44,
  pizzasSold: 476,
  dailySales: [
    { date: '31/12', value: 2450.80, orders: 32 },
    { date: '01/01', value: 1890.50, orders: 25 },
    { date: '02/01', value: 3200.90, orders: 41 },
    { date: '03/01', value: 2750.30, orders: 35 },
    { date: '04/01', value: 4100.70, orders: 52 },
    { date: '05/01', value: 3650.20, orders: 47 },
    { date: '06/01', value: 2980.45, orders: 38 }
  ],
  topPizzas: [
    { pizza: mockPizzas[0], sales: 43, ranking: 1 },
    { pizza: mockPizzas[1], sales: 21, ranking: 2 },
    { pizza: mockPizzas[2], sales: 32, ranking: 3 },
    { pizza: mockPizzas[3], sales: 20, ranking: 4 }
  ]
};