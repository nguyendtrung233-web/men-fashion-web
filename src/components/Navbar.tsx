import React from 'react';
import { Navbar, Nav, Container, Badge, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogIn, UserPlus, Phone, Home, LogOut, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NavigationBar: React.FC = () => {
  const { cart, user, logoutUser } = useApp();
  const navigate = useNavigate();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" variant="dark" className="navbar-custom sticky-top py-2 py-lg-3">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <div className="bg-amber-500 text-slate-900 rounded p-1 d-flex align-items-center justify-content-center fw-bold" style={{ width: '36px', height: '36px' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="fw-bold fs-4 text-white tracking-wider d-block leading-tight luxury-brand-font">
              GENTLEMAN
            </span>
            <span className="text-amber-400 text-uppercase fw-semibold" style={{ fontSize: '0.65rem', letterSpacing: '2px' }}>
              Luxury Menswear
            </span>
          </div>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

        {/* Nav Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto my-2 my-lg-0 align-items-lg-center">
            <Nav.Link as={NavLink} to="/" end className="d-flex align-items-center gap-1">
              <Home size={17} />
              <span>Trang Chủ</span>
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact" className="d-flex align-items-center gap-1">
              <Phone size={17} />
              <span>Liên Hệ</span>
            </Nav.Link>

            <Nav.Link as={NavLink} to="/cart" className="d-flex align-items-center gap-1 position-relative">
              <ShoppingBag size={17} />
              <span>Giỏ Hàng</span>
              {totalCartCount > 0 && (
                <Badge
                  pill
                  bg="warning"
                  text="dark"
                  className="ms-1 fw-bold"
                  style={{ fontSize: '0.72rem' }}
                >
                  {totalCartCount}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link as={NavLink} to="/profile" className="d-flex align-items-center gap-1">
              <User size={17} />
              <span>Hồ Sơ Của Tôi</span>
            </Nav.Link>

            {user?.role === 'admin' && (
              <Nav.Link as={NavLink} to="/admin" className="d-flex align-items-center gap-1">
                <LayoutDashboard size={17} />
                <span>Quản Trị</span>
              </Nav.Link>
            )}
          </Nav>

          {/* User Auth Buttons or User Avatar Dropdown */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="dropdown-user"
                  className="d-flex align-items-center gap-2 border-slate-700 py-1 px-3 rounded-pill"
                >
                  <img
                    src={user.avatar}
                    alt=""
                    aria-hidden="true"
                    className="rounded-circle object-cover"
                    style={{ width: '28px', height: '28px' }}
                  />
                  <span className="fw-medium text-truncate" style={{ maxWidth: '130px' }}>
                    {user.fullName}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2">
                  <Dropdown.Header>
                    <div className="fw-bold text-dark">{user.fullName}</div>
                    <small className="text-muted">{user.email}</small>
                    <div className="mt-1">
                      <span className="badge bg-amber-100 text-amber-800 border border-amber-300">
                        {user.memberTier}
                      </span>
                    </div>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/profile" className="d-flex align-items-center gap-2">
                    <User size={16} />
                    <span>Xem Hồ Sơ & Đơn Hàng</span>
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/cart" className="d-flex align-items-center gap-2">
                    <ShoppingBag size={16} />
                    <span>Giỏ Hàng ({totalCartCount})</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {user.role === 'admin' && (
                    <>
                      <Dropdown.Item as={Link} to="/admin" className="d-flex align-items-center gap-2 fw-semibold">
                        <LayoutDashboard size={16} />
                        <span>Trung Tâm Quản Trị</span>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  )}
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-danger d-flex align-items-center gap-2 fw-semibold"
                  >
                    <LogOut size={16} />
                    <span>Đăng Xuất</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="btn btn-outline-light text-white btn-sm px-3 py-1.5 rounded-pill d-flex align-items-center gap-1"
                >
                  <LogIn size={16} />
                  <span>Đăng Nhập</span>
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="btn btn-gold btn-sm px-3 py-1.5 rounded-pill d-flex align-items-center gap-1"
                >
                  <UserPlus size={16} />
                  <span>Đăng Ký</span>
                </Nav.Link>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
