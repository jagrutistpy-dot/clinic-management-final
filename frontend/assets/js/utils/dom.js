// Shortcut for selecting elements by ID (Clinic Management System)
export const $ = (id) => document.getElementById(id);

// Converts an HTML string into a real DOM element
// Useful for rendering patients, doctors, appointments, etc.
export function createElement(html) {
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstChild; // return the generated element
}