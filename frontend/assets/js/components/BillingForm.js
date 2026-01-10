import { addBill } from "../services/billingService.js";

document.addEventListener("submit", e => {
  if (e.target.id === "billing-form") {
    e.preventDefault();

    addBill({
      id: Date.now(),
      patient_id: patient.value,
      doctor_id: doctor.value,
      amount: Number(amount.value),
      date: new Date().toLocaleDateString()
    });

    location.reload();
  }
});