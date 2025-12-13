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
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');
    
    if (!searchBtn || !searchBar) {
        console.error('Search elements not found!');
        return;
    }
    
    console.log('Search initialized');
    
    // Toggle search bar
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        searchBar.classList.toggle('active');
        console.log('Search bar toggled:', searchBar.classList.contains('active'));
        
        // Focus input when search bar opens
        if (searchBar.classList.contains('active')) {
            const searchInput = searchBar.querySelector('.search-input');
            if (searchInput) {
                setTimeout(function() {
                    searchInput.focus();
                }, 100);
            }
        }
    });
    
    // Close search button
    if (searchClose) {
        searchClose.addEventListener('click', function(e) {
            e.preventDefault();
            searchBar.classList.remove('active');
            console.log('Search bar closed');
        });
    }
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (searchBar.classList.contains('active') && 
            !searchBar.contains(e.target) && 
            !searchBtn.contains(e.target)) {
            searchBar.classList.remove('active');
            console.log('Search bar closed (clicked outside)');
        }
    });
    
    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            console.log('Search bar closed (escape key)');
        }
    });
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
