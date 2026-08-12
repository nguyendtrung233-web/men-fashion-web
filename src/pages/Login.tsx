import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { loginUser } = useApp();
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation Errors State (manual JS validation)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [generalMessage, setGeneralMessage] = useState<string | null>(null);

  /**
   * HÀM KIỂM TRA (VALIDATE) BẰNG JAVASCRIPT THỦ CÔNG
   * Yêu cầu:
   * 1. Không được để trống
   * 2. Email phải đúng định dạng (sử dụng Regular Expression)
   * 3. Hiển thị thông báo lỗi màu đỏ ngay bên dưới ô nhập
   */
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    // 1. Kiểm tra Email
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ Email của bạn!';
      isValid = false;
    } else {
      // Regex định dạng Email tiêu chuẩn
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Địa chỉ Email không đúng định dạng! (Ví dụ: gentleman@domain.com)';
        isValid = false;
      }
    }

    // 2. Kiểm tra Mật Khẩu
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu đăng nhập!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Xử lý submit Đăng nhập
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralMessage(null);

    // Gọi hàm validate thủ công
    if (validateForm()) {
      // Thực hiện đăng nhập thành công
      loginUser(email.trim());
      navigate('/profile');
    }
  };

  // Tự động điền tài khoản thử nghiệm
  const fillDemoAccount = () => {
    setEmail('doanhnhan@gentleman.vn');
    setPassword('gentleman2026');
    setErrors({});
  };

  return (
    <div className="py-5 bg-slate-50 min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 text-white p-4 text-center border-bottom border-slate-800">
                <div className="d-inline-flex align-items-center justify-content-center bg-amber-500 text-slate-900 rounded-circle mb-3" style={{ width: '56px', height: '56px' }}>
                  <ShieldCheck size={32} />
                </div>
                <h3 className="fw-bold mb-1 luxury-brand-font text-amber-400">ĐĂNG NHẬP</h3>
                <p className="text-slate-400 fs-6 mb-0">Hệ Thống Quản Lý Bán Hàng GENTLEMAN</p>
              </div>

              <Card.Body className="p-4 p-md-5 bg-white">
                {generalMessage && (
                  <Alert variant="danger" className="py-2 fs-6">
                    {generalMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  {/* TRƯỜNG EMAIL */}
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label className="fw-semibold text-slate-700 fs-6">
                      Địa chỉ Email <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="email"
                        placeholder="nhapemail@gentleman.vn"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`py-2.5 px-3 rounded-3 ${errors.email ? 'is-invalid-custom' : ''}`}
                      />
                      <Mail size={18} className="position-absolute text-slate-400" style={{ right: '12px', top: '12px' }} />
                    </div>
                    {/* Thông báo lỗi màu đỏ bằng hàm JS validate thủ công */}
                    {errors.email && (
                      <div className="invalid-feedback-custom">
                        ⚠️ {errors.email}
                      </div>
                    )}
                  </Form.Group>

                  {/* TRƯỜNG MẬT KHẨU */}
                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label className="fw-semibold text-slate-700 fs-6">
                      Mật khẩu <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        className={`py-2.5 px-3 rounded-3 ${errors.password ? 'is-invalid-custom' : ''}`}
                      />
                      <Lock size={18} className="position-absolute text-slate-400" style={{ right: '12px', top: '12px' }} />
                    </div>
                    {/* Thông báo lỗi màu đỏ bằng hàm JS validate thủ công */}
                    {errors.password && (
                      <div className="invalid-feedback-custom">
                        ⚠️ {errors.password}
                      </div>
                    )}
                  </Form.Group>

                  {/* Quên mật khẩu & Ghi nhớ */}
                  <div className="d-flex justify-content-between align-items-center mb-4 fs-6">
                    <Form.Check
                      type="checkbox"
                      id="rememberMe"
                      label="Ghi nhớ đăng nhập"
                      className="text-slate-600"
                    />
                    <a href="#forgot" className="text-amber-700 fw-medium text-decoration-none hover:underline" onClick={(e) => e.preventDefault()}>
                      Quên mật khẩu?
                    </a>
                  </div>

                  {/* Nút Submit Đăng nhập */}
                  <Button
                    type="submit"
                    className="btn-gold w-100 py-2.5 rounded-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  >
                    <LogIn size={20} />
                    <span>ĐĂNG NHẬP HỆ THỐNG</span>
                  </Button>

                  {/* Quick Demo Fill Button */}
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={fillDemoAccount}
                    className="w-100 mt-2.5 py-2 rounded-3 text-slate-600 fs-6 d-flex align-items-center justify-content-center gap-1 border-dashed"
                  >
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>Tự động điền tài khoản mẫu (Demo)</span>
                  </Button>
                </Form>

                <hr className="my-4 text-slate-200" />

                {/* Chuyển tới trang Đăng ký */}
                <div className="text-center fs-6 text-slate-600">
                  Chưa có tài khoản thành viên?{' '}
                  <Link to="/register" className="text-amber-700 fw-bold text-decoration-none">
                    Đăng ký ngay tại đây
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
