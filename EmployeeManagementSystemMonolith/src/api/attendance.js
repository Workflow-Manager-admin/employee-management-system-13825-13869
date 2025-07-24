/**
 * Attendance API service: Handles communication with /attendance endpoints.
 */

import { apiFetch } from "./api";

// PUBLIC_INTERFACE
export async function getAttendanceRecords() {
  /** Fetch all attendance records. */
  return apiFetch("attendance/");
}

// PUBLIC_INTERFACE
export async function getAttendanceRecord(id) {
  /** Fetch a single attendance record by ID. */
  return apiFetch(`attendance/${id}/`);
}

// PUBLIC_INTERFACE
export async function createAttendanceRecord(data) {
  /** Create a new attendance record. */
  return apiFetch("attendance/", { method: "POST", body: JSON.stringify(data) });
}

// PUBLIC_INTERFACE
export async function updateAttendanceRecord(id, data) {
  /** Update an attendance record. */
  return apiFetch(`attendance/${id}/`, { method: "PUT", body: JSON.stringify(data) });
}

// PUBLIC_INTERFACE
export async function deleteAttendanceRecord(id) {
  /** Delete an attendance record by ID. */
  return apiFetch(`attendance/${id}/`, { method: "DELETE" });
}
