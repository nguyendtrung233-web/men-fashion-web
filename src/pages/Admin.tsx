import React, { useMemo, useState } from 'react';
import { Badge, Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import {
  Banknote,
  CheckCircle2,
  Clock3,
  CreditCard,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Users
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { OrderStatus, PaymentStatus } from '../types';

const ORDER_STATUSES: OrderStatus[] = ['Đang xử lý', 'Đã xác nhận', 'Đang giao', 'Đã hoàn thành', 'Đã hủy'];
const PAYMENT_STATUSES: PaymentStatus[] = ['Chưa thanh toán', 'Đã thanh toán', 'Đã hoàn tiền'];

const formatVND = (value: number) => `${value.toLocaleString('vi-VN')} ₫`;

export const Admin: React.FC = () => {
  const { user, orders, accounts, updateOrderStatus, updatePaymentStatus } = useApp();
  const [query, setQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<'Tất cả' | OrderStatus>('Tất cả');
  const [paymentFilter, setPaymentFilter] = useState<'Tất cả' | PaymentStatus>('Tất cả');

  const filteredOrders = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return orders.filter(order => {
      const matchesKeyword = !keyword || [order.id, order.customerName, order.customerEmail, order.customerPhone]
        .some(value => value.toLowerCase().includes(keyword));
      const matchesOrder = orderFilter === 'Tất cả' || order.status === orderFilter;
      const matchesPayment = paymentFilter === 'Tất cả' || order.paymentStatus === paymentFilter;
      return matchesKeyword && matchesOrder && matchesPayment;
    });
  }, [orders, query, orderFilter, paymentFilter]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/profile" replace />;

  const paidRevenue = orders
    .filter(order => order.paymentStatus === 'Đã thanh toán' && order.status !== 'Đã hủy')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  const waitingPayment = orders.filter(order => order.paymentStatus === 'Chưa thanh toán').length;
  const processingOrders = orders.filter(order => ['Đang xử lý', 'Đã xác nhận'].includes(order.status)).length;
  const customerCount = accounts.filter(account => account.profile.role === 'customer').length;

  return (
    <div className="admin-page py-4 py-lg-5 min-vh-100">
      <Container fluid="xl">
        <div className="admin-hero rounded-4 p-4 p-lg-5 mb-4 text-white">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 text-amber-300 fw-bold text-uppercase fs-7 mb-2">
                <ShieldCheck size={18} /> Trung tâm điều hành
              </div>
              <h1 className="h2 fw-bold mb-2 luxury-brand-font">QUẢN TRỊ ĐƠN HÀNG GENTLEMAN</h1>
              <p className="admin-hero__subtitle mb-0">Theo dõi khách hàng, tiến độ xử lý và tình trạng thanh toán trên một màn hình.</p>
            </div>
            <div className="admin-user-chip rounded-3 px-3 py-2">
              <small className="d-block">Đang đăng nhập</small>
              <strong>{user.fullName}</strong>
            </div>
          </div>
        </div>

        <Row className="g-3 mb-4">
          {[
            { label: 'Tổng đơn hàng', value: orders.length.toString(), icon: ShoppingBag, tone: 'navy' },
            { label: 'Đang xử lý', value: processingOrders.toString(), icon: Clock3, tone: 'gold' },
            { label: 'Chờ thanh toán', value: waitingPayment.toString(), icon: CreditCard, tone: 'orange' },
            { label: 'Doanh thu đã thu', value: formatVND(paidRevenue), icon: Banknote, tone: 'green' },
            { label: 'Khách hàng', value: customerCount.toString(), icon: Users, tone: 'blue' }
          ].map(({ label, value, icon: Icon, tone }) => (
            <Col key={label} sm={6} lg>
              <Card className="admin-stat h-100 border-0 rounded-4 p-3">
                <div className={`admin-stat__icon admin-stat__icon--${tone}`}><Icon size={21} /></div>
                <small className="admin-stat__label mt-3">{label}</small>
                <strong className="admin-stat__value mt-1">{value}</strong>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="admin-panel border-0 rounded-4 overflow-hidden">
          <Card.Header className="admin-panel__header border-0 p-3 p-lg-4">
            <div className="d-flex flex-column flex-xl-row gap-3 align-items-xl-center justify-content-between">
              <div>
                <h2 className="h5 fw-bold mb-1 d-flex align-items-center gap-2">
                  <PackageCheck className="text-amber-700" size={22} /> Danh sách đơn hàng khách hàng
                </h2>
                <small className="admin-muted">Hiển thị {filteredOrders.length} / {orders.length} đơn hàng</small>
              </div>
              <div className="d-flex flex-column flex-md-row gap-2 admin-filters">
                <div className="position-relative">
                  <Form.Control
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Tìm mã đơn, tên, email..."
                    className="pe-5"
                    aria-label="Tìm kiếm đơn hàng"
                  />
                  <Search size={17} className="admin-search-icon" />
                </div>
                <Form.Select value={orderFilter} onChange={event => setOrderFilter(event.target.value as 'Tất cả' | OrderStatus)} aria-label="Lọc trạng thái đơn">
                  <option>Tất cả</option>
                  {ORDER_STATUSES.map(status => <option key={status}>{status}</option>)}
                </Form.Select>
                <Form.Select value={paymentFilter} onChange={event => setPaymentFilter(event.target.value as 'Tất cả' | PaymentStatus)} aria-label="Lọc trạng thái thanh toán">
                  <option>Tất cả</option>
                  {PAYMENT_STATUSES.map(status => <option key={status}>{status}</option>)}
                </Form.Select>
              </div>
            </div>
          </Card.Header>

          <Card.Body className="p-0">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-5 px-3">
                <CheckCircle2 size={44} className="text-slate-400 mb-3" />
                <h3 className="h6 fw-bold">Không có đơn hàng phù hợp</h3>
                <p className="admin-muted mb-3">Thử thay đổi từ khóa hoặc bộ lọc trạng thái.</p>
                <Button variant="outline-dark" size="sm" onClick={() => { setQuery(''); setOrderFilter('Tất cả'); setPaymentFilter('Tất cả'); }}>
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="admin-table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Đơn hàng</th>
                      <th>Khách hàng</th>
                      <th>Sản phẩm</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái đơn</th>
                      <th>Thanh toán</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order.id}>
                        <td>
                          <strong className="d-block">{order.id}</strong>
                          <small className="admin-muted">{order.date}</small>
                        </td>
                        <td>
                          <strong className="d-block">{order.customerName}</strong>
                          <small className="d-block admin-muted">{order.customerEmail}</small>
                          <small className="admin-muted">{order.customerPhone}</small>
                        </td>
                        <td className="admin-products-cell">
                          {order.items.map((item, index) => (
                            <div key={`${order.id}-${index}`} className="mb-1">
                              <span className="fw-semibold">{item.product.name}</span>
                              <small className="admin-muted"> ×{item.quantity} · {item.selectedSize}/{item.selectedColor}</small>
                            </div>
                          ))}
                        </td>
                        <td><strong className="text-amber-800">{formatVND(order.totalAmount)}</strong></td>
                        <td>
                          <Form.Select
                            size="sm"
                            value={order.status}
                            onChange={event => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                            aria-label={`Trạng thái đơn ${order.id}`}
                            className="admin-status-select"
                          >
                            {ORDER_STATUSES.map(status => <option key={status}>{status}</option>)}
                          </Form.Select>
                          <Badge className="mt-2" bg={order.status === 'Đã hoàn thành' ? 'success' : order.status === 'Đã hủy' ? 'danger' : order.status === 'Đang giao' ? 'info' : 'warning'}>
                            {order.status}
                          </Badge>
                        </td>
                        <td>
                          <small className="d-block admin-muted mb-2">{order.paymentMethod}</small>
                          <Form.Select
                            size="sm"
                            value={order.paymentStatus}
                            onChange={event => updatePaymentStatus(order.id, event.target.value as PaymentStatus)}
                            aria-label={`Thanh toán đơn ${order.id}`}
                            className="admin-status-select"
                          >
                            {PAYMENT_STATUSES.map(status => <option key={status}>{status}</option>)}
                          </Form.Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
