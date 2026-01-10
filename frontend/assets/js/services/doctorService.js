const BASE = "/api/doctors";

export async function getDoctors() {
  return fetch(BASE).then(r => r.json());
}

export async function createDoctor(data) {
  return fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());
}