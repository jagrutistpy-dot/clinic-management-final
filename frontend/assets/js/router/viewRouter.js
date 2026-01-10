import { loadComponent } from "../utils/loadComponent.js";
import { initPatientController } from "../controllers/patientController.js";
import { initDoctorController } from "../controllers/doctorController.js";
import { initBillingController } from "../controllers/billingController.js";
import { initHomeController } from "../controllers/homeController.js";

const routes = {
  "/": { page: "/frontend/pages/home.html", init: initHomeController },
  "/home": { page: "/frontend/pages/home.html", init: initHomeController },
  "/patients": { page: "/frontend/pages/patients.html", init: initPatientController },
  "/doctors": { page: "/frontend/pages/doctors.html", init: initDoctorController },
  "/billing": { page: "/frontend/pages/billing.html", init: initBillingController }
};

export async function router() {
  const path = location.hash.replace("#", "") || "/";
  const route = routes[path];

  if (!route) {
    await loadComponent("#app", "/frontend/pages/404.html");
    return;
  }

  await loadComponent("#app", route.page);
  if (route.init) route.init();
}

window.addEventListener("hashchange", router);