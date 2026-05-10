import { extend } from 'umi-request';
import { message } from 'antd';
import { tokenStorage } from './storage';

export const request = extend({
  timeout: 15000,
  prefix: '/api',
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.request.use((url, options) => {
  const token = tokenStorage.getAccessToken();
  const headers: any = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  return { url, options: { ...options, headers } };
});

request.interceptors.response.use(async (response) => {
  // nếu BE trả 401 thì clear token
  if (response.status === 401) {
    tokenStorage.clear();
  }
  return response;
});

export async function safeRequest<T>(input: Promise<T>) {
  try {
    return await input;
  } catch (err: any) {
    const msg =
      err?.data?.message ||
      err?.response?.data?.message ||
      err?.message ||
      'Có lỗi xảy ra';
    message.error(msg);
    throw err;
  }
}