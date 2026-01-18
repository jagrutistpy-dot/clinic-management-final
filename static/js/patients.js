const loadDoctorsList = async () => {
    const res = await fetch('/api/doctors');
    const docs = await res.json();
    const select = document.getElementById('p_docid');
    select.innerHTML = '<option value="">Select Available Doctor</option>' + 
        docs.map(d => `<option value="${d[0]}">ID: ${d[0]} - Dr. ${d[1]} (${d[2]})</option>`).join('');
};

const loadPatients = async () => {
    const res = await fetch('/api/patients');
    const data = await res.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = data.map(p => `
        <tr>
            <td>${p[0]}</td>
            <td>${p[1]}</td>
            <td>${p[2]}</td>
            <td>${p[3]}</td>
            <td>${p[4]}</td>
            <td>
                <button onclick="alert('Edit logic for ID: ${p[0]}')">Edit</button>
                <button class="btn-del" onclick="deletePatient(${p[0]})">Delete</button>
            </td>
        </tr>`).join('');
};

document.getElementById('patForm').onsubmit = async (e) => {
    e.preventDefault();
    const payload = {
        name: document.getElementById('p_name').value,
        contact: document.getElementById('p_contact').value,
        date: document.getElementById('p_date').value,
        doc_id: document.getElementById('p_docid').value
    };
    await fetch('/api/patients', { method: 'POST', body: JSON.stringify(payload) });
    loadPatients();
    e.target.reset();
};

const deletePatient = async (id) => {
    if(confirm("Confirm deletion of patient record?")) {
        await fetch('/api/patients', { method: 'POST', body: JSON.stringify({action: 'delete', id}) });
        loadPatients();
    }
};

const exportToCSV = (tableId) => {
    let csv = [];
    const rows = document.querySelectorAll(`#${tableId} tr`);
    for (const row of rows) {
        const cols = Array.from(row.querySelectorAll("td, th")).slice(0, -1);
        csv.push(cols.map(c => c.innerText).join(","));
    }
    const blob = new Blob([csv.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patient_list.csv';
    a.click();
};

// Initial Load
window.onload = () => {
    loadDoctorsList();
    loadPatients();
};