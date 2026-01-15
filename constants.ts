
import { NavLink, Service, PortfolioItem, Testimonial, DetailedService, DetailedPortfolioProject } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'INICIO', page: 'home' },
  { label: 'SERVICIOS', page: 'services' },
  { label: 'CURSOS GRATIS', page: 'courses' },
];

export const HOME_SECTIONS = [
  { label: 'Inicio', index: 0 },
  { label: 'Ecosistema', index: 1 },
  { label: 'Portafolio', index: 2 },
  { label: 'Experiencias', index: 3 },
  { label: 'Agenda', index: 4 },
  { label: 'Nexus', index: 6 },
];

export const CALENDLY_URL = "https://calendar.app.google/cHUQDW3hy5a3BzcQ6";

export const DISCOUNT_CONFIG = {
  percentage: "25%",
  deadline: "31 de Enero, 2025 - 10:00 PM",
  code: "MITZAY25",
  ctaText: "¡25% OFF EN TODO EL ECOSISTEMA!",
  subText: "Regístrate antes del cierre para obtener tu código exclusivo."
};

export const HERO_CONTENT = {
  h1: "Convierte tu presencia digital en ingresos recurrentes con IA",
  subheadline: "Diseño web + IA + automatización que potencia tus ventas. Agenda una videollamada y recibe un plan personalizado para convertir tráfico en clientes reales.",
  cta: "RESUELVE TUS DUDAS",
};

export const CTA_VARIATIONS = [
    "RESUELVE TUS DUDAS",
    "OBTÉN TU PLAN DE ACCIÓN",
    "AGENDA TU CONSULTA GRATIS",
    "EMPIEZA A CRECER HOY",
    "QUIERO AUTOMATIZAR MI NEGOCIO"
];

export const SERVICES_OVERVIEW: Service[] = [
  {
    id: "diseno-web",
    title: "Diseño Web",
    description: "Creamos sitios que Convierten: Estructuras claras, Velocidad óptima y Experiencia móvil impecable.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540086/web_orc84m.mp4",
    alt: "Diseño Web Profesional MitZay",
    icon: "💻",
    features: ["Optimización SEO", "Diseño Adaptable", "Velocidad de Carga"]
  },
  {
    id: "contenido-ia",
    title: "Contenido con IA para redes",
    description: "Generamos contenido con IA: Captions con Intención, Reels Impactantes y Creativos. Alineamos tono y formato para maximizar Alcance.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/contenido_hlolyj.mp4",
    alt: "Contenido con IA MitZay",
    icon: "🤖",
    features: ["Guiones Persuasivos", "Copys Optimizados", "Estrategia Visual"]
  },
  {
    id: "redes-sociales",
    title: "Manejo de redes sociales",
    description: "Estrategia, Calendario y Ejecución: Publicaciones, Interacción y Campañas que Posicionan tu marca.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/redes_oaivhb.mp4",
    alt: "Manejo de Redes MitZay",
    icon: "📱",
    features: ["Gestión de Comunidad", "Análisis de Datos", "Crecimiento Orgánico"]
  },
  {
    id: "automatizacion-ia",
    title: "Automatización de flujos con IA",
    description: "Automatizamos Onboarding, Respuestas y Seguimiento para que tu equipo enfoque su tiempo en cerrar ventas.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/automatizacion_xra2z3.mp4",
    alt: "Automatización IA MitZay",
    icon: "⚙️",
    features: ["Onboarding Automático", "Lead Scoring", "Integraciones Smart"]
  },
];

