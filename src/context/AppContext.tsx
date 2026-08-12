import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Product,
  CartItem,
  UserProfile,
  UserAccount,
  OrderItem,
  OrderStatus,
  PaymentStatus
} from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  user: UserProfile | null;
  orders: OrderItem[];
  customerOrders: OrderItem[];
  accounts: UserAccount[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  loginUser: (email: string, password: string) => { success: boolean; message: string; isAdmin?: boolean };
  logoutUser: () => void;
  registerUser: (userData: { fullName: string; email: string; phone: string; password: string }) => { success: boolean; message: string };
  updateProfile: (updated: Partial<UserProfile>) => void;
  placeOrder: (paymentMethod: string, totalAmount?: number) => OrderItem | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE = {
  accounts: 'gentleman_accounts_v2',
  sessionEmail: 'gentleman_session_email_v2',
  orders: 'gentleman_orders_v2',
  cartPrefix: 'gentleman_cart_v2:'
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const cartKey = (email: string | null) => `${STORAGE.cartPrefix}${email ?? 'guest'}`;

const createProfile = (
  fullName: string,
  email: string,
  phone: string,
  role: UserProfile['role'],
  memberTier: UserProfile['memberTier']
): UserProfile => ({
  fullName,
  email: normalizeEmail(email),
  phone,
  address: role === 'admin' ? 'Văn phòng điều hành GENTLEMAN' : 'Chưa cập nhật địa chỉ giao hàng',
  avatar: role === 'admin'
    ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
    : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  memberTier,
  joinDate: new Date().toLocaleDateString('vi-VN'),
  role
});

const DEFAULT_ACCOUNTS: UserAccount[] = [
  {
    profile: {
      ...createProfile('Quý Ông Doanh Nhân', 'doanhnhan@gentleman.vn', '0908 888 999', 'customer', 'VIP Platinum'),
      address: 'Tầng 12, Tòa nhà Landmark 81, Q. Bình Thạnh, TP. Hồ Chí Minh',
      joinDate: '15/01/2024'
    },
    password: 'gentleman2026'
  },
  {
    profile: {
      ...createProfile('Quản Trị GENTLEMAN', 'admin@gentleman.vn', '1900 888 999', 'admin', 'VIP Platinum'),
      joinDate: '01/01/2024'
    },
    password: 'admin2026'
  }
];

const DEFAULT_ORDERS: OrderItem[] = [
  {
    id: 'GENT-8921',
    date: '20/07/2026',
    items: [
      { product: SAMPLE_PRODUCTS[0], quantity: 1, selectedSize: 'L', selectedColor: 'Đen Classic' },
      { product: SAMPLE_PRODUCTS[1], quantity: 2, selectedSize: '40', selectedColor: 'Trắng Tinh Khôi' }
    ],
    totalAmount: 6750000,
    status: 'Đã hoàn thành',
    paymentMethod: 'Chuyển khoản Ngân hàng (VNPay)',
    paymentStatus: 'Đã thanh toán',
    customerEmail: 'doanhnhan@gentleman.vn',
    customerName: 'Quý Ông Doanh Nhân',
    customerPhone: '0908 888 999'
  },
  {
    id: 'GENT-9042',
    date: '25/07/2026',
    items: [
      { product: SAMPLE_PRODUCTS[5], quantity: 1, selectedSize: '41', selectedColor: 'Nâu Espresso' }
    ],
    totalAmount: 3200000,
    status: 'Đang giao',
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
    paymentStatus: 'Chưa thanh toán',
    customerEmail: 'doanhnhan@gentleman.vn',
    customerName: 'Quý Ông Doanh Nhân',
    customerPhone: '0908 888 999'
  }
];

function readStorage<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const syncCartProducts = (items: CartItem[]): CartItem[] =>
  Array.isArray(items)
    ? items.map(item => ({
        ...item,
        product: SAMPLE_PRODUCTS.find(product => product.id === item.product.id) ?? item.product
      }))
    : [];

const syncOrderProducts = (items: OrderItem[]): OrderItem[] =>
  Array.isArray(items)
    ? items.map(order => ({ ...order, items: syncCartProducts(order.items) }))
    : [];

const migrateLegacyData = () => {
  if (!localStorage.getItem(STORAGE.accounts)) {
    localStorage.setItem(STORAGE.accounts, JSON.stringify(DEFAULT_ACCOUNTS));
  }
  if (!localStorage.getItem(STORAGE.orders)) {
    localStorage.setItem(STORAGE.orders, JSON.stringify(DEFAULT_ORDERS));
  }
  // Xóa khóa dùng chung cũ để tài khoản mới không nhận giỏ hàng/đơn hàng mẫu.
  localStorage.removeItem('gentleman_user');
  localStorage.removeItem('gentleman_orders');
  localStorage.removeItem('gentleman_cart');
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  migrateLegacyData();

  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [accounts, setAccounts] = useState<UserAccount[]>(() =>
    readStorage<UserAccount[]>(STORAGE.accounts, DEFAULT_ACCOUNTS)
  );
  const [sessionEmail, setSessionEmail] = useState<string | null>(() =>
    localStorage.getItem(STORAGE.sessionEmail)
  );
  const [orders, setOrders] = useState<OrderItem[]>(() =>
    syncOrderProducts(readStorage<OrderItem[]>(STORAGE.orders, DEFAULT_ORDERS))
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    syncCartProducts(readStorage<CartItem[]>(cartKey(localStorage.getItem(STORAGE.sessionEmail)), []))
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const user = useMemo(
    () => accounts.find(account => account.profile.email === sessionEmail)?.profile ?? null,
    [accounts, sessionEmail]
  );

  const customerOrders = useMemo(
    () => user && user.role === 'customer'
      ? orders.filter(order => order.customerEmail === user.email)
      : [],
    [orders, user]
  );

  useEffect(() => localStorage.setItem(STORAGE.accounts, JSON.stringify(accounts)), [accounts]);
  useEffect(() => localStorage.setItem(STORAGE.orders, JSON.stringify(orders)), [orders]);

  useEffect(() => {
    if (sessionEmail) localStorage.setItem(STORAGE.sessionEmail, sessionEmail);
    else localStorage.removeItem(STORAGE.sessionEmail);
  }, [sessionEmail]);

  useEffect(() => {
    localStorage.setItem(cartKey(sessionEmail), JSON.stringify(cart));
  }, [cart, sessionEmail]);

  useEffect(() => () => {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
  }, []);

  const showToast = (msg: string) => {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3500);
  };

  const switchSession = (email: string | null) => {
    setSessionEmail(email);
    setCart(syncCartProducts(readStorage<CartItem[]>(cartKey(email), [])));
  };

  const addToCart = (product: Product, size?: string, color?: string, quantity = 1) => {
    const selectedSize = size || product.sizes[0] || 'L';
    const selectedColor = color || product.colors[0] || 'Tiêu chuẩn';
    setCart(previous => {
      const index = previous.findIndex(item =>
        item.product.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
      );
      if (index < 0) return [...previous, { product, quantity, selectedSize, selectedColor }];
      return previous.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: item.quantity + quantity } : item
      );
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng.`);
  };

  const removeFromCart = (index: number) => {
    setCart(previous => previous.filter((_, itemIndex) => itemIndex !== index));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(index);
    setCart(previous => previous.map((item, itemIndex) =>
      itemIndex === index ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const loginUser = (email: string, password: string) => {
    const normalizedEmail = normalizeEmail(email);
    const account = accounts.find(item => item.profile.email === normalizedEmail);
    if (!account || account.password !== password) {
      return { success: false, message: 'Email hoặc mật khẩu không chính xác.' };
    }
    switchSession(normalizedEmail);
    showToast(`Đăng nhập thành công. Chào mừng ${account.profile.fullName}.`);
    return { success: true, message: 'Đăng nhập thành công.', isAdmin: account.profile.role === 'admin' };
  };

  const registerUser = (data: { fullName: string; email: string; phone: string; password: string }) => {
    const email = normalizeEmail(data.email);
    if (accounts.some(account => account.profile.email === email)) {
      return { success: false, message: 'Email này đã được đăng ký. Vui lòng đăng nhập.' };
    }
    const account: UserAccount = {
      profile: createProfile(data.fullName.trim(), email, data.phone.trim(), 'customer', 'Bronze'),
      password: data.password
    };
    setAccounts(previous => [...previous, account]);
    // Tạo kho dữ liệu rỗng riêng cho khách hàng mới.
    localStorage.setItem(cartKey(email), '[]');
    switchSession(email);
    showToast(`Đăng ký tài khoản thành công. Xin chào ${account.profile.fullName}.`);
    return { success: true, message: 'Đăng ký tài khoản thành công.' };
  };

  const logoutUser = () => {
    localStorage.setItem(cartKey(sessionEmail), JSON.stringify(cart));
    switchSession(null);
    showToast('Đã đăng xuất khỏi hệ thống.');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    setAccounts(previous => previous.map(account =>
      account.profile.email === user.email
        ? { ...account, profile: { ...account.profile, ...updated, email: account.profile.email } }
        : account
    ));
    showToast('Đã cập nhật thông tin cá nhân.');
  };

  const placeOrder = (paymentMethod: string, chargedTotal?: number): OrderItem | null => {
    if (!user || user.role !== 'customer') {
      showToast('Vui lòng đăng nhập tài khoản khách hàng trước khi đặt hàng.');
      return null;
    }
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order: OrderItem = {
      id: `GENT-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('vi-VN'),
      items: [...cart],
      totalAmount: chargedTotal ?? subtotal,
      status: 'Đang xử lý',
      paymentMethod,
      paymentStatus: paymentMethod.includes('COD') ? 'Chưa thanh toán' : 'Đã thanh toán',
      customerEmail: user.email,
      customerName: user.fullName,
      customerPhone: user.phone
    };
    setOrders(previous => [order, ...previous]);
    clearCart();
    showToast(`Đặt hàng thành công. Mã đơn: ${order.id}`);
    return order;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(previous => previous.map(order => order.id === orderId ? { ...order, status } : order));
    showToast(`Đã cập nhật trạng thái đơn ${orderId}.`);
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: PaymentStatus) => {
    setOrders(previous => previous.map(order => order.id === orderId ? { ...order, paymentStatus } : order));
    showToast(`Đã cập nhật thanh toán đơn ${orderId}.`);
  };

  return (
    <AppContext.Provider value={{
      products,
      cart,
      user,
      orders,
      customerOrders,
      accounts,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      loginUser,
      logoutUser,
      registerUser,
      updateProfile,
      placeOrder,
      updateOrderStatus,
      updatePaymentStatus,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
