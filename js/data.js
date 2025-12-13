// Data management for articles
class DataManager {
    constructor() {
        this.articles = [];
        this.categories = {};
    }

    async loadArticles() {
        try {
            const response = await fetch('articles.json');
            this.articles = await response.json();
            this.processCategories();
            return this.articles;
        } catch (error) {
            console.error('Error loading articles:', error);
            return [];
        }
    }

    processCategories() {
        // Count articles per category
        this.categories = {};
        this.articles.forEach(article => {
            if (!this.categories[article.category]) {
                this.categories[article.category] = {
                    count: 0,
                    name: this.getCategoryName(article.category)
                };
            }
            this.categories[article.category].count++;
        });
        
        // Update category counts in the UI
        this.updateCategoryCounts();
    }

    getCategoryName(category) {
        const names = {
            'tecnica': 'Técnica',
            'equipamiento': 'Equipamiento',
            'historia': 'Historia',
            'practica': 'Práctica',
            'seguridad': 'Seguridad',
            'competicion': 'Competición'
        };
        return names[category] || category;
    }

    updateCategoryCounts() {
        Object.keys(this.categories).forEach(category => {
            const countElement = document.querySelector(`[data-category="${category}"] .category-count`);
            if (countElement) {
                countElement.textContent = `${this.categories[category].count} artículos`;
            }
        });
    }

    getArticlesByCategory(category) {
        return this.articles.filter(article => article.category === category);
    }

    getArticleById(id) {
        return this.articles.find(article => article.id == id);
    }

    searchArticles(query) {
        const q = query.toLowerCase();
        return this.articles.filter(article => 
            article.title.toLowerCase().includes(q) ||
            article.excerpt.toLowerCase().includes(q) ||
            article.content.toLowerCase().includes(q) ||
            article.tags.some(tag => tag.toLowerCase().includes(q))
        );
    }
}

// Initialize globally
window.dataManager = new DataManager();
