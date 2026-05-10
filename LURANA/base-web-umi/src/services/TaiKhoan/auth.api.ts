import { request } from '@/services/base';
import type { ApiResponse } from '@/services/base';
import type {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  LoginResult,
} from './types';

export async function loginApi(payload: LoginPayload) {
  return request.post<ApiResponse<LoginResult>>('/auth/login', { data: payload });
}

export async function registerApi(payload: RegisterPayload) {
  return request.post<ApiResponse<null>>('/auth/register', { data: payload });
}

export async function forgotPasswordApi(payload: ForgotPasswordPayload) {
  return request.post<ApiResponse<null>>('/auth/forgot-password', { data: payload });
}

export async function resetPasswordApi(payload: ResetPasswordPayload) {
  return request.post<ApiResponse<null>>('/auth/reset-password', { data: payload });
}

// (tuỳ chọn) lấy profile
export async function meApi() {
  return request.get<ApiResponse<any>>('/users/me');
}
