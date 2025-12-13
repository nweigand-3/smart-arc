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
      <img src="${article.image}" alt="${article.title}">
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
      <a href="article.html?id=${article.id}">Leer más</a>
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
}
