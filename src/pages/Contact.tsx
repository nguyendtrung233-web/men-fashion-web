import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    let valid = true;

    if (!name.trim()) {
      errs.name = 'Vui lòng nhập Họ và tên!';
      valid = false;
    }
    if (!email.trim()) {
      errs.email = 'Vui lòng nhập Email!';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Email không hợp lệ!';
      valid = false;
    }
    if (!message.trim()) {
      errs.message = 'Vui lòng nhập nội dung phản hồi!';
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setErrors({});
    }
  };

  return (
    <div className="py-5 bg-slate-50 min-vh-100">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-amber-100 text-amber-800 px-3 py-1 rounded-pill fw-semibold mb-2">
            HỖ TRỢ KHÁCH HÀNG
          </span>
          <h2 className="fw-bold text-slate-900 luxury-brand-font display-6">
            LIÊN HỆ VỚI GENTLEMAN
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto fs-6">
            Đội ngũ tư vấn phong cách & may đo chuyên nghiệp luôn sẵn sàng hỗ trợ Quý khách 24/7.
          </p>
        </div>

        <Row className="gy-4">
          {/* Contact Form */}
          <Col lg={7}>
            <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
              <Card.Header className="contact-form-header p-4 border-bottom">
                <h4 className="fw-bold mb-1 text-amber-400 luxury-brand-font">GỬI THÔNG TIN LIÊN HỆ</h4>
                <p className="contact-form-header__subtitle fs-6 mb-0">Điền thông tin bên dưới để nhận tư vấn từ Tailor Master</p>
              </Card.Header>

              <Card.Body className="p-4 p-md-5">
                {submitted && (
                  <Alert variant="success" className="d-flex align-items-center gap-2 mb-4">
                    <CheckCircle className="text-success" size={20} />
                    <span>Cảm ơn Quý khách! Lời nhắn đã được gửi thành công. Chuyên viên sẽ liên hệ lại trong vòng 30 phút.</span>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-slate-700 fs-6">Họ và Tên *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={name}
                          onChange={e => {
                            setName(e.target.value);
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          className={`py-2 px-3 rounded-3 ${errors.name ? 'is-invalid-custom' : ''}`}
                        />
                        {errors.name && <div className="invalid-feedback-custom">⚠️ {errors.name}</div>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-slate-700 fs-6">Email *</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="khachhang@gmail.com"
                          value={email}
                          onChange={e => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          className={`py-2 px-3 rounded-3 ${errors.email ? 'is-invalid-custom' : ''}`}
                        />
                        {errors.email && <div className="invalid-feedback-custom">⚠️ {errors.email}</div>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-slate-700 fs-6">Số Điện Thoại</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="0908 123 456"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="py-2 px-3 rounded-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-slate-700 fs-6">Chủ Đề Cần Hỗ Trợ</Form.Label>
                        <Form.Select
                          value={subject}
                          onChange={e => setSubject(e.target.value)}
                          className="py-2 px-3 rounded-3"
                        >
                          <option value="">Chọn chủ đề...</option>
                          <option value="Tư vấn May Đo Suit">Tư vấn May Đo Suit</option>
                          <option value="Thắc mắc Đơn Hàng">Thắc mắc Đơn Hàng</option>
                          <option value="Chính sách Đổi Trả">Chính sách Đổi Trả</option>
                          <option value="Hợp tác Doanh Nghiệp">Hợp tác Doanh Nghiệp</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-slate-700 fs-6">Nội Dung Lời Nhắn *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Nhập nội dung câu hỏi hoặc yêu cầu tư vấn kích thước/phong cách..."
                      value={message}
                      onChange={e => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`py-2 px-3 rounded-3 ${errors.message ? 'is-invalid-custom' : ''}`}
                    />
                    {errors.message && <div className="invalid-feedback-custom">⚠️ {errors.message}</div>}
                  </Form.Group>

                  <Button type="submit" className="btn-gold px-4 py-2.5 rounded-3 fw-bold fs-6 d-inline-flex align-items-center gap-2">
                    <Send size={18} />
                    <span>GỬI YÊU CẦU CHO TƯ VẤN VIÊN</span>
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Showroom Information */}
          <Col lg={5}>
            <div className="d-flex flex-column gap-4">
              <Card className="contact-info-card shadow-sm border-0 rounded-4 p-4 text-white">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <ShieldCheck className="text-amber-400" size={28} />
                  <h5 className="fw-bold text-amber-400 mb-0 luxury-brand-font">SHOWROOM FLAGSHIP</h5>
                </div>
                <div className="contact-info-card__content d-flex flex-column gap-3 fs-6">
                  <div className="d-flex gap-3">
                    <MapPin className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="text-white d-block">Showroom TP. Hồ Chí Minh:</strong>
                      88 Đồng Khởi, Phường Bến Nghé, Quận 1, TP.HCM
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <MapPin className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <strong className="text-white d-block">Showroom Hà Nội:</strong>
                      15 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <Phone className="text-amber-400 flex-shrink-0" size={20} />
                    <div>Hotline đặt lịch May đo: <strong>1900 888 999</strong></div>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <Mail className="text-amber-400 flex-shrink-0" size={20} />
                    <div>Email: <strong>cskh@gentleman.vn</strong></div>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <Clock className="text-amber-400 flex-shrink-0" size={20} />
                    <div>Thời gian mở cửa: <strong>08:30 - 21:30 (Mỗi ngày)</strong></div>
                  </div>
                </div>
              </Card>

              <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
                <iframe
                  title="Showroom Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424168434771!2d106.70220631533423!3d10.778792062096773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a1b023f9%3A0x6b7bb8d3df20330a!2zODggxJDhu5NuZyBLaOG7nywgQsO6biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1650000000000!5m2!1svi!2s"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
