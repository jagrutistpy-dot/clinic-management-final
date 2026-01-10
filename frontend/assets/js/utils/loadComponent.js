export async function loadComponent(selector, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.querySelector(selector).innerHTML = html;
}