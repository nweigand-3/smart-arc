// Lista de artículos de prueba reales
const articles = [
    {
        title: "Introducción a la Arquería",
        category: "Técnica",
        excerpt: "Aprende los fundamentos esenciales: postura, agarre y puntería.",
        img: "https://via.placeholder.com/400x220",
        link: "#",
        readTime: 5
    },
    {
        title: "Mantenimiento de Arcos",
        category: "Equipamiento",
        excerpt: "Cómo cuidar y mantener tus arcos y flechas en perfecto estado.",
        img: "https://via.placeholder.com/400x220",
        link: "#",
        readTime: 7
    },
    {
        title: "Historia de la Arquería",
        category: "Historia",
        excerpt: "Desde arcos antiguos hasta la práctica moderna.",
        img: "https://via.placeholder.com/400x220",
        link: "#",
        readTime: 6
    },
    {
        title: "Rutinas de Práctica",
        category: "Práctica",
        excerpt: "Ejercicios y drills para mejorar tu puntería.",
        img: "https://via.placeholder.com/400x220",
        link: "#",
        readTime: 8
    }
];

const container = document.getElementById("articles-container");

function renderArticles(list) {
    container.innerHTML = "";
    list.forEach(article => {
        const card = document.createElement("div");
        card.className = "article-card";
        card.innerHTML = `
            <div class="article-image">
                <img src="${article.img}" alt="${article.title}">
                <span class="article-category">${article.category}</span>
            </div>
            <div class="article-content">
                <h3 class="article-title"><a href="${article.link}">${article.title}</a></h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-footer">
                    <span class="read-time">${article.readTime} min de lectura</span>
                    <a href="${article.link}" class="read-more">Leer más →</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Inicializar artículos
renderArticles(articles);

// Botón "Cargar más" (simulado)
const loadMoreBtn = document.getElementById("load-more");
loadMoreBtn.addEventListener("click", () => {
    alert("No hay más artículos por cargar en esta demo.");
});
