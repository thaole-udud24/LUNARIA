export default [
  {
    path: '/login',
    component: './auth/Login',
    name: 'Đăng nhập',
  },
  {
    path: '/',
    component: '../layouts/ShopLayout', // Đảm bảo file này có tồn tại
    routes: [
      { path: '/', redirect: '/products' }, // Nếu vào "/" sẽ đá sang "/products"
      { path: '/home', component: './shop/Home', name: 'Trang chủ' },
      { path: '/products', component: './shop/Products', name: 'Sản phẩm' },
      { path: '/product-detail', component: './shop/ProductDetail', name: 'Chi tiết sản phẩm' },
      { path: '/cart', component: './shop/Cart', name: 'Giỏ hàng' },
      { path: '/checkout', component: './shop/Checkout', name: 'Thanh toán' },
      { path: '/orders', component: './shop/Orders', name: 'Đơn hàng' },
      { path: '/order-detail', component: './shop/OrderDetail', name: 'Chi tiết đơn hàng' },
      { path: '/profile', component: './shop/Profile', name: 'Hồ sơ' },
      { path: '/support', component: './shop/Support', name: 'Hỗ trợ' },
    ],
  },
  { path: '/*', component: './404' }, // Dòng này phải luôn nằm cuối cùng
];
