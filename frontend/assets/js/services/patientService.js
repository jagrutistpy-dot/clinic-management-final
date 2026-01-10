// patientService.js

// Base API URL from env.js
const API_URL = window.ENV.API_BASE_URL + "/patients";

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all patients
export async function getAllPatients() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch a single patient by ID
export async function getPatientById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new patient
export function createPatient(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update patient details
export function updatePatient(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a patient
export function deletePatient(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
