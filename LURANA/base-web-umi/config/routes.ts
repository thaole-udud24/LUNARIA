export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      { path: '/auth/login',
        component: './auth/Login',
        layout: false,
       },
      { path: '/auth/register',
        component: './auth/Register',
        layout: false, 
      },
      { path: '/auth/forgot-password',
        component: './auth/ForgotPassword', 
        layout: false, 
      },
      { path: '/auth/verify-code', 
        component: './auth/VerifyCode' 
      },
      { path: '/auth/reset-password', 
        component: './auth/ResetPassword', 
        layout: false, 
      },
      { path: '/auth/reset-success', 
        component: './auth/ResetSuccess' 
      },
      { redirect: '/auth/login' },
    ],
  },
  
  {
    path: '/admin',
    layout: false,
    component: '@/layouts/AdminLayout',
    routes: [
      {
        path: '/admin/dashboard',
        component: '@/pages/admin/Dashboard',
      },
      {
        path: '/admin/products',
        component: '@/pages/admin/Products',
      },
      {
        path: '/admin/categories',
        component: '@/pages/admin/Categories',
      },
      {
        path: '/admin/skintypes',
        component: '@/pages/admin/SkinTypes',
      },
    ],
  },

  {
    path: '/',
    component: '@/layouts/ShopLayout',
    layout: false,
    routes: [
      { path: '/home', component: '@/pages/shop/Home' },
      { path: '/about', component: '@/pages/shop/About' },
      { path: '/products', component: '@/pages/shop/Products' },
      { path: '/blog/:id', component: '@/pages/shop/BlogDetail' },
      { path: '/blog', component: '@/pages/shop/Blog' },
      { path: '/', redirect: '/home' },
    ],
  },
  // { component: './404' },
];
