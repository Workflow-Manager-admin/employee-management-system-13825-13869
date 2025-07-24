/**
 * Centralized configuration for backend API access.
 * Uses the environment variable REACT_APP_API_BASE_URL for endpoint root.
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/";

/**
 * Helper function for making API calls with fetch.
 * Automatically prepends API_BASE_URL.
 * @param {string} path - relative API path, e.g. 'users/'
 * @param {object} options - fetch options
 * @returns {Promise<Response>}
 */
export async function apiFetch(path, options = {}) {
  const url = API_BASE_URL.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  // Attach Authorization header if JWT present (optional)
  const token = localStorage.getItem("jwt");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    let message = `API error: ${response.status}`;
    try { message = (await response.json()).detail || message; } catch {}
    throw new Error(message);
  }
  return response.json();
}
