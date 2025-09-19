import { User, AuthResponse, LoginData, RegisterData } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';

export const authAPI = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      switch (response.status) {
        case 401:
          throw new Error('Invalid email or password');
        case 422:
          throw new Error(errorData.message || 'Validation error');
        default:
          throw new Error('Login failed. Please try again.');
      }
    }

    const result: AuthResponse = await response.json();
    
    // Store token in localStorage
    localStorage.setItem('auth_token', result.token);
    localStorage.setItem('user_data', JSON.stringify(result.user));
    
    return result;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const formData = new FormData();
    
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.password_confirmation);
    
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      switch (response.status) {
        case 401:
          throw new Error('Registration failed');
        case 422:
          // Handle validation errors
          if (errorData.errors) {
            const errors = errorData.errors;
            if (errors.email) throw new Error(`Email: ${errors.email[0]}`);
            if (errors.username) throw new Error(`Username: ${errors.username[0]}`);
            if (errors.password) throw new Error(`Password: ${errors.password[0]}`);
          }
          throw new Error(errorData.message || 'Validation error');
        default:
          throw new Error('Registration failed. Please try again.');
      }
    }

    const result: AuthResponse = await response.json();
    
    // Store token in localStorage
    localStorage.setItem('auth_token', result.token);
    localStorage.setItem('user_data', JSON.stringify(result.user));
    
    return result;
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};

