// Menú hamburguesa
const menuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");
menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Toggle de tema
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
});

// Modal de búsqueda
const searchBtn = document.querySelector(".search-btn");
const searchModal = document.getElementById("search-modal");
const searchClose = document.querySelector(".modal-close");

searchBtn.addEventListener("click", () => searchModal.classList.add("active"));
searchClose.addEventListener("click", () => searchModal.classList.remove("active"));


// Helper: calcular tiempo de lectura
function readingTime(text) {
    const wordsPerMinute = 200; // promedio
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}