export const PORTFOLIO_CATALOG: DetailedPortfolioProject[] = [
  {
    title: "Cash App",
    url: "https://cash.app/",
    tagline: "Finanzas Futuristas & Disrupción Z",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500015/cash_app_preview.jpg",
    description: "Redefinición radical de la banca. Implementé un concepto de 'Finanzas Futuristas' que mezcla el retro-futurismo y un minimalismo disruptivo.",
    techFocus: {
      layout: "Estructura de un solo lienzo infinito con diseño por capas. Foco absoluto en la estética sobre la información bancaria tradicional para eliminar barreras mentales.",
      effects: "Parallax multidimensional con elementos 3D surrealistas. Transiciones líquidas que emulan la fluidez de un envío de dinero instantáneo.",
      performance: "Desconexión total de los bancos aburridos. Lenguaje visual abstracto de vanguardia diseñado para la descarga inmediata en la Gen Z."
    }
  },
  {
    title: "ButcherBox",
    url: "https://www.butcherbox.com/",
    tagline: "Transparencia Rústica & High-End Subscription",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500016/butcherbox_preview.jpg",
    description: "Confianza y apetito. Traducción de la honestidad del producto (carne de origen natural) en una experiencia digital limpia, directa y premium.",
    techFocus: {
      layout: "Arquitectura basada en un modelo de suscripción de alta conversión. Diseño modular que responde a objeciones del cliente en cada sección del scroll.",
      effects: "Selector de caja interactivo intuitivo con micro-animaciones táctiles. Prueba social dinámica y sellos de certificación integrados estratégicamente.",
      performance: "Optimización de embudo circular para maximizar retención. Estética 'de la granja a la mesa' con tipografía robusta y confiable."
    }
  },
  {
    title: "Loom",
    url: "https://www.loom.com/",
    tagline: "Comunicación Instantánea & Human-First Tech",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500017/loom_preview.jpg",
    description: "Materialización de la comunicación instantánea y humana. Un diseño ágil y amable que sustituye las reuniones innecesarias por productividad pura.",
    techFocus: {
      layout: "Arquitectura de 'Fricción Cero' segmentada por casos de uso. Navegación minimalista que prioriza la adopción masiva del producto desde el hero section.",
      effects: "Demostraciones en bucle silenciosas que actúan como manual visual. Transiciones de 'capa sobre capa' que emulan la fluidez del video.",
      performance: "Interfaz 'espejo' que educa al usuario antes de la descarga. Adopción instantánea mediante una solución esencial para el bienestar laboral."
    }
  },
  {
    title: "Mauricio Duque",
    url: "https://universidad.online/mauricioduque/",
    tagline: "Conversion Engine & Direct Response Architecture",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500018/mauricio_duque_preview.jpg",
    description: "Máquina de conversión directa. Estructura de respuesta directa diseñada para romper objeciones y guiar al usuario hacia el registro inmediato.",
    techFocus: {
      layout: "Embudo vertical infinito restrictivo. Arquitectura lineal que elimina el ruido creativo para maximizar la eficiencia transaccional.",
      effects: "Video Sales Letter (VSL) de carga prioritaria y contadores de escasez. Pruebas sociales masivas presentadas para construir credibilidad por volumen.",
      performance: "Contraste de alto impacto (Amarillo/Negro) para generar urgencia. Cada píxel está diseñado para maximizar el ROI del tráfico frío."
    }
  },
  {
    title: "Convierte Más",
    url: "https://conviertemas.com/",
    tagline: "Marketing Encyclopedia & Learning Hub",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500019/convierte_mas_preview.jpg",
    description: "Enciclopedia del marketing de alta conversión. Organización de un catálogo masivo en una interfaz profesional, educativa y orientada a resultados.",
    techFocus: {
      layout: "Hub de recursos dinámico segmentado por niveles de experiencia. Arquitectura diseñada para funcionar como un buscador inteligente de soluciones.",
      effects: "Micro-funnels integrados orgánicamente y dashboard de usuario gamificado. Transiciones suaves que fomentan el progreso constante del alumno.",
      performance: "Accesibilidad radical de la información técnica. Optimización multidispositivo absoluta para el consumo rápido en entornos móviles."
    }
  },
  {
    title: "Esther Perel",
    url: "https://www.estherperel.com/",
    tagline: "Psicología Moderna & Exploración Guiada",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500008/esther_perel_preview.jpg",
    description: "Captura de la dualidad entre psicoanálisis profundo y sofisticación moderna. Un santuario de sabiduría diseñado para la introspección digital.",
    techFocus: {
      layout: "Concepto de 'Exploración Guiada' con organización temática por emociones. Estética de estudio privado moderno con azules noche y tonos madera.",
      effects: "Inmersión en audio persistente y micro-animaciones de reflexión en citas. Tarjetas interactivas que simulan el barajado físico de cartas.",
      performance: "Conversión de alta confianza envuelta en valor educativo. Diseño que establece autoridad inmediata ante audiencias globales."
    }
  },
  {
    title: "Brandon Woelfel",
    url: "https://www.brandonwoelfel.com/photography-1",
    tagline: "Atmósfera Inmersiva & Bokeh Digital",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500003/brandon_woelfel_preview.jpg",
    description: "Contenedor invisible diseñado para elevar la fotografía de neón. El diseño no compite con la obra; la hace brillar en un entorno cinemático.",
    techFocus: {
      layout: "Estética de Dark Mode absoluto con Masonry Grid dinámica. Permite que fotos verticales y horizontales coexistan como un feed de alta gama.",
      effects: "Carga progresiva con fade-in emergente cinematográfico. Lightbox minimalista y navegación fantasma para priorizar el espacio visual.",
      performance: "Interfaz silenciosa que desaparece para el usuario. Foco total en la calidez y el brillo característico de la obra de Brandon."
    }
  },
  {
    title: "Sarah Dayan",
    url: "https://sarah.dev/",
    tagline: "Simplicidad Técnica & Élite de Ingeniería",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500004/sarah_dev_preview.jpg",
    description: "Simplicidad técnica para una ingeniera de software de élite. Un diseño que proyecta autoridad silenciosa a través de la precisión tipográfica.",
    techFocus: {
      layout: "Single Page ultra-eficiente inspirada en editores de código (IDE). Jerarquía tipográfica sans-serif que comunica modernidad y rigor.",
      effects: "Micro-interacciones instantáneas que refuerzan la idea de alto rendimiento. Diseño adaptativo de fluidez absoluta en cada resolución.",
      performance: "Velocidad como característica de diseño. Credibilidad inmediata ante ingenieros y directores de producto mediante sobriedad estética."
    }
  },
  {
    title: "Malika Favre",
    url: "https://www.malikafavre.com/",
    tagline: "Minimalismo Estructural & Audacia Visual",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500005/malika_favre_preview.jpg",
    description: "Lienzo invisible para una de las ilustradoras más icónicas. El diseño permite que el espacio negativo y los colores vibrantes respiren.",
    techFocus: {
      layout: "Cuadrícula limpia y expansiva sobre blanco puro. Arquitectura diseñada para que la saturación de las obras sea la protagonista absoluta.",
      effects: "Transiciones de carga con suavidad líquida e inmersión en pantalla completa. Eliminación de bordes para apreciar el detalle geométrico.",
      performance: "Diseño premium sofisticado donde la transparencia es el objetivo. Objetivo de que la web se sienta premium, audaz y glamurosa."
    }
  },
  {
    title: "Brené Brown",
    url: "https://brenebrown.com/",
    tagline: "Hogar Digital & Vulnerabilidad Curada",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500007/brene_brown_preview.jpg",
    description: "Traducción de décadas de investigación en una experiencia digital acogedora. Un archivo vivo de sabiduría que se siente íntimo y profesional.",
    techFocus: {
      layout: "Concepto de 'Hogar Digital' con navegación categórica clara. Organización de podcasts, libros y cursos para evitar el agobio informativo.",
      effects: "Calidez visual con paleta tierra y tipografía humana. Micro-interacciones orgánicas de fade suave para una atmósfera de serenidad.",
      performance: "Jerarquía de CTAs no agresivos que respetan el espacio del usuario. Diseño orientado a la conexión emocional individual."
    }
  },
  {
    title: "Kelly Wearstler",
    url: "https://www.kellywearstler.com/",
    tagline: "Lujo Rebelde & Inmersión Textural",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500009/kelly_wearstler_preview.jpg",
    description: "Extensión digital de un universo maximalista y textural. El sitio es una pieza de diseño de interiores en sí misma: opulenta y audaz.",
    techFocus: {
      layout: "Inmersión textural con composiciones asimétricas. Uso de scroll horizontal para romper la monotonía vertical y experimentar el espacio.",
      effects: "Tipografía serif de alto contraste usada como elemento gráfico. Micro-animaciones de lujo con cambios de color metálicos y video integrado.",
      performance: "Cohesión de marca absoluta. Transición fluida de la inspiración artística a la venta directa en e-commerce de ultra-lujo."
    }
  },
  {
    title: "Gary Vaynerchuk",
    url: "https://garyvaynerchuk.com/",
    tagline: "Content-First & Brutalismo Moderno",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500010/gary_vee_preview.jpg",
    description: "Motor de contenido en tiempo real diseñado para la energía inagotable de GaryVee. Una plataforma que prioriza la relevancia sobre la estética pulida.",
    techFocus: {
      layout: "Arquitectura de 'Flujo Constante' con feeds entrelazados. Estética de Brutalismo Moderno con tipografías extra negritas y bordes marcados.",
      effects: "Velocidad de respuesta absoluta sin animaciones innecesarias. Micro-interacciones de redes sociales y filtrado rápido por temas.",
      performance: "Optimización para carga instantánea. Autenticidad cruda que sirve como centro de mando para su comunidad global."
    }
  },
  {
    title: "Austin Kleon",
    url: "https://austinkleon.com/",
    tagline: "Análogo Digitalizado & Bitácora Creativa",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500011/austin_kleon_preview.jpg",
    description: "Extensión digital de un cuaderno de bocetos. Un espacio honesto que fomenta la curiosidad a través de lo 'análogo digitalizado'.",
    techFocus: {
      layout: "Arquitectura de bitácora continua basada en 'Show Your Work'. Diseño orgánico de flujo dinámico de dibujos y pensamientos.",
      effects: "Estética de cuaderno con paleta minimalista y tipografía con sabor humano. Filtros de exploración para navegar miles de publicaciones.",
      performance: "Simplicidad radical sin distracciones visuales. Integración central de newsletter como canal principal de conexión."
    }
  },
  {
    title: "Lisa Eldridge",
    url: "https://www.lisaeldridge.com/",
    tagline: "Luxury E-commerce & Expertise Editorial",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500012/lisa_eldridge_preview.jpg",
    description: "Entrada a un estudio personal y exclusivo de maquillaje. Equilibrio perfecto entre archivo histórico y plataforma de ventas de lujo.",
    techFocus: {
      layout: "Concepto de 'E-commerce Editorial' con arquitectura limpia y espaciosa. Transición fluida entre portafolio histórico y tienda premium.",
      effects: "Zoom de alta precisión para texturas cosméticas y transiciones sutilmente pausadas. Video tutorial integrado para educación de marca.",
      performance: "Curaduría digital que evita el retail masivo. Experiencia de compra de lujo optimizada para la exclusividad personal."
    }
  },
  {
    title: "Marie Forleo",
    url: "https://www.marieforleo.com/",
    tagline: "Educación Vibrante & Lead Capture Élite",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500013/marie_forleo_preview.jpg",
    description: "Fusión entre carisma televisivo y academia de negocios. Un diseño optimizado para convertir visitantes en estudiantes de por vida.",
    techFocus: {
      layout: "Portal de medios centrado en MarieTV. Secciones de héroe potentes diseñadas para la captura inmediata de leads cualificados.",
      effects: "Vitalidad y optimismo visual con tipografía de impacto personal. Navegación orientada a resultados y CTAs de alta conversión.",
      performance: "Coherencia vibrante organizada para derribar barreras. Inmersión total en video como eje central de la estrategia educativa."
    }
  },
  {
    title: "Ryan Serhant",
    url: "https://ryanserhant.com/",
    tagline: "High Performance Real Estate & Media Power",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1739500014/ryan_serhant_preview.jpg",
    description: "Ecosistema de poder que mezcla lujo, tecnología y cine. Un sitio diseñado para proyectar omnipresencia y autoridad en el mercado global.",
    techFocus: {
      layout: "Arquitectura de 'Omnipresencia' con rejilla expansiva. Estética de lujo moderno y audaz que comunica éxito y velocidad.",
      effects: "Cinemática de propiedades con videos de alta resolución y scroll de alta velocidad. Interfaz de captura de leads altamente efectiva.",
      performance: "Escalabilidad de marca masiva. Navegación fluida entre listados multi-millonarios, educación de ventas y producción de medios."
    }
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: "Stack PRO - Negocio Físico",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768350908/mecanico_avc0wn.mp4",
    alt: "Mecánico Portfolio",
    description: "Ecosistema digital de alto rendimiento diseñado para captar leads locales. Implementamos una interfaz intuitiva con carga ultra-rápida."
  },
  {
    title: "Agencia Marketing Vanguardista",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346767/agencia_mitzay_veuelk.mp4",
    alt: "Agencia MitZay Portfolio",
    description: "Plataforma inmersiva con arquitectura de vanguardia que maximiza el impacto visual."
  },
  {
    title: "Landing Page Agencia IA",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346748/AGENCIA_IA_ptr05f.mp4",
    alt: "Agencia IA Portfolio",
    description: "Interfaz futurista y minimalista centrada en la autoridad de marca."
  },
  {
    title: "Sitio Web Barber Shop",
    video: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1768346743/BARBERIA_eaiw05.mp4",
    alt: "Barbería Portfolio",
    description: "Showcase premium con estética clásica y funcionalidad VIP."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Su proceso de automatización por WhatsApp es impecable. El trato fue muy profesional y ahora cerramos un 40% más de ventas sin esfuerzo manual.",
    highlight: "+40% en ventas cerradas",
    name: "Elena Torres",
    title: "Inmobiliaria Global",
    image: "https://i.pravatar.cc/150?u=elena",
    rating: 5,
  },
  {
    quote: "Diseñaron un sitio que transmite confianza total. Mi autoridad digital creció y pude duplicar mis honorarios en casos corporativos este trimestre.",
    highlight: "Duplicó facturación mensual",
    name: "Lic. Marcos Ruiz",
    title: "Consultor Legal",
    image: "https://i.pravatar.cc/150?u=marcos",
    rating: 5,
  },
  {
    quote: "Resolvieron el caos de reservas con IA. El servicio es fluido, el trato humano excelente y mis ingresos subieron un 25% al optimizar la ocupación.",
    highlight: "Crecimiento del 25% anual",
    name: "Chef Julián",
    title: "Restaurante Raíces",
    image: "https://i.pravatar.cc/150?u=julian",
    rating: 4.5,
  },
  {
    quote: "Su enfoque en conversión es real. Mi nueva landing filtra a los curiosos y me trae clientes listos para pagar mis mentorías de alto ticket.",
    highlight: "Filtro de leads de alta calidad",
    name: "Sofía Valls",
    title: "Business Coach",
    image: "https://i.pravatar.cc/150?u=sofia",
    rating: 5,
  },
];

