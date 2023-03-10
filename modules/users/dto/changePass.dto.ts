export interface ChangePasswordDto {
  token: string;
  newPassword: string;
}

export interface ResetPasswordDto {
  email: string;
}
