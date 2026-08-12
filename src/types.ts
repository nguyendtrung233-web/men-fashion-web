export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  memberTier: 'Bronze' | 'Silver' | 'Gold' | 'VIP Platinum';
  joinDate: string;
}

export interface OrderItem {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Đang xử lý' | 'Đã xác nhận' | 'Đang giao' | 'Đã hoàn thành' | 'Đã hủy';
  paymentMethod: string;
}
