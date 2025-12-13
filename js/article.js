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
                content: "# Fundamentos de la Postura en Arquería\n\nLa postura correcta es el cimiento sobre el cual se construye cada tiro exitoso. En este artículo exploraremos los elementos esenciales de una postura adecuada.\n\n## 1. Posición de los Pies\n\nLos pies deben estar separados al ancho de los hombros, con el peso distribuido uniformemente. La línea de tiro debe pasar entre ambos pies.\n\n## 2. Alineación del Cuerpo\n\nEl cuerpo debe formar una línea perpendicular al objetivo. Los hombros deben estar relajados y alineados con la cadera.\n\n## 3. Estabilidad\n\nMantén una ligera flexión en las rodillas para absorber el movimiento y proporcionar estabilidad.\n\nRecuerda practicar estos fundamentos regularmente para desarrollar memoria muscular.",
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
                content: "# Mantenimiento Básico del Arco Recurvo\n\nUn arco bien mantenido no solo dura más tiempo, sino que también ofrece un rendimiento más consistente.\n\n## Limpieza Regular\n\n1. Limpia las palas con un paño suave y seco después de cada uso.\n2. Revisa periódicamente el estado de la cuerda.\n3. Comprueba que las flechas estén rectas y sin daños.\n\n## Almacenamiento\n\nGuarda el arco en un lugar seco y templado, preferiblemente en una funda protectora.\n\n## Inspección Visual\n\nRealiza una inspección mensual buscando:\n- Grietas en las palas\n- Desgaste en la cuerda\n- Tornillos flojos\n\nEl mantenimiento preventivo es clave para la seguridad y el rendimiento.",
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

    // Markdown to HTML converter - IMPROVED VERSION
    markdownToHtml(markdown) {
        if (!markdown) return '';
        
        console.log('Converting markdown to HTML...');
        
        // Step 1: Handle headers
        let html = markdown
            // Convert headers
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>');
        
        // Step 2: Handle lists
        const lines = html.split('\n');
        let inList = false;
        let listType = ''; // 'ul' or 'ol'
        let listItems = [];
        let result = [];
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            // Check for numbered list (1., 2., etc.)
            if (/^\d+\.\s+/.test(trimmed)) {
                if (!inList || listType !== 'ol') {
                    // Close previous list if any
                    if (inList) {
                        result.push(this.closeList(listType, listItems));
                        listItems = [];
                    }
                    inList = true;
                    listType = 'ol';
                }
                // Remove the number and add to list items
                const listItem = trimmed.replace(/^\d+\.\s+/, '');
                listItems.push(`<li>${listItem}</li>`);
            }
            // Check for unordered list (- or *)
            else if (/^[-*•]\s+/.test(trimmed)) {
                if (!inList || listType !== 'ul') {
                    // Close previous list if any
                    if (inList) {
                        result.push(this.closeList(listType, listItems));
                        listItems = [];
                    }
                    inList = true;
                    listType = 'ul';
                }
                // Remove the bullet and add to list items
                const listItem = trimmed.replace(/^[-*•]\s+/, '');
                listItems.push(`<li>${listItem}</li>`);
            }
            // Regular line
            else {
                // Close any open list
                if (inList) {
                    result.push(this.closeList(listType, listItems));
                    inList = false;
                    listType = '';
                    listItems = [];
                }
                
                // Add the line if it's not empty
                if (trimmed) {
                    // Check if it's already a header tag
                    if (trimmed.startsWith('<h')) {
                        result.push(trimmed);
                    } else {
                        // Wrap in paragraph if not empty
                        result.push(`<p>${trimmed}</p>`);
                    }
                }
            }
        });
        
        // Close any remaining list
        if (inList) {
            result.push(this.closeList(listType, listItems));
        }
        
        // Join everything
        html = result.join('\n');
        
        // Step 3: Handle multiple consecutive newlines (paragraph breaks)
        // Replace multiple </p> tags with a single one
        html = html.replace(/<\/p>\s*<p>/g, '</p>\n<p>');
        
        return html;
    }
    
    closeList(type, items) {
        if (type === 'ol') {
            return `<ol>\n${items.join('\n')}\n</ol>`;
        } else {
            return `<ul>\n${items.join('\n')}\n</ul>`;
        }
    }

    showError(message) {
        const container = document.getElementById('article-content');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Error</h2>
                    <p>${message}</p>
                    <a href="index.html" class="btn btn-primary">
                        <i class="fas fa-home"></i>
                        Volver al inicio
                    </a>
                </div>
            `;
        }
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
