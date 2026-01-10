// billingService.js

// Base API URL from env.js
const API_URL = window.ENV.API_BASE_URL + "/billing";

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all billing records
export async function getAllBills() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch a single bill by ID
export async function getBillById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new bill / invoice
export function createBill(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update billing details
export function updateBill(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a bill
export function deleteBill(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
