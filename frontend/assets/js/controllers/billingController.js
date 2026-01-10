import { getPatients } from "../services/patientService.js";
import { getBills, createBill } from "../services/billingService.js";

export async function initBillingController() {
  const patientSelect = document.getElementById("bill-patient");
  const btn = document.getElementById("add-bill-btn");

  // Load patients
  const patients = await getPatients();
  patientSelect.innerHTML = "";

  patients.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.name;
    patientSelect.appendChild(option);
  });

  // Add bill
  btn.addEventListener("click", async () => {
    const data = {
      patient_id: patientSelect.value,
      doctor_attended: document.getElementById("bill-doctor").value,
      amount: document.getElementById("bill-amount").value,
      bill_date: document.getElementById("bill-date").value
    };

    await createBill(data);
    loadBills();
  });

  loadBills();
}

async function loadBills() {
  const bills = await getBills();
  const table = document.getElementById("billing-table");
  table.innerHTML = "";

  bills.forEach(b => {
    table.innerHTML += `
      <tr>
        <td>${b.patient_id}</td>
        <td>${b.doctor_attended}</td>
        <td>${b.amount}</td>
        <td>${b.bill_date}</td>
      </tr>
    `;
  });
}