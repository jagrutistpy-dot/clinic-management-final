// billingController.js

import {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill
} from "../services/billingService.js";

import { showAlert } from "../components/Alert.js";
import { renderBillingTable } from "../components/BillingTable.js";
import { resetForm, fillForm } from "../components/BillingForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize billing controller
export function initBillingController() {
  // Load all billing records on page load
  loadBills();

  // Handle form submission
  $("billingForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      patientId: $("patientId").value.trim(),
      doctorAttended: $("doctorAttended").value.trim(),
      amount: $("amount").value.trim(),
      billDate: $("billDate").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateExistingBill(editingId, data)
      : await createNewBill(data);
  });

  // Handle cancel button
  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

// Load all billing records
export async function loadBills() {
  const spinner = $("loadingSpinner");
  const table = $("billingTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const bills = await getAllBills();
  setState({ bills });
  renderBillingTable(bills);

  spinner.style.display = "none";
  table.style.display = "block";
}

// Create new bill
export async function createNewBill(data) {
  const res = await createBill(data);
  if (res.ok) {
    showAlert("Bill created successfully!");
    resetForm();
    loadBills();
  }
}

// Edit bill
export async function editBill(id) {
  const bill = await getBillById(id);

  setState({ editingId: id });
  fillForm(bill);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update bill
export async function updateExistingBill(id, data) {
  const res = await updateBill(id, data);
  if (res.ok) {
    showAlert("Bill updated successfully!");
    resetForm();
    setState({ editingId: null });
    loadBills();
  }
}

// Delete bill
export async function deleteBillAction(id) {
  if (!confirm("Delete this bill?")) return;

  const res = await deleteBill(id);
  if (res.ok) {
    showAlert("Bill deleted!");
    loadBills();
  }
}
