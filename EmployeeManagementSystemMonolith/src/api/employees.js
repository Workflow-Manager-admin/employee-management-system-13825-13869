/**
 * Employee API service: Handles communication with /employees endpoints.
 */

import { apiFetch } from "./api";

// PUBLIC_INTERFACE
export async function getEmployees() {
  /** Fetch a list of all employees. */
  return apiFetch("employees/");
}

// PUBLIC_INTERFACE
export async function getEmployee(employeeId) {
  /** Fetch a single employee by ID. */
  return apiFetch(`employees/${employeeId}/`);
}

// PUBLIC_INTERFACE
export async function createEmployee(data) {
  /** Create a new employee. Data: {fields...} */
  return apiFetch("employees/", { method: "POST", body: JSON.stringify(data) });
}

// PUBLIC_INTERFACE
export async function updateEmployee(employeeId, data) {
  /** Update an employee. Data: fields to update. */
  return apiFetch(`employees/${employeeId}/`, { method: "PUT", body: JSON.stringify(data) });
}

// PUBLIC_INTERFACE
export async function deleteEmployee(employeeId) {
  /** Delete an employee by ID. */
  return apiFetch(`employees/${employeeId}/`, { method: "DELETE" });
}
