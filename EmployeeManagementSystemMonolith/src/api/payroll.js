/**
 * Payroll API service: Handles communication with /payroll endpoints.
 */

import { apiFetch } from "./api";

// PUBLIC_INTERFACE
export async function getPayrollRecords() {
  /** Fetch all payroll records. */
  return apiFetch("payroll/");
}

// PUBLIC_INTERFACE
export async function getPayrollRecord(id) {
  /** Fetch a single payroll record by ID. */
  return apiFetch(`payroll/${id}/`);
}

// PUBLIC_INTERFACE
export async function createPayrollRecord(data) {
  /** Create a new payroll record. */
  return apiFetch("payroll/", { method: "POST", body: JSON.stringify(data) });
}

// PUBLIC_INTERFACE
export async function updatePayrollRecord(id, data) {
  /** Update a payroll record. */
  return apiFetch(`payroll/${id}/`, { method: "PUT", body: JSON.stringify(data) });
}

// PUBLIC_INTERFACE
export async function deletePayrollRecord(id) {
  /** Delete a payroll record by ID. */
  return apiFetch(`payroll/${id}/`, { method: "DELETE" });
}
