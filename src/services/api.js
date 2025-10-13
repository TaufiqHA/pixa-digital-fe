// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// Create a global fetch wrapper with proper error handling
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // Add authorization header if token exists
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, config)

  // Handle different response status codes
  if (response.status === 401) {
    // If unauthorized, remove the token
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth.currentUser')
    throw new Error('Sesi telah habis. Silakan login kembali.')
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    
    // Format validation errors for better UX
    if (response.status === 422 && errorData.errors) {
      // Combine all validation errors into a single message
      const allErrors = Object.values(errorData.errors).flat()
      const errorMessage = allErrors.join(', ')
      throw new Error(errorMessage)
    }
    
    throw new Error(errorData.message || `API Error: ${response.status}`)
  }

  return response.json()
}

// Authentication API functions
export const authAPI = {
  // Register a new user
  async register(userData) {
    return apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  // Login user
  async login(credentials) {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  // Logout user
  async logout() {
    return apiRequest('/logout', {
      method: 'POST',
    })
  },

  // Get authenticated user
  async getUser() {
    return apiRequest('/user', {
      method: 'GET',
    })
  },
}

// General API functions
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (endpoint) => apiRequest(endpoint, { method: 'DELETE' }),
}