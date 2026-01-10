import { getDoctors } from "../services/doctorService.js";
import { getPatients } from "../services/patientService.js";

export async function BillingTable(bills) {
  const doctors = await getDoctors();
  const patients = await getPatients();

  return `
    <table>
      <tr>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
      ${bills.map(b => {
        const patient = patients.find(p => p.id == b.patient_id);
        const doctor = doctors.find(d => d.id == b.doctor_id);
        return `
          <tr>
            <td>${patient?.name}</td>
            <td>${doctor?.name}</td>
            <td>₹ ${b.amount}</td>
            <td>${b.date}</td>
          </tr>
        `;
      }).join("")}
    </table>
  `;
}