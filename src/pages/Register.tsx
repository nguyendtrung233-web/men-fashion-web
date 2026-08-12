import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Phone, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Register: React.FC = () => {
  const { registerUser } = useApp();
  const navigate = useNavigate();

  // State quản lý giá trị input
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // State quản lý lỗi bằng JS thủ công
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  }>({});

  /**
   * HÀM KIỂM TRA (VALIDATE) BẰNG JAVASCRIPT THỦ CÔNG THEO YÊU CẦU:
   * 1. Họ tên không để trống.
   * 2. Email đúng định dạng regex.
   * 3. Mật khẩu phải LỚN HƠN 6 KÝ TỰ (độ dài > 6).
   * 4. Nhập lại mật khẩu phải KHỚP với mật khẩu.
   * 5. Hiển thị lỗi màu đỏ.
   */
  const validateForm = (): boolean => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
      agreeTerms?: string;
    } = {};
    let isValid = true;

    // 1. Validation Họ và Tên
    if (!fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập Họ và tên đầy đủ!';
      isValid = false;
    }

    // 2. Validation Email
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ Email!';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Email không hợp lệ (Ví dụ: gentleman@gmail.com)!';
        isValid = false;
      }
    }

    // 3. Validation Số điện thoại
    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại!';
      isValid = false;
    } else if (!/^[0-9]{9,11}$/.test(phone.trim())) {
      newErrors.phone = 'Số điện thoại phải gồm 9 đến 11 chữ số!';
      isValid = false;
    }

    // 4. Validation Mật Khẩu (Bắt buộc: Mật khẩu phải LỚN HƠN 6 ký tự)
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu!';
      isValid = false;
    } else if (password.length <= 6) {
      newErrors.password = 'Mật khẩu phải lớn hơn 6 ký tự (Tối thiểu 7 ký tự)!';
      isValid = false;
    }

    // 5. Validation Nhập Lại Mật Khẩu (Bắt buộc: Khớp với mật khẩu)
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu xác nhận!';
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp với mật khẩu đã nhập!';
      isValid = false;
    }

    // 6. Validation Đồng ý điều khoản
    if (!agreeTerms) {
      newErrors.agreeTerms = 'Bạn phải tích đồng ý với Điều khoản & Chính sách của GENTLEMAN!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Xử lý gửi Form Đăng Ký
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      registerUser({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim()
      });
      navigate('/profile');
    }
  };

  // Điền mẫu nhanh
  const fillDemoRegister = () => {
    setFullName('Trần Quốc Tuấn');
    setEmail('quoctuan@gmail.com');
    setPhone('0912345678');
    setPassword('gentleman2026');
    setConfirmPassword('gentleman2026');
    setAgreeTerms(true);
    setErrors({});
  };

  return (
    <div className="py-5 bg-slate-50 min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={7} xl={6}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 text-white p-4 text-center border-bottom border-slate-800">
                <div className="d-inline-flex align-items-center justify-content-center bg-amber-500 text-slate-900 rounded-circle mb-3" style={{ width: '56px', height: '56px' }}>
                  <ShieldCheck size={32} />
                </div>
                <h3 className="fw-bold mb-1 luxury-brand-font text-amber-400">ĐĂNG KÝ THÀNH VIÊN</h3>
                <p className="text-slate-400 fs-6 mb-0">Trở thành khách hàng VIP của GENTLEMAN Luxury</p>
              </div>

              <Card.Body className="p-4 p-md-5 bg-white">
                <Form onSubmit={handleSubmit} noValidate>
                  {/* TRƯỜNG HỌ VÀ TÊN */}
                  <Form.Group className="mb-3" controlId="regFullName">
                    <Form.Label className="fw-semibold text-slate-700 fs-6">
                      Họ và Tên đầy đủ <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="Ví dụ: Nguyễn Văn Hoàng"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        className={`py-2.5 px-3 rounded-3 ${errors.fullName ? 'is-invalid-custom' : ''}`}
                      />
                      <User size={18} className="position-absolute text-slate-400" style={{ right: '12px', top: '12px' }} />
                    </div>
                    {errors.fullName && (
                      <div className="invalid-feedback-custom">⚠️ {errors.fullName}</div>
                    )}
                  </Form.Group>

                  {/* TRƯỜNG EMAIL & SỐ ĐIỆN THOẠI */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="regEmail">
                        <Form.Label className="fw-semibold text-slate-700 fs-6">
                          Địa chỉ Email <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type="email"
                            placeholder="hoang@domain.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors({ ...errors, email: undefined });
                            }}
                            className={`py-2.5 px-3 rounded-3 ${errors.email ? 'is-invalid-custom' : ''}`}
                          />
                          <Mail size={18} className="position-absolute text-slate-400" style={{ right: '12px', top: '12px' }} />
                        </div>
                        {errors.email && (
                          <div className="invalid-feedback-custom">⚠️ {errors.email}</div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="regPhone">
                        <Form.Label className="fw-semibold text-slate-700 fs-6">
                          Số Điện Thoại <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder="0908123456"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone) setErrors({ ...errors, phone: undefined });
                            }}
                            className={`py-2.5 px-3 rounded-3 ${errors.phone ? 'is-invalid-custom' : ''}`}
                          />
                          <Phone size={18} className="position-absolute text-slate-400" style={{ right: '12px', top: '12px' }} />
                        </div>
                        {errors.phone && (
                          <div className="invalid-feedback-custom">⚠️ {errors.phone}</div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* TRƯỜNG MẬT KHẨU (> 6 KÝ TỰ) */}
                  <Form.Group className="mb-3" controlId="regPassword">
                    <Form.Label className="fw-semibold text-slate-700 fs-6">
                      Mật khẩu (Phải lớn hơn 6 ký tự) <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="password"
                        placeholder="Nhập ít nhất 7 ký tự"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        className={`py-2.5 px-3 rounded-3 ${errors.password ? 'is-invalid-custom' : ''}`}
                      />
                      <Lock size={18} className="position-absolute text-slate-400" style={{ right: '12px', top: '12px' }} />
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback-custom">⚠️ {errors.password}</div>
                    )}
                  </Form.Group>

                  {/* TRƯỜNG NHẬP LẠI MẬT KHẨU (PHẢI KHỚP) */}
                  <Form.Group className="mb-3" controlId="regConfirmPassword">
                    <Form.Label className="fw-semibold text-slate-700 fs-6">
                      Xác nhận lại mật khẩu <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="password"
                        placeholder="Nhập lại chính xác mật khẩu trên"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                        }}
                        className={`py-2.5 px-3 rounded-3 ${errors.confirmPassword ? 'is-invalid-custom' : ''}`}
                      />
                      <Lock size={18} className="position-absolute text-slate-400" style={{ right: '12px', top: '12px' }} />
                    </div>
                    {errors.confirmPassword && (
                      <div className="invalid-feedback-custom">⚠️ {errors.confirmPassword}</div>
                    )}
                  </Form.Group>

                  {/* ĐỒNG Ý ĐIỀU KHỎAN */}
                  <Form.Group className="mb-4" controlId="agreeTerms">
                    <Form.Check
                      type="checkbox"
                      label="Tôi đã đọc và đồng ý với Điều khoản dịch vụ & Chính sách bảo mật"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: undefined });
                      }}
                      className="text-slate-600 fs-6"
                    />
                    {errors.agreeTerms && (
                      <div className="invalid-feedback-custom">⚠️ {errors.agreeTerms}</div>
                    )}
                  </Form.Group>

                  {/* Nút Đăng ký */}
                  <Button
                    type="submit"
                    className="btn-gold w-100 py-2.5 rounded-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  >
                    <UserPlus size={20} />
                    <span>TẠO TÀI KHOẢN NGAY</span>
                  </Button>

                  {/* Quick Fill Demo */}
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={fillDemoRegister}
                    className="w-100 mt-2.5 py-2 rounded-3 text-slate-600 fs-6 d-flex align-items-center justify-content-center gap-1 border-dashed"
                  >
                    <CheckCircle2 size={16} className="text-amber-600" />
                    <span>Tự động điền dữ liệu hợp lệ mẫu</span>
                  </Button>
                </Form>

                <hr className="my-4 text-slate-200" />

                <div className="text-center fs-6 text-slate-600">
                  Đã có tài khoản?{' '}
                  <Link to="/login" className="text-amber-700 fw-bold text-decoration-none">
                    Đăng nhập tại đây
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
