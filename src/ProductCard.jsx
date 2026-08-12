import React, { useState } from 'react';

const ProductCard = ({ image, name, price }) => {
  // State để quản lý trạng thái nút bấm
  const [isAdded, setIsAdded] = useState(false);

  // Hàm xử lý khi khách hàng bấm thêm vào giỏ
  const handleAddToCart = () => {
    setIsAdded(true);
    
    // Chỗ này sau anh em mình sẽ gắn API gọi sang Laravel để lưu DB
    console.log(`Đã gửi ${name} lên Server!`);

    // Reset lại nút sau 2 giây
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div style={styles.card}>
      {/* Khung chứa ảnh */}
      <div style={styles.imageContainer}>
        <img src={image} alt={name} style={styles.image} />
      </div>

      {/* Thông tin sản phẩm */}
      <div style={styles.info}>
        <h3 style={styles.title}>{name}</h3>
        <p style={styles.price}>{price.toLocaleString()} VNĐ</p>
      </div>

      {/* Nút hành động */}
      <button 
        onClick={handleAddToCart} 
        style={{
          ...styles.button,
          backgroundColor: isAdded ? '#27ae60' : '#2c3e50', // Đổi màu xanh lá nếu đã bấm
        }}
      >
        {isAdded ? 'Đã thêm vào giỏ ✓' : 'Thêm vào giỏ hàng'}
      </button>
    </div>
  );
};

// Khai báo CSS ngay trong file để ông dễ test
const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '16px',
    maxWidth: '280px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.2s',
  },
  imageContainer: {
    width: '100%',
    height: '250px',
    overflow: 'hidden',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  info: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '18px',
    color: '#333',
    margin: '0 0 8px 0',
    fontWeight: 'bold',
  },
  price: {
    fontSize: '16px',
    color: '#e74c3c', // Màu đỏ nổi bật để hút mắt
    fontWeight: 'bold',
    margin: 0,
  },
  button: {
    width: '100%',
    padding: '12px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};

export default ProductCard;