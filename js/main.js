// Cambio de tema
const toggleThemeBtn = document.getElementById('theme-toggle');

toggleThemeBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute(
        'data-theme',
        currentTheme === 'dark' ? 'light' : 'dark'
    );
});

// Helper: calcular tiempo de lectura
function readingTime(text) {
    const wordsPerMinute = 200; // promedio
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}
