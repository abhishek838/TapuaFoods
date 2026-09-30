/**
 * API Client Configuration
 * Designed to connect seamlessly with Spring Boot REST API in future phases.
 * Currently runs with built-in mock handlers and localStorage persistence.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = {
  baseUrl: BASE_URL,
  
  // Future headers with JWT support
  getHeaders: () => {
    const token = localStorage.getItem('tapua_auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  },

  // Simulated latency for realistic UX feeling (spinners, loading skeletons)
  delay: (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))
};
