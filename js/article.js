// Article Detail Page Handler
class ArticlePage {
    constructor() {
        console.log('ArticlePage initialized');
    }

    async init() {
        console.log('Initializing article page...');
        
        try {
            // Load the article data
            await this.loadArticleData();
            
            // Get article ID from URL
            const articleId = this.getArticleIdFromUrl();
            
            if (!articleId) {
                console.error('No article ID found in URL');
                this.showError('No se encontró el artículo solicitado.');
                return;
            }
            
            // Load and display the article
            await this.loadAndDisplayArticle(articleId);
            
        } catch (error) {
            console.error('Error loading article:', error);
            this.showError('Error al cargar el artículo.');
        }
    }

    async loadArticleData() {
        try {
            const response = await fetch('articles.json');
            if (!response.ok) {
                throw new Error('Failed to load articles.json');
            }
            this.articles = await response.json();
            console.log('Articles data loaded:', this.articles.length, 'articles');
        } catch (error) {
            console.error('Error loading articles data:', error);
            // Use fallback data if JSON fails
            this.articles = this.getFallbackArticles();
        }
    }

    getFallbackArticles() {
        return [
            {
                id: 1,
                title: "Fundamentos de la Postura en Arquería",
                category: "tecnica",
                date: "2024-01-15",
                readTime: 8,
                excerpt: "La postura correcta es la base de un tiro preciso y consistente.",
                content: "<h2>Fundamentos de la Postura en Arquería</h2><p>La postura correcta es el cimiento sobre el cual se construye cada tiro exitoso. En este artículo exploraremos los elementos esenciales de una postura adecuada.</p><h3>1. Posición de los Pies</h3><p>Los pies deben estar separados al ancho de los hombros, con el peso distribuido uniformemente. La línea de tiro debe pasar entre ambos pies.</p><h3>2. Alineación del Cuerpo</h3><p>El cuerpo debe formar una línea perpendicular al objetivo. Los hombros deben estar relajados y alineados con la cadera.</p><h3>3. Estabilidad</h3><p>Mantén una ligera flexión en las rodillas para absorber el movimiento y proporcionar estabilidad.</p><p>Recuerda practicar estos fundamentos regularmente para desarrollar memoria muscular.</p>",
                image: "https://images.unsplash.com/photo-1550747534-2a5c93d59d9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                tags: ["postura", "fundamentos", "técnica básica"]
            },
            {
                id: 2,
                title: "Mantenimiento Básico del Arco Recurvo",
                category: "equipamiento",
                date: "2024-01-20",
                readTime: 10,
                excerpt: "Guía completa para mantener tu arco recurvo en óptimas condiciones y prolongar su vida útil.",
                content: "<h2>Mantenimiento Básico del Arco Recurvo</h2><p>Un arco bien mantenido no solo dura más tiempo, sino que también ofrece un rendimiento más consistente.</p><h3>Limpieza Regular</h3><p>1. Limpia las palas con un paño suave y seco después de cada uso.</p><p>2. Revisa periódicamente el estado de la cuerda.</p><p>3. Comprueba que las flechas estén rectas y sin daños.</p><h3>Almacenamiento</h3><p>Guarda el arco en un lugar seco y templado, preferiblemente en una funda protectora.</p><h3>Inspección Visual</h3><p>Realiza una inspección mensual buscando:</p><ul><li>Grietas en las palas</li><li>Desgaste en la cuerda</li><li>Tornillos flojos</li></ul><p>El mantenimiento preventivo es clave para la seguridad y el rendimiento.</p>",
                image: "https://images.unsplash.com/photo-1586972750140-4d680ae17e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                tags: ["mantenimiento", "recurvo", "equipamiento"]
            }
        ];
    }

    getArticleIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
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

    async loadAndDisplayArticle(articleId) {
        console.log('Loading article with ID:', articleId);
        
        // Find the article
        const article = this.articles.find(a => a.id == articleId);
        
        if (!article) {
            console.error('Article not found with ID:', articleId);
            this.showError('Artículo no encontrado.');
            return;
        }
        
        console.log('Article found:', article.title);
        this.displayArticle(article);
    }

