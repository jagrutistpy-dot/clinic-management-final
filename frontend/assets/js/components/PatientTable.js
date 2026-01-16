import { $ } from "../utils/dom.js";
import { editPatient, deletePatientAction } from "../controllers/patientController.js";

export function renderPatientTable(patients) {
    const body = $("patientsTableBody");
    const noPatients = $("noPatients");
    
    body.innerHTML = "";

    if (!patients || patients.length === 0) {
        if (noPatients) noPatients.style.display = "block";
        return;
    }

    if (noPatients) noPatients.style.display = "none";

    patients.forEach(patient => {
        const row = document.createElement("tr");
        row.className = "border-b hover:bg-gray-50 transition-colors";

        // Logic: Show Doctor Name or a "Waiting Assignment" badge
        const docDisplay = (patient.assigned_doctor && patient.assigned_doctor !== "NOT ASSIGNED") 
            ? patient.assigned_doctor 
            : "Waiting Assignment";

        row.innerHTML = `
            <td class="px-4 py-4 text-sm font-medium text-gray-700">${patient.id}</td>
            <td class="px-4 py-4 text-sm">
                <div class="font-bold text-gray-900">${patient.name}</div>
                <div class="text-xs text-gray-500 italic">Age: ${patient.age}</div>
            </td>
            <td class="px-4 py-4 text-sm text-gray-600">${patient.gender}</td>
            <td class="px-4 py-4 text-sm text-gray-600">${patient.contact}</td>
            <td class="px-4 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    docDisplay === "Waiting Assignment" ? "bg-orange-100 text-orange-700" : "bg-indigo-100 text-indigo-800"
                }">
                    ${docDisplay}
                </span>
            </td>
            <td class="px-4 py-4 text-sm">
                <div class="flex items-center space-x-2">
                    <button class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded shadow-sm transition" data-edit="${patient.id}">
                        Edit
                    </button>
                    <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm transition" data-delete="${patient.id}">
                        Delete
                    </button>
                </div>
            </td>
        `;

        row.querySelector("[data-edit]").onclick = () => editPatient(patient.id);
        row.querySelector("[data-delete]").onclick = () => deletePatientAction(patient.id);
        body.appendChild(row);
    });
}