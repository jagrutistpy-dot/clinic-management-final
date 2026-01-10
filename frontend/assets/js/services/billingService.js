const STORAGE_KEY = "bills";

export async function getBills() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export async function createBill(bill) {
  const bills = await getBills();

  bills.push({
    id: Date.now(),
    patient_id: bill.patient_id,
    doctor_attended: bill.doctor_attended,
    amount: Number(bill.amount),
    bill_date: bill.bill_date
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bills));
}