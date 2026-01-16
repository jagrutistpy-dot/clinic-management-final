// viewrouter.js

import { initDoctorController } from "../controllers/doctorController.js";
import { initPatientController } from "../controllers/patientController.js";
import { initBillingController } from "../controllers/billingController.js";
// Import the new report controller
import { initReportController } from "../controllers/reportController.js"; 

async function loadView(path) {
  const res = await fetch(path);

  // If the view file is missing, show 404 view
  if (!res.ok) {
    const fallback = await fetch("/frontend/pages/404.html").then((r) => r.text());
    document.querySelector("#app").innerHTML = fallback;
    return;
  }

  const html = await res.text();
  document.querySelector("#app").innerHTML = html;

  // Re-render Mermaid diagrams if available
  if (window.mermaid) {
    try {
      await window.mermaid.run({ querySelector: "#app .mermaid" });
    } catch (e) {
      console.warn("Mermaid render skipped:", e);
    }
  }
}

export async function router() {
  // Normalize path: remove trailing slash (except "/")
  let path = window.location.pathname;
  if (path.length > 1) path = path.replace(/\/$/, "");

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");

  } else if (path === "/doctors") {
    await loadView("/frontend/pages/doctors.html");
    initDoctorController();

  } else if (path === "/patients") {
    await loadView("/frontend/pages/patients.html");
    initPatientController();

  } else if (path === "/billing") {
    await loadView("/frontend/pages/billing.html");
    initBillingController();

  } else if (path === "/reports") { // Added route for the Full Merged Table
    await loadView("/frontend/pages/reports.html");
    initReportController(); // Initialize the merged report logic

  } else if (path === "/docs/flow") {
    await loadView("/frontend/pages/flow.html");

  } else {
    await loadView("/frontend/pages/404.html");
  }
}

export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (!link) return;

    e.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    router();
  });

  window.addEventListener("popstate", router);
}