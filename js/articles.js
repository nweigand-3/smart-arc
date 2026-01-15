class ArticleManager
{
    constructor()
    {
        this.articles = [];
        this.currentCategory = 'all';
        this.articlesPerPage = 6;
        this.currentPage = 0;
    }

    async init()
    {
        try
        {
            await this.loadArticlesData();
            this.setupEventListeners();
            this.loadArticles();

            const viewAllBtn = document.getElementById('view-all-articles');
            if(viewAllBtn)
            {
                viewAllBtn.addEventListener('click', (e) =>
                {
                    e.preventDefault();
                    this.currentCategory = 'all';
                    this.loadArticles();
                });
            }

            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if(searchQuery)
            {
                this.searchArticles(searchQuery);
            }
        }
        catch(error)
        {
            const container = document.getElementById('articles-container');
            if(container)
            {
                container.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Error al cargar los artículos</h3>
                        <p>No se pudieron cargar los artículos en este momento.</p>
                    </div>
                `;
            }
        }
    }

    async loadArticlesData()
    {
        const response = await fetch('articles.json');
        if(!response.ok) throw new Error(`Error HTTP! estado: ${response.status}`);
        this.articles = await response.json();
        
        this.processCategories();
        return this.articles;
    }

    processCategories()
    {
        const categories = ['tecnica', 'equipamiento', 'historia', 'practica', 'seguridad', 'competicion'];
        const counts = {};
        
        this.articles.forEach(article => counts[article.category] = (counts[article.category] || 0) + 1);
        
        categories.forEach(category =>
        {
            const countElement = document.querySelector(`[data-category="${category}"] .category-count`);
            if(countElement) countElement.textContent = `${counts[category] || 0} artículos`;
        });
    }

    setupEventListeners()
    {
        const loadMoreBtn = document.getElementById('load-more');
        if(loadMoreBtn) loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());

        document.querySelectorAll('.category-card').forEach(card =>
        {
            card.addEventListener('click', (e) =>
            {
                e.preventDefault();
                const category = card.getAttribute('data-category');
                this.showCategory(category);
            });
        });

        const searchInput = document.querySelector('.search-input');
        if(searchInput)
        {
            searchInput.addEventListener('input', (e) =>
            {
                const query = e.target.value.trim();
                if(query) this.searchArticles(query);
                else this.loadArticles();
            });
        }

        const searchSubmit = document.querySelector('.search-submit');
        if(searchSubmit)
        {
            searchSubmit.addEventListener('click', (e) =>
            {
                e.preventDefault();
                const query = document.querySelector('.search-input').value.trim();
                if(query) this.searchArticles(query);
            });
        }
    }

    loadArticles()
    {
        const container = document.getElementById('articles-container');
        if(!container) return;

        this.currentPage = 0;
        const articlesToShow = this.articles.slice(0, this.articlesPerPage);
        this.renderArticles(articlesToShow, container);
        this.updateLoadMoreButton();

        const sectionTitle = document.querySelector('.section-title');
        if(sectionTitle) sectionTitle.textContent = 'Artículos Destacados';

        const viewAllBtn = document.getElementById('view-all-articles');
        if(viewAllBtn) viewAllBtn.style.display = 'none';
    }

    showCategory(category)
    {
        this.currentCategory = category;
        this.currentPage = 0;

        const container = document.getElementById('articles-container');
        if(!container) return;

        const categoryArticles = this.articles.filter(a => a.category === category);
        const articlesToShow = categoryArticles.slice(0, this.articlesPerPage);
        this.renderArticles(articlesToShow, container);
        this.updateLoadMoreButton();

        const sectionTitle = document.querySelector('.section-title');
        if(sectionTitle) sectionTitle.textContent = `Artículos de ${this.getCategoryName(category)}`;

        const viewAllBtn = document.getElementById('view-all-articles');
        if(viewAllBtn) viewAllBtn.style.display = 'inline-flex';

        const articlesSection = document.getElementById('articulos');
        if(articlesSection) articlesSection.scrollIntoView({ behavior: 'smooth' });
    }

    loadMoreArticles()
    {
        const container = document.getElementById('articles-container');
        if(!container) return;

        const articles = this.currentCategory === 'all'
            ? this.articles
            : this.articles.filter(a => a.category === this.currentCategory);

        const start = (this.currentPage + 1) * this.articlesPerPage;
        const end = start + this.articlesPerPage;
        const moreArticles = articles.slice(start, end);

        if(moreArticles.length > 0)
        {
            this.renderArticles(moreArticles, container, true);
            this.currentPage++;
        }
        this.updateLoadMoreButton();
    }

    updateLoadMoreButton()
    {
        const loadMoreBtn = document.getElementById('load-more');
        if(!loadMoreBtn) return;

        const articles = this.currentCategory === 'all'
            ? this.articles
            : this.articles.filter(a => a.category === this.currentCategory);

        const loadedCount = (this.currentPage + 1) * this.articlesPerPage;

        if(loadedCount >= articles.length)
        {
            loadMoreBtn.style.display = 'none';
            loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Todos los artículos cargados';
        }
        else
        {
            loadMoreBtn.style.display = 'inline-flex';
            const remaining = articles.length - loadedCount;
            loadMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Cargar más artículos (${remaining} restantes)`;
        }
    }

    renderArticles(articles, container, append = false)
    {
        if(!append) container.innerHTML = '';

        if(articles.length === 0)
        {
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

    createArticleCard(article)
    {
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

        card.addEventListener('click', e =>
        {
            if(!e.target.closest('a')) window.location.href = `article.html?id=${article.id}`;
        });

        return card;
    }

    searchArticles(query)
    {
        const container = document.getElementById('articles-container');
        if(!container) return [];

        const results = this.articles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        const sectionTitle = document.querySelector('.section-title');
        if(sectionTitle) sectionTitle.textContent = `Resultados para "${query}"`;

        this.renderArticles(results, container);

        const viewAllBtn = document.getElementById('view-all-articles');
        if(viewAllBtn)
        {
            viewAllBtn.style.display = 'inline-flex';
            viewAllBtn.onclick = (e) =>
            {
                e.preventDefault();
                this.currentCategory = 'all';
                this.loadArticles();
            };
        }

        const loadMoreBtn = document.getElementById('load-more');
        if(loadMoreBtn) loadMoreBtn.style.display = 'none';

        return results;
    }

    getCategoryName(category)
    {
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

document.addEventListener('DOMContentLoaded', () =>
{
    window.articleManager = new ArticleManager();
    window.articleManager.init();
});
