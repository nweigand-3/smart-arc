document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("articles-list")) {
    renderIndex();
  }

  if (document.getElementById("article-page")) {
    renderArticle();
  }
});

/* =======================
   INDEX
======================= */

function renderIndex() {
  const container = document.getElementById("articles-list");

  window.articles.forEach(article => {
    const el = document.createElement("article");
    el.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <h2>${article.title}</h2>
      <p>${article.excerpt}</p>
      <a href="article.html?id=${article.id}">Leer más</a>
    `;
    container.appendChild(el);
  });
}

/* =======================
   ARTICLE
======================= */

function renderArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const article = window.articles.find(a => a.id === id);

  if (!article) {
    document.getElementById("article-page").innerHTML = "<p>Artículo no encontrado</p>";
    return;
  }

  document.title = article.title;

  document.getElementById("article-page").innerHTML = `
    <img src="${article.image}" alt="${article.title}">
    <span>${article.category}</span>
    <h1>${article.title}</h1>
    <p>${article.author} · ${article.readTime} min · ${article.views} vistas</p>
    <div>${article.content}</div>
    <p>Tags: ${article.tags.join(", ")}</p>
    <a href="index.html">← Volver</a>
  `;
}
