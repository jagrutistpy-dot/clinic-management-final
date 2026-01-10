// billingForm.js

import { $ } from "../utils/dom.js";

// Resets the billing form to its default state (create mode)
export function resetForm() {
  // Reset all form fields
  $("billingForm").reset();

  // Reset submit button text
  $("submitBtn").textContent = "Add Bill";

  // Hide cancel button
  $("cancelBtn").style.display = "none";
}

// Fills the billing form with existing bill data (edit mode)
export function fillForm(bill) {
  $("patientId").value = bill.patientId;
  $("doctorAttended").value = bill.doctorAttended;
  $("amount").value = bill.amount;
  $("billDate").value = bill.billDate;

  // Update submit button text
  $("submitBtn").textContent = "Update Bill";

  // Show cancel button
  $("cancelBtn").style.display = "inline-block";
}
