// Article Manager for Homepage
class ArticleManager {
    constructor() {
        this.articles = [];
        this.currentCategory = 'all';
        this.articlesPerPage = 4;
        this.currentPage = 1;
        console.log('ArticleManager initialized');
    }

    async init() {
        console.log('Loading articles...');
        
        try {
            // Load articles from JSON file
            await this.loadArticlesData();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Load initial articles
            this.loadArticles();
            
            console.log('Articles loaded successfully:', this.articles.length);
        } catch (error) {
            console.error('Error loading articles:', error);
        }
    }

    async loadArticlesData() {
        try {
            console.log('Loading articles from JSON file...');
            const response = await fetch('articles.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.articles = await response.json();
            console.log('Successfully loaded', this.articles.length, 'articles from JSON');
            
            // Process categories for the homepage
            this.processCategories();
            
            return this.articles;
        } catch (error) {
            console.error('Error loading articles.json:', error);
            console.log('Using local fallback articles instead...');
            
            // Use these fallback articles
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

    // NEW METHOD: Process categories and update counts
    processCategories() {
        const categories = ['tecnica', 'equipamiento', 'historia', 'practica', 'seguridad', 'competicion'];
        const counts = {};
        
        // Count articles per category
        this.articles.forEach(article => {
            counts[article.category] = (counts[article.category] || 0) + 1;
        });
        
        // Update category cards in the UI
        categories.forEach(category => {
            const countElement = document.querySelector(`[data-category="${category}"] .category-count`);
            if (countElement) {
                countElement.textContent = `${counts[category] || 0} artículos`;
            }
        });
        
        console.log('Category counts updated:', counts);
    }

    setupEventListeners() {
        console.log('Setting up article event listeners...');
        
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
                console.log('Category clicked:', category);
                this.showCategory(category);
            });
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query) {
                    this.searchArticles(query);
                } else {
                    this.loadArticles();
                }
            });
        }

        const searchSubmit = document.querySelector('.search-submit');
        if (searchSubmit) {
            searchSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                const searchInput = document.querySelector('.search-input');
                if (searchInput && searchInput.value.trim()) {
                    this.searchArticles(searchInput.value.trim());
                }
            });
        }
    }

    loadArticles() {
        const container = document.getElementById('articles-container');
        if (!container) {
            console.error('Articles container not found!');
            return;
        }

        console.log('Loading all articles...');
        const articlesToShow = this.articles.slice(0, this.articlesPerPage);
        this.renderArticles(articlesToShow, container);
        this.updateLoadMoreButton(this.articles.length);
        
        // Reset section title
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle && this.currentCategory === 'all') {
            sectionTitle.textContent = 'Artículos Destacados';
        }
    }

    showCategory(category) {
        console.log('Showing category:', category);
        this.currentCategory = category;
        this.currentPage = 1;
        
        const container = document.getElementById('articles-container');
        if (!container) return;

        const categoryArticles = this.articles.filter(article => article.category === category);
        const articlesToShow = categoryArticles.slice(0, this.articlesPerPage);
        
        // Update section title
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            const categoryName = this.getCategoryName(category);
            sectionTitle.textContent = `Artículos de ${categoryName}`;
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
            articles = this.articles;
        } else {
            articles = this.articles.filter(article => article.category === this.currentCategory);
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
                <div class="no-results">
                    <i class="fas fa-inbox"></i>
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
        
        // Add click handler for the entire card
        card.addEventListener('click', (e) => {
            // Don't navigate if clicking on a link (let the link handle it)
            if (!e.target.closest('a')) {
                window.location.href = `article.html?id=${article.id}`;
            }
        });
        
        return card;
    }

    searchArticles(query) {
        console.log('Searching for:', query);
        const container = document.getElementById('articles-container');
        if (!container) return;

        const results = this.articles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.articleManager = new ArticleManager();
    window.articleManager.init();
});
