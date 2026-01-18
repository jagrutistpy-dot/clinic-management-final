const loadData = async () => {
    const res = await fetch('/api/doctors');
    const data = await res.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = data.map(d => `
        <tr>
            <td>${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td>
            <td>
                <button onclick="alert('Edit logic: Open Modal or Prompt')">Edit</button>
                <button class="btn-del" onclick="deleteItem(${d[0]})">Delete</button>
            </td>
        </tr>
    `).join('');
};

document.getElementById('docForm').onsubmit = async (e) => {
    e.preventDefault();
    const payload = {
        name: document.getElementById('name').value,
        spec: document.getElementById('spec').value,
        contact: document.getElementById('contact').value
    };
    await fetch('/api/doctors', { method: 'POST', body: JSON.stringify(payload) });
    loadData();
    e.target.reset();
};

const deleteItem = async (id) => {
    if(confirm("Are you sure?")) {
        await fetch('/api/doctors', { method: 'POST', body: JSON.stringify({action: 'delete', id}) });
        loadData();
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
    a.download = 'report.csv';
    a.click();
};

loadData();