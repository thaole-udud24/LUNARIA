export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  code: string; // 4 ký tự
  newPassword: string;
  confirmNewPassword: string;
};

export type AuthUser = {
  _id: string;
  email: string;
  full_name?: string;
  role?: 'admin' | 'user';
};

export type LoginResult = {
  accessToken: string;
  user: AuthUser;
};
