import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { NavigationBar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';

// Import 6 Required Pages
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Cart } from './pages/Cart';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-slate-50">
          {/* Thanh Navbar Menu chính */}
          <NavigationBar />

          {/* Nội dung chính chứa 6 Trang Điều Hướng */}
          <main className="flex-grow-1">
            <Routes>
              {/* 1. Home Page: Hiển thị danh sách sản phẩm bằng Card và Grid */}
              <Route path="/" element={<Home />} />

              {/* 2. Contact Page: Form liên hệ cơ bản */}
              <Route path="/contact" element={<Contact />} />

              {/* 3. Login Page: Form đăng nhập có JS Validate */}
              <Route path="/login" element={<Login />} />

              {/* 4. Register Page: Form đăng ký có JS Validate */}
              <Route path="/register" element={<Register />} />

              {/* 5. Profile Page: Hiển thị thông tin người dùng ảo */}
              <Route path="/profile" element={<Profile />} />

              {/* 6. My Cart Page: Hiển thị các sản phẩm trong giỏ hàng và tổng tiền */}
              <Route path="/cart" element={<Cart />} />

              {/* Route fallback chuyển hướng về Trang chủ nếu nhập sai URL */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer thương hiệu GENTLEMAN */}
          <Footer />

          {/* Toast thông báo nổi */}
          <ToastNotification />
        </div>
      </Router>
    </AppProvider>
  );
}
