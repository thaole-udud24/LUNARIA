// src/layouts/ShopLayout.tsx
import React from 'react';
import AppHeader from '@/components/common/AppHeader';
import AppFooter from '@/components/common/AppFooter';

const ShopLayout: React.FC = (props) => {
  return (
    <div>
      <AppHeader />
      <div style={{ minHeight: '80vh' }}>
        {props.children} {/* Umi 3 dùng props.children thay vì Outlet */}
      </div>
      <AppFooter />
    </div>
  );
};

export default ShopLayout;