export const CALENDLY_SECTION = {
    headline: "Sesión Estratégica: IA y Crecimiento Digital",
    copy: "En esta videollamada de 30 minutos, analizaremos los cuellos de botella de tu negocio y trazaremos una hoja de ruta personalizada."
};

export const FOOTER_CONTENT = {
    microcopy: "Diseño web, contenido con IA y automatizaciones. Hacemos que la tecnología trabaje para tu crecimiento.",
    contact: "¿Preguntas? Escríbenos o reserva una videollamada.",
    legal: `© ${new Date().getFullYear()} MitZay Agency. Todos los derechos reservados.`,
    socials: [
        { name: 'Instagram', url: '#' },
        { name: 'LinkedIn', url: '#' },
        { name: 'YouTube', url: '#' },
        { name: 'TikTok', url: '#' },
    ]
};

export const SERVICES_PAGE_CONTENT = {
    title: "Servicios Integrales",
    intro: "Arquitectura digital de vanguardia. Soluciones escalables diseñadas para impactar y convertir mediante el uso avanzado de IA y estrategia humana de alto nivel.",
    detailedServices: [
        {
            title: "Desarrollo Web de Élite",
            objective: "Desplegar infraestructuras digitales de alta velocidad optimizadas para la conversión de tráfico cualificado.",
            deliverables: ["UI/UX High-End", "Optimización Core Web Vitals", "Arquitectura SEO Avanzada"],
        },
        {
            title: "Producción de Contenido con IA",
            objective: "Escalar la creación de activos digitales con un estándar cinematográfico.",
            deliverables: ["Scripts Persuasivos", "Creativos de Alto Impacto", "Estilo Coherente"],
        },
        {
          title: "Agentes Potenciados con IA",
          objective: "Ecosistemas inteligentes que asisten a tus usuarios de forma humana en WhatsApp y Telegram.",
          deliverables: ["Base de Conocimiento", "Respuestas de Voz", "Flujos en Tiempo Real"],
        },
    ] as DetailedService[]
};
