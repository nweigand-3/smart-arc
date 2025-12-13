// Router for handling navigation and URL changes
class Router {
    constructor() {
        this.currentPage = 'home';
        this.currentCategory = null;
        this.currentArticle = null;
        this.init();
    }

    init() {
        // Handle browser navigation (back/forward)
        window.addEventListener('popstate', (e) => {
            this.handleRoute();
        });

        // Handle initial load
        this.handleRoute();

        // Setup navigation listeners
        this.setupNavigation();
    }

    setupNavigation() {
        // Intercept all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Only handle internal navigation
            if (href.startsWith('#')) {
                e.preventDefault();
                this.handleHashNavigation(href);
            } else if (href === 'index.html' || href === '/') {
                e.preventDefault();
                this.navigateToHome();
            }
        });
    }

    handleRoute() {
        const hash = window.location.hash;
        const urlParams = new URLSearchParams(window.location.search);
        
        // Clear previous active states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        if (hash) {
            this.handleHashNavigation(hash);
        } else if (urlParams.has('category')) {
            this.showCategoryPage(urlParams.get('category'));
        } else if (urlParams.has('article')) {
            this.showArticlePage(urlParams.get('article'));
        } else {
            this.showHomePage();
        }
    }

    handleHashNavigation(hash) {
        // Update active nav link
        const navLink = document.querySelector(`.nav-link[href="${hash}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }

        // Scroll to section
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    navigateToHome() {
        window.history.pushState({}, '', 'index.html');
        this.showHomePage();
    }

    showHomePage() {
        this.currentPage = 'home';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('.nav-link[href="#inicio"]').classList.add('active');
        
        // Load all articles
        if (window.articleManager) {
            window.articleManager.loadArticles();
        }
    }

    showCategoryPage(category) {
        this.currentPage = 'category';
        this.currentCategory = category;
        
        // Update nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('.nav-link[href="#categorias"]').classList.add('active');
        
        // Load category articles
        if (window.articleManager) {
            window.articleManager.loadArticlesByCategory(category);
        }
    }

    showArticlePage(articleId) {
        this.currentPage = 'article';
        this.currentArticle = articleId;
        
        // Load article content
        if (window.articleManager) {
            window.articleManager.loadArticle(articleId);
        }
    }

    goToCategory(category) {
        window.history.pushState({}, '', `index.html?category=${category}`);
        this.showCategoryPage(category);
    }

    goToArticle(articleId) {
        window.history.pushState({}, '', `article.html?id=${articleId}`);
        window.location.href = `article.html?id=${articleId}`;
    }
}
