let globalPatients = [];

const loadDataForDropdowns = async () => {
    // 1. Fetch Patients for Name selection
    const pRes = await fetch('/api/patients');
    globalPatients = await pRes.json();
    const pSelect = document.getElementById('bn');
    pSelect.innerHTML = '<option value="">Select Available Patient</option>' + 
        globalPatients.map(p => `<option value="${p[1]}">${p[1]}</option>`).join('');

    // 2. Fetch Doctors for ID selection
    const dRes = await fetch('/api/doctors');
    const doctors = await dRes.json();
    const dSelect = document.getElementById('bd');
    dSelect.innerHTML = '<option value="">Select Doctor ID</option>' + 
        doctors.map(d => `<option value="${d[0]}">ID: ${d[0]} (Dr. ${d[1]})</option>`).join('');
};

// Requirement: Automatically fill contact when name is selected
const autoFillContact = () => {
    const selectedName = document.getElementById('bn').value;
    const patientData = globalPatients.find(p => p[1] === selectedName);
    const contactInput = document.getElementById('bc');
    
    if(patientData) {
        contactInput.value = patientData[2]; // Index 2 is the contact column in patients table
    } else {
        contactInput.value = "";
    }
};

const loadBillTable = async () => {
    const res = await fetch('/api/billing');
    const data = await res.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = data.map(b => `
        <tr>
            <td>${b[0]}</td>
            <td>${b[1]}</td>
            <td>${b[2]}</td>
            <td>${b[3]}</td>
            <td>₹${b[4]}</td>
            <td>
                <button onclick="alert('Edit billing for ID: ${b[0]}')">Edit</button>
                <button class="btn-del" onclick="deleteBill(${b[0]})">Delete</button>
            </td>
        </tr>`).join('');
};

document.getElementById('billForm').onsubmit = async (e) => {
    e.preventDefault();
    const payload = {
        p_name: document.getElementById('bn').value,
        d_id: document.getElementById('bd').value,
        contact: document.getElementById('bc').value,
        amount: document.getElementById('ba').value
    };
    await fetch('/api/billing', { method: 'POST', body: JSON.stringify(payload) });
    loadBillTable();
    e.target.reset();
};

const deleteBill = async (id) => {
    if(confirm("Confirm deletion of bill?")) {
        await fetch('/api/billing', { method: 'POST', body: JSON.stringify({action: 'delete', id}) });
        loadBillTable();
    }
};

// Initial Load
window.onload = () => {
    loadDataForDropdowns();
    loadBillTable();
};