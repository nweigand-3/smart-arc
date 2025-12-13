document.addEventListener("DOMContentLoaded", () => {

  const articlesContainer = document.getElementById("articles-container");
  if (articlesContainer) {
    renderIndex(articlesContainer);
  }

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

function renderArticles(list, container) {
    container.innerHTML = '';

    list.forEach(article => {
        container.innerHTML += `
        <article class="article-card animate-in">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
                <span class="article-category">${article.category}</span>
            </div>

            <div class="article-content">
                <div class="article-meta">
                    <span>📅 ${article.date}</span>
                    <span>⏱ ${article.readTime}</span>
                </div>

                <h3 class="article-title">
                    <a href="article.html?id=${article.id}">
                        ${article.title}
                    </a>
                </h3>

                <p class="article-excerpt">
                    ${article.excerpt}
                </p>

                <div class="article-footer">
                    <span class="read-time">${article.readTime}</span>
                    <a class="read-more" href="article.html?id=${article.id}">
                        Leer más →
                    </a>
                </div>
            </div>
        </article>
        `;
    });
}

