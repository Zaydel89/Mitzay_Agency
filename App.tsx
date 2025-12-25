
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
    </div>
  );
};

const GoogleCalendarEmbed: React.FC<{ onHover?: (isHovering: boolean) => void }> = ({ onHover }) => {
    return (
        <div 
          onMouseEnter={() => onHover?.(true)}
          onMouseLeave={() => onHover?.(false)}
          className="w-full h-full min-h-[500px] md:min-h-[644px] rounded-[2rem] md:rounded-[3rem] overflow-hidden border-2 border-primary/30 bg-black shadow-[0_0_80px_-20px_rgba(0,220,1,0.4)] transition-all duration-500 relative group"
        >
            <iframe 
                src={CALENDLY_URL} 
                style={{ 
                  border: 0, 
                  filter: 'invert(92%) hue-rotate(145deg) brightness(1.1) contrast(1.1) saturate(1.2)' 
                }} 
                className="w-full h-full opacity-90 relative z-10"
                frameBorder="0" 
                scrolling="yes"
                title="Agenda MitZay"
            ></iframe>
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
      const winScroll = window.scrollY;
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
    <div className="relative w-full md:h-screen md:overflow-hidden bg-black">
      <div ref={scrollRef} className="flex flex-col md:flex-row md:h-screen md:overflow-x-auto md:overflow-y-hidden md:snap-x md:snap-mandatory no-scrollbar bg-black">
        
        {/* HERO */}
        <section id="section-0" className="horizontal-section flex items-center justify-center">
          <Hero onScrollToAgenda={() => onScrollToSection(4)} />
        </section>

        {/* ECOSISTEMA */}
        <section id="section-1" className="horizontal-section bg-black flex items-center px-6 md:px-20 overflow-hidden relative py-20 md:py-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-20">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="w-full max-w-[1300px] mx-auto relative z-10">
            <header className="mb-12 text-center md:text-left">
              <h3 className="font-poppins text-3xl md:text-4xl font-bold text-white uppercase tracking-tighter">Nuestro Ecosistema</h3>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES_OVERVIEW.map((service, index) => (
                <div key={index} className="glass p-7 rounded-[2.5rem] border border-primary/10 hover:border-primary/60 transition-all flex flex-col group min-h-[360px]">
                  <h3 className="font-poppins text-lg font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{service.description}</p>
                  <div className="pt-4 border-t border-primary/10 flex flex-wrap gap-2">
                     {service.features.map((f, i) => (
                       <span key={i} className="text-[8px] text-gray-500 border border-primary/10 px-2 py-1 rounded-full uppercase tracking-widest font-black">{f}</span>
                     ))}
                  </div>
                </div>
              ))}
            </div>
            <CommunityCTA variant="primary" />
          </div>
        </section>

        {/* IMPACTO REAL */}
        <section id="section-2" className="horizontal-section bg-black flex items-center px-6 md:px-24 overflow-hidden relative py-20 md:py-0">
          <div className="w-full max-w-5xl mx-auto relative z-10">
            <header className="mb-12 text-center md:text-left">
              <h3 className="font-poppins text-3xl md:text-5xl font-bold text-white tracking-tighter">Impacto Real</h3>
            </header>
            <div className="glass p-6 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-pink-500/20 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
              {CASE_STUDIES.map((study, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-center transition-all duration-700 ${idx === currentCaseSlide ? 'opacity-100' : 'hidden'}`}>
                  <div className="w-full lg:w-1/2 relative">
                    <div className="aspect-video rounded-[2rem] overflow-hidden border border-white/10">
                      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src={study.image} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h3 className="text-2xl md:text-4xl font-poppins font-bold text-white">{study.title}</h3>
                    <p className="text-gray-400 text-sm md:text-base">{study.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCIAS */}
        <section id="section-3" className="horizontal-section bg-black flex items-center px-6 md:px-24 overflow-hidden relative py-20 md:py-0">
          <div className="w-full max-w-6xl mx-auto relative z-10">
            <h3 className="font-poppins text-3xl md:text-5xl font-bold text-white mb-16 text-center md:text-left">Testimonios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="glass p-8 rounded-[2rem] border border-blue-500/20 flex flex-col h-full">
                  <p className="text-gray-300 italic mb-6">"{t.quote}"</p>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-[10px] text-primary uppercase tracking-widest">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AGENDA */}
        <section id="section-4" className="horizontal-section bg-black flex items-center px-6 md:px-24 overflow-hidden relative py-20 md:py-0">
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center relative z-10">
            <div className="w-full lg:w-2/5 text-center lg:text-left">
              <h2 className="font-poppins text-3xl md:text-5xl font-medium mb-6 text-white">{CALENDLY_SECTION.headline}</h2>
              <p className="text-gray-300 text-lg mb-8">{CALENDLY_SECTION.copy}</p>
              <CommunityCTA variant="green" hideOfferLabel inactive className="items-center lg:items-start" />
            </div>
            <div className="w-full lg:w-3/5 h-[500px] md:h-[600px]">
              <GoogleCalendarEmbed onHover={setIsHoveringCalendar} />
            </div>
          </div>
        </section>
        
        {/* FOOTER */}
        <section id="section-5" className="horizontal-section flex flex-col items-center justify-center px-6 py-20 md:py-0">
          <Footer onNavigate={onNavigate} onScrollToSection={onScrollToSection} />
        </section>

        {/* NEXUS - Siempre visible al final */}
        <section id="section-6" className="horizontal-section bg-black flex items-center justify-center">
           <NeuralNexusSection />
        </section>
      </div>

      {/* Progress Bar (Desktop) */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-[100] md:left-20 md:w-[calc(100%-5rem)]">
        <div className="h-full bg-primary" style={{ width: `${scrollProgress}%` }}></div>
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
    const timer = setTimeout(() => setIsLoading(false), 2000);
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
        el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
        setActiveSection(index);
      }
    }
  };

  return (
    <div className="bg-dark min-h-screen text-white font-poppins selection:bg-primary selection:text-black">
      {isLoading && <LoadingScreen />}
      
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onScrollToSection={handleScrollToSection}
      />

      <main className="md:pl-20">
        {currentPage === 'home' ? (
          <HomePage 
            onNavigate={setCurrentPage}
            scrollRef={scrollRef}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            scrollProgress={scrollProgress}
            setScrollProgress={setScrollProgress}
            onScrollToSection={handleScrollToSection}
          />
        ) : currentPage === 'services' ? (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black">
             <h1 className="text-5xl font-bold text-primary mb-10">{SERVICES_PAGE_CONTENT.title}</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                {SERVICES_PAGE_CONTENT.detailedServices.map((s, i) => (
                  <div key={i} className="glass p-8 rounded-3xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                    <p className="text-gray-400 text-sm">{s.objective}</p>
                  </div>
                ))}
             </div>
             <button onClick={() => setCurrentPage('home')} className="mt-12 text-primary uppercase font-bold tracking-widest">Volver</button>
          </div>
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black">
             <h1 className="text-5xl font-bold text-white mb-6">Cursos Gratis</h1>
             <p className="text-gray-400">Próximamente disponible.</p>
             <button onClick={() => setCurrentPage('home')} className="mt-12 text-primary uppercase font-bold tracking-widest">Volver</button>
          </div>
        )}
      </main>

      <WhatsAppButton />
    </div>
  );
};

export default App;
