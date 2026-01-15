class ArticlePage
{
    constructor() {}

    async init()
    {
        try
        {
            await this.loadArticleData();
            
            const articleId = this.getArticleIdFromUrl();
            
            if(!articleId)
            {
                this.showError('No se encontró el artículo solicitado.');
                return;
            }
            
            await this.loadAndDisplayArticle(articleId);
        }
        catch(error)
        {
            this.showError('Error al cargar el artículo.');
        }
    }

    async loadArticleData()
    {
        const response = await fetch('articles.json');
        
        if(!response.ok)
        {
            throw new Error(`Error al cargar articles.json: ${response.status}`);
        }
        
        this.articles = await response.json();
    }

    getArticleIdFromUrl()
    {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    getCategoryName(category)
    {
        const categoryNames = {
            tecnica: 'Técnica',
            equipamiento: 'Equipamiento',
            historia: 'Historia',
            practica: 'Práctica',
            seguridad: 'Seguridad',
            competicion: 'Competición'
        };
        return categoryNames[category] || category;
    }

    async loadAndDisplayArticle(articleId)
    {
        const article = this.articles.find(a => a.id == articleId);
        
        if(!article)
        {
            this.showError('Artículo no encontrado.');
            return;
        }
        
        this.displayArticle(article);
    }

    displayArticle(article)
    {
        const container = document.getElementById('article-content');
        if(!container) return;
        
        const formattedContent = this.markdownToHtml(article.content);
        
        container.innerHTML = `
            <div class="article-header">
                <h1>${article.title}</h1>
            </div>
            <div class="article-body">
                ${formattedContent}
            </div>
        `;
        
        document.title = `${article.title} - SmartArc`;
        
        this.initializeAudioPlayers();
    }

    markdownToHtml(markdown)
{
    if(!markdown) return '';

    let html = markdown.replace(/[–—]/g, '-');

    html = html
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>');

    html = html.replace(/([^\n])\s(-\s+)/g, '$1\n$2');

    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    html = html.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1">'
    );

    html = html.replace(
        /\[audio\]\(([^)]+)\)/g,
        '<div class="audio-player"><audio controls preload="metadata"><source src="$1" type="audio/mpeg"></audio><div class="audio-info"><span class="audio-current-time">0:00</span> / <span class="audio-duration">0:00</span></div></div>'
    );

    const lines = html.split('\n');
    let result = [];
    let inList = false;
    let listItems = [];

    const closeList = () =>
    {
        if(inList)
        {
            result.push(`<ul>${listItems.join('')}</ul>`);
            inList = false;
            listItems = [];
        }
    };

    for(const line of lines)
    {
        const trimmed = line.trim();

        if(!trimmed)
        {
            closeList();
            continue;
        }

        if(trimmed.startsWith('- '))
        {
            inList = true;
            listItems.push(`<li>${trimmed.substring(2)}</li>`);
            continue;
        }

        closeList();

        if(
            trimmed.startsWith('<h') ||
            trimmed.startsWith('<img') ||
            trimmed.startsWith('<div class="audio-player"')
        )
        {
            result.push(trimmed);
        }
        else
        {
            result.push(`<p>${trimmed}</p>`);
        }
    }

    closeList();

    return result.join('\n');
}


    initializeAudioPlayers()
    {
        document.querySelectorAll('.audio-player').forEach(player =>
        {
            const audio = player.querySelector('audio');
            const currentTime = player.querySelector('.audio-current-time');
            const durationEl = player.querySelector('.audio-duration');

            const formatTime = s =>
            {
                if(isNaN(s)) return '0:00';
                const m = Math.floor(s / 60);
                const sec = Math.floor(s % 60).toString().padStart(2, '0');
                return `${m}:${sec}`;
            };

            audio.addEventListener('loadedmetadata', () =>
            {
                durationEl.textContent = formatTime(audio.duration);
            });

            audio.addEventListener('timeupdate', () =>
            {
                currentTime.textContent = formatTime(audio.currentTime);
            });

            audio.load();
        });
    }

    showError(message)
    {
        const container = document.getElementById('article-content');
        if(container)
        {
            container.innerHTML = `<p>${message}</p>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () =>
{
    if(window.location.pathname.includes('article.html'))
    {
        new ArticlePage().init();
    }
});
