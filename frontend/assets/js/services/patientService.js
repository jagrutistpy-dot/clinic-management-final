const STORAGE_KEY = "patients";

export async function getPatients() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export async function addPatient(patient) {
  const patients = await getPatients();
  patients.push({ id: Date.now(), ...patient });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}

export async function deletePatient(id) {
  const patients = await getPatients();
  const updated = patients.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function updatePatient(id, updatedData) {
  const patients = await getPatients();
  const index = patients.findIndex(p => p.id === id);
  patients[index] = { id, ...updatedData };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}