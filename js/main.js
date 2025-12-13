document.addEventListener("DOMContentLoaded", () => {

  // Página index
  const articlesContainer = document.getElementById("articles-container");
  if (articlesContainer) {
    renderIndex(articlesContainer);
  }

  // Página artículo
  const articlePage = document.getElementById("article-page");
  if (articlePage) {
    renderArticle(articlePage);
  }
});

/* =======================
   INDEX
======================= */

function renderIndex(container) {
  window.articles.forEach(article => {
    const el = document.createElement("article");
    el.className = "article-card";
    el.innerHTML = `
      <div class="article-image">
        <img src="${article.image}" alt="${article.title}">
        <span class="article-category">${article.category}</span>
      </div>
      <div class="article-content">
        <h3 class="article-title">
          <a href="article.html?id=${article.id}">${article.title}</a>
        </h3>
        <p class="article-excerpt">${article.excerpt}</p>
      </div>
    `;
    container.appendChild(el);
  });
}


/* =======================
   ARTICLE
======================= */

function renderArticle(container) {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const article = window.articles.find(a => a.id === id);

  if (!article) {
    container.innerHTML = "<p>Artículo no encontrado</p>";
    return;
  }

  document.title = article.title;

  container.innerHTML = `
    <img src="${article.image}" alt="${article.title}">
    <span>${article.category}</span>
    <h1>${article.title}</h1>
    <p>${article.author} · ${article.readTime} min · ${article.views} vistas</p>
    <div>${article.content}</div>
    <p>Tags: ${article.tags.join(", ")}</p>
    <a href="index.html">← Volver</a>
  `;

  const params = new URLSearchParams(window.location.search);
let article;

if (params.get("id")) {
  const id = Number(params.get("id"));
  article = window.articles.find(a => a.id === id);
} else if (params.get("category")) {
  const cat = params.get("category").toLowerCase();
  article = window.articles.find(a => a.category.toLowerCase() === cat);
}

}
