
import type { Page, NavLink, Service, Testimonial, CaseStudy, DetailedService } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'HOME', page: 'home' },
  { label: 'SERVICIOS', page: 'services' },
  { label: 'CURSOS GRATIS', page: 'courses' },
];

export const HOME_SECTIONS = [
  { label: 'Inicio', index: 0 },
  { label: 'Ecosistema', index: 1 },
  { label: 'Impacto Real', index: 2 },
  { label: 'Experiencias', index: 3 },
  { label: 'Agenda', index: 4 },
];

export const GOOGLE_CALENDAR_URL = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FMexico_City&showPrint=0&showTitle=0&mode=WEEK&src=ZmQ1MzIzMjdkZDcwOGM4YzY5ZDg4NGE3NzY4N2M3N2I4NTZhYjAwMjVlNjNiMjg0NjgzYjljOWYxY2YyODY4N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%2333b679";
// Mantenemos el nombre de la constante antigua por compatibilidad de importación o la renombramos si es necesario
export const CALENDLY_URL = GOOGLE_CALENDAR_URL;

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
  h1: "Convierte tu presencia digital en ingresos recurrentes con IA",
  h1_mobile: "Potencia tu digital con IA.",
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
    description: "Generamos contenido con IA: Captions con Intención, Reels Impactantes y Creativos. Alineamos tono y formato para maximizar Alcance y Conversión.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/contenido_hlolyj.mp4",
    alt: "Contenido con IA MitZay",
    icon: "🤖",
    features: ["Guiones Persuasivos", "Copys Optimizados", "Estrategia Visual"]
  },
  {
    id: "redes-sociales",
    title: "Manejo de redes sociales",
    description: "Estrategia, Calendario y Ejecución: Publicaciones, Interacción y Campañas que Posicionan tu marca y Generan resultados medibles con reportes claros.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/redes_oaivhb.mp4",
    alt: "Manejo de Redes MitZay",
    icon: "📱",
    features: ["Gestión de Comunidad", "Análisis de Datos", "Crecimiento Orgánico"]
  },
  {
    id: "automatizacion-ia",
    title: "Automatización de flujos con IA",
    description: "Automatizamos Onboarding, Respuestas y Seguimiento para que tu equipo enfoque su tiempo en lo que importa: Cerrar Ventas y Fidelizar Clientes.",
    image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766540087/automatizacion_xra2z3.mp4",
    alt: "Automatización IA MitZay",
    icon: "⚙️",
    features: ["Onboarding Automático", "Lead Scoring", "Integraciones Smart"]
  },
];

export const CASE_STUDIES: CaseStudy[] = [
    {
        title: "E-commerce Moderno",
        description: "Automatización de atención al cliente y campañas de retargeting con IA, resultando en un aumento significativo de la tasa de conversión.",
        kpis: ["+45% en Ventas", "+30% Retención de Clientes", "-60% Tiempo de Respuesta"],
        image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766460145/InShot_20251222_212113614_sje2id.mp4",
        alt: "Visualización dinámica de crecimiento para un e-commerce moderno."
    },
    {
        title: "Startup SaaS",
        description: "Rediseño web enfocado en UX y creación de contenido de valor para blog, posicionando a la marca como líder en su nicho.",
        kpis: ["+300% Tráfico Orgánico", "+70% Leads Calificados", "Top 3 en Google"],
        image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766461932/InShot_20251222_215114178_jykvrc.mp4",
        alt: "Interfaz de una aplicación SaaS mostrando un dashboard de análisis dinámico."
    },
    {
        title: "Landing Page",
        description: "Arquitectura de persuasión y diseño de alta conversión para lanzamientos de productos digitales, maximizando el ROI en tiempo récord.",
        kpis: ["+120% Conversión", "Carga en < 1.1s", "+40% en ROAS"],
        image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766457136/InShot_20251222_201739624_mfwbrg.mp4",
        alt: "Visualización dinámica de una landing page de alta conversión."
    },
    {
        title: "Campañas Orgánicas en Redes Sociales",
        description: "Estrategia viral basada en contenido generado por IA y tendencias algorítmicas, logrando un crecimiento explosivo sin pauta publicitaria.",
        kpis: ["+500k Alcance", "+25k Seguidores", "12% Engagement Rate"],
        image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766463452/InShot_20251222_221304574_hvpcco.mp4",
        alt: "Impacto visual dinámico de crecimiento viral en redes sociales."
    },
    {
        title: "Automatizaciones mediante agentes de IA",
        description: "Implementación de agentes autónomos para la gestión de leads y agendamiento automático en tiempo real, integrados con CRMs avanzados.",
        kpis: ["75% Tareas Automatizadas", "Disponibilidad 24/7", "-80% Costes de Soporte"],
        image: "https://res.cloudinary.com/dsiuc68hp/video/upload/v1766465264/InShot_20251222_224623578_x5xopg.mp4",
        alt: "Visualización técnica de flujos de trabajo con agentes de IA autónomos operando en tiempo real."
    },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "El rediseño web y la estrategia de contenido transformaron nuestro alcance. Ahora, los clientes nos encuentran a nosotros.",
    highlight: "transformaron nuestro alcance",
    name: "Ana García",
    title: "Local Guide",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1766466551/pexels-olly-733872_wvbmvg.jpg",
    date: "15/04/2021"
  },
  {
    quote: "La automatización de flujos nos ahorró incontables horas. El equipo de MitZay es profesional, rápido y entiende de verdad las necesidades del negocio.",
    highlight: "nos ahorró incontables horas",
    name: "Carlos Rodriguez",
    title: "Director de Operaciones",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1766466551/pexels-italo-melo-881954-2379004_c7hkph.jpg",
    date: "22/09/2023"
  },
  {
    quote: "Pasamos de tener una presencia digital nula a generar leads de calidad cada semana. Su manejo de redes sociales es impecable.",
    highlight: "generar leads de calidad",
    name: "Laura Fernandez",
    title: "Local Guide",
    image: "https://res.cloudinary.com/dsiuc68hp/image/upload/v1766466635/pexels-olly-3781545_jfhh95.jpg",
    date: "05/12/2024"
  }
];

export const CALENDLY_SECTION = {
    headline: "Agenda una videollamada de 30 minutos",
    copy: "Reserva un espacio directo en mi Google Calendar: resolveremos tus dudas, propondré un plan inicial y te mostraré cómo automatizar procesos para ganar tiempo y ventas."
};

export const FOOTER_CONTENT = {
    microcopy: "Diseño web, contenido con IA y automatizaciones. Hacemos que la tecnología trabaje para tu crecimiento.",
    contact: "¿Preguntas? Escríbenos o reserva una videollamada.",
    legal: `© ${new Date().getFullYear()} MitZay Agency. Todos los derechos reservados.`,
    privacy: "Política de Privacidad",
    cookies: "Aviso de Cookies",
    socials: [
        { name: 'Instagram', url: '#' },
        { name: 'LinkedIn', url: '#' },
        { name: 'YouTube', url: '#' },
        { name: 'TikTok', url: '#' },
        { name: 'Canal WhatsApp', url: 'https://whatsapp.com/channel/0029VbCUmLUATRSpbRIhgj0W' },
        { name: 'Canal Telegram', url: 'https://t.me/+nsaDVpRHU5k4ZGYx' },
        { name: 'Kick', url: 'https://kick.com/zaydel89' },
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
