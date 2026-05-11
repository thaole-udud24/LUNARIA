// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/ShopLayout',
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: '@/pages/shop/Home/index.tsx', name: 'Trang chủ' },
        { path: '/products', component: '@/pages/shop/Products/index.tsx', name: 'Sản phẩm' },
        { path: '/product-detail', component: '@/pages/shop/ProductDetail/index.tsx', name: 'Chi tiết sản phẩm' },
        { path: '/cart', component: '@/pages/shop/Cart/index.tsx', name: 'Giỏ hàng' },
        { path: '/checkout', component: '@/pages/shop/Checkout/index.tsx', name: 'Thanh toán' },
        { path: '/orders', component: '@/pages/shop/Orders/index.tsx', name: 'Đơn hàng' },
        { path: '/order-detail', component: '@/pages/shop/OrderDetail/index.tsx', name: 'Chi tiết đơn hàng' },
        { path: '/profile', component: '@/pages/shop/Profile/index.tsx', name: 'Hồ sơ' },
        { path: '/support', component: '@/pages/shop/Support/index.tsx', name: 'Hỗ trợ' },
      ],
    },
    { path: '/*', component: '@/pages/404.tsx' },
  ],
});
