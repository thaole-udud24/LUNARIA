import { extend } from 'umi-request';

const request = extend({
  prefix: '',
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },

  errorHandler: (error) => {
    console.error('API ERROR:', error);

    throw error;
  },
});

// REQUEST INTERCEPTOR
request.interceptors.request.use(
  (url, options) => {
    const token =
      localStorage.getItem('token');

    return {
      url,
      options: {
        ...options,

        headers: {
          ...options.headers,

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      },
    };
  },
);

// RESPONSE INTERCEPTOR
request.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      localStorage.removeItem(
        'token',
      );

      window.location.href =
        '/auth/login';
    }

    return response;
  },
);

export default request;