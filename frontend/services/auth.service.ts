import { AuthResponse, LoginCredentials, RegisterData, User } from '../types';

const API_URL = 'http://localhost:3000/api';

const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const authService = {
  async register(data: RegisterData): Promise<void> {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      // Handle Zod array errors or simple message
      const msg = error.errors ? error.errors.map((e: any) => e.message).join(', ') : error.error || error.message;
      throw new Error(msg || 'Erreur lors de l\'inscription');
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur de connexion');
    }

    return response.json();
  },

  async getUserById(id: string, token: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: getHeaders(token),
    });

    if (!response.ok) {
      throw new Error('Impossible de récupérer le profil');
    }
    
    const data = await response.json();
    // The new backend controller wraps the user object in a "user" property:
    // return res.json({ user: userData });
    return data.user;
  },

  async updateProfile(id: string, token: string, data: { firstName: string; lastName: string }): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }

    const resData = await response.json();
    return resData.user;
  }
};