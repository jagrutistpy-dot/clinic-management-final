import { getAllBills, getBillById, createBill, updateBill, deleteBill } from "../services/billingService.js";
import { getAllPatients } from "../services/patientService.js";
import { showAlert } from "../components/Alert.js";
import { renderBillingTable } from "../components/BillingTable.js";
import { resetForm, fillForm } from "../components/BillingForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export async function initBillingController() {
    await loadInitialBillingData();

    // Autofill Doctor Name when Patient is selected
    const dropdown = $("patientId");
    if (dropdown) {
        dropdown.onchange = (e) => {
            const patients = getState().patients;
            const patient = patients.find(p => p.id == e.target.value);
            if (patient) {
                $("doctorAttended").value = patient.assigned_doctor || "No Doctor Assigned";
            }
        };
    }

    $("billingForm").onsubmit = async (e) => {
        e.preventDefault();
        const data = {
            patient_id: $("patientId").value,
            doctor_attended: $("doctorAttended").value,
            amount: $("amount").value.trim(),
            bill_date: $("billDate").value
        };
        const { editingId } = getState();
        const res = editingId ? await updateBill(editingId, data) : await createBill(data);
        if (res.ok) { showAlert("Success!"); finishBillingAction(); }
    };
}

async function loadInitialBillingData() {
    const patients = await getAllPatients();
    setState({ patients });
    const dropdown = $("patientId");
    if (dropdown) {
        dropdown.innerHTML = '<option value="" disabled selected>Select Patient ID</option>';
        patients.forEach(p => dropdown.innerHTML += `<option value="${p.id}">${p.id} - ${p.name}</option>`);
    }
    await loadBills();
}

export async function loadBills() {
    const bills = await getAllBills();
    renderBillingTable(bills);
    if ($("loadingSpinner")) $("loadingSpinner").style.display = "none";
    if ($("billingTableContainer")) $("billingTableContainer").style.display = "block";
}

// REQUIRED: Must be exported for BillingTable.js
export async function editBill(id) {
    const bill = await getBillById(id);
    if (bill) { setState({ editingId: id }); fillForm(bill); }
}

// REQUIRED: Must be exported for BillingTable.js
export async function deleteBillAction(id) {
    if (!confirm("Delete bill?")) return;
    const res = await deleteBill(id);
    if (res.ok) { showAlert("Deleted!"); loadBills(); }
}

function finishBillingAction() {
    setState({ editingId: null });
    resetForm();
    loadBills();
}