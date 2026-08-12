import React from 'react';
import ProductCard from './ProductCard';

function App() {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '50px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      
      {/* Quăng data vào cho thẻ sản phẩm số 1 */}
      <ProductCard 
        image="https://images.unsplash.com/photo-1593030761757-71fae46af504?auto=format&fit=crop&q=80&w=400" 
        name="Vest Nam Cao Cấp Đi Tiệc" 
        price={1500000} 
      />

      {/* Quăng data vào cho thẻ sản phẩm số 2 */}
      <ProductCard 
        image="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=400" 
        name="Sơ Mi Trắng Form Rộng" 
        price={450000} 
      />

    </div>
  );
}

export default App;
