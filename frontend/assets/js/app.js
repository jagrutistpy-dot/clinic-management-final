import { router } from "./router/viewRouter.js";
import { loadComponent } from "./utils/loadComponent.js";

window.addEventListener("DOMContentLoaded", async () => {
  // Load header & footer
  await loadComponent("#header", "/frontend/assets/js/components/Header.html");
  await loadComponent("#footer", "/frontend/assets/js/components/Footer.html");

  // Start SPA router
  router();
});