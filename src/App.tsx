import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AppProvider } from './context/AppContext';
import { NavigationBar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';

import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-slate-50">
          <NavigationBar />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <ToastNotification />
        </div>
      </Router>
    </AppProvider>
  );
}
