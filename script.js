// Funcionalidades básicas para SmartArc
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const siteNav = document.querySelector('.site-nav');
    
    if (mobileMenuBtn && siteNav) {
        mobileMenuBtn.addEventListener('click', function() {
            siteNav.style.display = siteNav.style.display === 'block' ? 'none' : 'block';
        });
        
        // Ajustar menú en redimensionamiento
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                siteNav.style.display = '';
            }
        });
    }
    
    // Efecto de hover en tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Simular enlaces de navegación (solo para demostración)
    const navLinks = document.querySelectorAll('.site-nav a, .card-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Para enlaces internos, evitar comportamiento predeterminado
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mostrar mensaje de funcionalidad en desarrollo
    const cardLinks = document.querySelectorAll('.card-link');
    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#recursos') {
                e.preventDefault();
                alert('Esta funcionalidad está en desarrollo. En la versión final, este enlace abriría los recursos correspondientes.');
            }
        });
    });
    
    // Añadir año actual al footer
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Log para depuración
    console.log('SmartArc - Biblioteca Digital de Arquería cargada correctamente');
});
