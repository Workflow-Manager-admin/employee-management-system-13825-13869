//
// API abstraction for backend requests (to be updated with real endpoints)
// Handles authentication and all business features.
//
const API_BASE = process.env.REACT_APP_API_BASE || '/api';

function getToken() {
  return localStorage.getItem('authToken');
}

// PUBLIC_INTERFACE
export async function apiRequest(path, options = {}) {
  /**
   * Unified API request for backend communication.
   * Adds authentication token if present.
   */
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (res.status === 401) {
    // Unauthenticated, handle globally.
    window.location.assign('/login');
    throw new Error('Session expired');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.error || 'API Error');
  }
  if (res.status === 204) return null;
  return await res.json();
}

// PUBLIC_INTERFACE
export async function login(username, password) {
  /**
   * Authenticates the user and returns {token, role, ...user}
   */
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.error || 'Login failed');
  }
  const data = await res.json();
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('userRole', data.role);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

// PUBLIC_INTERFACE
export function logout() {
  /**
   * Clears authentication and reloads.
   */
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('user');
  window.location.assign('/login');
}

// PUBLIC_INTERFACE
export function getCurrentUserRole() {
  /**
   * Returns the current user's role: 'hr', 'manager', or 'employee'.
   */
  return localStorage.getItem('userRole');
}

// PUBLIC_INTERFACE
export function getCurrentUser() {
  /**
   * Returns the current user's object or null.
   */
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    return null;
  }
}
