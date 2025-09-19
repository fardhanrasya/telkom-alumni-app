export type UserRole = "siswa" | "alumni" | "guru" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: string;
  created_at: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: UserRole;
  full_name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
