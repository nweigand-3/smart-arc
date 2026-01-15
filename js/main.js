document.addEventListener('DOMContentLoaded', function()
{
    initTheme();
    initSearch();
    initMobileMenu();
    initNavigation();
});

document.addEventListener('DOMContentLoaded', function()
{
    document.querySelectorAll('a[href^="#"]').forEach(anchor =>
    {
        anchor.addEventListener('click', function(e)
        {
            const href = this.getAttribute('href');
            
            if(href === '#') return;
            
            if(href.startsWith('#'))
            {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if(targetElement)
                {
                    const headerHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({top: targetPosition, behavior: 'smooth'});
                    history.pushState(null, null, href);
                }
            }
        });
    });
});

function initTheme()
{
    document.body.classList.add('dark-mode');
    
    const themeToggle = document.querySelector('.theme-toggle');
    if(themeToggle)
    {
        themeToggle.style.display = 'none';
        themeToggle.remove();
    }
    
    localStorage.removeItem('theme');
}

function initSearch()
{
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchForm = document.querySelector('.search-form');
    
    if(!searchBtn || !searchBar) return;
    
    searchBtn.addEventListener('click', (e) =>
    {
        e.stopPropagation();
        searchBar.classList.toggle('active');
        
        if(searchBar.classList.contains('active'))
        {
            searchInput.focus();
        }
        else
        {
            clearSearchResults();
        }
    });
    
    if(searchClose)
    {
        searchClose.addEventListener('click', () =>
        {
            searchBar.classList.remove('active');
            clearSearchResults();
        });
    }
    
    if(searchForm)
    {
        searchForm.addEventListener('submit', (e) =>
        {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if(query)
            {
                performSearch(query);
            }
        });
    }
    
    if(searchInput)
    {
        let searchTimeout;
        searchInput.addEventListener('input', (e) =>
        {
            const query = e.target.value.trim();
            
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() =>
            {
                if(query)
                {
                    performSearch(query);
                }
                else
                {
                    clearSearchResults();
                }
            }, 300);
        });
    }
    
    document.addEventListener('click', (e) =>
    {
        if(!searchBar.contains(e.target) && !searchBtn.contains(e.target))
        {
            searchBar.classList.remove('active');
            clearSearchResults();
        }
    });
    
    document.addEventListener('keydown', (e) =>
    {
        if(e.key === 'Escape' && searchBar.classList.contains('active'))
        {
            searchBar.classList.remove('active');
            clearSearchResults();
        }
    });
    
    function performSearch(query)
    {
        const isIndexPage = window.location.pathname.includes('index.html') ||
                           window.location.pathname === '/' ||
                           window.location.pathname.endsWith('/');
        
        if(isIndexPage && window.articleManager)
        {
            const results = window.articleManager.searchArticles(query);
            displaySearchResults(results, query);
        }
        else
        {
            fetchAndSearch(query);
        }
    }
    
    async function fetchAndSearch(query)
    {
        try
        {
            const response = await fetch('articles.json');
            const articles = await response.json();
            
            const results = articles.filter(article =>
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );
            
            displaySearchResults(results, query);
        }
        catch(error)
        {
            showSearchError();
        }
    }
    
    function displaySearchResults(results, query)
    {
        const resultsList = document.getElementById('search-results-list');
        const searchCount = document.getElementById('search-count');
        const viewAllLink = document.getElementById('view-all-results');
        
        if(!resultsList || !searchCount || !viewAllLink) return;
        
        searchCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''}`;
        
        resultsList.innerHTML = '';
        
        if(results.length === 0)
        {
            resultsList.innerHTML = `
                <div class="no-search-results">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron resultados para "<strong>${query}</strong>"</p>
                </div>
            `;
            viewAllLink.style.display = 'none';
            return;
        }
        
        const displayResults = results.slice(0, 5);
        
        displayResults.forEach(article =>
        {
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
        
        if(results.length > 5)
        {
            viewAllLink.style.display = 'block';
            viewAllLink.href = `index.html?search=${encodeURIComponent(query)}`;
            viewAllLink.textContent = `Ver todos los ${results.length} resultados`;
        }
        else
        {
            viewAllLink.style.display = 'none';
        }
        
        const searchResults = document.getElementById('search-results');
        if(searchResults) searchResults.style.display = 'block';
    }
    
    function getCategoryName(category)
    {
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
    
    function clearSearchResults()
    {
        const resultsList = document.getElementById('search-results-list');
        const searchCount = document.getElementById('search-count');
        
        if(resultsList) resultsList.innerHTML = '';
        if(searchCount) searchCount.textContent = '0 resultados';
        
        if(searchInput) searchInput.value = '';
        
        const searchResults = document.getElementById('search-results');
        if(searchResults) searchResults.style.display = 'none';
    }
    
    function showSearchError()
    {
        const resultsList = document.getElementById('search-results-list');
        if(resultsList)
        {
            resultsList.innerHTML = `
                <div class="no-search-results">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error al cargar los resultados de búsqueda</p>
                </div>
            `;
        }
    }
}

function initMobileMenu()
{
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if(!mobileMenuBtn || !navMenu) return;
    
    mobileMenuBtn.addEventListener('click', function()
    {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(function(link)
    {
        link.addEventListener('click', function()
        {
            if(window.innerWidth <= 768)
            {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
}

function initNavigation()
{
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link)
    {
        link.addEventListener('click', function(e)
        {
            if(link.getAttribute('href').startsWith('#'))
            {
                e.preventDefault();
                
                navLinks.forEach(function(l)
                {
                    l.classList.remove('active');
                });
                
                link.classList.add('active');
                
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if(target)
                {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function ensureScrollbar()
{
    if(document.body.scrollHeight <= window.innerHeight)
    {
        document.body.style.minHeight = 'calc(100vh + 1px)';
    }
    
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
}

window.addEventListener('load', ensureScrollbar);
window.addEventListener('resize', ensureScrollbar);
