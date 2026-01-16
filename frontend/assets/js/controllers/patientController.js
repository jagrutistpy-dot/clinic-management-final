// frontend/assets/js/controllers/patientController.js
import { 
    getAllPatients, getPatientById, createPatient, updatePatient, deletePatient 
} from "../services/patientService.js";
import { getAllDoctors } from "../services/doctorService.js";
import { showAlert } from "../components/Alert.js";
import { renderPatientTable } from "../components/PatientTable.js";
import { resetForm, fillForm } from "../components/PatientForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export async function initPatientController() {
    await loadInitialPatientData();

    // Use onsubmit to ensure clean event handling
    $("patientForm").onsubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            name: $("name").value.trim(),
            age: parseInt($("age").value.trim()),
            gender: $("gender").value,
            contact: $("contact").value.trim(),
            assigned_doctor: $("assignedDoctor").value 
        };

        const { editingId } = getState();
        
        try {
            const res = editingId 
                ? await updatePatient(editingId, data) 
                : await createPatient(data);

            if (res && res.ok) {
                showAlert(editingId ? "Patient updated successfully!" : "Patient added successfully!");
                finishPatientAction();
            } else {
                showAlert("Failed to save patient.", "error");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            showAlert("A system error occurred.", "error");
        }
    };

    if ($("cancelBtn")) {
        $("cancelBtn").onclick = () => {
            finishPatientAction();
        };
    }
}

async function loadInitialPatientData() {
    try {
        const doctors = await getAllDoctors();
        const docSelect = $("assignedDoctor");
        if (docSelect) {
            docSelect.innerHTML = '<option value="" disabled selected>Select Attending Doctor</option>';
            doctors.forEach(doc => {
                const option = document.createElement("option");
                option.value = doc.name; 
                option.textContent = `${doc.name} (${doc.specialization})`;
                docSelect.appendChild(option);
            });
        }
        await loadPatients();
    } catch (error) {
        console.error("Initialization Error:", error);
    }
}

export async function loadPatients() {
    const patients = await getAllPatients();
    setState({ patients });
    renderPatientTable(patients);
    if ($("loadingSpinner")) $("loadingSpinner").style.display = "none";
    if ($("patientsTableContainer")) $("patientsTableContainer").style.display = "block";
}

export async function editPatient(id) {
    const patient = await getPatientById(id);
    if (patient) {
        setState({ editingId: id });
        fillForm(patient);
        if ($("assignedDoctor")) {
            $("assignedDoctor").value = patient.assigned_doctor || "";
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

export async function deletePatientAction(id) {
    if (!confirm("Are you sure you want to delete this patient?")) return;
    const res = await deletePatient(id);
    if (res.ok) { 
        showAlert("Patient deleted!"); 
        loadPatients(); 
    }
}

function finishPatientAction() {
    setState({ editingId: null });
    resetForm();
    loadPatients();
}