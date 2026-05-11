import request from '@/services/base/request';
import type { BaseResponse } from '@/services/base/types';
import type { Product } from './types';

export async function getAdminProducts() {
  return request<BaseResponse<Product[]>>(
    '/api/admin/products',
    {
      method: 'GET',
    },
  );
}