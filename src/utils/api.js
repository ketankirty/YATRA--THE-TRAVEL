// API configuration and utility functions
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// API utility class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create and export API client instance
export const apiClient = new ApiClient();

// Auth API methods
export const authAPI = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
  getProfile: () => apiClient.get('/auth/me'),
  updateProfile: (userData) => apiClient.put('/auth/profile', userData),
  changePassword: (passwordData) => apiClient.put('/auth/change-password', passwordData),
  logout: () => apiClient.post('/auth/logout'),
};

// Booking API methods
export const bookingAPI = {
  create: (bookingData) => apiClient.post('/bookings', bookingData),
  getAll: (params) => apiClient.get(`/bookings${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  update: (id, bookingData) => apiClient.put(`/bookings/${id}`, bookingData),
  cancel: (id) => apiClient.delete(`/bookings/${id}`),
  getAllAdmin: (params) => apiClient.get(`/bookings/admin/all${params ? `?${new URLSearchParams(params)}` : ''}`),
};

// Contact API methods
export const contactAPI = {
  submit: (contactData) => apiClient.post('/contact', contactData),
  getAll: (params) => apiClient.get(`/contact${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id) => apiClient.get(`/contact/${id}`),
  updateStatus: (id, statusData) => apiClient.put(`/contact/${id}/status`, statusData),
  respond: (id, responseData) => apiClient.post(`/contact/${id}/respond`, responseData),
  delete: (id) => apiClient.delete(`/contact/${id}`),
};

// Feedback API methods
export const feedbackAPI = {
  submit: (feedbackData) => apiClient.post('/feedback', feedbackData),
  getAll: (params) => apiClient.get(`/feedback${params ? `?${new URLSearchParams(params)}` : ''}`),
  getUserFeedback: () => apiClient.get('/feedback/user'),
  markHelpful: (id) => apiClient.put(`/feedback/${id}/helpful`),
  report: (id, reportData) => apiClient.post(`/feedback/${id}/report`, reportData),
  getAllAdmin: (params) => apiClient.get(`/feedback/admin/all${params ? `?${new URLSearchParams(params)}` : ''}`),
  moderate: (id, moderationData) => apiClient.put(`/feedback/${id}/moderate`, moderationData),
};

export default apiClient;