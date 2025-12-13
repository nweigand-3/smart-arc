// Navigation management
class Navigation {
    constructor() {
        this.currentSection = 'inicio';
        this.init();
    }

    init() {
        this.setupNavLinks();
        this.handleUrlChanges();
        this.setupCategoryCards();
        this.setupArticleLinks();
    }

    setupNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                const href = link.getAttribute('href');
                
                if (href === 'index.html' || href === '#' || href === '/') {
                    // Go to home page
                    this.goToHome();
                } else if (href.startsWith('#')) {
                    // Scroll to section
                    this.scrollToSection(href.substring(1));
                } else if (href.startsWith('http') || href.includes('.html')) {
                    // External link or separate page
                    window.location.href = href;
                }
            });
        });
    }

    setupCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.getAttribute('href').split('=')[1];
                this.showCategory(category);
            });
        });
    }

    setupArticleLinks() {
        // Delegate article link clicks
        document.addEventListener('click', (e) => {
            const articleLink = e.target.closest('.article-link, .read-more, [href*="article.html"]');
            
            if (articleLink && articleLink.href && articleLink.href.includes('article.html')) {
                e.preventDefault();
                const url = new URL(articleLink.href);
                const articleId = url.searchParams.get('id');
                if (articleId) {
                    window.location.href = `article.html?id=${articleId}`;
                }
            }
        });
    }

    handleUrlChanges() {
        // Check URL parameters on load
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            this.showCategory(category);
        } else {
            // Set initial active nav link
            const currentPath = window.location.pathname;
            if (currentPath.includes('article.html')) {
                document.querySelector('[data-nav="articulos"]').classList.add('active');
            } else {
                document.querySelector('[data-nav="home"]').classList.add('active');
            }
        }
    }

    goToHome() {
        // Update URL without reload if already on index
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname === '/') {
            window.history.pushState({}, '', 'index.html');
            this.showHome();
        } else {
            window.location.href = 'index.html';
        }
    }

    showHome() {
        // Load all articles
        if (window.articleManager) {
            window.articleManager.loadArticles();
        }
        
        // Update active nav
        this.updateActiveNav('home');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showCategory(category) {
        // Update URL
        window.history.pushState({}, '', `index.html?category=${category}`);
        
        // Load category articles
        if (window.articleManager) {
            window.articleManager.loadArticlesByCategory(category);
        }
        
        // Update active nav
        this.updateActiveNav('categorias');
        
        // Scroll to articles section
        this.scrollToSection('articulos');
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
            this.currentSection = sectionId;
        }
    }

    updateActiveNav(nav) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current nav
        const activeLink = document.querySelector(`[data-nav="${nav}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}
