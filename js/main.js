// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('SmartArc initializing...');
    
    // Initialize theme
    initTheme();
    
    // Initialize search
    initSearch();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize newsletter
    initNewsletter();
    
    // Initialize navigation
    initNavigation();
    
    console.log('SmartArc initialized successfully');
});

// Fix for navigation scrolling with fixed header
document.addEventListener('DOMContentLoaded', function() {
    // Fix anchor link scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Only handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calculate position with header offset
                    const headerHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // Scroll to position
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without scrolling
                    history.pushState(null, null, href);
                }
            }
        });
    });
});

// Theme toggle function
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        console.log('Dark mode enabled');
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        console.log('Light mode enabled');
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
            console.log('Switched to light mode');
        } else {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
            console.log('Switched to dark mode');
        }
    });
}

// Search functionality
// Search functionality - Enhanced with dropdown
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchForm = document.querySelector('.search-form');
    const searchResults = document.getElementById('search-results');
    
    if (!searchBtn || !searchBar) return;
    
    console.log('Search initialized');
    
    // Toggle search bar
    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBar.classList.toggle('active');
        console.log('Search bar toggled:', searchBar.classList.contains('active'));
        
        if (searchBar.classList.contains('active')) {
            searchInput.focus();
        } else {
            clearSearchResults();
        }
    });
    
    // Close search
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchBar.classList.remove('active');
            clearSearchResults();
            console.log('Search bar closed');
        });
    }
    
    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                console.log('Search form submitted:', query);
                performSearch(query);
            }
        });
    }
    
    // Handle search input with debounce
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            // Clear previous timeout
            clearTimeout(searchTimeout);
            
            // Set new timeout for debouncing
            searchTimeout = setTimeout(() => {
                if (query) {
                    console.log('Search input (debounced):', query);
                    performSearch(query);
                } else {
                    clearSearchResults();
                }
            }, 300); // 300ms debounce
        });
    }
    
    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
            searchBar.classList.remove('active');
            clearSearchResults();
        }
    });
    
    // Close search on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            clearSearchResults();
        }
    });
    
    // Function to perform search
    function performSearch(query) {
        console.log('Performing search for:', query);
        
        // Check if we're on the index page and ArticleManager exists
        const isIndexPage = window.location.pathname.includes('index.html') || 
                           window.location.pathname === '/' ||
                           window.location.pathname.endsWith('/');
        
        if (isIndexPage && window.articleManager) {
            // Use ArticleManager's search if available
            const results = window.articleManager.searchArticles(query);
            displaySearchResults(results, query);
        } else {
            // Fetch and search from JSON directly
            fetchAndSearch(query);
        }
    }
    
    // Function to fetch articles and search
    async function fetchAndSearch(query) {
        try {
            console.log('Fetching articles for search...');
            const response = await fetch('articles.json');
            const articles = await response.json();
            
            // Perform search
            const results = articles.filter(article =>
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );
            
            displaySearchResults(results, query);
        } catch (error) {
            console.error('Error fetching articles for search:', error);
            showSearchError();
        }
    }
    
    // Function to display search results in dropdown
    function displaySearchResults(results, query) {
        const resultsList = document.getElementById('search-results-list');
        const searchCount = document.getElementById('search-count');
        const viewAllLink = document.getElementById('view-all-results');
        
        if (!resultsList || !searchCount || !viewAllLink) return;
        
        // Update count
        searchCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''}`;
        
        // Clear previous results
        resultsList.innerHTML = '';
        
        if (results.length === 0) {
            // Show no results message
            resultsList.innerHTML = `
                <div class="no-search-results">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron resultados para "<strong>${query}</strong>"</p>
                </div>
            `;
            viewAllLink.style.display = 'none';
            return;
        }
        
        // Show results (limit to 5 in dropdown)
        const displayResults = results.slice(0, 5);
        
        displayResults.forEach(article => {
            const resultItem = document.createElement('a');
            resultItem.href = `article.html?id=${article.id}`;
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-title">
                    <i class="fas fa-newspaper"></i>
                    ${article.title}
                </div>
                <div class="search-result-excerpt">
                    ${article.excerpt}
                </div>
                <div class="search-result-meta">
                    <span class="search-result-category">${getCategoryName(article.category)}</span>
                    <span>${article.readTime} min de lectura</span>
                </div>
            `;
            resultsList.appendChild(resultItem);
        });
        
        // Update "View all" link
        if (results.length > 5) {
            viewAllLink.style.display = 'block';
            viewAllLink.href = `index.html?search=${encodeURIComponent(query)}`;
            viewAllLink.textContent = `Ver todos los ${results.length} resultados`;
        } else {
            viewAllLink.style.display = 'none';
        }
        
        // Show results dropdown
        searchResults.style.display = 'block';
    }
    
    // Helper function to get category name
    function getCategoryName(category) {
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
    
    // Function to clear search results
    function clearSearchResults() {
        const resultsList = document.getElementById('search-results-list');
        const searchCount = document.getElementById('search-count');
        
        if (resultsList) resultsList.innerHTML = '';
        if (searchCount) searchCount.textContent = '0 resultados';
        
        if (searchInput) searchInput.value = '';
        
        const searchResults = document.getElementById('search-results');
        if (searchResults) searchResults.style.display = 'none';
    }
    
    // Function to show search error
    function showSearchError() {
        const resultsList = document.getElementById('search-results-list');
        if (resultsList) {
            resultsList.innerHTML = `
                <div class="no-search-results">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error al cargar los resultados de búsqueda</p>
                </div>
            `;
        }
    }
}

// Mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        console.log('Mobile menu toggled');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
}

// Newsletter form
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            alert('¡Gracias por suscribirte con ' + email + '! Te notificaremos sobre nuevos artículos.');
            newsletterForm.reset();
        }
    });
}

// Navigation active state
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Only handle internal navigation
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(function(l) {
                    l.classList.remove('active');
                });
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Scroll to section
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Force scrollbar to be visible
function ensureScrollbar() {
    // Check if body is scrollable
    if (document.body.scrollHeight <= window.innerHeight) {
        // Add some minimum height
        document.body.style.minHeight = 'calc(100vh + 1px)';
    }
    
    // Ensure overflow is not hidden
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
}

// Call on load and resize
window.addEventListener('load', ensureScrollbar);
window.addEventListener('resize', ensureScrollbar);
