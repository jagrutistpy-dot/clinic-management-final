export async function initDoctorController() {
  const res = await fetch("/api/doctors");
  const doctors = await res.json();

  const table = document.getElementById("doctor-table");
  table.innerHTML = "";

  doctors.forEach(d => {
    table.innerHTML += `
      <tr>
        <td>${d.name}</td>
        <td>${d.specialization}</td>
        <td>${d.schedule}</td>
        <td>${d.contact}</td>
      </tr>
    `;
  });
}