// Usando CountAPI para contador de vistas
async function updateCounter(id) {
    try {
        const res = await fetch(`https://api.countapi.xyz/hit/${id}/visitas`);
        const data = await res.json();
        const el = document.getElementById('view-counter');
        if (el) el.textContent = `Vistas: ${data.value}`;
    } catch (err) {
        console.error('No se pudo actualizar el contador', err);
    }
}

// Ejecutar contador
document.addEventListener('DOMContentLoaded', () => {
    updateCounter('mi-pagina-uni');
});
