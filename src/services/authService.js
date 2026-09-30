import { apiClient } from './api';

const USER_STORAGE_KEY = 'tapua_demo_user';
const TOKEN_KEY = 'tapua_auth_token';

export const authService = {
  /**
   * Login user (simulates POST /api/auth/login)
   */
  async login({ email, password }) {
    await apiClient.delay(600);

    // Mock successful authentication
    const user = {
      id: 101,
      name: email.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()),
      email: email,
      phone: '+91 80027 52517',
      address: {
        line1: 'B-402, Green Meadows',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301'
      }
    };

    const mockToken = 'mock-jwt-token-tapua-food-session-' + Date.now();
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, mockToken);

    return { user, token: mockToken };
  },

  /**
   * Register user (simulates POST /api/auth/register)
   */
  async register({ name, email, phone, password }) {
    await apiClient.delay(600);

    const user = {
      id: Math.floor(100 + Math.random() * 900),
      name,
      email,
      phone: phone || '+91 98765 00000',
      address: {
        line1: '',
        city: '',
        state: '',
        pincode: ''
      }
    };

    const mockToken = 'mock-jwt-token-tapua-food-session-' + Date.now();
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, mockToken);

    return { user, token: mockToken };
  },

  /**
   * Get current authenticated user session
   */
  getCurrentUser() {
    try {
      const data = localStorage.getItem(USER_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Update user profile
   */
  async updateProfile(userData) {
    await apiClient.delay(400);
    const current = this.getCurrentUser() || {};
    const updated = { ...current, ...userData };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};
