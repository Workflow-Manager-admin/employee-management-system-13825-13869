/**
 * User API service: Handles communication with /users endpoints.
 */

import { apiFetch } from "./api";

// PUBLIC_INTERFACE
export async function getUsers() {
  /** Fetches a list of all users. */
  return apiFetch("users/");
}

// PUBLIC_INTERFACE
export async function getUser(userId) {
  /** Fetch a single user by ID. */
  return apiFetch(`users/${userId}/`);
}

// PUBLIC_INTERFACE
export async function createUser(data) {
  /** Create a new user. Data: {username, email, ...} */
  return apiFetch("users/", { method: "POST", body: JSON.stringify(data) });
}

// PUBLIC_INTERFACE
export async function updateUser(userId, data) {
  /** Update a user. Data: fields to update. */
  return apiFetch(`users/${userId}/`, { method: "PUT", body: JSON.stringify(data) });
}

// PUBLIC_INTERFACE
export async function deleteUser(userId) {
  /** Delete a user by ID. */
  return apiFetch(`users/${userId}/`, { method: "DELETE" });
}
