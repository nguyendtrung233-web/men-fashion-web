import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, CreditCard, Award, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-5 pb-4 mt-auto border-top border-slate-800">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-amber-500 text-slate-900 rounded p-1 d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px' }}>
                <ShieldCheck size={20} />
              </div>
              <span className="fw-bold fs-4 text-white luxury-brand-font">
                GENTLEMAN
              </span>
            </div>
            <p className="text-slate-400 fs-6 leading-relaxed mb-3">
              Hệ thống thương hiệu thời trang nam cao cấp số 1 Việt Nam. Chuyên cung cấp Suit, Sơ mi, Polo và phụ kiện da thật may đo tỉ mỉ cho quý ông.
            </p>
            <div className="d-flex gap-3 text-amber-400 fs-6">
              <span className="d-flex align-items-center gap-1"><Award size={16} /> 100% Chính Hãng</span>
              <span className="d-flex align-items-center gap-1"><Clock size={16} /> Đổi trả 30 ngày</span>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="text-white fw-bold mb-3 text-uppercase tracking-wider fs-6">Danh Mục</h6>
            <ul className="list-unstyled text-slate-400 d-flex flex-column gap-2">
              <li><Link to="/" className="text-decoration-none text-slate-400 hover:text-amber-400">Suit & Vest Đẳng Cấp</Link></li>
              <li><Link to="/" className="text-decoration-none text-slate-400 hover:text-amber-400">Áo Sơ Mi Lụa Non-Iron</Link></li>
              <li><Link to="/" className="text-decoration-none text-slate-400 hover:text-amber-400">Áo Polo Mercerized</Link></li>
              <li><Link to="/" className="text-decoration-none text-slate-400 hover:text-amber-400">Quần Tây Wool Blend</Link></li>
              <li><Link to="/" className="text-decoration-none text-slate-400 hover:text-amber-400">Giày Da & Phụ Kiện</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-white fw-bold mb-3 text-uppercase tracking-wider fs-6">Điều Hướng Nhanh</h6>
            <ul className="list-unstyled text-slate-400 d-flex flex-column gap-2">
              <li><Link to="/" className="text-decoration-none text-slate-400 hover:text-amber-400">Trang Chủ</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-slate-400 hover:text-amber-400">Liên Hệ & Showroom</Link></li>
              <li><Link to="/login" className="text-decoration-none text-slate-400 hover:text-amber-400">Đăng Nhập Tài Khoản</Link></li>
              <li><Link to="/register" className="text-decoration-none text-slate-400 hover:text-amber-400">Đăng Ký Thành Viên VIP</Link></li>
              <li><Link to="/profile" className="text-decoration-none text-slate-400 hover:text-amber-400">Hồ Sơ & Lịch Sử Đơn Hàng</Link></li>
              <li><Link to="/cart" className="text-decoration-none text-slate-400 hover:text-amber-400">Giỏ Hàng Của Tôi</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-white fw-bold mb-3 text-uppercase tracking-wider fs-6">Thông Tin Showroom</h6>
            <ul className="list-unstyled text-slate-400 d-flex flex-column gap-2.5">
              <li className="d-flex gap-2">
                <MapPin size={18} className="text-amber-400 flex-shrink-0 mt-1" />
                <span>88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <Phone size={18} className="text-amber-400 flex-shrink-0" />
                <span>Hotline: 1900 888 999</span>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <Mail size={18} className="text-amber-400 flex-shrink-0" />
                <span>cskh@gentleman.vn</span>
              </li>
              <li className="d-flex gap-2 align-items-center mt-2">
                <CreditCard size={18} className="text-amber-400 flex-shrink-0" />
                <span>Chấp nhận VNPay, MoMo, Visa, COD</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-slate-800" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-slate-500 fs-7">
          <p className="mb-2 mb-md-0">
            © 2026 GENTLEMAN Luxury Menswear. Tất cả quyền được bảo lưu.
          </p>
          <div className="d-flex gap-3">
            <span>Chính sách bảo mật</span>
            <span>·</span>
            <span>Điều khoản sử dụng</span>
            <span>·</span>
            <span>Chính sách đổi trả</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

