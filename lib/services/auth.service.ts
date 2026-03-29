import { fetchApi } from '../api';
import { AuthResponse } from '../../types';

export const authService = {
  async signup(data: any): Promise<any> {
    return fetchApi<any>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: any): Promise<AuthResponse> {
    const response = await fetchApi<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', response.access_token);
    }
    return response;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
};
