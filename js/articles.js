// Base de datos de artículos para SmartArc
const articles = [
    {
        id: 1,
        title: "Guía Completa de Equipamiento: Arcos Recurvo vs. Compuesto",
        excerpt: "Comparativa detallada entre los dos tipos principales de arcos modernos, ventajas, desventajas y recomendaciones para cada nivel.",
        content: `
            <h2>Introducción a los tipos de arcos</h2>
            <p>La elección del arco adecuado es fundamental para cualquier arquero. En este artículo compararemos los dos tipos más populares en la arquería moderna: el arco recurvo y el arco compuesto.</p>
            
            <h3>Arco Recurvo</h3>
            <p>El arco recurvo es el utilizado en competiciones olímpicas y es ideal para principiantes. Su diseño simple pero efectivo permite un aprendizaje progresivo de la técnica.</p>
            
            <div style="overflow-x: auto; margin: 30px 0; background: #f8fafc; padding: 20px; border-radius: 10px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background-color: #f1f5f9;">
                        <th style="padding: 12px 15px; border: 1px solid #e2e8f0; text-align: left; font-weight: 600;">Característica</th>
                        <th style="padding: 12px 15px; border: 1px solid #e2e8f0; text-align: left; font-weight: 600;">Arco Recurvo</th>
                        <th style="padding: 12px 15px; border: 1px solid #e2e8f0; text-align: left; font-weight: 600;">Arco Compuesto</th>
                    </tr>
                    <tr>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Mecanismo</td>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Simple, sin poleas</td>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Sistema de poleas (cams)</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Curva de aprendizaje</td>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Moderada</td>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Alta</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Mantenimiento</td>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Bajo</td>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Alto</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Precisión potencial</td>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Alta</td>
                        <td style="padding: 12px 15px; border: 1px solid #e2e8f0;">Muy alta</td>
                    </tr>
                </table>
            </div>
            
            <h3>Recomendaciones por nivel</h3>
            <ul>
                <li><strong>Principiante:</strong> Arco recurvo de baja libraje (20-30 lbs)</li>
                <li><strong>Intermedio:</strong> Recurvo olímpico o compuesto básico</li>
                <li><strong>Avanzado:</strong> Compuesto ajustable o recurvo de competición</li>
            </ul>
            
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #0ea5e9;">
                <h4 style="margin-top: 0; color: #0369a1;">💡 Consejo importante</h4>
                <p style="margin-bottom: 0;">Antes de comprar tu primer arco, visita un club de tiro local para probar diferentes tipos. Muchos clubes ofrecen sesiones de prueba para principiantes.</p>
            </div>
        `,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        category: "Equipamiento",
        author: "Nils Weigand",
        date: "2025-03-15",
        readTime: 8,
        views: 1245,
        tags: ["arcos", "equipamiento", "principiantes", "comparativa"],
        featured: true
    },
    {
        id: 2,
        title: "Técnica de Postura Perfecta: Fundamentos para Precisión",
        excerpt: "Aprende la postura correcta desde los pies hasta la cabeza. Errores comunes y ejercicios para corregirlos.",
        content: `
            <h2>La importancia de la postura en arquería</h2>
            <p>Una postura correcta no solo mejora la precisión, sino que también previene lesiones y permite un tiro más consistente.</p>
            
            <h3>Posición de los pies</h3>
            <p>Los pies deben estar separados a la anchura de los hombros, formando una línea perpendicular a la diana. El peso distribuido equitativamente.</p>
            
            <h3>Alineación del cuerpo</h3>
            <p>Hombros relajados, espalda recta pero natural. El brazo del arco extendido pero sin bloquear el codo completamente.</p>
            
            <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #22c55e;">
                <h4 style="margin-top: 0; color: #15803d;">🎯 Consejo de precisión</h4>
                <p style="margin-bottom: 0;">Imagina una línea recta que va desde tu pie trasero hasta la diana pasando por tu cuerpo. Esta visualización mental ayuda a mantener la alineación.</p>
            </div>
            
            <h3>Ejercicios de corrección</h3>
            <ol>
                <li><strong>Ejercicio del espejo:</strong> Practicar frente a un espejo grande para observar y corregir la postura</li>
                <li><strong>Ejercicio de pared:</strong> Mantener la postura contra una pared para sentir la alineación correcta</li>
                <li><strong>Grabación en video:</strong> Analizar tu técnica periódicamente para identificar áreas de mejora</li>
            </ol>
        `,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        category: "Técnica",
        author: "Nils Weigand",
        date: "2025-03-10",
        readTime: 6,
        views: 1890,
        tags: ["técnica", "postura", "fundamentos", "ejercicios"],
        featured: true
    },
    // ... puedes añadir más artículos aquí
];

// Exportar para uso global
window.articles = articles;

// Disparar evento cuando los artículos estén cargados
console.log(`${articles.length} artículos cargados correctamente`);
console.log('Artículos disponibles:', articles.map(a => ({id: a.id, title: a.title})));

// Disparar un evento personalizado para notificar que los artículos están listos
try {
    document.dispatchEvent(new CustomEvent('articlesLoaded', { 
        detail: { count: articles.length }
    }));
} catch (e) {
    console.log('No se pudo disparar el evento (document puede no estar disponible aún)');
}
