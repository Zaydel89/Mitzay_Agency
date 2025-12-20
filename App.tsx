
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
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

// --- Shared Components --- //
const CalendlyEmbed = () => {
    useEffect(() => {
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head?.appendChild(script);
    }, []);

    return (
        <div 
            className="calendly-inline-widget w-full h-full min-h-[500px] rounded-[3rem] overflow-hidden border border-white/10 bg-black shadow-2xl"
            data-url={CALENDLY_URL}
        >
        </div>
    );
};

// --- Page Views --- //

const HomePage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [currentCaseSlide, setCurrentCaseSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const nextCase = () => setCurrentCaseSlide((prev) => (prev + 1) % CASE_STUDIES.length);
  const prevCase = () => setCurrentCaseSlide((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);

  // Handle scroll progress and active section tracking
  const handleScroll = useCallback(() => {
    const el = horizontalScrollRef.current;
    if (el) {
      const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
      setScrollProgress(progress);
      
      const sectionIndex = Math.round(el.scrollLeft / el.clientWidth);
      setActiveSection(sectionIndex);
    }
  }, []);

  const scrollToSection = (index: number) => {
    const el = horizontalScrollRef.current;
    if (el) {
      el.scrollTo({
        left: el.clientWidth * index,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const el = horizontalScrollRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY * 1.5,
          behavior: 'auto'
        });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      el.addEventListener('scroll', handleScroll);
      return () => {
        el.removeEventListener('wheel', onWheel);
        el.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const sectionsCount = 6; // Hero, Ecosistema, Casos, Testimonios, Agenda, Footer

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div 
        ref={horizontalScrollRef} 
        className="flex h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar bg-black"
      >
        
        {/* SECTION 1: HERO */}
        <div className="horizontal-section flex items-center justify-center">
          <div className="glow-overlay bg-primary opacity-30"></div>
          <Hero />
        </div>

        {/* SECTION 2: QUÉ HACEMOS */}
        <div className="horizontal-section bg-gradient-to-br from-black via-[#050505] to-[#0a1a35] flex items-center px-12 md:px-20">
          <div className="glow-overlay bg-blue-500 opacity-20"></div>
          <div className="w-full max-w-[1300px] mx-auto relative z-10">
            <header className="mb-12">
              <h2 className="text-blue-400 text-[8px] font-black tracking-[0.5em] uppercase mb-3 opacity-100">Capacidades</h2>
              <h3 className="font-poppins text-3xl lg:text-4xl font-bold tracking-tight leading-none text-white">Nuestro Ecosistema</h3>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES_OVERVIEW.map((service, index) => (
                <div key={index} className="glass p-6 md:p-7 rounded-[2.5rem] border border-white/5 hover:border-blue-500/40 transition-all flex flex-col group min-h-[360px]">
                  <div className="overflow-hidden rounded-xl mb-6 aspect-[16/9] relative border border-white/5 shadow-inner">
                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={service.image} alt={service.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" />
                  </div>
                  <h3 className="font-poppins text-lg font-bold text-blue-400 mb-3 tracking-tight group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-5 flex-grow line-clamp-4">{service.description}</p>
                  <div className="pt-5 border-t border-white/5 flex flex-wrap gap-1.5">
                     {service.features.slice(0, 3).map((f, i) => (
                       <span key={i} className="text-[7px] text-gray-500 border border-white/10 px-2 py-1 rounded-full uppercase tracking-widest font-black group-hover:border-blue-500/20 transition-colors">{f}</span>
                     ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: CASOS DE ÉXITO */}
        <div className="horizontal-section bg-gradient-to-br from-black via-[#050505] to-[#0a251a] flex items-center px-12 md:px-24">
          <div className="glow-overlay bg-emerald-400 opacity-20"></div>
          <div className="w-full max-w-5xl mx-auto relative z-10">
            <header className="mb-16">
              <h2 className="text-emerald-400 text-[9px] font-black tracking-[0.5em] uppercase mb-4 opacity-100">Pruebas de Valor</h2>
              <h3 className="font-poppins text-4xl lg:text-5xl font-bold tracking-tight leading-none text-white">Impacto Real</h3>
            </header>
            <div className="glass p-8 lg:p-14 rounded-[3.5rem] border border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[450px]">
              {CASE_STUDIES.map((study, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-center transition-all duration-700 ${idx === currentCaseSlide ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-8'}`}>
                  {/* Container de Imagen con Controles */}
                  <div className="w-full lg:w-1/2 relative group/image">
                    <div className="aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)] border border-emerald-500/10">
                      <img src={study.image} alt={study.alt} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Botones de navegación sobre la imagen */}
                    <button 
                      onClick={prevCase} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-4 glass rounded-full bg-black/40 hover:bg-emerald-500/20 text-emerald-400 transition-all active:scale-90 border border-emerald-500/20 z-20 shadow-2xl backdrop-blur-md opacity-80 hover:opacity-100"
                      aria-label="Anterior"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button 
                      onClick={nextCase} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-4 glass rounded-full bg-black/40 hover:bg-emerald-500/20 text-emerald-400 transition-all active:scale-90 border border-emerald-500/20 z-20 shadow-2xl backdrop-blur-md opacity-80 hover:opacity-100"
                      aria-label="Siguiente"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>

                  <div className="w-full lg:w-1/2 space-y-8">
                    <h3 className="text-2xl md:text-4xl font-poppins font-bold text-emerald-400 tracking-tight leading-[1.1]">{study.title}</h3>
                    <p className="text-gray-400 text-base leading-relaxed max-w-md">{study.description}</p>
                    <div className="space-y-4">
                      {study.kpis.map((kpi, kIdx) => (
                        <div key={kIdx} className="flex items-center gap-4">
                          <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 text-[10px] font-black shadow-[0_0_12px_rgba(16,185,129,0.2)]">✓</div>
                          <span className="text-lg font-bold text-white/90">{kpi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: TESTIMONIOS */}
        <div className="horizontal-section bg-gradient-to-br from-black via-[#050505] to-[#200a25] flex items-center px-12 md:px-24">
          <div className="glow-overlay bg-purple-500 opacity-20"></div>
          <div className="w-full max-w-6xl mx-auto relative z-10">
            <header className="mb-24">
              <h2 className="text-purple-400 text-[9px] font-black tracking-[0.5em] uppercase mb-4 opacity-100">Experiencias</h2>
              <h3 className="font-poppins text-4xl lg:text-5xl font-bold tracking-tight leading-none text-white">Lo que dicen</h3>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="glass p-12 rounded-[3.5rem] border border-white/5 flex flex-col relative pt-28 mt-12 group hover:bg-white/[0.02]">
                  <div className="absolute top-0 left-12 -translate-y-1/2 w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-black shadow-2xl z-10 transition-all group-hover:scale-105 group-hover:rotate-0 rotate-2 duration-500">
                    <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-10 right-12 text-8xl text-purple-500/10 font-serif leading-none select-none">“</div>
                  <p className="text-gray-300 italic mb-10 leading-relaxed text-base md:text-lg">
                    "{t.quote.split(t.highlight)[0]}<span className="text-purple-400 not-italic font-black border-b-2 border-purple-400/20 pb-0.5">{t.highlight}</span>{t.quote.split(t.highlight)[1]}"
                  </p>
                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-xl tracking-tight">{t.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-black">{t.title}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {[1,2,3,4,5].map(s => <span key={s} className="text-purple-400 text-xs">★</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 5: AGENDA */}
        <div id="agenda" className="horizontal-section bg-gradient-to-br from-black via-[#050505] to-[#0a2005] flex items-center px-12 md:px-24">
          <div className="glow-overlay bg-primary opacity-25"></div>
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
            <div className="w-full lg:w-2/5 space-y-12">
              <div>
                  <div className="inline-block bg-primary/10 text-primary px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-8 border border-primary/30 shadow-[0_0_20px_rgba(0,220,1,0.15)]">Sesión Directa</div>
                  <h2 className="font-poppins text-4xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-8 text-white">{CALENDLY_SECTION.headline}</h2>
                  <p className="text-gray-400 text-xl leading-relaxed max-w-md">{CALENDLY_SECTION.copy}</p>
              </div>
              <div className="flex items-center gap-6 text-primary">
                 <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,220,1,0.1)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-[11px] text-gray-400 font-black uppercase tracking-[0.4em]">Resultados en 30 minutos</span>
              </div>
            </div>
            <div className="w-full lg:w-3/5 h-[550px] relative">
              <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
              <CalendlyEmbed />
            </div>
          </div>
        </div>
        
        {/* FINAL SECTION: FOOTER */}
        <div className="horizontal-section flex items-center justify-center px-12 md:px-24 bg-black">
          <div className="w-full max-w-5xl">
              <Footer onNavigate={onNavigate} />
          </div>
        </div>

      </div>

      {/* HORIZONTAL PROGRESS INDICATORS */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-[100] md:left-20 md:w-[calc(100%-5rem)]">
        <div 
          className="h-full bg-primary shadow-[0_0_15px_#00DC01] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* FLOATING DOT NAVIGATION */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 glass rounded-full border border-white/10 z-[100] scale-90 md:scale-100">
        {Array.from({ length: sectionsCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === i ? 'bg-primary w-8 shadow-[0_0_10px_#00DC01]' : 'bg-white/20 hover:bg-white/40'}`}
            aria-label={`Ir a sección ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ServicesPage: React.FC = () => (
    <div className="max-w-5xl mx-auto space-y-16">
      <header className="text-center mb-32">
        <h1 className="text-5xl lg:text-8xl font-poppins font-bold mb-10 tracking-tighter leading-none text-white">Nuestros Servicios</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">{SERVICES_PAGE_CONTENT.intro}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {SERVICES_PAGE_CONTENT.detailedServices.map((service, index) => (
          <div key={index} className="glass p-14 rounded-[4rem] border border-white/5 hover:border-primary/20 transition-all flex flex-col">
            <div className="flex justify-between items-start mb-10">
              <h2 className="text-3xl font-bold text-primary tracking-tight">{service.title}</h2>
              <span className="bg-primary/5 border border-primary/20 px-5 py-2 rounded-full text-[9px] font-black uppercase text-primary tracking-widest">{service.time}</span>
            </div>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed flex-grow">{service.objective}</p>
            <div className="space-y-6">
              <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-white/30">Entregables:</h3>
              <ul className="space-y-4">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-400 text-base">
                    <div className="mt-2.5 w-2 h-2 bg-primary/50 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,220,1,0.5)]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
);

const CoursesPage: React.FC = () => (
    <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-9xl mb-12 opacity-40 grayscale animate-bounce">🎓</div>
        <h1 className="text-6xl font-poppins font-bold mb-10 tracking-tighter text-white">Aprende con MitZay</h1>
        <p className="text-xl text-gray-400 mb-16 leading-relaxed max-w-xl mx-auto">Nuestra academia gratuita está en construcción. Dominarás la IA y el Marketing Digital.</p>
        <div className="glass p-16 rounded-[4rem] border border-white/5 w-full max-w-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10"></div>
            <h4 className="font-black text-[11px] uppercase tracking-[0.4em] mb-10 text-white/40">Early Access List</h4>
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Tu mejor correo electrónico" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary transition-all font-bold text-base" />
              <button className="bg-primary text-black font-black px-12 py-5 rounded-2xl hover:scale-[1.02] transition-all text-[11px] uppercase tracking-[0.3em] shadow-xl">NOTIFICARME AL LANZAR</button>
            </form>
        </div>
    </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    // When navigating internally to a page that isn't the horizontal scroll home,
    // we don't need to scroll the snap container.
    
    const seo = SEO_DATA[page];
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="h-screen w-screen bg-dark text-white font-sans selection:bg-primary selection:text-black overflow-hidden flex">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleAssistant={() => setIsAssistantOpen(true)} 
      />
      
      <main className="flex-1 md:ml-20 relative z-10 h-screen overflow-hidden transition-all duration-300">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage !== 'home' && (
           <div className="h-screen overflow-y-auto no-scrollbar py-28 px-16 lg:px-32 bg-black">
              {currentPage === 'services' && <ServicesPage />}
              {currentPage === 'courses' && <CoursesPage />}
           </div>
        )}
      </main>

      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />

      {/* AI Floating Button with higher vibrancy */}
      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-12 right-12 w-16 h-16 bg-primary text-black rounded-full shadow-[0_15px_40px_rgba(0,220,1,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-[90] animate-bounce group"
          aria-label="Hablar con IA"
        >
          <div className="absolute -top-14 right-0 bg-white text-black text-[9px] font-black px-5 py-2.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl tracking-tighter">
             HABLAR CON IA
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
