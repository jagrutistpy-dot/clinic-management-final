// DoctorTable.js

import { $ } from "../utils/dom.js";
import { editDoctor, deleteDoctorAction } from "../controllers/doctorController.js";

// Renders the list of doctors into an HTML table
export function renderDoctorTable(doctors) {
  // Get references to the table body and the "no doctors" message
  const body = $("doctorsTableBody");
  const noDoctors = $("noDoctors");

  // Clear existing rows
  body.innerHTML = "";

  // If no doctors exist, show message
  if (doctors.length === 0) {
    noDoctors.style.display = "block";
    return;
  }

  // Hide "no doctors" message if data exists
  noDoctors.style.display = "none";

  // Render each doctor
  doctors.forEach(doctor => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="px-3 py-2">${doctor.id}</td>
      <td class="px-3 py-2">${doctor.name}</td>
      <td class="px-3 py-2">${doctor.specialization}</td>
      <td class="px-3 py-2">${doctor.schedule}</td>
      <td class="px-3 py-2">${doctor.contact}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${doctor.id}">
          Edit
        </button>

        <button
          class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${doctor.id}">
          Delete
        </button>
      </td>
    `;

    // Attach edit handler
    row.querySelector("[data-edit]").onclick = () =>
      editDoctor(doctor.id);

    // Attach delete handler
    row.querySelector("[data-delete]").onclick = () =>
      deleteDoctorAction(doctor.id);

    body.appendChild(row);
  });
}
