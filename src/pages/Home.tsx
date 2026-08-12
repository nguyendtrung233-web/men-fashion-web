import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Modal, InputGroup } from 'react-bootstrap';
import { Search, Filter, ShoppingBag, Star, Eye, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const Home: React.FC = () => {
  const { products, addToCart } = useApp();

  // State lọc và tìm kiếm
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(6000000);

  // State Modal Quick View
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState<string>('');
  const [modalColor, setModalColor] = useState<string>('');
  const [modalQty, setModalQty] = useState<number>(1);

  // Categories List
  const categories = ['Tất cả', 'Suit & Vest', 'Áo Sơ Mi', 'Áo Polo', 'Quần Tây', 'Áo Khoác', 'Phụ Kiện'];

  // Lọc sản phẩm
  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = product.price <= maxPrice;
    return matchCategory && matchSearch && matchPrice;
  });

  // Mở Modal xem chi tiết
  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalSize(product.sizes[0] || 'L');
    setModalColor(product.colors[0] || 'Tiêu chuẩn');
    setModalQty(1);
  };

  // Format Tiền VND
  const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  return (
    <div className="bg-slate-50 pb-5">
      {/* HERO BANNER SECTION */}
      <section className="bg-slate-900 text-white py-5 position-relative overflow-hidden mb-5">
        <div
          className="position-absolute top-0 start-0 w-100 h-100 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Container className="position-relative z-1 py-4 py-lg-5">
          <Row className="align-items-center gy-4">
            <Col lg={7}>
              <Badge className="bg-amber-500 text-slate-950 px-3 py-2 rounded-pill fw-bold text-uppercase tracking-wider mb-3 fs-7">
                BỘ SƯU TẬP THU ĐÔNG 2026
              </Badge>
              <h1 className="display-4 fw-bold luxury-brand-font text-white mb-3 leading-tight">
                PHONG CÁCH QUÝ ÔNG <br />
                <span className="text-amber-400">ĐẲNG CẤP & SANG TRỌNG</span>
              </h1>
              <p className="fs-5 text-slate-300 mb-4 max-w-xl">
                Khám phá nghệ thuật may đo tinh xảo từ chất liệu len dạ Ý, lụa băng chống nhăn và da thuộc thủ công cao cấp. Tôn vinh khí chất doanh nhân thành đạt.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#product-catalog" className="btn btn-gold btn-lg px-4 py-2.5 rounded-pill shadow-sm">
                  Khám Phá Bộ Sưu Tập
                </a>
                <a href="#features" className="btn btn-outline-light btn-lg px-4 py-2.5 rounded-pill">
                  Xem Ưu Đãi VIP
                </a>
              </div>
            </Col>
            <Col lg={5} className="d-none d-lg-block text-center">
              <div className="position-relative d-inline-block">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                  alt="Gentleman Fashion"
                  className="rounded-4 shadow-2xl img-fluid border border-slate-700"
                  style={{ maxHeight: '420px', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-3 start-3 bg-slate-900/90 backdrop-blur text-white p-3 rounded-3 border border-amber-500/40 text-start shadow-lg">
                  <div className="fw-bold text-amber-400 fs-6">Giảm ngay 10%</div>
                  <div className="fs-7 text-slate-300">Nhập mã <span className="fw-bold text-white">GENTLEMANVIP</span> tại giỏ hàng</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VALUE PROPOSITION BAR */}
      <Container id="features" className="mb-5">
        <Row className="gy-3 bg-white p-4 rounded-4 shadow-sm border border-slate-100">
          <Col md={3} sm={6} className="d-flex align-items-center gap-3">
            <div className="bg-amber-100 text-amber-800 p-3 rounded-circle">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-slate-900 fs-6">100% Chính Hãng</h6>
              <small className="text-slate-500">Cam kết chất liệu cao cấp</small>
            </div>
          </Col>
          <Col md={3} sm={6} className="d-flex align-items-center gap-3">
            <div className="bg-amber-100 text-amber-800 p-3 rounded-circle">
              <Truck size={26} />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-slate-900 fs-6">Giao Hàng Hoả Tốc</h6>
              <small className="text-slate-500">Miễn phí cho đơn từ 1.5M</small>
            </div>
          </Col>
          <Col md={3} sm={6} className="d-flex align-items-center gap-3">
            <div className="bg-amber-100 text-amber-800 p-3 rounded-circle">
              <RefreshCw size={26} />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-slate-900 fs-6">Đổi Trả 30 Ngày</h6>
              <small className="text-slate-500">Thủ tục linh hoạt tận nhà</small>
            </div>
          </Col>
          <Col md={3} sm={6} className="d-flex align-items-center gap-3">
            <div className="bg-amber-100 text-amber-800 p-3 rounded-circle">
              <Award size={26} />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-slate-900 fs-6">May Đo Tận Nơi</h6>
              <small className="text-slate-500">Dịch vụ Tailor cá nhân hóa</small>
            </div>
          </Col>
        </Row>
      </Container>

      {/* PRODUCT CATALOG SECTION */}
      <Container id="product-catalog">
        <div className="text-center mb-4">
          <Badge className="bg-amber-100 text-amber-800 px-3 py-1 rounded-pill fw-semibold mb-2 fs-7">
            CATALOG THỜI TRANG NAM
          </Badge>
          <h2 className="fw-bold text-slate-900 luxury-brand-font display-6">
            SẢN PHẨM NỔI BẬT DÀNH CHO QUÝ ÔNG
          </h2>
          <div className="mx-auto bg-amber-500 rounded" style={{ width: '80px', height: '3px' }} />
        </div>

        {/* SEARCH AND FILTER TOOLBAR */}
        <div className="bg-white p-3 p-md-4 rounded-4 shadow-sm mb-4 border border-slate-200">
          <Row className="gy-3 align-items-center">
            {/* Category Filter Tabs */}
            <Col lg={7}>
              <div className="d-flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'dark' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-pill px-3 py-1.5 fw-medium fs-6 ${
                      selectedCategory === cat ? 'bg-slate-900 text-amber-400 border-slate-900' : 'text-slate-600'
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </Col>

            {/* Search Input */}
            <Col lg={3} md={6}>
              <InputGroup size="sm">
                <Form.Control
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-start-pill py-2 px-3 border-end-0"
                />
                <InputGroup.Text className="bg-white rounded-end-pill text-slate-400 border-start-0 pe-3">
                  <Search size={18} />
                </InputGroup.Text>
              </InputGroup>
            </Col>

            {/* Price Filter Slider */}
            <Col lg={2} md={6}>
              <div className="d-flex flex-column">
                <small className="fw-semibold text-slate-600 mb-1 d-flex justify-content-between fs-7">
                  <span>Giá dưới:</span>
                  <span className="text-amber-700 fw-bold">{formatVND(maxPrice)}</span>
                </small>
                <Form.Range
                  aria-label="Giá tối đa"
                  min={500000}
                  max={6000000}
                  step={200000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* PRODUCT GRID USING BOOTSTRAP GRID & CARDS */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 border border-dashed border-slate-300">
            <Filter size={48} className="text-slate-300 mb-3" />
            <h5 className="fw-bold text-slate-700">Không tìm thấy sản phẩm phù hợp</h5>
            <p className="text-slate-500 fs-6">Thử thay đổi từ khóa hoặc bộ lọc mức giá của bạn.</p>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => {
                setSelectedCategory('Tất cả');
                setSearchQuery('');
                setMaxPrice(6000000);
              }}
              className="rounded-pill px-4 mt-2"
            >
              Xóa bộ lọc
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={6} lg={4} xl={3}>
                <Card className="product-card h-100 d-flex flex-column">
                  {/* Image & Badge overlay */}
                  <div className="product-card-img-wrapper">
                    <img src={product.image} alt={product.name} loading="lazy" />

                    {/* Badges */}
                    <div className="position-absolute top-2 start-2 d-flex flex-column gap-1">
                      {product.isBestSeller && (
                        <Badge className="bg-amber-500 text-slate-950 fw-bold fs-7 shadow-sm">
                          🔥 BEST SELLER
                        </Badge>
                      )}
                      {product.isNew && (
                        <Badge className="bg-emerald-600 text-white fw-bold fs-7 shadow-sm">
                          NEW 2026
                        </Badge>
                      )}
                    </div>

                    {/* Category Label */}
                    <Badge className="position-absolute bottom-2 end-2 bg-slate-900/80 text-white fw-medium fs-7 backdrop-blur">
                      {product.category}
                    </Badge>
                  </div>

                  {/* Card Body */}
                  <Card.Body className="p-3 d-flex flex-column">
                    {/* Rating */}
                    <div className="d-flex align-items-center gap-1 mb-1 text-amber-500 fs-7">
                      <Star size={14} fill="currentColor" />
                      <span className="fw-bold text-slate-800">{product.rating}</span>
                      <span className="text-slate-400">({product.reviewCount} đánh giá)</span>
                    </div>

                    {/* Product Name */}
                    <Card.Title className="fs-6 fw-bold text-slate-900 line-clamp-2 mb-2" style={{ minHeight: '2.8rem' }}>
                      {product.name}
                    </Card.Title>

                    {/* Description preview */}
                    <Card.Text className="text-slate-500 fs-7 line-clamp-2 mb-3">
                      {product.description}
                    </Card.Text>

                    {/* Price Area */}
                    <div className="mt-auto pt-2 border-top border-slate-100 d-flex align-items-baseline justify-content-between mb-3">
                      <div>
                        <span className="fs-5 fw-bold text-amber-700">
                          {formatVND(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-decoration-line-through text-slate-400 fs-7 ms-2">
                            {formatVND(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-2 grid-cols-2">
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => handleOpenModal(product)}
                        className="rounded-3 d-flex align-items-center justify-content-center gap-1 py-2 text-slate-700 fs-7 fw-semibold"
                      >
                        <Eye size={15} />
                        <span>Xem Nhanh</span>
                      </Button>

                      <Button
                        className="btn-gold size-sm rounded-3 d-flex align-items-center justify-content-center gap-1 py-2 fs-7 fw-bold"
                        onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)}
                      >
                        <ShoppingBag size={15} />
                        <span>Thêm Giỏ</span>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* MODAL QUICK VIEW SẢN PHẨM */}
      {selectedProduct && (
        <Modal
          show={!!selectedProduct}
          onHide={() => setSelectedProduct(null)}
          size="lg"
          centered
          className="rounded-4"
        >
          <Modal.Header closeButton className="border-bottom border-slate-200">
            <Modal.Title className="fw-bold luxury-brand-font fs-5 text-slate-900">
              CHI TIẾT SẢN PHẨM MAY ĐO
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row className="gy-4">
              <Col md={6}>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="img-fluid rounded-3 shadow-sm border border-slate-200 w-100 object-cover"
                  style={{ maxHeight: '380px' }}
                />
              </Col>
              <Col md={6} className="d-flex flex-column">
                <Badge className="bg-amber-100 text-amber-800 w-fit-content mb-2 px-2.5 py-1">
                  {selectedProduct.category}
                </Badge>
                <h4 className="fw-bold text-slate-900 mb-2">{selectedProduct.name}</h4>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="fs-3 fw-bold text-amber-700">{formatVND(selectedProduct.price)}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-decoration-line-through text-slate-400 fs-6">
                      {formatVND(selectedProduct.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-slate-600 fs-6 mb-3">{selectedProduct.description}</p>

                {/* Chọn Size */}
                <div className="mb-3">
                  <label className="fw-semibold text-slate-800 fs-6 d-block mb-1">
                    Kích cỡ (Size):
                  </label>
                  <div className="d-flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map(s => (
                      <Button
                        key={s}
                        variant={modalSize === s ? 'dark' : 'outline-secondary'}
                        size="sm"
                        onClick={() => setModalSize(s)}
                        className="px-3 py-1 rounded-2 fw-medium"
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Chọn Màu */}
                <div className="mb-3">
                  <label className="fw-semibold text-slate-800 fs-6 d-block mb-1">
                    Màu sắc:
                  </label>
                  <div className="d-flex gap-2 flex-wrap">
                    {selectedProduct.colors.map(c => (
                      <Button
                        key={c}
                        variant={modalColor === c ? 'amber' : 'outline-dark'}
                        size="sm"
                        onClick={() => setModalColor(c)}
                        className={`px-3 py-1 rounded-2 fw-medium ${modalColor === c ? 'btn-gold' : ''}`}
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Số lượng */}
                <div className="mb-4">
                  <label className="fw-semibold text-slate-800 fs-6 d-block mb-1">Số lượng:</label>
                  <div className="d-flex align-items-center gap-2" style={{ maxWidth: '140px' }}>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      aria-label="Số lượng sản phẩm"
                      value={modalQty}
                      readOnly
                      className="text-center fw-bold"
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setModalQty(modalQty + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Nút Đặt hàng */}
                <Button
                  className="btn-gold py-2.5 rounded-3 fw-bold fs-6 mt-auto d-flex align-items-center justify-content-center gap-2"
                  onClick={() => {
                    addToCart(selectedProduct, modalSize, modalColor, modalQty);
                    setSelectedProduct(null);
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>THÊM VÀO GIỎ HÀNG</span>
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