    displayArticle(article) {
    const container = document.getElementById('article-content');
    if (!container) {
        console.error('Article content container not found!');
        return;
    }
    
    // Convert markdown content to HTML
    const formattedContent = this.markdownToHtml(article.content);
    
    // Create the article HTML
    container.innerHTML = `
        <div class="article-header">
            <nav class="breadcrumb">
                <a href="index.html">Inicio</a> / 
                <a href="index.html?category=${article.category}" class="category-link">${this.getCategoryName(article.category)}</a> / 
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
            <img src="${article.image}" alt="${article.title}" loading="lazy">
        </div>
        
        <div class="article-body">
            ${formattedContent}
        </div>
        
        ${article.tags && article.tags.length > 0 ? `
        <div class="article-tags">
            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        ` : ''}
        
        <div class="article-navigation">
            <a href="index.html" class="btn btn-outline">
                <i class="fas fa-arrow-left"></i>
                Volver al inicio
            </a>
            <a href="index.html?category=${article.category}" class="btn btn-primary">
                <i class="fas fa-th-large"></i>
                Más de ${this.getCategoryName(article.category)}
            </a>
        </div>
    `;
    
    // Update page title
    document.title = `${article.title} - SmartArc`;
    
    console.log('Article displayed successfully');
}

// Markdown to HTML converter
markdownToHtml(markdown) {
    if (!markdown) return '';
    
    console.log('Converting markdown to HTML...');
    
    // Split into lines
    const lines = markdown.split('\n');
    let html = '';
    let inList = false;
    let inOrderedList = false;
    let listItems = [];
    
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        // Empty line - reset list state
        if (trimmedLine === '') {
            if (inList) {
                if (inOrderedList) {
                    html += '<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>';
                } else {
                    html += '<ul>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ul>';
                }
                inList = false;
                inOrderedList = false;
                listItems = [];
            }
            return;
        }
        
        // Check for headers
        if (trimmedLine.startsWith('# ')) {
            if (inList) {
                if (inOrderedList) {
                    html += '<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>';
                } else {
                    html += '<ul>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ul>';
                }
                inList = false;
                inOrderedList = false;
                listItems = [];
            }
            const text = trimmedLine.substring(2);
            html += `<h1>${text}</h1>`;
        }
        else if (trimmedLine.startsWith('## ')) {
            if (inList) {
                if (inOrderedList) {
                    html += '<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>';
                } else {
                    html += '<ul>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ul>';
                }
                inList = false;
                inOrderedList = false;
                listItems = [];
            }
            const text = trimmedLine.substring(3);
            html += `<h2>${text}</h2>`;
        }
        else if (trimmedLine.startsWith('### ')) {
            if (inList) {
                if (inOrderedList) {
                    html += '<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>';
                } else {
                    html += '<ul>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ul>';
                }
                inList = false;
                inOrderedList = false;
                listItems = [];
            }
            const text = trimmedLine.substring(4);
            html += `<h3>${text}</h3>`;
        }
        // Check for numbered list items (1., 2., 3., etc.)
        else if (/^\d+\.\s/.test(trimmedLine)) {
            if (!inList || !inOrderedList) {
                if (inList) {
                    html += '<ul>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ul>';
                }
                inList = true;
                inOrderedList = true;
                listItems = [];
            }
            const text = trimmedLine.replace(/^\d+\.\s/, '');
            listItems.push(text);
        }
        // Check for unordered list items (- or * or •)
        else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || trimmedLine.startsWith('• ')) {
            if (!inList || inOrderedList) {
                if (inList) {
                    html += '<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>';
                }
                inList = true;
                inOrderedList = false;
                listItems = [];
            }
            const text = trimmedLine.substring(2);
            listItems.push(text);
        }
        // Regular paragraph text
        else {
            if (inList) {
                if (inOrderedList) {
                    html += '<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>';
                } else {
                    html += '<ul>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ul>';
                }
                inList = false;
                inOrderedList = false;
                listItems = [];
            }
            
            // Check if it's the first line after a header
            const prevLine = lines[index - 1] ? lines[index - 1].trim() : '';
            const isAfterHeader = prevLine.startsWith('#') || prevLine.startsWith('##') || prevLine.startsWith('###');
            
            if (isAfterHeader || html.endsWith('</h1>') || html.endsWith('</h2>') || html.endsWith('</h3>')) {
                html += `<p>${trimmedLine}</p>`;
            } else {
                // Check if we need to close previous paragraph
                if (!html.endsWith('</p>')) {
                    html += `<p>${trimmedLine}</p>`;
                } else {
                    // Add to existing paragraph with space
                    html = html.slice(0, -4) + ' ' + trimmedLine + '</p>';
                }
            }
        }
    });
    
    // Handle any remaining list items
    if (inList) {
        if (inOrderedList) {
            html += '<ol>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ol>';
        } else {
            html += '<ul>' + listItems.map(item => `<li>${item}</li>`).join('') + '</ul>';
        }
    }
    
    return html;
}
}

// Initialize article page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the article page
    if (window.location.pathname.includes('article.html')) {
        console.log('Article page detected, initializing ArticlePage...');
        const articlePage = new ArticlePage();
        articlePage.init();
    }
});
