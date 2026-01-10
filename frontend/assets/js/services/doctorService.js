// doctorService.js

// Base API URL from env.js
const API_URL = window.ENV.API_BASE_URL + "/doctors";

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all doctors
export async function getAllDoctors() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch a single doctor by ID
export async function getDoctorById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new doctor
export function createDoctor(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update doctor details
export function updateDoctor(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a doctor
export function deleteDoctor(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}

