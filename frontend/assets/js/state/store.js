// Global app state
let state = {
  patients: [],       // list of all patients
  doctors: [],        // list of all doctors
  bills: [],          // list of all bills
  editingPatientId: null,  // which patient is being edited
  editingDoctorId: null,   // which doctor is being edited
  editingBillId: null       // which bill is being edited
};

// Update part of the state
export function setState(newState) {
  state = { ...state, ...newState };
}

// Read the current state
export function getState() {
  return state;
}
