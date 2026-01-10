// PatientTable.js

import { $ } from "../utils/dom.js";
import { editPatient, deletePatientAction } from "../controllers/patientController.js";

// Renders the list of patients into an HTML table
export function renderPatientTable(patients) {
  // Get references to the table body and the "no patients" message
  const body = $("patientsTableBody");
  const noPatients = $("noPatients");

  // Clear existing rows
  body.innerHTML = "";

  // If no patients exist, show message
  if (patients.length === 0) {
    noPatients.style.display = "block";
    return;
  }

  // Hide "no patients" message when data exists
  noPatients.style.display = "none";

  // Render each patient
  patients.forEach(patient => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="px-3 py-2">${patient.id}</td>
      <td class="px-3 py-2">${patient.name}</td>
      <td class="px-3 py-2">${patient.age}</td>
      <td class="px-3 py-2">${patient.gender}</td>
      <td class="px-3 py-2">${patient.contact}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${patient.id}">
          Edit
        </button>

        <button
          class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${patient.id}">
          Delete
        </button>
      </td>
    `;

    // Attach edit handler
    row.querySelector("[data-edit]").onclick = () =>
      editPatient(patient.id);

    // Attach delete handler
    row.querySelector("[data-delete]").onclick = () =>
      deletePatientAction(patient.id);

    body.appendChild(row);
  });
}
