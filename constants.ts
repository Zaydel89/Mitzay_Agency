
import type { Page, NavLink, Service, Testimonial, CaseStudy, DetailedService } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'HOME', page: 'home' },
  { label: 'SERVICIOS', page: 'services' },
  { label: 'CURSOS GRATIS', page: 'courses' },
];

export const CALENDLY_URL = "https://calendly.com/zaydel-mitzay/30min";

export const SEO_DATA: Record<Page, { title: string; description: string }> = {
  home: {
    title: "MitZay Agency | Marketing Digital y Automatización con IA",
    description: "Transforma tu negocio con MitZay Agency. Ofrecemos diseño web, contenido con IA y automatización para escalar tu presencia digital. Agenda una consulta."
  },
  services: {
    title: "Servicios de Marketing y Automatización | MitZay Agency",
    description: "Descubre nuestros servicios: diseño web, manejo de redes, contenido y automatización con IA para PYMES. Impulsa tu crecimiento con soluciones a medida."
  },
  courses: {
    title: "Cursos Gratis de Marketing Digital e IA | MitZay Agency",
    description: "Aprende sobre marketing digital, IA y automatización con nuestros cursos gratuitos. Próximamente disponibles para potenciar tus habilidades."
  },
};

export const HERO_CONTENT = {
  h1: "Transforma tu presencia digital con IA.",
  h1_mobile: "Transforma tu digital con IA.",
  subheadline: "En MitZay Agency combinamos diseño web, contenido con IA y automatización para que tu negocio crezca sin perseguir tareas diarias. Reserva una videollamada y recibe un plan claro y personalizado para convertir visitas en clientes.",
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
    description: "Creamos sitios que convierten: estructuras claras, velocidad óptima y experiencia móvil impecable. Diseños minimalistas en fondo oscuro que resaltan tu propuesta de valor y facilitan la conversión.",
    image: "https://res.cloudinary.com/doekgaljv/image/upload/v1760588109/laptop-6332544_640_iw7wx6.jpg",
    alt: "Interfaz de un sitio web moderno y minimalista en una pantalla de laptop, con un esquema de color oscuro.",
    icon: "💻",
    features: ["Optimización SEO", "Diseño Adaptable", "Velocidad de Carga"]
  },
  {
    id: "contenido-ia",
    title: "Contenido con IA para redes",
    description: "Generamos contenidos con IA: captions con intención, guiones para reels y creativos listos para publicar. Alineamos tono y formato para maximizar alcance y conversión.",
    image: "https://res.cloudinary.com/doekgaljv/image/upload/v1760588108/ai-generated-7840717_640_di10dx.jpg",
    alt: "Visualización de datos y texto generados por inteligencia artificial en un HUD futurista.",
    icon: "🤖",
    features: ["Guiones Persuasivos", "Copys Optimizados", "Estrategia Visual"]
  },
  {
    id: "redes-sociales",
    title: "Manejo de redes sociales",
    description: "Estrategia, calendario y ejecución: publicaciones, interacción y campañas que posicionan tu marca y generan resultados medibles con reportes claros.",
    image: "https://res.cloudinary.com/doekgaljv/image/upload/v1760588109/mobile-phone-1917737_640_k5bt1b.jpg",
    alt: "Un dashboard de analíticas de redes sociales mostrando crecimiento y engagement en un tablet.",
    icon: "📱",
    features: ["Gestión de Comunidad", "Análisis de Datos", "Crecimiento Orgánico"]
  },
  {
    id: "automatizacion-ia",
    title: "Automatización de flujos con IA",
    description: "Automatizamos onboarding, respuestas y seguimiento para que tu equipo enfoque tiempo en lo que importa: cerrar ventas y fidelizar clientes.",
    image: "https://res.cloudinary.com/doekgaljv/image/upload/v1760588109/cyber-brain-7633488_640_jz1txg.jpg",
    alt: "Un diagrama de flujo complejo que ilustra un proceso de negocio automatizado con nodos brillantes.",
    icon: "⚙️",
    features: ["Onboarding Automático", "Lead Scoring", "Integraciones Smart"]
  },
];

export const VIDEOBLOG_PLACEHOLDER = {
    title: "Videoblog: Marketing, IA y Casos de Éxito",
    description: "Próximamente: videoblogs sobre marketing, IA aplicada y casos reales. Explora nuestro contenido educativo.",
    posts: [
        { title: "5 Prompts de IA para tus Redes", excerpt: "Descubre cómo la IA puede potenciar tu contenido...", image: "https://picsum.photos/seed/videoblog1/400/300" },
        { title: "Automatiza tu Onboarding de Clientes", excerpt: "Ahorra horas y mejora la experiencia de tus nuevos clientes.", image: "https://picsum.photos/seed/videoblog2/400/300" },
        { title: "Análisis de un Rediseño Web Exitoso", excerpt: "Estudio de caso: cómo aumentamos la conversión un 300%.", image: "https://picsum.photos/seed/videoblog3/400/300" },
        { title: "El Futuro del Marketing es Ahora", excerpt: "Tendencias de IA que no puedes ignorar este año.", image: "https://picsum.photos/seed/videoblog4/400/300" },
    ]
};

