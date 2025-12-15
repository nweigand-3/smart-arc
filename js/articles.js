// Article Manager for Homepage
class ArticleManager {
    constructor() {
        this.articles = [];
        this.currentCategory = 'all';
        this.articlesPerPage = 8;  // Show more initially
        this.currentPage = 0;      // Start at 0 for pagination
        console.log('ArticleManager initialized');
    }

    async init() {
        console.log('Loading articles...');

        try {
            // Load articles from JSON
            await this.loadArticlesData();

            // Setup listeners for category clicks, search, load more
            this.setupEventListeners();

            // Load initial articles
            this.loadArticles();

            // Attach "Ver todos los artículos" button listener
            const viewAllBtn = document.getElementById('view-all-articles');
            if (viewAllBtn) {
                viewAllBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.currentCategory = 'all';
                    this.loadArticles();
                });
            }

            // Handle search query in URL
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if (searchQuery) {
                console.log('Found search parameter:', searchQuery);
                this.searchArticles(searchQuery);
            }

            console.log('Articles loaded successfully:', this.articles.length);
        } catch (error) {
            console.error('Error loading articles:', error);
        }
    }

    async loadArticlesData() {
        try {
            console.log('Loading articles from JSON file...');
            const response = await fetch('articles.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.articles = await response.json();
            console.log('Loaded', this.articles.length, 'articles');

            this.processCategories();
            return this.articles;
        } catch (error) {
            console.error('Error loading articles.json, using fallback', error);
            // Fallback articles
            this.articles = [
                {
                    id: 1,
                    title: "Fundamentos de la Postura en Arquería",
                    category: "tecnica",
                    date: "2024-01-15",
                    readTime: 8,
                    excerpt: "La postura correcta es la base de un tiro preciso y consistente.",
                    content: "# Fundamentos de la Postura en Arquería\n\nLa postura correcta es el cimiento sobre el cual se construye cada tiro exitoso.",
                    image: "https://images.unsplash.com/photo-1550747534-2a5c93d59d9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    tags: ["postura", "fundamentos"]
                },
                {
                    id: 2,
                    title: "Mantenimiento Básico del Arco Recurvo",
                    category: "equipamiento",
                    date: "2024-01-20",
                    readTime: 10,
                    excerpt: "Guía completa para mantener tu arco recurvo en óptimas condiciones.",
                    content: "# Mantenimiento Básico del Arco Recurvo\n\nUn arco bien mantenido no solo dura más tiempo.",
                    image: "https://images.unsplash.com/photo-1586972750140-4d680ae17e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    tags: ["mantenimiento", "recurvo"]
                }
            ];
            this.processCategories();
            return this.articles;
        }
    }

    processCategories() {
        const categories = ['tecnica', 'equipamiento', 'historia', 'practica', 'seguridad', 'competicion'];
        const counts = {};
        this.articles.forEach(article => counts[article.category] = (counts[article.category] || 0) + 1);
        categories.forEach(category => {
            const countElement = document.querySelector(`[data-category="${category}"] .category-count`);
            if (countElement) countElement.textContent = `${counts[category] || 0} artículos`;
        });
        console.log('Category counts updated:', counts);
    }

    setupEventListeners() {
        console.log('Setting up article event listeners...');

        // Load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());

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
                const query = e.target.value.trim();
                if (query) this.searchArticles(query);
                else this.loadArticles();
            });
        }

        // Search submit
        const searchSubmit = document.querySelector('.search-submit');
        if (searchSubmit) {
            searchSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                const query = document.querySelector('.search-input').value.trim();
                if (query) this.searchArticles(query);
            });
        }
    }

    loadArticles() {
        const container = document.getElementById('articles-container');
        if (!container) return;

        this.currentPage = 0;
        const articlesToShow = this.articles.slice(0, this.articlesPerPage);
        this.renderArticles(articlesToShow, container);
        this.updateLoadMoreButton();

        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) sectionTitle.textContent = 'Artículos Destacados';

        const viewAllBtn = document.getElementById('view-all-articles');
        if (viewAllBtn) viewAllBtn.style.display = 'none';
    }

    showCategory(category) {
        this.currentCategory = category;
        this.currentPage = 0;

        const container = document.getElementById('articles-container');
        if (!container) return;

        const categoryArticles = this.articles.filter(a => a.category === category);
        const articlesToShow = categoryArticles.slice(0, this.articlesPerPage);
        this.renderArticles(articlesToShow, container);
        this.updateLoadMoreButton();

        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) sectionTitle.textContent = `Artículos de ${this.getCategoryName(category)}`;

        const viewAllBtn = document.getElementById('view-all-articles');
        if (viewAllBtn) viewAllBtn.style.display = 'inline-flex';

        const articlesSection = document.getElementById('articulos');
        if (articlesSection) articlesSection.scrollIntoView({ behavior: 'smooth' });
    }

    loadMoreArticles() {
        const container = document.getElementById('articles-container');
        if (!container) return;

        const articles = this.currentCategory === 'all'
            ? this.articles
            : this.articles.filter(a => a.category === this.currentCategory);

        const start = (this.currentPage + 1) * this.articlesPerPage;
        const end = start + this.articlesPerPage;
        const moreArticles = articles.slice(start, end);

        if (moreArticles.length > 0) {
            this.renderArticles(moreArticles, container, true);
            this.currentPage++;
        }
        this.updateLoadMoreButton();
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        if (!loadMoreBtn) return;

        const articles = this.currentCategory === 'all'
            ? this.articles
            : this.articles.filter(a => a.category === this.currentCategory);

        const loadedCount = (this.currentPage + 1) * this.articlesPerPage;

        if (loadedCount >= articles.length) {
            loadMoreBtn.style.display = 'none';
            loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Todos los artículos cargados';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
            const remaining = articles.length - loadedCount;
            loadMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Cargar más artículos (${remaining} restantes)`;
        }
    }

    renderArticles(articles, container, append = false) {
        if (!append) container.innerHTML = '';

        if (articles.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-inbox"></i>
                    <h3>No hay artículos para mostrar</h3>
                    <p>Prueba con otra categoría o búsqueda.</p>
                </div>
            `;
            return;
        }

        articles.forEach(article => container.appendChild(this.createArticleCard(article)));
    }

    createArticleCard(article) {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="article-category">${this.getCategoryName(article.category)}</span>
            </div>
            <div class="article-content">
                <h3 class="article-title">
                    <a href="article.html?id=${article.id}">${article.title}</a>
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

        card.addEventListener('click', e => {
            if (!e.target.closest('a')) window.location.href = `article.html?id=${article.id}`;
        });

        return card;
    }

    searchArticles(query) {
    const container = document.getElementById('articles-container');
    if (!container) return [];

    const results = this.articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    // Update section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) sectionTitle.textContent = `Resultados para "${query}"`;

    // Render results
    this.renderArticles(results, container);

    // Show the "Ver todos los artículos" button no matter what
    const viewAllBtn = document.getElementById('view-all-articles');
    if (viewAllBtn) {
        viewAllBtn.style.display = 'inline-flex';
        viewAllBtn.onclick = (e) => {
            e.preventDefault();
            this.currentCategory = 'all';
            this.loadArticles();
        };
    }

    // Hide load more because search results are paginated separately
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';

    return results;
}



    getCategoryName(category) {
        const names = {
            tecnica: 'Técnica',
            equipamiento: 'Equipamiento',
            historia: 'Historia',
            practica: 'Práctica',
            seguridad: 'Seguridad',
            competicion: 'Competición'
        };
        return names[category] || category;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.articleManager = new ArticleManager();
    window.articleManager.init();
});
