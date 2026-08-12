import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, CartItem, UserProfile, OrderItem } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  user: UserProfile | null;
  orders: OrderItem[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  loginUser: (email: string, fullName?: string) => void;
  logoutUser: () => void;
  registerUser: (userData: { fullName: string; email: string; phone: string }) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  placeOrder: (paymentMethod: string, totalAmount?: number) => OrderItem;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_USER: UserProfile = {
  fullName: 'Quý Ông Doanh Nhân',
  email: 'khachhang@gentleman.vn',
  phone: '0908 888 999',
  address: 'Tầng 12, Tòa nhà Landmark 81, Q. Bình Thạnh, TP. Hồ Chí Minh',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  memberTier: 'VIP Platinum',
  joinDate: '15/01/2024'
};

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'GENT-8921',
    date: '20/07/2026',
    items: [
      {
        product: SAMPLE_PRODUCTS[0],
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'Đen Classic'
      },
      {
        product: SAMPLE_PRODUCTS[1],
        quantity: 2,
        selectedSize: '40',
        selectedColor: 'Trắng Tinh Khôi'
      }
    ],
    totalAmount: 6750000,
    status: 'Đã hoàn thành',
    paymentMethod: 'Chuyển khoản Ngân hàng (VNPay)'
  },
  {
    id: 'GENT-9042',
    date: '25/07/2026',
    items: [
      {
        product: SAMPLE_PRODUCTS[5],
        quantity: 1,
        selectedSize: '41',
        selectedColor: 'Nâu Espresso'
      }
    ],
    totalAmount: 3200000,
    status: 'Đang giao',
    paymentMethod: 'Thanh toán khi nhận hàng (COD)'
  }
];

const syncCartProducts = (items: CartItem[]): CartItem[] =>
  items.map(item => ({
    ...item,
    product: SAMPLE_PRODUCTS.find(product => product.id === item.product.id) ?? item.product
  }));

const syncOrderProducts = (items: OrderItem[]): OrderItem[] =>
  items.map(order => ({
    ...order,
    items: syncCartProducts(order.items)
  }));

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gentleman_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed)) return syncCartProducts(parsed);
      } catch (e) {
        console.error(e);
      }
    }
    // Default initial item for quick demo
    return [
      {
        product: SAMPLE_PRODUCTS[0],
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'Đen Classic'
      },
      {
        product: SAMPLE_PRODUCTS[2],
        quantity: 2,
        selectedSize: 'XL',
        selectedColor: 'Xanh Đen'
      }
    ];
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gentleman_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_USER;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('gentleman_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as OrderItem[];
        if (Array.isArray(parsed)) return syncOrderProducts(parsed);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ORDERS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem('gentleman_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gentleman_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gentleman_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gentleman_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (msg: string) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToastMessage(msg);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3500);
  };

  const addToCart = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const selSize = size || product.sizes[0] || 'L';
    const selColor = color || product.colors[0] || 'Tiêu chuẩn';

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedSize === selSize && item.selectedColor === selColor
      );

      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, quantity, selectedSize: selSize, selectedColor: selColor }];
      }
    });

    showToast(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => {
      const removed = prev[index];
      const next = prev.filter((_, i) => i !== index);
      if (removed) {
        showToast(`Đã xóa "${removed.product.name}" khỏi giỏ hàng.`);
      }
      return next;
    });
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      return prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginUser = (email: string, fullName?: string) => {
    const newUser: UserProfile = {
      fullName: fullName || email.split('@')[0].toUpperCase(),
      email: email,
      phone: '0912 345 678',
      address: '720A Điện Biên Phủ, Phường 22, Q. Bình Thạnh, TP.HCM',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      memberTier: 'Gold',
      joinDate: new Date().toLocaleDateString('vi-VN')
    };
    setUser(newUser);
    showToast(`Đăng nhập thành công! Chào mừng ${newUser.fullName}.`);
  };

  const registerUser = (userData: { fullName: string; email: string; phone: string }) => {
    const newUser: UserProfile = {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone || '0988 777 666',
      address: 'Chưa cập nhật địa chỉ mặc định',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      memberTier: 'Bronze',
      joinDate: new Date().toLocaleDateString('vi-VN')
    };
    setUser(newUser);
    showToast(`Đăng ký tài khoản thành công! Xin chào ${newUser.fullName}.`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Đã đăng xuất khỏi hệ thống.');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
      showToast('Đã cập nhật thông tin cá nhân!');
    }
  };

  const placeOrder = (paymentMethod: string, chargedTotal?: number): OrderItem => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalAmount = chargedTotal ?? subtotal;
    const newOrder: OrderItem = {
      id: `GENT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('vi-VN'),
      items: [...cart],
      totalAmount,
      status: 'Đang xử lý',
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Đặt hàng thành công! Mã đơn hàng: ${newOrder.id}`);
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        user,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        loginUser,
        logoutUser,
        registerUser,
        updateProfile,
        placeOrder,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
