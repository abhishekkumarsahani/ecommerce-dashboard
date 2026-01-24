export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Review {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Stats {
  totalRevenue: number;
  totalSales: number;
  activeUsers: number;
  pendingOrders: number;
}