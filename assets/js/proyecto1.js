// Toggle menú móvil
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("mainmenu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Marcar link activo según sección visible
const links = Array.from(document.querySelectorAll('nav a[href^="#web-"]'));
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          links.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
  );

  sections.forEach((sec) => io.observe(sec));
}

// Cerrar menú tras navegar (móvil)
links.forEach((a) =>
  a.addEventListener("click", () => {
    if (menu && menu.classList.contains("open")) {
      menu.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  })
);
