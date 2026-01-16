import { $ } from "../utils/dom.js";

export async function initReportController() {
    const body = $("reportTableBody");
    const noData = $("noReportData");
    
    body.innerHTML = '<tr><td colspan="7" class="text-center py-10 italic text-gray-400">Loading clinic data...</td></tr>';

    try {
        const res = await fetch("/api/reports");
        
        // Handle potential server errors (like the 502 seen in your console)
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);

        const data = await res.json();

        body.innerHTML = "";
        if (!data || data.length === 0) {
            noData.classList.remove("hidden");
            return;
        }

        noData.classList.add("hidden");

        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.className = "hover:bg-gray-50 transition-colors";
            tr.innerHTML = `
                <td class="px-4 py-4 font-semibold text-gray-900">${row.doctor_name || 'N/A'}</td>
                <td class="px-4 py-4 text-gray-600">${row.doctor_specialization || 'N/A'}</td>
                <td class="px-4 py-4 text-gray-500">${row.patient_id}</td>
                <td class="px-4 py-4 font-medium text-indigo-600">${row.patient_name}</td>
                <td class="px-4 py-4 text-gray-600">${row.patient_age} / ${row.patient_gender}</td>
                <td class="px-4 py-4 font-bold text-green-600">₹ ${row.bill_amount}</td>
                <td class="px-4 py-4 text-gray-500">${row.bill_date}</td>
            `;
            body.appendChild(tr);
        });
    } catch (err) {
        console.error("Report Load Error:", err);
        body.innerHTML = '<tr><td colspan="7" class="text-center py-10 text-red-500 font-bold">Failed to load report data. Please check your database connection.</td></tr>';
    }
}