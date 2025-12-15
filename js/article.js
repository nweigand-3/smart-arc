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
        console.log('Loading articles from JSON file...');
        const response = await fetch('articles.json');
        
        if (!response.ok) {
            throw new Error(`Failed to load articles.json: ${response.status}`);
        }
        
        this.articles = await response.json();
        console.log('Successfully loaded', this.articles.length, 'articles from JSON');
        
    } catch (error) {
        console.error('Error loading articles data:', error);
        console.log('Using local fallback articles instead...');
        
        // Fallback that matches your JSON structure
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

    // Step 0: Normalize unicode dashes (CRITICAL)
    let html = markdown.replace(/[–—]/g, '-');

    // Step 1: Handle headers
    html = html
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>');

    // Step 1.5: Inline markdown (más robusto)
    html = html
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '\n<img src="$2" alt="$1">\n')
        .replace(
            /\[audio\]\(([^)]+)\)/g,
            '\n<div class="audio-player">\n' +
            '  <audio controls preload="metadata">\n' +
            '    <source src="$1" type="audio/mpeg">\n' +
            '    <source src="$1" type="audio/ogg">\n' +
            '    Tu navegador no soporta el elemento de audio.\n' +
            '  </audio>\n' +
            '  <div class="audio-time">0:00</div>\n' +
            '</div>\n'
        );

    // Step 2: Lists and paragraphs - VERSIÓN CORREGIDA
    const lines = html.split('\n');
    let inList = false;
    let listType = '';
    let listItems = [];
    let result = [];

    // Función interna para cerrar listas
    const closeCurrentList = () => {
        if (inList && listItems.length > 0) {
            const listHtml = listType === 'ol' 
                ? `<ol>${listItems.join('')}</ol>` 
                : `<ul>${listItems.join('')}</ul>`;
            result.push(listHtml);
            inList = false;
            listType = '';
            listItems = [];
        }
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        const trimmed = line.trim();
        
        // Si la línea está vacía, cierra cualquier lista activa
        if (!trimmed) {
            closeCurrentList();
            continue;
        }

        // Manejar listas ordenadas
        if (/^\d+\.\s+/.test(trimmed)) {
            if (!inList || listType !== 'ol') {
                closeCurrentList();
                inList = true;
                listType = 'ol';
            }
            // Extraer contenido después del número
            const content = trimmed.replace(/^\d+\.\s+/, '');
            listItems.push(`<li>${content}</li>`);
            continue;
        }

        // Manejar listas no ordenadas (corregido para manejar múltiples tipos)
        if (/^[-*•]\s+/.test(trimmed)) {
            if (!inList || listType !== 'ul') {
                closeCurrentList();
                inList = true;
                listType = 'ul';
            }
            // Extraer contenido después del marcador
            const content = trimmed.replace(/^[-*•]\s+/, '');
            listItems.push(`<li>${content}</li>`);
            continue;
        }

        // Si no es una lista pero hay una lista activa, ciérrala
        if (inList) {
            closeCurrentList();
        }

        // Manejar elementos que ya son HTML
        if (trimmed.startsWith('<h') || 
            trimmed.startsWith('<img') || 
            trimmed.startsWith('<audio') ||
            trimmed.startsWith('<div class="audio-player"')) {
            result.push(trimmed);
        } else {
            // Solo agregar <p> si no está vacío
            if (trimmed.length > 0) {
                result.push(`<p>${trimmed}</p>`);
            }
        }
    }

    // Cerrar cualquier lista pendiente al final
    closeCurrentList();

    return result.join('\n');
}




closeList(type, items) {
    return type === 'ol'
        ? `<ol>\n${items.join('\n')}\n</ol>`
        : `<ul>\n${items.join('\n')}\n</ul>`;
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
