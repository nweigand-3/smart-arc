// Article display and interaction
class ArticleDisplay {
    constructor() {
        this.currentCategory = 'all';
        this.articlesPerPage = 4;
        this.currentPage = 1;
        this.init();
    }

    async init() {
        // Load articles from data manager
        await window.dataManager.loadArticles();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial articles
        this.loadArticles();
        
        // Check if we're on article page
        if (window.location.pathname.includes('article.html')) {
            this.loadArticlePage();
        }
    }

    setupEventListeners() {
        // Load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());
        }

        // Category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                this.showCategory(category);
            });
        });

        // Search input
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchArticles(e.target.value);
            });
        }

        // Search submit
        const searchSubmit = document.querySelector('.search-submit');
        if (searchSubmit) {
            searchSubmit.addEventListener('click', () => {
                const searchInput = document.querySelector('.search-input');
                if (searchInput.value.trim()) {
                    this.searchArticles(searchInput.value.trim());
                }
            });
        }
    }

    loadArticles() {
        const container = document.getElementById('articles-container');
        if (!container) return;

        const allArticles = window.dataManager.articles;
        const articlesToShow = allArticles.slice(0, this.articlesPerPage);
        
        this.renderArticles(articlesToShow, container);
        
        // Update load more button
        this.updateLoadMoreButton(allArticles.length);
    }

    showCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        
        const container = document.getElementById('articles-container');
        if (!container) return;

        const categoryArticles = window.dataManager.getArticlesByCategory(category);
        const articlesToShow = categoryArticles.slice(0, this.articlesPerPage);
        
        // Update section title
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.textContent = `Artículos de ${window.dataManager.getCategoryName(category)}`;
        }
        
        this.renderArticles(articlesToShow, container);
        this.updateLoadMoreButton(categoryArticles.length);
        
        // Scroll to articles section
        const articlesSection = document.getElementById('articulos');
        if (articlesSection) {
            articlesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    loadMoreArticles() {
        const container = document.getElementById('articles-container');
        if (!container) return;

        let articles;
        if (this.currentCategory === 'all') {
            articles = window.dataManager.articles;
        } else {
            articles = window.dataManager.getArticlesByCategory(this.currentCategory);
        }

        const start = this.currentPage * this.articlesPerPage;
        const end = start + this.articlesPerPage;
        const moreArticles = articles.slice(start, end);
        
        this.renderArticles(moreArticles, container, true);
        
        this.currentPage++;
        this.updateLoadMoreButton(articles.length);
    }

    renderArticles(articles, container, append = false) {
        if (!append) {
            container.innerHTML = '';
        }

        if (articles.length === 0) {
            container.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i class="fas fa-inbox" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                    <h3>No hay artículos para mostrar</h3>
                    <p>Prueba con otra categoría o búsqueda.</p>
                </div>
            `;
            return;
        }

        articles.forEach(article => {
            const card = this.createArticleCard(article);
            container.appendChild(card);
        });
    }

    createArticleCard(article) {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="article-category">${window.dataManager.getCategoryName(article.category)}</span>
            </div>
            <div class="article-content">
                <h3 class="article-title">
                    <a href="article.html?id=${article.id}" class="article-link">${article.title}</a>
                </h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span class="article-date">${article.date}</span>
                    <span class="article-read-time">${article.readTime} min de lectura</span>
                </div>
                <div class="article-footer">
                    <a href="article.html?id=${article.id}" class="read-more">
                        Leer artículo
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
        return card;
    }

    searchArticles(query) {
        if (!query.trim()) {
            this.loadArticles();
            return;
        }

        const container = document.getElementById('articles-container');
        if (!container) return;

        const results = window.dataManager.searchArticles(query);
        
        // Update section title
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.textContent = `Resultados para "${query}"`;
        }
        
        this.renderArticles(results, container);
        
        // Hide load more button for search results
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    updateLoadMoreButton(totalArticles) {
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            const loadedCount = this.currentPage * this.articlesPerPage;
            if (loadedCount >= totalArticles) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }

    async loadArticlePage() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (!articleId) {
            window.location.href = 'index.html';
            return;
        }
        
        // Wait for data to load
        await window.dataManager.loadArticles();
        
        const article = window.dataManager.getArticleById(articleId);
        
        if (!article) {
            window.location.href = 'index.html';
            return;
        }
        
        this.displayArticle(article);
    }

    displayArticle(article) {
        const container = document.getElementById('article-content');
        if (!container) return;
        
        container.innerHTML = `
            <div class="article-header">
                <nav class="breadcrumb">
                    <a href="index.html">Inicio</a> / 
                    <a href="index.html?category=${article.category}" class="category-link">${window.dataManager.getCategoryName(article.category)}</a> / 
                    <span>${article.title}</span>
                </nav>
                <h1 class="article-title">${article.title}</h1>
                <div class="article-meta">
                    <span class="category-badge">${window.dataManager.getCategoryName(article.category)}</span>
                    <span class="article-date">${article.date}</span>
                    <span class="read-time">${article.readTime} min de lectura</span>
                </div>
            </div>
            
            <div class="article-hero">
                <img src="${article.image}" alt="${article.title}">
            </div>
            
            <div class="article-body">
                ${article.content.split('\n').map(para => `<p>${para}</p>`).join('')}
            </div>
            
            <div class="article-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            
            <div class="article-navigation">
                <a href="index.html" class="btn btn-outline">
                    <i class="fas fa-arrow-left"></i>
                    Volver al inicio
                </a>
                <a href="index.html?category=${article.category}" class="btn btn-primary">
                    <i class="fas fa-th-large"></i>
                    Más de ${window.dataManager.getCategoryName(article.category)}
                </a>
            </div>
        `;
        
        // Update page title
        document.title = `${article.title} - SmartArc`;
    }
}

// Initialize article display
document.addEventListener('DOMContentLoaded', () => {
    window.articleDisplay = new ArticleDisplay();
});
