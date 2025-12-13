// Sistema de plantillas para SmartArc
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema
    initTheme();
    
    // Inicializar navegación
    initNavigation();
    
    // Cargar artículos en la página principal
    if (document.getElementById('articles-container')) {
        loadArticles();
    }
    
    // Inicializar búsqueda
    initSearch();
    
    // Cargar artículo específico si estamos en article.html
    if (window.location.pathname.includes('article.html')) {
        loadArticleContent();
    }
    
    // Inicializar formularios
    initForms();
});

// ===== SISTEMA DE TEMAS =====
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema guardado
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ===== NAVEGACIÓN =====
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');
    
    // Menú móvil
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Búsqueda
    if (searchBtn && searchBar) {
        searchBtn.addEventListener('click', () => {
            searchBar.classList.add('active');
            setTimeout(() => {
                const searchInput = searchBar.querySelector('.search-input');
                if (searchInput) searchInput.focus();
            }, 100);
        });
    }
    
    if (searchClose && searchBar) {
        searchClose.addEventListener('click', () => {
            searchBar.classList.remove('active');
        });
    }
    
    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
            if (navMenu) navMenu.classList.remove('active');
        }
        
        if (!e.target.closest('.search-bar') && !e.target.closest('.search-btn')) {
            if (searchBar) searchBar.classList.remove('active');
        }
    });
}

