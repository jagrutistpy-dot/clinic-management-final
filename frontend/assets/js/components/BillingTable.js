// BillingTable.js

import { $ } from "../utils/dom.js";
import { editBill, deleteBillAction } from "../controllers/billingController.js";

// Renders the list of bills into an HTML table
export function renderBillingTable(bills) {
  // Get references to the table body and the "no bills" message
  const body = $("billingTableBody");
  const noBills = $("noBills");

  // Clear existing rows
  body.innerHTML = "";

  // If no bills exist, show message
  if (bills.length === 0) {
    noBills.style.display = "block";
    return;
  }

  // Hide "no bills" message when data exists
  noBills.style.display = "none";

  // Render each bill
  bills.forEach(bill => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="px-3 py-2">${bill.id}</td>
      <td class="px-3 py-2">${bill.patientId}</td>
      <td class="px-3 py-2">${bill.doctorAttended}</td>
      <td class="px-3 py-2">${bill.amount}</td>
      <td class="px-3 py-2">${bill.billDate}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${bill.id}">
          Edit
        </button>

        <button
          class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${bill.id}">
          Delete
        </button>
      </td>
    `;

    // Attach edit handler
    row.querySelector("[data-edit]").onclick = () => editBill(bill.id);

    // Attach delete handler
    row.querySelector("[data-delete]").onclick = () => deleteBillAction(bill.id);

    body.appendChild(row);
  });
}
