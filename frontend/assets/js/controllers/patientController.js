import { getPatients, addPatient, deletePatient, updatePatient } from "../services/patientService.js";
import { PatientTable } from "../components/PatientTable.js";

export async function initPatientController() {
  const app = document.getElementById("app");

  const patients = await getPatients();

  app.innerHTML = `
    <div class="card">
      <h2>Patients</h2>

      <div class="form-group">
        <input id="name" placeholder="Name" />
        <input id="age" placeholder="Age" />
        <input id="gender" placeholder="Gender" />
        <input id="contact" placeholder="Contact" />

        <button id="addPatientBtn">Add Patient</button>
        <button id="updatePatientBtn" style="display:none;">Update Patient</button>
      </div>

      <div id="patient-table">
        ${PatientTable(patients)}
      </div>
    </div>
  `;

  document.getElementById("addPatientBtn").onclick = async () => {
    await addPatient({
  name: document.getElementById("name").value,
  age: document.getElementById("age").value,
  gender: document.getElementById("gender").value,
  contact: document.getElementById("contact").value
});

    location.reload();
  };

  document.getElementById("updatePatientBtn").onclick = async () => {
    await updatePatient(window.editingPatientId, {
  name: document.getElementById("name").value,
  age: document.getElementById("age").value,
  gender: document.getElementById("gender").value,
  contact: document.getElementById("contact").value
});

    location.reload();
  };
}