import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Tab, Nav } from 'react-bootstrap';
import { User, Phone, Mail, MapPin, Award, ShoppingBag, Edit, ShieldCheck, LogOut, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, orders, updateProfile, logoutUser } = useApp();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  if (!user) {
    return (
      <Container className="py-5 text-center min-vh-100 d-flex align-items-center justify-content-center">
        <Card className="p-5 shadow-sm border-0 rounded-4 text-center max-w-md w-100">
          <User size={64} className="text-slate-400 mx-auto mb-3" />
          <h4 className="fw-bold text-slate-800">Chưa Đăng Nhập</h4>
          <p className="text-slate-500 mb-4">Vui lòng đăng nhập để xem thông tin tài khoản và lịch sử đơn hàng của bạn.</p>
          <div className="d-flex gap-2 justify-content-center">
            <Link to="/login" className="btn btn-dark-navy rounded-pill px-4">
              Đăng Nhập
            </Link>
            <Link to="/register" className="btn btn-gold rounded-pill px-4">
              Đăng Ký
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      phone,
      address
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleCancelEdit = () => {
    setFullName(user.fullName);
    setPhone(user.phone);
    setAddress(user.address);
    setIsEditing(false);
  };

  const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  return (
    <div className="py-5 bg-slate-50 min-vh-100">
      <Container>
        {/* Banner Header User */}
        <Card className="shadow-sm border-0 rounded-4 overflow-hidden mb-4">
          <div className="bg-slate-900 text-white p-4 p-md-5 position-relative">
            <div className="d-flex flex-column flex-md-row align-items-center gap-4 position-relative z-1">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="rounded-circle border border-4 border-amber-400 shadow-lg object-cover"
                style={{ width: '100px', height: '100px' }}
              />
              <div className="text-center text-md-start">
                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
                  <h3 className="fw-bold text-white mb-0 luxury-brand-font">{user.fullName}</h3>
                  <span className="badge badge-gold px-3 py-1 rounded-pill fw-bold">
                    <Award size={14} className="me-1 inline" />
                    Thành viên {user.memberTier}
                  </span>
                </div>
                <p className="text-slate-300 fs-6 mb-2">{user.email}</p>
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 text-slate-400 fs-7">
                  <span className="d-flex align-items-center gap-1">
                    <Calendar size={14} className="text-amber-400" /> Ngày tham gia: {user.joinDate}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <ShieldCheck size={14} className="text-amber-400" /> Tài khoản đã xác thực VIP
                  </span>
                </div>
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleLogout}
                className="ms-md-auto rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-1"
              >
                <LogOut size={16} />
                <span>Đăng Xuất</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Tab Control */}
        <Tab.Container defaultActiveKey="orders">
          <Row className="gy-4">
            <Col lg={3}>
              <Card className="shadow-sm border-0 rounded-4 p-3 bg-white">
                <Nav variant="pills" className="flex-column gap-2">
                  <Nav.Item>
                    <Nav.Link eventKey="orders" className="d-flex align-items-center gap-2 py-2.5 px-3 rounded-3 fw-medium">
                      <ShoppingBag size={18} />
                      <span>Lịch Sử Đơn Hàng</span>
                      <Badge bg="secondary" className="ms-auto">{orders.length}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="profileInfo" className="d-flex align-items-center gap-2 py-2.5 px-3 rounded-3 fw-medium">
                      <User size={18} />
                      <span>Thông Tin Cá Nhân</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card>
            </Col>

            <Col lg={9}>
              <Tab.Content>
                {/* TAB 1: LỊCH SỬ ĐƠN HÀNG */}
                <Tab.Pane eventKey="orders">
                  <Card className="shadow-sm border-0 rounded-4 p-4 bg-white">
                    <h5 className="fw-bold text-slate-900 luxury-brand-font mb-4 d-flex align-items-center gap-2">
                      <ShoppingBag className="text-amber-600" size={22} />
                      QUẢN LÝ LỊCH SỬ ĐƠN HÀNG
                    </h5>

                    {orders.length === 0 ? (
                      <div className="text-center py-5">
                        <p className="text-slate-500">Bạn chưa có đơn hàng nào.</p>
                        <Link to="/" className="btn btn-gold rounded-pill px-4">
                          Mua Sắm Ngay
                        </Link>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <Table hover align="center" className="border-slate-200 align-middle">
                          <thead className="table-light">
                            <tr>
                              <th>Mã Đơn</th>
                              <th>Ngày Đặt</th>
                              <th>Sản Phẩm</th>
                              <th>Tổng Tiền</th>
                              <th>Trạng Thái</th>
                              <th>Thanh Toán</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((ord) => (
                              <tr key={ord.id}>
                                <td className="fw-bold text-slate-900">{ord.id}</td>
                                <td className="text-slate-600 fs-7">{ord.date}</td>
                                <td>
                                  <div className="d-flex flex-column gap-1">
                                    {ord.items.map((it, idx) => (
                                      <span key={idx} className="fs-7 text-slate-800 fw-medium">
                                        • {it.product.name} (x{it.quantity}) - {it.selectedSize}/{it.selectedColor}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="fw-bold text-amber-700">{formatVND(ord.totalAmount)}</td>
                                <td>
                                  <Badge
                                    bg={
                                      ord.status === 'Đã hoàn thành' ? 'success' :
                                      ord.status === 'Đang giao' ? 'info' : 'warning'
                                    }
                                    className="px-2.5 py-1"
                                  >
                                    {ord.status}
                                  </Badge>
                                </td>
                                <td className="fs-7 text-slate-500">{ord.paymentMethod}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Card>
                </Tab.Pane>

                {/* TAB 2: THÔNG TIN CÁ NHÂN */}
                <Tab.Pane eventKey="profileInfo">
                  <Card className="shadow-sm border-0 rounded-4 p-4 bg-white">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold text-slate-900 luxury-brand-font mb-0 d-flex align-items-center gap-2">
                        <User className="text-amber-600" size={22} />
                        THÔNG TIN HỒ SƠ THÀNH VIÊN
                      </h5>
                      {!isEditing && (
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="rounded-pill px-3 d-flex align-items-center gap-1"
                        >
                          <Edit size={15} /> Chỉnh Sửa
                        </Button>
                      )}
                    </div>

                    {!isEditing ? (
                      <Row className="gy-3 fs-6">
                        <Col md={6}>
                          <div className="p-3 bg-slate-50 rounded-3 border border-slate-100">
                            <small className="text-slate-400 d-block mb-1">Họ và Tên</small>
                            <span className="fw-semibold text-slate-900">{user.fullName}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="p-3 bg-slate-50 rounded-3 border border-slate-100">
                            <small className="text-slate-400 d-block mb-1">Email</small>
                            <span className="fw-semibold text-slate-900">{user.email}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="p-3 bg-slate-50 rounded-3 border border-slate-100">
                            <small className="text-slate-400 d-block mb-1">Số Điện Thoại</small>
                            <span className="fw-semibold text-slate-900">{user.phone}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="p-3 bg-slate-50 rounded-3 border border-slate-100">
                            <small className="text-slate-400 d-block mb-1">Hạng Đẳng Cấp</small>
                            <span className="fw-bold text-amber-700">{user.memberTier}</span>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="p-3 bg-slate-50 rounded-3 border border-slate-100">
                            <small className="text-slate-400 d-block mb-1">Địa Chỉ Nhận Hàng Mặc Định</small>
                            <span className="fw-semibold text-slate-900">{user.address}</span>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <Form onSubmit={handleSaveProfile}>
                        <Row className="gy-3">
                          <Col md={6}>
                            <Form.Group controlId="profileFullName">
                              <Form.Label className="fw-semibold text-slate-700">Họ và Tên</Form.Label>
                              <Form.Control
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="profilePhone">
                              <Form.Label className="fw-semibold text-slate-700">Số Điện Thoại</Form.Label>
                              <Form.Control
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Form.Group controlId="profileAddress">
                              <Form.Label className="fw-semibold text-slate-700">Địa Chỉ Giao Hàng</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className="d-flex gap-2 mt-4">
                          <Button type="submit" className="btn-gold rounded-pill px-4">
                            Lưu Thay Đổi
                          </Button>
                          <Button type="button" variant="secondary" onClick={handleCancelEdit} className="rounded-pill px-4">
                            Hủy
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};
