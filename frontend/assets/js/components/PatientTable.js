import { getPatients, deletePatient } from "../services/patientService.js";

export function PatientTable(patients) {
  return `
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Age</th><th>Gender</th><th>Contact</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${patients.map(p => `
          <tr>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.gender}</td>
            <td>${p.contact}</td>
            <td>
              <button onclick="editPatient(${p.id})">Edit</button>
              <button onclick="removePatient(${p.id})">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

window.removePatient = id => {
  deletePatient(id);
  location.reload();
};

window.editPatient = id => {
  const patient = getPatients().find(p => p.id === id);

  document.getElementById("name").value = patient.name;
  document.getElementById("age").value = patient.age;
  document.getElementById("gender").value = patient.gender;
  document.getElementById("contact").value = patient.contact;

  document.getElementById("addPatientBtn").style.display = "none";
  document.getElementById("updatePatientBtn").style.display = "inline";

  window.editingPatientId = id;
};