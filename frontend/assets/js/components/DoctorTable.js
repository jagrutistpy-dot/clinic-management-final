import { getDoctors, deleteDoctor } from "../services/doctorService.js";

export function DoctorTable(doctors) {
  return `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Specialization</th>
          <th>Schedule</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${doctors.map(d => `
          <tr>
            <td>${d.name}</td>
            <td>${d.specialization}</td>
            <td>${d.schedule}</td>
            <td>${d.contact}</td>
            <td>
              <button onclick="editDoctor(${d.id})">Edit</button>
              <button onclick="removeDoctor(${d.id})">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

window.removeDoctor = id => {
  deleteDoctor(id);
  location.reload();
};

window.editDoctor = id => {
  const doctor = getDoctors().find(d => d.id === id);

  document.getElementById("name").value = doctor.name;
  document.getElementById("specialization").value = doctor.specialization;
  document.getElementById("schedule").value = doctor.schedule;
  document.getElementById("contact").value = doctor.contact;

  document.getElementById("addDoctorBtn").style.display = "none";
  document.getElementById("updateDoctorBtn").style.display = "inline";

  window.editingDoctorId = id;
};
