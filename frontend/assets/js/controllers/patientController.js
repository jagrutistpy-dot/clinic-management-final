// patientController.js

import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} from "../services/patientService.js";

import { showAlert } from "../components/Alert.js";
import { renderPatientTable } from "../components/PatientTable.js";
import { resetForm, fillForm } from "../components/PatientForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize patient controller
export function initPatientController() {
  // Load patients on page load
  loadPatients();

  // Handle form submission
  $("patientForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      age: $("age").value.trim(),
      gender: $("gender").value.trim(),
      contact: $("contact").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateExistingPatient(editingId, data)
      : await createNewPatient(data);
  });

  // Handle cancel button
  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

// Load all patients
export async function loadPatients() {
  const spinner = $("loadingSpinner");
  const table = $("patientsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const patients = await getAllPatients();
  setState({ patients });
  renderPatientTable(patients);

  spinner.style.display = "none";
  table.style.display = "block";
}

// Create patient
export async function createNewPatient(data) {
  const res = await createPatient(data);
  if (res.ok) {
    showAlert("Patient added successfully!");
    resetForm();
    loadPatients();
  }
}

// Edit patient
export async function editPatient(id) {
  const patient = await getPatientById(id);

  setState({ editingId: id });
  fillForm(patient);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update patient
export async function updateExistingPatient(id, data) {
  const res = await updatePatient(id, data);
  if (res.ok) {
    showAlert("Patient details updated!");
    resetForm();
    setState({ editingId: null });
    loadPatients();
  }
}

// Delete patient
export async function deletePatientAction(id) {
  if (!confirm("Delete this patient?")) return;

  const res = await deletePatient(id);
  if (res.ok) {
    showAlert("Patient deleted!");
    loadPatients();
  }
}
