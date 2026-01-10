// doctorController.js

import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from "../services/doctorService.js";

import { showAlert } from "../components/Alert.js";
import { renderDoctorTable } from "../components/DoctorTable.js";
import { resetForm, fillForm } from "../components/DoctorForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize doctor controller
export function initDoctorController() {
  // Load doctors on page load
  loadDoctors();

  // Handle form submission
  $("doctorForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      specialization: $("specialization").value.trim(),
      schedule: $("schedule").value.trim(),
      contact: $("contact").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateExistingDoctor(editingId, data)
      : await createNewDoctor(data);
  });

  // Handle cancel button
  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

// Load all doctors
export async function loadDoctors() {
  const spinner = $("loadingSpinner");
  const table = $("doctorsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const doctors = await getAllDoctors();
  setState({ doctors });
  renderDoctorTable(doctors);

  spinner.style.display = "none";
  table.style.display = "block";
}

// Create doctor
export async function createNewDoctor(data) {
  const res = await createDoctor(data);
  if (res.ok) {
    showAlert("Doctor added successfully!");
    resetForm();
    loadDoctors();
  }
}

// Edit doctor
export async function editDoctor(id) {
  const doctor = await getDoctorById(id);

  setState({ editingId: id });
  fillForm(doctor);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update doctor
export async function updateExistingDoctor(id, data) {
  const res = await updateDoctor(id, data);
  if (res.ok) {
    showAlert("Doctor details updated!");
    resetForm();
    setState({ editingId: null });
    loadDoctors();
  }
}

// Delete doctor
export async function deleteDoctorAction(id) {
  if (!confirm("Delete this doctor?")) return;

  const res = await deleteDoctor(id);
  if (res.ok) {
    showAlert("Doctor deleted!");
    loadDoctors();
  }
}
