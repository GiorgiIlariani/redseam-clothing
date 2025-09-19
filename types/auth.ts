export interface User {
  id: number;
  username: string;
  email: string;
  is_admin: number;
  remember_token: string | null;
  avatar: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar?: File | null;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
}

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  setUser: (user: User) => void;
}
