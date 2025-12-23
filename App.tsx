
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import WhatsAppButton from './components/WhatsAppButton';
import AnimatedSection from './components/AnimatedSection';
import { Page } from './types';
import { 
  SEO_DATA, 
  SERVICES_PAGE_CONTENT, 
  COURSES_PAGE_CONTENT, 
  SERVICES_OVERVIEW, 
  CASE_STUDIES, 
  TESTIMONIALS, 
  CALENDLY_SECTION, 
  CALENDLY_URL 
} from './constants';

const CalendlyEmbed = () => {
    useEffect(() => {
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head?.appendChild(script);
    }, []);

    return (
        <div 
            className="calendly-inline-widget w-full h-full min-h-[500px] rounded-[3rem] overflow-hidden border-2 border-orange-500/40 bg-black shadow-[0_0_60px_-15px_rgba(249,115,22,0.6)] transition-shadow duration-500"
            data-url={CALENDLY_URL}
        >
        </div>
    );
};

interface HomePageProps {
  onNavigate: (page: Page) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  activeSection: number;
  setActiveSection: (index: number) => void;
  scrollProgress: number;
  setScrollProgress: (p: number) => void;
  onScrollToSection: (index: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  scrollRef, 
  activeSection, 
  setActiveSection, 
  scrollProgress, 
  setScrollProgress,
  onScrollToSection 
}) => {
  const [currentCaseSlide, setCurrentCaseSlide] = useState(0);
  const nextCase = () => setCurrentCaseSlide((prev) => (prev + 1) % CASE_STUDIES.length);
  const prevCase = () => setCurrentCaseSlide((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
      setScrollProgress(progress);
      const sectionIndex = Math.round(el.scrollLeft / el.clientWidth);
      setActiveSection(sectionIndex);
    }
  }, [scrollRef, setScrollProgress, setActiveSection]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      el.addEventListener('scroll', handleScroll);
      return () => {
        el.removeEventListener('wheel', onWheel);
        el.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrollRef, handleScroll]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div ref={scrollRef} className="flex h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar bg-black">
        <div className="horizontal-section flex items-center justify-center">
          <div className="glow-overlay bg-primary opacity-30"></div>
          <Hero />
        </div>

        <div className="horizontal-section bg-black flex items-center px-12 md:px-20 overflow-hidden relative">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-primary/5 to-black/90 z-[1]"></div>
          <div className="w-full max-w-[1300px] mx-auto relative z-10">
            <header className="mb-12">
              <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 1}>
                <h2 className="text-primary text-[8px] font-black tracking-[0.5em] uppercase mb-3">Capacidades</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.6} triggerOnSectionActive isActive={activeSection === 1}>
                <h3 className="font-poppins text-3xl lg:text-4xl font-bold tracking-tight leading-none text-white drop-shadow-lg">Nuestro Ecosistema</h3>
              </AnimatedSection>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES_OVERVIEW.map((service, index) => (
                <AnimatedSection key={index} delay={1.1 + (index * 0.5)} triggerOnSectionActive isActive={activeSection === 1} className="h-full">
                  <div className="glass p-6 md:p-7 rounded-[2.5rem] border border-primary/10 hover:border-primary/60 transition-all flex flex-col group min-h-[360px]">
                    <div className="overflow-hidden rounded-xl mb-6 aspect-[16/9] relative border border-primary/10 shadow-inner">
                      <img src={service.image} alt={service.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                    </div>
                    <h3 className="font-poppins text-lg font-bold text-primary mb-3 group-hover:text-white transition-colors">{service.title}</h3>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-5 flex-grow line-clamp-4">{service.description}</p>
                    <div className="pt-5 border-t border-primary/10 flex flex-wrap gap-1.5">
                       {service.features.slice(0, 3).map((f, i) => (
                         <span key={i} className="text-[7px] text-gray-500 border border-primary/10 px-2 py-1 rounded-full uppercase tracking-widest font-black">{f}</span>
                       ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        <div className="horizontal-section bg-black flex items-center px-12 md:px-24 overflow-hidden relative">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766445635/3129595-hd_1920_1080_30fps_ntfqag.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-pink-500/10 to-black/90 z-[1]"></div>
          <div className="w-full max-w-5xl mx-auto relative z-10">
            <header className="mb-16">
              <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 2}>
                <h2 className="text-pink-400 text-[9px] font-black tracking-[0.5em] uppercase mb-4">Pruebas de Valor</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.6} triggerOnSectionActive isActive={activeSection === 2}>
                <h3 className="font-poppins text-4xl lg:text-5xl font-bold tracking-tight leading-none text-white drop-shadow-lg">Impacto Real</h3>
              </AnimatedSection>
            </header>
            <AnimatedSection delay={1.1} triggerOnSectionActive isActive={activeSection === 2}>
              <div className="glass p-8 lg:p-14 rounded-[3.5rem] border border-pink-500/20 relative overflow-hidden flex flex-col justify-center min-h-[450px]">
                {CASE_STUDIES.map((study, idx) => (
                  <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-center transition-all duration-700 ${idx === currentCaseSlide ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-8'}`}>
                    <div className="w-full lg:w-1/2 relative group/image">
                      <div className="aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.15)] border border-white/10">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale group-hover/image:grayscale-0 transition-all duration-700">
                          <source src={study.image} type="video/mp4" />
                        </video>
                      </div>
                      <button onClick={prevCase} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 glass rounded-full bg-black/40 text-pink-400 z-20"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg></button>
                      <button onClick={nextCase} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 glass rounded-full bg-black/40 text-pink-400 z-20"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></button>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-8">
                      <h3 className="text-2xl md:text-4xl font-poppins font-bold text-white tracking-tight leading-[1.1]">{study.title}</h3>
                      <p className="text-gray-400 text-base leading-relaxed max-w-md">{study.description}</p>
                      <div className="space-y-4">
                        {study.kpis.map((kpi, kIdx) => (
                          <div key={kIdx} className="flex items-center gap-4">
                            <div className="w-6 h-6 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-400 text-[10px] font-black shadow-[0_0_12px_rgba(236,72,153,0.3)]">✓</div>
                            <span className="text-lg font-bold text-white/90">{kpi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div className="horizontal-section bg-black flex items-center px-12 md:px-24 overflow-hidden relative">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-luminosity">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black z-[1]"></div>
          <div className="w-full max-w-6xl mx-auto relative z-10">
            <header className="mb-24">
              <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 3}>
                <h2 className="text-blue-400 text-[9px] font-black tracking-[0.5em] uppercase mb-4">Experiencias</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.6} triggerOnSectionActive isActive={activeSection === 3}>
                <h3 className="font-poppins text-4xl lg:text-5xl font-bold tracking-tight leading-none text-white">Lo que dicen</h3>
              </AnimatedSection>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <AnimatedSection key={i} delay={1.1 + (i * 0.5)} triggerOnSectionActive isActive={activeSection === 3} className="h-full">
                  <div className="glass h-full p-8 rounded-[2.5rem] border border-blue-500/20 flex flex-col relative group hover:bg-blue-500/[0.08] transition-all hover:scale-[1.02]">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all">
                          <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-base">{t.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t.date || 'Hace poco'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-5">
                      {[1,2,3,4,5].map(s => (<span key={s} className="text-blue-400 text-sm">★</span>))}
                    </div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed flex-grow">
                      "{t.quote.split(t.highlight)[0]}<span className="text-blue-400 font-bold">{t.highlight}</span>{t.quote.split(t.highlight)[1]}"
                    </p>
                    <div className="mt-6 pt-5 border-t border-white/5">
                      <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">{t.title}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        <div id="agenda" className="horizontal-section bg-black flex items-center px-12 md:px-24 overflow-hidden relative">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/60 via-black/80 to-black z-[1]"></div>
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
            <div className="w-full lg:w-2/5 space-y-12 text-left">
              <div>
                  <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 4}>
                    <div className="inline-block bg-orange-500/10 text-orange-400 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-8 border border-orange-500/30">Sesión Directa</div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.6} triggerOnSectionActive isActive={activeSection === 4}>
                    <h2 className="font-poppins text-4xl lg:text-6xl font-medium leading-[1.05] tracking-tight mb-8 text-white">{CALENDLY_SECTION.headline}</h2>
                  </AnimatedSection>
                  <AnimatedSection delay={1.1} triggerOnSectionActive isActive={activeSection === 4}>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-md">{CALENDLY_SECTION.copy}</p>
                  </AnimatedSection>
              </div>
            </div>
            <AnimatedSection delay={1.6} triggerOnSectionActive isActive={activeSection === 4} className="w-full lg:w-3/5 h-[550px]">
              <div className="w-full h-full relative">
                <CalendlyEmbed />
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        <div className="horizontal-section flex items-center justify-center px-12 md:px-24 bg-black">
          <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 5} className="w-full max-w-5xl">
              <Footer onNavigate={onNavigate} onScrollToSection={onScrollToSection} />
          </AnimatedSection>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-[100] md:left-20 md:w-[calc(100%-5rem)]">
        <div className="h-full bg-primary shadow-[0_0_15px_#00DC01] transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 glass rounded-full border border-primary/20 z-[100] scale-90 md:scale-100">
        {Array.from({ length: 6 }).map((_, i) => (
          <button
            key={i}
            onClick={() => onScrollToSection(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === i ? 'bg-primary w-8 shadow-[0_0_10px_#00DC01]' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ServicesPage: React.FC = () => (
    <div className="max-w-6xl mx-auto pb-40">
      <header className="relative w-full z-[100] flex flex-col items-center pt-16">
        <div id="fly-in">
           <div>
              <span>MitZay Agency</span>
              Nuestros Servicios
           </div>
           <div>
              <span>Diseño Web</span>
              Arquitectura Digital
           </div>
           <div>
              <span>Contenido IA</span>
              Marketing Exponencial
           </div>
           <div>
              <span>Automatización</span>
              Eficiencia Total
           </div>
           <div>
              <span>Manejo de Redes</span>
              Comunidad y Ventas
           </div>
        </div>
        
        <div className="w-full max-w-3xl text-center px-6 mt-8 mb-20 relative z-10">
          <AnimatedSection delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed font-bold drop-shadow-md">
              {SERVICES_OVERVIEW[0].description.split(':')[0]} y soluciones de vanguardia para tu negocio.
            </p>
          </AnimatedSection>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-6 relative z-10">
        {SERVICES_PAGE_CONTENT.detailedServices.map((service, index) => (
          <AnimatedSection key={index} delay={0.6 + (index * 0.15)}>
            <div className="glass h-full p-10 md:p-14 rounded-[3.5rem] border border-white/10 hover:border-primary/50 transition-all flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-all"></div>
              <div className="mb-10 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tighter leading-none group-hover:text-white transition-colors">
                  {service.title}
                </h2>
              </div>
              <p className="text-white mb-10 text-lg md:text-xl leading-relaxed font-medium flex-grow relative z-10">{service.objective}</p>
              
              <div className="space-y-6 relative z-10 mb-12">
                <h3 className="font-black text-[11px] uppercase tracking-[0.5em] text-white/60">Entregables Clave:</h3>
                <ul className="space-y-5">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-white/80 text-base md:text-lg leading-snug">
                      <div className="mt-2.5 w-2 h-2 bg-primary rounded-full flex-shrink-0 shadow-[0_0_12px_#00DC01]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto relative z-10 pt-6">
                <button 
                  className="w-full py-5 bg-primary text-black font-black rounded-2xl text-[11px] md:text-xs uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(0,220,1,0.4)] hover:shadow-primary/60 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  SOLICITAR INFORMACIÓN
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
);

const CoursesPage: React.FC = () => (
    <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
        <AnimatedSection delay={0.1}>
          <div className="text-9xl mb-12 opacity-40 grayscale animate-bounce">🎓</div>
        </AnimatedSection>
        <AnimatedSection delay={0.6}>
          <h1 className="text-6xl font-poppins font-bold mb-10 tracking-tighter text-white">Aprende con MitZay</h1>
        </AnimatedSection>
        <AnimatedSection delay={1.1}>
          <p className="text-xl text-gray-400 mb-16 leading-relaxed max-w-xl mx-auto">Nuestra academia gratuita está en construcción. Dominarás la IA y el Marketing Digital.</p>
        </AnimatedSection>
        <AnimatedSection delay={1.6}>
          <div className="glass p-16 rounded-[4rem] border border-primary/10 w-full max-w-2xl shadow-2xl relative overflow-hidden">
              <h4 className="font-black text-[11px] uppercase tracking-[0.4em] mb-10 text-white/40">Early Access List</h4>
              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Tu mejor correo electrónico" className="w-full bg-white/5 border border-primary/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary transition-all font-bold text-base" />
                <button className="bg-primary text-black font-black px-12 py-5 rounded-2xl hover:scale-[1.02] transition-all text-[11px] uppercase tracking-[0.3em] shadow-xl">NOTIFICARME AL LANZAR</button>
              </form>
          </div>
        </AnimatedSection>
    </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    const seo = SEO_DATA[page];
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
    window.scrollTo(0, 0);
  }, []);

  const handleScrollToSection = useCallback((index: number) => {
    const el = horizontalScrollRef.current;
    if (el) {
      el.scrollTo({ left: el.clientWidth * index, behavior: 'smooth' });
    }
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="h-screen w-screen bg-dark text-white font-sans selection:bg-primary selection:text-black overflow-hidden flex">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} onToggleAssistant={() => setIsAssistantOpen(true)} onScrollToSection={handleScrollToSection} />
      
      <main className="flex-1 md:ml-20 relative z-10 h-screen overflow-hidden transition-all duration-300">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} scrollRef={horizontalScrollRef} activeSection={activeSection} setActiveSection={setActiveSection} scrollProgress={scrollProgress} setScrollProgress={setScrollProgress} onScrollToSection={handleScrollToSection} />
        )}
        {currentPage !== 'home' && (
           <div className={`h-screen overflow-y-auto no-scrollbar py-10 px-4 md:px-16 lg:px-32 relative ${currentPage === 'services' ? 'services-gradient-bg' : 'bg-black'}`}>
              {currentPage === 'services' && <ServicesPage />}
              {currentPage === 'courses' && <CoursesPage />}
              <div className="mt-32 max-w-5xl mx-auto pb-20 relative z-10">
                <Footer onNavigate={handleNavigate} onScrollToSection={handleScrollToSection} />
              </div>
           </div>
        )}
      </main>

      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      <WhatsAppButton />

      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-12 right-12 w-16 h-16 bg-primary text-black rounded-full shadow-[0_15px_40px_rgba(0,220,1,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-[90] animate-bounce group"
        >
          <div className="absolute -top-14 right-0 bg-white text-black text-[9px] font-black px-5 py-2.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl tracking-tighter">HABLAR CON IA</div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
