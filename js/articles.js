// Datos de ejemplo, en la uni puedes sustituir por JSON real o markdown
const articles = [
    {
        title: "Primer artículo",
        category: "Tutorial",
        content: "Aquí va el contenido real del artículo...",
        date: "2025-12-13"
    },
    {
        title: "Segundo artículo",
        category: "Noticias",
        content: "Más contenido interesante que realmente existe...",
        date: "2025-12-12"
    }
];

// Render de artículos en la página
function renderArticles(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = articles.map(article => {
        const time = readingTime(article.content);
        return `
            <div class="article-card">
                <h3>${article.title}</h3>
                <p class="article-meta">
                    ${article.category} · ${time} min de lectura · ${article.date}
                </p>
                <p>${article.content.substring(0, 150)}...</p>
                <a href="#" class="btn btn-outline">Leer más</a>
            </div>
        `;
    }).join('');
}

// Ejecutar en carga
document.addEventListener('DOMContentLoaded', () => {
    renderArticles('articles-container');
});