export const CASE_STUDIES: CaseStudy[] = [
    {
        title: "E-commerce de Moda",
        description: "Automatización de atención al cliente y campañas de retargeting con IA, resultando en un aumento significativo de la tasa de conversión.",
        kpis: ["+45% en Ventas", "+30% Retención de Clientes", "-60% Tiempo de Respuesta"],
        image: "https://picsum.photos/seed/case1/800/600",
        alt: "Gráficos de crecimiento de ventas para un e-commerce de moda."
    },
    {
        title: "Startup SaaS",
        description: "Rediseño web enfocado en UX y creación de contenido de valor para blog, posicionando a la marca como líder en su nicho.",
        kpis: ["+300% Tráfico Orgánico", "+70% Leads Calificados", "Top 3 en Google para Keywords Clave"],
        image: "https://picsum.photos/seed/case2/800/600",
        alt: "Interfaz de una aplicación SaaS mostrando un dashboard de análisis."
    },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "El rediseño web y la estrategia de contenido transformaron nuestro alcance. Ahora, los clientes nos encuentran a nosotros.",
    highlight: "transformaron nuestro alcance",
    name: "Ana García",
    title: "CEO, Tech Solutions",
    image: "https://picsum.photos/seed/ana/200/200"
  },
  {
    quote: "La automatización de flujos nos ahorró incontables horas. El equipo de MitZay es profesional, rápido y entiende de verdad las necesidades del negocio.",
    highlight: "nos ahorró incontables horas",
    name: "Carlos Rodriguez",
    title: "Director de Operaciones, Innovate Co.",
    image: "https://picsum.photos/seed/carlos/200/200"
  },
  {
    quote: "Pasamos de tener una presencia digital nula a generar leads de calidad cada semana. Su manejo de redes sociales es impecable.",
    highlight: "generar leads de calidad",
    name: "Laura Fernandez",
    title: "Fundadora, Creative Studio",
    image: "https://picsum.photos/seed/laura/200/200"
  }
];

export const CALENDLY_SECTION = {
    headline: "Agenda una videollamada de 30 minutos",
    copy: "Reserva un espacio directo: resolveremos tus dudas, propondré un plan inicial y te mostraré cómo automatizar procesos para ganar tiempo y ventas. Selecciona tu horario."
};

export const FOOTER_CONTENT = {
    microcopy: "MitZay Agency — Diseño web, contenido con IA y automatizaciones. Hacemos que la tecnología trabaje para tu crecimiento.",
    contact: "¿Preguntas? Escríbenos o reserva una videollamada.",
    legal: `© ${new Date().getFullYear()} MitZay Agency. Todos los derechos reservados.`,
    privacy: "Política de Privacidad",
    cookies: "Aviso de Cookies",
    socials: [
        { name: 'Instagram', url: '#' },
        { name: 'LinkedIn', url: '#' },
        { name: 'YouTube', url: '#' },
        { name: 'Mail', url: 'mailto:contacto@mitzay.agency' },
    ]
};

export const SERVICES_PAGE_CONTENT = {
    title: "Servicios",
    intro: "Soluciones integrales de marketing digital y automatización con IA, diseñadas para emprendedores y PYMES que quieren escalar sin aumentar carga operativa.",
    detailedServices: [
        {
            title: "Diseño y Desarrollo Web",
            objective: "Lanzar un sitio web profesional, rápido y optimizado para móviles que sirva como tu principal herramienta de conversión y captación de clientes.",
            deliverables: [
                "Diseño UI/UX a medida centrado en la conversión.",
                "Desarrollo responsive con optimización de velocidad (LCP < 2.5s).",
                "SEO técnico base implementado (sitemaps, schema, metas)."
            ],
            time: "4-6 semanas"
        },
        {
            title: "Creación de Contenido con IA",
            objective: "Alimentar tus redes sociales y blog con contenido relevante y de alta calidad, generado de forma eficiente para mantener a tu audiencia enganchada.",
            deliverables: [
                "Calendario de contenido mensual (12-15 piezas).",
                "Guiones para Reels/Shorts y copies optimizados con IA.",
                "Diseño de creativos y plantillas para redes sociales."
            ],
            time: "Recurrente mensual"
        },
        {
            title: "Gestión Integral de Redes Sociales",
            objective: "Construir y hacer crecer una comunidad activa alrededor de tu marca, convirtiendo seguidores en clientes a través de una estrategia de contenido y comunicación.",
            deliverables: [
                "Gestión de 2 a 3 perfiles sociales (Instagram, LinkedIn, etc.).",
                "Publicación, interacción y gestión de comunidad.",
                "Reporte mensual de KPIs y análisis de resultados."
            ],
            time: "Recurrente mensual"
        },
        {
            title: "Automatización de Flujos con IA",
            objective: "Liberar a tu equipo de tareas repetitivas, automatizando procesos clave como el onboarding de clientes, la atención por chat o el seguimiento de leads.",
            deliverables: [
                "Análisis de procesos y diagnóstico de oportunidades de automatización.",
                "Implementación de 1 a 2 flujos de trabajo automatizados (ej. Zapier, Make).",
                "Creación de chatbots o sistemas de respuesta automática con IA."
            ],
            time: "2-3 semanas por flujo"
        }
    ] as DetailedService[]
};

export const COURSES_PAGE_CONTENT = {
    title: "Cursos Gratis — Próximamente",
    description: "Estamos preparando una selección de cursos prácticos para ayudarte a dominar el marketing digital y la IA. Suscríbete para ser el primero en saber cuándo estén disponibles."
};