// ===== SISTEMA DE ARTÍCULOS =====
function loadArticles() {
    const container = document.getElementById('articles-container');
    const loadMoreBtn = document.getElementById('load-more');
    
    if (!container) return;
    
    // Mostrar artículos destacados primero
    const featuredArticles = articles.filter(article => article.featured).slice(0, 6);
    renderArticles(featuredArticles, container);
    
    // Configurar botón "Cargar más"
    if (loadMoreBtn) {
        let visibleCount = 6;
        
        loadMoreBtn.addEventListener('click', () => {
            // Mostrar 6 artículos más
            const nextArticles = articles.slice(visibleCount, visibleCount + 6);
            renderArticles(nextArticles, container);
            visibleCount += 6;
            
            // Ocultar botón si no hay más artículos
            if (visibleCount >= articles.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
}

function renderArticles(articlesArray, container) {
    articlesArray.forEach(article => {
        const articleElement = createArticleElement(article);
        container.appendChild(articleElement);
    });
}

function createArticleElement(article) {
    const articleCard = document.createElement('article');
    articleCard.className = 'article-card';
    
    // Formatear fecha
    const date = new Date(article.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    articleCard.innerHTML = `
        <div class="article-image">
            <img src="${article.image}" alt="${article.title}" loading="lazy">
            <span class="article-category">${article.category}</span>
        </div>
        <div class="article-content">
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> ${date}</span>
                <span><i class="far fa-user"></i> ${article.author}</span>
            </div>
            <h3 class="article-title">
                <a href="article.html?id=${article.id}">${article.title}</a>
            </h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-footer">
                <span class="read-time"><i class="far fa-clock"></i> ${article.readTime} min</span>
                <a href="article.html?id=${article.id}" class="read-more">
                    Leer más <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
    
    return articleCard;
}

// ===== SISTEMA DE BÚSQUEDA =====
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchSubmit = document.querySelector('.search-submit');
    
    if (searchInput && searchSubmit) {
        searchSubmit.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) return;
    
    // Redirigir a la página de búsqueda o filtrar artículos
    alert(`Buscando: "${query}"\nEn una implementación completa, esto filtraría los artículos.`);
    
    // Para una implementación real, podríamos:
    // 1. Filtrar los artículos del array 'articles'
    // 2. Mostrar resultados en la página actual
    // 3. O redirigir a una página de resultados
}

// ===== CARGA DE ARTÍCULOS INDIVIDUALES =====
function loadArticleContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        // Si no hay ID, mostrar un artículo por defecto
        displayArticle(articles[0]);
        return;
    }
    
    const article = articles.find(a => a.id === parseInt(articleId));
    
    if (article) {
        displayArticle(article);
        updateBreadcrumb(article);
        loadRelatedArticles(article);
    } else {
        // Artículo no encontrado
        document.querySelector('main').innerHTML = `
            <div class="container" style="min-height: 50vh; display: flex; align-items: center; justify-content: center;">
                <div class="error-message" style="text-align: center;">
                    <h2>Artículo no encontrado</h2>
                    <p>El artículo que buscas no existe o ha sido movido.</p>
                    <a href="index.html" class="btn btn-primary">Volver al inicio</a>
                </div>
            </div>
        `;
    }
}

function displayArticle(article) {
    // Actualizar título de la página
    document.title = `${article.title} - SmartArc`;
    
    // Buscar contenedores principales
    const titleElement = document.getElementById('article-title');
    const contentElement = document.getElementById('article-content');
    const metaElement = document.getElementById('article-meta');
    
    if (titleElement) titleElement.textContent = article.title;
    
    if (contentElement) {
        // Crear contenido del artículo
        let contentHTML = `
            <div class="article-hero">
                <img src="${article.image}" alt="${article.title}" class="hero-image">
                <div class="hero-overlay">
                    <div class="hero-badge">${article.category}</div>
                </div>
            </div>
            
            <div class="article-body">
                ${article.content}
            </div>
            
            <div class="article-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            
            <div class="article-share">
                <h4>Compartir artículo</h4>
                <div class="share-buttons">
                    <button class="share-btn" data-platform="twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="share-btn" data-platform="facebook">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button class="share-btn" data-platform="linkedin">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </button>
                    <button class="share-btn copy-link">
                        <i class="fas fa-link"></i> Copiar enlace
                    </button>
                </div>
            </div>
        `;
        
        contentElement.innerHTML = contentHTML;
        
        // Inicializar botones de compartir
        initShareButtons(article);
    }
    
    if (metaElement) {
        const date = new Date(article.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        metaElement.innerHTML = `
            <span><i class="far fa-calendar"></i> ${date}</span>
            <span><i class="far fa-user"></i> ${article.author}</span>
            <span><i class="far fa-clock"></i> ${article.readTime} min de lectura</span>
            <span><i class="far fa-eye"></i> ${article.views.toLocaleString()} vistas</span>
        `;
    }
}

function updateBreadcrumb(article) {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML += `
            <span class="separator">/</span>
            <a href="article.html?category=${article.category}">${article.category}</a>
            <span class="separator">/</span>
            <span class="current">${article.title}</span>
        `;
    }
}

function loadRelatedArticles(article) {
    const container = document.getElementById('related-articles');
    if (!container) return;
    
    // Encontrar artículos relacionados (misma categoría, excluyendo el actual)
    const related = articles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3);
    
    if (related.length > 0) {
        let relatedHTML = '<h3>Artículos relacionados</h3><div class="related-grid">';
        
        related.forEach(relArticle => {
            relatedHTML += `
                <article class="related-article">
                    <img src="${relArticle.image}" alt="${relArticle.title}">
                    <div class="related-content">
                        <h4><a href="article.html?id=${relArticle.id}">${relArticle.title}</a></h4>
                        <span class="related-meta">${relArticle.readTime} min</span>
                    </div>
                </article>
            `;
        });
        
        relatedHTML += '</div>';
        container.innerHTML = relatedHTML;
    }
}

function initShareButtons(article) {
    const shareBtns = document.querySelectorAll('.share-btn');
    const currentUrl = window.location.href;
    
    shareBtns.forEach(btn => {
        const platform = btn.dataset.platform;
        
        if (platform) {
            btn.addEventListener('click', () => {
                let shareUrl = '';
                
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(article.title)}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        }
        
        if (btn.classList.contains('copy-link')) {
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(currentUrl).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Enlace copiado';
                    btn.style.backgroundColor = '#10b981';
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                    }, 2000);
                });
            });
        }
    });
}

// ===== FORMULARIOS =====
function initForms() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simular envío
            this.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 20px;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #10b981; margin-bottom: 15px;"></i>
                    <h3>¡Gracias por suscribirte!</h3>
                    <p>Hemos enviado un correo de confirmación a <strong>${email}</strong></p>
                </div>
            `;
            
            // En una implementación real, aquí enviaríamos los datos a un servidor
        });
    }
}

// ===== ANIMACIONES Y EFECTOS =====
// Inicializar animaciones cuando los elementos son visibles
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.category-card, .article-card, .feature-card').forEach(el => {
    observer.observe(el);
});
