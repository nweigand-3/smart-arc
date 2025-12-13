class ArticleManager {
    constructor() {
        this.articles = [];
        this.currentCategory = 'all';
        this.loadedArticles = 0;
        this.articlesPerLoad = 8;
        this.init();
    }

    async init() {
        await this.loadArticlesData();
        this.setupEventListeners();
        
        // Load initial articles based on current page
        if (window.location.pathname.includes('article.html')) {
            this.loadArticleContent();
        } else {
            this.loadArticles();
        }
    }

    async loadArticlesData() {
        try {
            const response = await fetch('articles.json');
            this.articles = await response.json();
            
            // Update category counts
            this.updateCategoryCounts();
        } catch (error) {
            console.error('Error loading articles:', error);
            this.articles = [];
        }
    }

    updateCategoryCounts() {
        const categories = ['tecnica', 'equipamiento', 'historia', 'practica', 'seguridad', 'competicion'];
        const counts = {};
        
        // Count articles per category
        this.articles.forEach(article => {
            counts[article.category] = (counts[article.category] || 0) + 1;
        });
        
        // Update category cards
        categories.forEach(category => {
            const countElement = document.querySelector(`[href*="${category}"] .category-count`);
            if (countElement) {
                countElement.textContent = `${counts[category] || 0} artículos`;
            }
        });
    }

    setupEventListeners() {
    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());
    }
    
    // Handle category cards clicks
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const href = card.getAttribute('href');
            const category = href.split('=')[1];
            
            // Use navigation system if available
            if (window.navigation) {
                window.navigation.showCategory(category);
            } else {
                // Fallback
                this.loadArticlesByCategory(category);
                this.updateActiveNav('categorias');
            }
        });
    });
}

    loadArticles(category = 'all') {
        this.currentCategory = category;
        this.loadedArticles = 0;
        
        const container = document.getElementById('articles-container');
        if (!container) return;
        
        // Filter articles by category
        let filteredArticles = this.articles;
        if (category !== 'all') {
            filteredArticles = this.articles.filter(article => 
                article.category === category
            );
        }
        
        // Clear and load initial articles
        container.innerHTML = '';
        this.loadedArticles = Math.min(filteredArticles.length, this.articlesPerLoad);
        
        for (let i = 0; i < this.loadedArticles; i++) {
            this.createArticleCard(filteredArticles[i], container);
        }
        
        // Update load more button visibility
        this.updateLoadMoreButton(filteredArticles.length);
        
        // Update section title if on category page
        if (category !== 'all') {
            this.updateCategoryTitle(category);
        }
    }

    loadArticlesByCategory(category) {
        this.loadArticles(category);
    }

    loadMoreArticles() {
        let filteredArticles = this.articles;
        if (this.currentCategory !== 'all') {
            filteredArticles = this.articles.filter(article => 
                article.category === this.currentCategory
            );
        }
        
        const container = document.getElementById('articles-container');
        const nextBatch = Math.min(filteredArticles.length, this.loadedArticles + this.articlesPerLoad);
        
        for (let i = this.loadedArticles; i < nextBatch; i++) {
            this.createArticleCard(filteredArticles[i], container);
        }
        
        this.loadedArticles = nextBatch;
        this.updateLoadMoreButton(filteredArticles.length);
    }

    createArticleCard(article, container) {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="article-category">${this.getCategoryName(article.category)}</span>
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
        
        // Add click handler for article link
        const articleLink = card.querySelector('.article-link');
        articleLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.router) {
                window.router.goToArticle(article.id);
            } else {
                window.location.href = `article.html?id=${article.id}`;
            }
        });
        
        container.appendChild(card);
    }

    async loadArticleContent() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (!articleId) {
            window.location.href = 'index.html';
            return;
        }
        
        await this.loadArticlesData();
        const article = this.articles.find(a => a.id == articleId);
        
        if (!article) {
            window.location.href = 'index.html';
            return;
        }
        
        // Update article page content
        const container = document.getElementById('article-content');
        if (container) {
            container.innerHTML = `
                <div class="article-header">
                    <nav class="breadcrumb">
                        <a href="index.html">Inicio</a> / 
                        <a href="index.html?category=${article.category}">${this.getCategoryName(article.category)}</a> / 
                        <span>${article.title}</span>
                    </nav>
                    <h1 class="article-title">${article.title}</h1>
                    <div class="article-meta">
                        <span class="category-badge">${this.getCategoryName(article.category)}</span>
                        <span class="article-date">${article.date}</span>
                        <span class="read-time">${article.readTime} min de lectura</span>
                    </div>
                </div>
                
                <div class="article-hero">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                
                <div class="article-body">
                    ${this.formatArticleContent(article.content)}
                </div>
                
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="article-navigation">
                    <a href="index.html?category=${article.category}" class="btn btn-outline">
                        <i class="fas fa-arrow-left"></i>
                        Volver a ${this.getCategoryName(article.category)}
                    </a>
                    <a href="index.html" class="btn btn-primary">
                        <i class="fas fa-home"></i>
                        Volver al inicio
                    </a>
                </div>
            `;
        }
        
        // Update page title
        document.title = `${article.title} - SmartArc`;
    }

    formatArticleContent(content) {
        // Convert markdown-like content to HTML
        return content
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^\* (.*$)/gm, '<li>$1</li>')
            .replace(/<li>.*<\/li>/gs, '<ul>$&</ul>');
    }

    searchArticles(query) {
        const container = document.getElementById('articles-container');
        if (!container) return;
        
        const filteredArticles = this.articles.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            article.content.toLowerCase().includes(query) ||
            article.tags.some(tag => tag.toLowerCase().includes(query))
        );
        
        container.innerHTML = '';
        if (filteredArticles.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No se encontraron artículos</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `;
        } else {
            filteredArticles.forEach(article => {
                this.createArticleCard(article, container);
            });
        }
    }

    updateLoadMoreButton(totalArticles) {
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            if (this.loadedArticles >= totalArticles) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }

    updateCategoryTitle(category) {
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.textContent = `Artículos de ${this.getCategoryName(category)}`;
        }
    }

    getCategoryName(category) {
        const categoryNames = {
            'tecnica': 'Técnica',
            'equipamiento': 'Equipamiento',
            'historia': 'Historia',
            'practica': 'Práctica',
            'seguridad': 'Seguridad',
            'competicion': 'Competición'
        };
        return categoryNames[category] || category;
    }
}
