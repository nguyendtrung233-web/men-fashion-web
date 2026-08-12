import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Modal, InputGroup, Alert } from 'react-bootstrap';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, CheckCircle2, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, user, removeFromCart, updateCartQuantity, clearCart, placeOrder, showToast } = useApp();
  const navigate = useNavigate();

  // State Voucher
  const [voucherCode, setVoucherCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  // State Modal Thanh Toán
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản Ngân hàng (VNPay)');

  // Format VND
  const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  // Tính toán số tiền
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 1500000 || subtotal === 0 ? 0 : 50000;
  const totalPayment = Math.max(0, subtotal - discountAmount + shippingFee);

  // Áp dụng mã giảm giá
  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode.trim().toUpperCase() === 'GENTLEMANVIP') {
      setDiscountPercent(10);
      setAppliedVoucher('GENTLEMANVIP (Giảm 10%)');
      showToast('Áp dụng thành công mã ưu đãi GENTLEMANVIP - Giảm 10%!');
    } else {
      setDiscountPercent(0);
      setAppliedVoucher(null);
      showToast('Mã giảm giá không tồn tại hoặc đã hết hạn!');
    }
  };

  // Xác nhận đặt hàng
  const handleConfirmOrder = () => {
    if (!user) {
      showToast('Vui lòng đăng nhập trước khi đặt hàng.');
      setShowCheckoutModal(false);
      navigate('/login');
      return;
    }
    const order = placeOrder(paymentMethod, totalPayment);
    if (!order) return;
    setShowCheckoutModal(false);
    navigate('/profile');
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center min-vh-100 d-flex align-items-center justify-content-center">
        <Card className="p-5 shadow-sm border-0 rounded-4 text-center max-w-md w-100 bg-white">
          <div className="bg-amber-100 text-amber-800 rounded-circle p-3 d-inline-flex mx-auto mb-3">
            <ShoppingBag size={48} />
          </div>
          <h4 className="fw-bold text-slate-800 luxury-brand-font mb-2">Giỏ Hàng Của Bạn Đang Trống</h4>
          <p className="text-slate-500 mb-4 fs-6">Hãy thêm những trang phục cao cấp vào giỏ hàng để tiếp tục mua sắm.</p>
          <Link to="/" className="btn btn-gold rounded-pill px-4 py-2.5 fw-bold">
            Khám Phá Sản Phẩm Ngay
          </Link>
        </Card>
      </Container>
    );
  }

  return (
    <div className="py-5 bg-slate-50 min-vh-100">
      <Container>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <span className="badge bg-amber-100 text-amber-800 px-3 py-1 rounded-pill fw-semibold mb-1">
              GIỎ HÀNG THỜI TRANG
            </span>
            <h2 className="fw-bold text-slate-900 luxury-brand-font mb-0">
              SẢN PHẨM ĐÃ CHỌN ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={clearCart}
            className="rounded-pill px-3"
          >
            Xóa Toàn Bộ
          </Button>
        </div>

        <Row className="gy-4">
          {/* Cart Table */}
          <Col lg={8}>
            <Card className="shadow-sm border-0 rounded-4 overflow-hidden mb-4">
              <div className="table-responsive">
                <Table align="center" className="mb-0 border-0 align-middle">
                  <thead className="bg-slate-900 text-white">
                    <tr className="fs-7 text-uppercase tracking-wider">
                      <th className="py-3 px-4">Sản phẩm</th>
                      <th className="py-3 text-center">Đơn giá</th>
                      <th className="py-3 text-center">Số lượng</th>
                      <th className="py-3 text-end px-4">Thành tiền</th>
                      <th className="py-3 text-center">Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index} className="border-bottom border-slate-100">
                        <td className="p-3 px-4">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="rounded-3 object-cover shadow-xs border border-slate-200"
                              style={{ width: '65px', height: '65px' }}
                            />
                            <div>
                              <h6 className="fw-bold text-slate-900 mb-1 fs-6">{item.product.name}</h6>
                              <div className="d-flex gap-2">
                                <Badge bg="light" text="dark" className="border border-slate-300 fs-7">
                                  Size: {item.selectedSize}
                                </Badge>
                                <Badge bg="light" text="dark" className="border border-slate-300 fs-7">
                                  Màu: {item.selectedColor}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center fw-medium text-slate-700">
                          {formatVND(item.product.price)}
                        </td>
                        <td className="text-center">
                          <div className="d-inline-flex align-items-center border border-slate-300 rounded-2 bg-white">
                            <Button
                              variant="link"
                              size="sm"
                              aria-label={`Giảm số lượng ${item.product.name}`}
                              className="text-slate-600 p-1 text-decoration-none"
                              onClick={() => updateCartQuantity(index, item.quantity - 1)}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="px-2 fw-bold text-slate-900 fs-6">{item.quantity}</span>
                            <Button
                              variant="link"
                              size="sm"
                              aria-label={`Tăng số lượng ${item.product.name}`}
                              className="text-slate-600 p-1 text-decoration-none"
                              onClick={() => updateCartQuantity(index, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </td>
                        <td className="text-end px-4 fw-bold text-amber-700 fs-6">
                          {formatVND(item.product.price * item.quantity)}
                        </td>
                        <td className="text-center">
                          <Button
                            variant="link"
                            aria-label={`Xóa ${item.product.name} khỏi giỏ hàng`}
                            className="text-danger p-1"
                            onClick={() => removeFromCart(index)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>

            {/* Back to shop link */}
            <Link to="/" className="text-decoration-none text-slate-700 fw-semibold d-inline-flex align-items-center gap-2">
              ← Tiếp tục xem sản phẩm khác
            </Link>
          </Col>

          {/* Cart Summary & Order Calculation */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 rounded-4 p-4 bg-white sticky-top" style={{ top: '90px' }}>
              <h5 className="fw-bold text-slate-900 luxury-brand-font mb-3 border-bottom pb-2">
                TỔNG ĐƠN HÀNG
              </h5>

              {/* Coupon Form */}
              <Form onSubmit={handleApplyVoucher} className="mb-3">
                <Form.Label htmlFor="voucherCode" className="fw-semibold text-slate-700 fs-7 d-flex align-items-center gap-1">
                  <Tag size={15} className="text-amber-600" /> Mã Ưu Đãi VIP
                </Form.Label>
                <InputGroup size="sm">
                  <Form.Control
                    id="voucherCode"
                    type="text"
                    placeholder="GENTLEMANVIP"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="uppercase"
                  />
                  <Button type="submit" className="btn-dark-navy px-3 fw-bold">
                    Áp dụng
                  </Button>
                </InputGroup>
                {appliedVoucher && (
                  <div className="text-success fs-7 mt-1 fw-medium d-flex align-items-center gap-1">
                    <CheckCircle2 size={14} /> {appliedVoucher}
                  </div>
                )}
              </Form>

              <hr className="my-3 border-slate-100" />

              {/* Calculation List */}
              <div className="d-flex flex-column gap-2.5 fs-6 text-slate-600 mb-3">
                <div className="d-flex justify-content-between">
                  <span>Tạm tính sản phẩm:</span>
                  <span className="fw-semibold text-slate-900">{formatVND(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between text-success">
                    <span>Giảm giá voucher (10%):</span>
                    <span className="fw-bold">-{formatVND(discountAmount)}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between">
                  <span>Phí vận chuyển hoả tốc:</span>
                  <span className="fw-semibold text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-success fw-bold">Miễn phí</span>
                    ) : (
                      formatVND(shippingFee)
                    )}
                  </span>
                </div>
              </div>

              <hr className="my-3 border-slate-200" />

              {/* Final Total */}
              <div className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fw-bold text-slate-900 fs-5">TỔNG THANH TOÁN:</span>
                <span className="fw-bold text-amber-700 fs-4">{formatVND(totalPayment)}</span>
              </div>

              {/* Checkout Button */}
              <Button
                className="btn-gold w-100 py-3 rounded-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                onClick={() => setShowCheckoutModal(true)}
              >
                <span>TIẾN HÀNH ĐẶT HÀNG</span>
                <ArrowRight size={18} />
              </Button>

              <div className="text-center mt-3 fs-7 text-slate-400 d-flex align-items-center justify-content-center gap-1">
                <ShieldCheck size={16} className="text-amber-600" /> Thanh toán an toàn 100% qua VNPay/COD
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CHECKOUT CONFIRMATION MODAL */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} centered className="rounded-4">
        <Modal.Header closeButton className="bg-slate-900 text-white">
          <Modal.Title className="fw-bold luxury-brand-font fs-5 text-amber-400">
            XÁC NHẬN ĐẶT HÀNG MAY ĐO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <h6 className="fw-bold text-slate-800 mb-2">Chọn phương thức thanh toán:</h6>
          <Form.Group className="mb-4">
            <Form.Check
              type="radio"
              id="payVNPay"
              name="paymentMethod"
              label="Chuyển khoản Ngân hàng / Quét mã QR VNPay (Khuyên dùng)"
              checked={paymentMethod.includes('VNPay')}
              onChange={() => setPaymentMethod('Chuyển khoản Ngân hàng (VNPay)')}
              className="mb-2 fw-medium text-slate-700"
            />
            <Form.Check
              type="radio"
              id="payCOD"
              name="paymentMethod"
              label="Thanh toán khi nhận hàng (COD)"
              checked={paymentMethod.includes('COD')}
              onChange={() => setPaymentMethod('Thanh toán khi nhận hàng (COD)')}
              className="fw-medium text-slate-700"
            />
          </Form.Group>

          <Alert variant="secondary" className="fs-7 py-2">
            <CreditCard size={16} className="me-2 inline" />
            Tổng đơn hàng cần thanh toán: <strong className="text-amber-700 fs-6">{formatVND(totalPayment)}</strong>
          </Alert>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowCheckoutModal(false)} className="rounded-pill px-4">
            Hủy
          </Button>
          <Button className="btn-gold rounded-pill px-4 fw-bold" onClick={handleConfirmOrder}>
            Đồng Ý Đặt Hàng Ngay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
