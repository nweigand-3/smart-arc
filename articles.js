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
            
            <div class="comparison-table">
                <table>
                    <tr>
                        <th>Característica</th>
                        <th>Arco Recurvo</th>
                        <th>Arco Compuesto</th>
                    </tr>
                    <tr>
                        <td>Mecanismo</td>
                        <td>Simple, sin poleas</td>
                        <td>Sistema de poleas (cams)</td>
                    </tr>
                    <tr>
                        <td>Curva de aprendizaje</td>
                        <td>Moderada</td>
                        <td>Alta</td>
                    </tr>
                    <tr>
                        <td>Mantenimiento</td>
                        <td>Bajo</td>
                        <td>Alto</td>
                    </tr>
                    <tr>
                        <td>Precisión potencial</td>
                        <td>Alta</td>
                        <td>Muy alta</td>
                    </tr>
                </table>
            </div>
            
            <h3>Recomendaciones por nivel</h3>
            <ul>
                <li><strong>Principiante:</strong> Arco recurvo de baja libraje (20-30 lbs)</li>
                <li><strong>Intermedio:</strong> Recurvo olímpico o compuesto básico</li>
                <li><strong>Avanzado:</strong> Compuesto ajustable o recurvo de competición</li>
            </ul>
        `,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
            
            <div class="tip">
                <strong>Consejo:</strong> Imagina una línea recta que va desde tu pie trasero hasta la diana pasando por tu cuerpo.
            </div>
            
            <h3>Ejercicios de corrección</h3>
            <ol>
                <li>Ejercicio del espejo: Practicar frente a un espejo grande</li>
                <li>Ejercicio de pared: Mantener la postura contra una pared</li>
                <li>Grabación en video: Analizar tu técnica periódicamente</li>
            </ol>
        `,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Técnica",
        author: "Nils Weigand",
        date: "2025-03-10",
        readTime: 6,
        views: 1890,
        tags: ["técnica", "postura", "fundamentos", "ejercicios"],
        featured: true
    },
    {
        id: 3,
        title: "Historia de la Arquería Mediterránea: De la Caza al Deporte",
        excerpt: "Un viaje a través de los siglos explorando cómo las culturas mediterráneas desarrollaron y perfeccionaron el arte del tiro con arco.",
        content: `
            <h2>Orígenes en el Mediterráneo</h2>
            <p>Las primeras evidencias de arquería en la región mediterránea datan del Paleolítico superior, pero fue en las civilizaciones antiguas donde alcanzó su máximo desarrollo.</p>
            
            <h3>Egipto Antiguo</h3>
            <p>Los egipcios fueron maestros en el uso del arco compuesto, creado con capas de madera, cuerno y tendón. Sus arqueros eran temidos en el campo de batalla.</p>
            
            <h3>Grecia Clásica</h3>
            <p>En la Grecia antigua, la arquería tenía un lugar especial en la mitología (con dioses como Apolo y Artemisa) pero era menos valorada militarmente que la falange hoplita.</p>
            
            <blockquote>
                "El arco es el testigo de la civilización, pues con él el hombre superó la mera supervivencia para alcanzar el arte." — Historiador anónimo
            </blockquote>
            
            <h3>Transición al deporte moderno</h3>
            <p>No fue hasta el siglo XIX que la arquería comenzó su transformación hacia el deporte moderno, con la estandarización de reglas y equipamiento.</p>
        `,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Historia",
        author: "Nils Weigand",
        date: "2025-03-05",
        readTime: 10,
        views: 956,
        tags: ["historia", "mediterráneo", "tradición", "cultura"],
        featured: true
    },
    {
        id: 4,
        title: "Rutina de Entrenamiento Semanal para Principiantes",
        excerpt: "Plan estructurado de 4 semanas para desarrollar fuerza, técnica y consistencia en el tiro con arco.",
        content: `
            <h2>Introducción al entrenamiento estructurado</h2>
            <p>La consistencia es clave en arquería. Esta rutina está diseñada para progresar de forma segura y efectiva.</p>
            
            <h3>Semana 1: Fundamentos</h3>
            <p>Enfocada en aprender la postura correcta y el movimiento básico sin preocuparse por la precisión.</p>
            
            <h3>Semana 2: Técnica</h3>
            <p>Introducción del anclaje, sujeción y liberación. Ejercicios a 5 metros de la diana.</p>
            
            <div class="training-schedule">
                <h4>Ejemplo de sesión:</h4>
                <ul>
                    <li>Calentamiento: 10 min de estiramientos</li>
                    <li>Técnica en seco: 15 repeticiones sin flechas</li>
                    <li>Práctica con flechas: 3 series de 6 flechas</li>
                    <li>Enfriamiento: 5 min de análisis y estiramientos</li>
                </ul>
            </div>
            
            <h3>Equipamiento necesario</h3>
            <p>Para esta rutina solo necesitas un arco de bajo libraje (20-25 lbs), flechas adecuadas y protección básica.</p>
        `,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Práctica",
        author: "Nils Weigand",
        date: "2025-03-01",
        readTime: 7,
        views: 1342,
        tags: ["entrenamiento", "rutina", "principiantes", "ejercicios"],
        featured: true
    },
    {
        id: 5,
        title: "Guía de Seguridad: Normas Esenciales para Practicar con Seguridad",
        excerpt: "Las 10 reglas de oro que todo arquero debe conocer y seguir para prevenir accidentes y lesiones.",
        content: `
            <h2>Seguridad primero, siempre</h2>
            <p>La arquería es un deporte seguro cuando se siguen las normas adecuadas. Estas reglas son no negociables.</p>
            
            <h3>Reglas fundamentales</h3>
            <ol>
                <li>Nunca apuntes a algo que no quieras disparar</li>
                <li>Comprueba tu equipo antes de cada sesión</li>
                <li>Mantén el arco descargado cuando no estés disparando</li>
                <li>Usa siempre el equipo de protección adecuado</li>
                <li>Asegúrate de que el área detrás de la diana sea segura</li>
            </ol>
            
            <div class="warning">
                <strong>¡Importante!</strong> Estas normas aplican tanto en campo de tiro como en prácticas informales.
            </div>
            
            <h3>Equipo de protección esencial</h3>
            <ul>
                <li>Protector de brazo</li>
                <li>Dedil o guante</li>
                <li>Petos (opcional pero recomendado)</li>
                <li>Gafas de seguridad para mantenimiento</li>
            </ul>
        `,
        image: "https://images.unsplash.com/photo-1588347818035-1c3c129c2137?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Seguridad",
        author: "Nils Weigand",
        date: "2025-02-25",
        readTime: 5,
        views: 876,
        tags: ["seguridad", "normas", "prevención", "equipo"],
        featured: false
    },
    {
        id: 6,
        title: "Elección de Flechas: Materiales, Peso y Longitud",
        excerpt: "Cómo seleccionar las flechas perfectas para tu arco, nivel de habilidad y tipo de práctica.",
        content: `
            <h2>La flecha: mitad del sistema</h2>
            <p>Tan importante como el arco es la elección de las flechas adecuadas. Una flecha incorrecta puede arruinar tu técnica y precisión.</p>
            
            <h3>Materiales disponibles</h3>
            <p><strong>Madera:</strong> Tradicional, económica pero menos consistente. Ideal para arcos tradicionales.</p>
            <p><strong>Aluminio:</strong> Durable, consistente y buena relación calidad-precio. Excelente para principiantes.</p>
            <p><strong>Carbono:</strong> Ligero, rápido y muy consistente. La opción preferida para competición.</p>
            
            <h3>Cálculo de la longitud</h3>
            <p>La longitud de la flecha debe ser aproximadamente 2-3 cm mayor que tu envergadura dividida entre 2.5.</p>
            
            <div class="formula">
                Longitud ≈ (Envergadura en cm / 2.5) + 2-3 cm
            </div>
            
            <h3>Tabla comparativa</h3>
            <table>
                <tr>
                    <th>Material</th>
                    <th>Durabilidad</th>
                    <th>Precio</th>
                    <th>Recomendado para</th>
                </tr>
                <tr>
                    <td>Madera</td>
                    <td>Baja</td>
                    <td>$</td>
                    <td>Arquería tradicional</td>
                </tr>
                <tr>
                    <td>Aluminio</td>
                    <td>Media</td>
                    <td>$$</td>
                    <td>Principiantes</td>
                </tr>
                <tr>
                    <td>Carbono</td>
                    <td>Alta</td>
                    <td>$$$</td>
                    <td>Competición</td>
                </tr>
            </table>
        `,
        image: "https://images.unsplash.com/photo-1596221067168-48b2c59c4673?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Equipamiento",
        author: "Nils Weigand",
        date: "2025-02-20",
        readTime: 9,
        views: 1123,
        tags: ["flechas", "materiales", "selección", "equipamiento"],
        featured: true
    }
    // Podemos añadir más artículos aquí (hasta 50 o más)
];

// Exportar para uso global
window.articles = articles;
