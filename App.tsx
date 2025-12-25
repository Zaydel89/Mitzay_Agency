
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnimatedSection from './components/AnimatedSection';
import NeuralNexusSection from './components/NeuralNexusSection';
import WhatsAppButton from './components/WhatsAppButton';
import { Page } from './types';
import { 
  SERVICES_PAGE_CONTENT, 
  COURSES_PAGE_CONTENT, 
  SERVICES_OVERVIEW, 
  CASE_STUDIES, 
  TESTIMONIALS, 
  CALENDLY_SECTION, 
  CALENDLY_URL 
} from './constants';

const CommunityCTA: React.FC<{ 
  className?: string, 
  variant?: 'primary' | 'pink' | 'blue' | 'orange' | 'green',
  hideOfferLabel?: boolean,
  inactive?: boolean
}> = ({ className = "", variant = 'primary', hideOfferLabel = false, inactive = false }) => {
  const colors = {
    primary: 'bg-primary text-black shadow-primary/30 hover:shadow-primary/60',
    pink: 'bg-pink-500 text-white shadow-pink-500/30 hover:shadow-pink-500/60',
    blue: 'bg-blue-500 text-white shadow-blue-500/30 hover:shadow-blue-500/60',
    orange: 'bg-orange-500 text-white shadow-orange-500/30 hover:shadow-orange-500/60',
    green: 'bg-primary text-black shadow-primary/30 hover:shadow-primary/60',
  };

  const labels = {
    primary: '¡ACCESO VIP GRATIS AHORA!',
    pink: '¡ÚNETE AL CÍRCULO ÉLITE!',
    blue: '¡DOMINA LA IA HOY!',
    orange: '¡NO TE QUEDES FUERA!',
    green: '¡AGENDA TU SESIÓN GRATIS!',
  };

  const Component = inactive ? 'div' : 'a';
  const extraProps = inactive ? {} : {
    href: "https://chat.whatsapp.com/TU_LINK_DE_COMUNIDAD",
    target: "_blank",
    rel: "noopener noreferrer"
  };

  return (
    <div className={`mt-8 md:mt-12 flex flex-col items-center w-full ${className}`}>
      {!hideOfferLabel && (
        <p className={`text-[9px] md:text-[10px] font-black mb-4 uppercase tracking-[0.4em] animate-pulse text-center ${variant === 'primary' || variant === 'green' ? 'text-primary' : (variant === 'pink' ? 'text-pink-400' : (variant === 'blue' ? 'text-blue-400' : 'text-orange-400'))}`}>
          OFERTA LIMITADA: 14 CUPOS
        </p>
      )}
      <Component 
        {...extraProps}
        className={`group relative px-6 md:px-10 py-4 md:py-5 font-black rounded-2xl text-[10px] md:text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 overflow-hidden text-center w-full max-w-xs md:max-w-none ${colors[variant === 'green' ? 'primary' : variant]} ${inactive ? 'cursor-default' : 'hover:scale-[1.05]'}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {labels[variant]}
          {!inactive && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </span>
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]"></div>
      </Component>
      {!hideOfferLabel && (
        <p className="text-[8px] md:text-[9px] text-gray-400 mt-4 font-bold uppercase tracking-widest text-center max-w-xs px-4">
          🎁 Masterclass de Diseño Web con IA Incluida
        </p>
      )}
    </div>
  );
};

const GoogleCalendarEmbed: React.FC<{ onHover?: (isHovering: boolean) => void }> = ({ onHover }) => {
    return (
        <div 
          onMouseEnter={() => onHover?.(true)}
          onMouseLeave={() => onHover?.(false)}
          className="w-full h-full min-h-[450px] md:min-h-[644px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border-2 border-primary/30 bg-black shadow-[0_0_80px_-20px_rgba(0,220,1,0.4)] transition-all duration-500 relative group"
        >
            <iframe 
                src={CALENDLY_URL} 
                style={{ 
                  border: 0, 
                  filter: 'invert(92%) hue-rotate(145deg) brightness(1.1) contrast(1.1) saturate(1.2)' 
                }} 
                className="w-full h-full opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-500 relative z-10"
                frameBorder="0" 
                scrolling="yes"
                title="Agenda MitZay"
            ></iframe>
            
            <div className="absolute top-4 right-4 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
               <a 
                 href={CALENDLY_URL} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 px-3 py-1.5 bg-primary text-black font-black text-[8px] uppercase tracking-widest rounded-full shadow-xl"
               >
                 Ver Completo
               </a>
            </div>
            <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-[2rem] md:rounded-[3rem] z-30"></div>
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
  const [isHoveringCalendar, setIsHoveringCalendar] = useState(false);
  
  const nextCase = () => setCurrentCaseSlide((prev) => (prev + 1) % CASE_STUDIES.length);
  const prevCase = () => setCurrentCaseSlide((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      const sections = [0, 1, 2, 3, 4, 5, 6];
      for (const i of sections) {
        const sec = document.getElementById(`section-${i}`);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(i);
            break;
          }
        }
      }
    } else if (el) {
      const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
      setScrollProgress(progress);
      const sectionIndex = Math.round(el.scrollLeft / el.clientWidth);
      setActiveSection(sectionIndex);
    }
  }, [scrollRef, setScrollProgress, setActiveSection]);

  useEffect(() => {
    const el = scrollRef.current;
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      if (isHoveringCalendar) return;
      if (!el) return;
      
      const isAtEnd = el.scrollLeft >= (el.scrollWidth - el.clientWidth - 10);
      if (isAtEnd && e.deltaY > 0) return;
      if (e.deltaY === 0) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
      
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    el?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', handleScroll);
      el?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, handleScroll, isHoveringCalendar]);

  return (
    <div className="relative md:h-screen w-full md:overflow-hidden bg-black">
      <div ref={scrollRef} className="flex flex-col md:flex-row md:h-screen md:overflow-x-auto md:overflow-y-hidden md:snap-x md:snap-mandatory no-scrollbar bg-black">
        
        {/* SECCIÓN 0: HERO */}
        <div id="section-0" className="horizontal-section flex items-center justify-center min-h-screen md:min-h-0">
          <div className="glow-overlay bg-primary opacity-30"></div>
          <Hero onScrollToAgenda={() => onScrollToSection(4)} />
        </div>

        {/* SECCIÓN 1: ECOSISTEMA */}
        <div id="section-1" className="horizontal-section bg-black flex items-center px-6 md:px-20 overflow-hidden relative min-h-screen md:min-h-0 py-20 md:py-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-primary/5 to-black/90 z-[1]"></div>
          <div className="w-full max-w-[1300px] mx-auto relative z-10">
            <header className="mb-8 md:mb-12 text-center md:text-left">
              <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 1}>
                <h2 className="text-primary text-[8px] md:text-[9px] font-black tracking-[0.5em] uppercase mb-3">Capacidades</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.3} triggerOnSectionActive isActive={activeSection === 1}>
                <h3 className="font-poppins text-2xl md:text-4xl font-bold text-white">Nuestro Ecosistema</h3>
              </AnimatedSection>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {SERVICES_OVERVIEW.map((service, index) => (
                <AnimatedSection key={index} delay={0.4 + (index * 0.15)} triggerOnSectionActive isActive={activeSection === 1}>
                  <div className="glass p-5 md:p-7 rounded-[1.5rem] md:rounded-[2.5rem] border border-primary/10 hover:border-primary/60 transition-all flex flex-col group min-h-[300px] md:min-h-[360px]">
                    <div className="overflow-hidden rounded-xl mb-4 md:mb-6 aspect-[16/9] relative border border-primary/10 bg-black/40">
                      <video loop playsInline className="w-full h-full object-cover opacity-80">
                        <source src={service.image} type="video/mp4" />
                      </video>
                    </div>
                    <h3 className="font-poppins text-base md:text-lg font-bold text-primary mb-2 md:mb-3">{service.title}</h3>
                    <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed mb-4 flex-grow line-clamp-4">{service.description}</p>
                    <div className="pt-4 border-t border-primary/10 flex flex-wrap gap-1.5">
                       {service.features.slice(0, 3).map((f, i) => (
                         <span key={i} className="text-[6px] md:text-[7px] text-gray-500 border border-primary/10 px-2 py-0.5 md:py-1 rounded-full uppercase tracking-widest font-black">{f}</span>
                       ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={1.0} triggerOnSectionActive isActive={activeSection === 1}>
              <CommunityCTA variant="primary" />
            </AnimatedSection>
          </div>
        </div>

        {/* SECCIÓN 2: IMPACTO REAL */}
        <div id="section-2" className="horizontal-section bg-black flex items-center px-6 md:px-24 overflow-hidden relative min-h-screen md:min-h-0 py-20 md:py-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766445635/3129595-hd_1920_1080_30fps_ntfqag.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-pink-500/10 to-black/90 z-[1]"></div>
          <div className="w-full max-w-5xl mx-auto relative z-10">
            <header className="mb-8 md:mb-12 text-center md:text-left">
              <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 2}>
                <h2 className="text-pink-400 text-[9px] font-black tracking-[0.5em] uppercase mb-4">Pruebas de Valor</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.3} triggerOnSectionActive isActive={activeSection === 2}>
                <h3 className="font-poppins text-3xl md:text-5xl font-bold text-white">Impacto Real</h3>
              </AnimatedSection>
            </header>
            <AnimatedSection delay={0.5} triggerOnSectionActive isActive={activeSection === 2}>
              <div className="glass p-6 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-pink-500/20 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
                {CASE_STUDIES.map((study, idx) => (
                  <div key={idx} className={`flex flex-col lg:flex-row gap-8 md:gap-12 items-center transition-all duration-700 ${idx === currentCaseSlide ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-8'}`}>
                    <div className="w-full lg:w-1/2 relative">
                      <div className="aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all">
                          <source src={study.image} type="video/mp4" />
                        </video>
                      </div>
                      <button onClick={prevCase} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 glass rounded-full text-pink-400 z-20"><svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                      <button onClick={nextCase} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 glass rounded-full text-pink-400 z-20"><svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
                      <h3 className="text-xl md:text-4xl font-poppins font-bold text-white tracking-tight">{study.title}</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{study.description}</p>
                      <div className="space-y-3">
                        {study.kpis.map((kpi, kIdx) => (
                          <div key={kIdx} className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-400 text-[8px] font-black">✓</div>
                            <span className="text-base md:text-lg font-bold text-white/90">{kpi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={1.0} triggerOnSectionActive isActive={activeSection === 2}>
              <CommunityCTA variant="pink" className="scale-90" />
            </AnimatedSection>
          </div>
        </div>

        {/* SECCIÓN 3: EXPERIENCIAS */}
        <div id="section-3" className="horizontal-section bg-black flex items-center px-6 md:px-24 overflow-hidden relative min-h-screen md:min-h-0 py-20 md:py-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-luminosity">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black z-[1]"></div>
          <div className="w-full max-w-6xl mx-auto relative z-10">
            <header className="mb-10 md:mb-16 text-center md:text-left">
              <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 3}>
                <h2 className="text-blue-400 text-[9px] font-black tracking-[0.5em] uppercase mb-4">Experiencias</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.3} triggerOnSectionActive isActive={activeSection === 3}>
                <h3 className="font-poppins text-3xl md:text-5xl font-bold text-white">Lo que dicen</h3>
              </AnimatedSection>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {TESTIMONIALS.map((t, i) => (
                <AnimatedSection key={i} delay={0.4 + (i * 0.15)} triggerOnSectionActive isActive={activeSection === 3}>
                  <div className="glass p-6 md:p-8 rounded-[2rem] border border-blue-500/20 flex flex-col relative group transition-all h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm md:text-base">{t.name}</p>
                        <p className="text-[8px] text-gray-500 uppercase tracking-widest">{t.date || 'Hace poco'}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(s => (<span key={s} className="text-blue-400 text-xs">★</span>))}
                    </div>
                    <p className="text-gray-300 text-xs md:text-base leading-relaxed flex-grow italic">
                      "{t.quote.split(t.highlight)[0]}<span className="text-blue-400 font-bold not-italic">{t.highlight}</span>{t.quote.split(t.highlight)[1]}"
                    </p>
                    <div className="mt-5 pt-4 border-t border-white/5">
                      <span className="text-[8px] text-gray-500 font-black uppercase tracking-[0.2em]">{t.title}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={1.0} triggerOnSectionActive isActive={activeSection === 3}>
              <CommunityCTA variant="blue" className="scale-90" />
            </AnimatedSection>
          </div>
        </div>

        {/* SECCIÓN 4: AGENDA */}
        <div id="section-4" className="horizontal-section bg-black flex items-center px-6 md:px-24 overflow-hidden relative min-h-screen md:min-h-0 py-20 md:py-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-black/80 to-black z-[1]"></div>
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 items-center relative z-10">
            <div className="w-full lg:w-2/5 text-center lg:text-left">
                  <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 4}>
                    <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] mb-4 border border-primary/30">Agendamiento</div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.3} triggerOnSectionActive isActive={activeSection === 4}>
                    <h2 className="font-poppins text-3xl md:text-5xl font-medium leading-tight mb-4 text-white">{CALENDLY_SECTION.headline}</h2>
                  </AnimatedSection>
                  <AnimatedSection delay={0.5} triggerOnSectionActive isActive={activeSection === 4}>
                    <p className="text-gray-300 text-base md:text-lg mb-6 max-w-md mx-auto lg:mx-0">{CALENDLY_SECTION.copy}</p>
                    <CommunityCTA variant="green" hideOfferLabel inactive className="items-center lg:items-start scale-95 md:origin-left" />
                  </AnimatedSection>
            </div>
            <AnimatedSection delay={0.8} triggerOnSectionActive isActive={activeSection === 4} className="w-full lg:w-3/5">
              <div className="w-full h-[450px] md:h-[690px] relative">
                <GoogleCalendarEmbed onHover={setIsHoveringCalendar} />
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        {/* SECCIÓN 5: FOOTER */}
        <div id="section-5" className="horizontal-section flex items-center justify-center px-6 md:px-24 bg-black min-h-screen md:min-h-0 py-20 md:py-0">
          <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 5} className="w-full max-w-5xl">
              <Footer onNavigate={onNavigate} onScrollToSection={onScrollToSection} />
          </AnimatedSection>
        </div>

        {/* SECCIÓN 6: NEXUS (VISIBLE EN TODOS LOS DISPOSITIVOS) */}
        <div id="section-6" className="horizontal-section bg-black flex items-center justify-center min-h-screen md:min-h-0">
           <NeuralNexusSection />
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-[100] md:left-20 md:w-[calc(100%-5rem)]">
        <div className="h-full bg-primary shadow-[0_0_15px_#00DC01] transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* PAGINATION DOTS (OCULTOS EN MÓVIL) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 px-6 py-3 glass rounded-full border border-primary/20 z-[100]">
        {Array.from({ length: 7 }).map((_, i) => (
          <button key={i} onClick={() => onScrollToSection(i)} className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === i ? 'bg-primary w-8 shadow-[0_0_10px_#00DC01]' : 'bg-white/20 hover:bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToSection = (index: number) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const section = document.getElementById(`section-${index}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(index);
      }
    } else {
      const el = scrollRef.current;
      if (el) {
        el.scrollTo({
          left: index * el.clientWidth,
          behavior: 'smooth'
        });
        setActiveSection(index);
      }
    }
  };

  return (
    <div className="bg-dark min-h-screen text-white font-poppins selection:bg-primary selection:text-black overflow-x-hidden">
      {isLoading && <LoadingScreen />}
      
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onScrollToSection={handleScrollToSection}
      />

      <main className="md:pl-20 pb-16 md:pb-0">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={setCurrentPage}
            scrollRef={scrollRef}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            scrollProgress={scrollProgress}
            setScrollProgress={setScrollProgress}
            onScrollToSection={handleScrollToSection}
          />
        )}
        {currentPage === 'services' && (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 md:p-20 text-center bg-black relative">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full"></div>
            <div className="relative z-10 py-12">
              <h1 className="text-4xl md:text-7xl font-bold text-primary mb-6 tracking-tighter">{SERVICES_PAGE_CONTENT.title}</h1>
              <p className="text-base md:text-xl text-gray-400 max-w-3xl mb-10 leading-relaxed">{SERVICES_PAGE_CONTENT.intro}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
                {SERVICES_PAGE_CONTENT.detailedServices.map((service, i) => (
                  <div key={i} className="glass p-6 md:p-8 rounded-[1.5rem] border border-white/10 text-left hover:border-primary/40 transition-all">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-[11px] md:text-sm text-gray-400 mb-5">{service.objective}</p>
                    <div className="flex justify-between items-center text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary">
                      <span>Tiempo: {service.time}</span>
                      <button className="px-3 py-1.5 bg-primary/10 rounded-full">Ver detalles</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrentPage('home')} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-xs">Volver al Ecosistema</button>
            </div>
          </div>
        )}
        {currentPage === 'courses' && (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 md:p-20 text-center bg-black relative">
             <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full"></div>
             <div className="relative z-10 py-12">
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tighter">{COURSES_PAGE_CONTENT.title}</h1>
              <p className="text-base md:text-xl text-gray-400 max-w-2xl mb-10">{COURSES_PAGE_CONTENT.description}</p>
              <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 max-w-xl mx-auto mb-10">
                <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">Notificarme el lanzamiento</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input type="email" placeholder="tu@email.com" className="flex-1 bg-black/40 border border-white/10 px-5 py-3 rounded-xl focus:border-primary outline-none text-sm" />
                  <button className="bg-primary text-black font-black px-6 py-3 rounded-xl uppercase tracking-widest text-[10px]">Unirme</button>
                </div>
              </div>
              <button onClick={() => setCurrentPage('home')} className="px-8 py-3 text-gray-500 hover:text-white transition-all uppercase tracking-widest font-bold text-[10px]">Regresar</button>
             </div>
          </div>
        )}
      </main>

      <WhatsAppButton />
    </div>
  );
};

export default App;
