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

  // ... routes khác shop/admin của bạn

  { path: '/', redirect: '/auth/login' },
  // { component: './404' },
];
