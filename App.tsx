
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnimatedSection from './components/AnimatedSection';
import NeuralNexusSection from './components/NeuralNexusSection';
import WhatsAppButton from './components/WhatsAppButton';
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
    <div className={`mt-12 flex flex-col items-center ${className}`}>
      {!hideOfferLabel && (
        <p className={`text-[10px] font-black mb-4 uppercase tracking-[0.4em] animate-pulse ${variant === 'primary' || variant === 'green' ? 'text-primary' : (variant === 'pink' ? 'text-pink-400' : (variant === 'blue' ? 'text-blue-400' : 'text-orange-400'))}`}>
          OFERTA POR TIEMPO LIMITADO: 14 CUPOS DISPONIBLES
        </p>
      )}
      <Component 
        {...extraProps}
        className={`group relative px-10 py-5 font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 overflow-hidden ${colors[variant === 'green' ? 'primary' : variant]} ${inactive ? 'cursor-default' : 'hover:scale-[1.05]'}`}
      >
        <span className="relative z-10 flex items-center gap-2">
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
        <p className="text-[9px] text-gray-400 mt-4 font-bold uppercase tracking-widest text-center max-w-xs">
          🎁 Regalo de bienvenida: Masterclass de Diseño Web con IA + Cupones descuento para herramientas IA.
        </p>
      )}
    </div>
  );
};

const GoogleCalendarEmbed = () => {
    return (
        <div className="w-full h-full min-h-[500px] rounded-[3rem] overflow-hidden border-2 border-primary/30 bg-black shadow-[0_0_80px_-20px_rgba(0,220,1,0.4)] transition-all duration-500 relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <iframe 
                src={CALENDLY_URL} 
                style={{ 
                  border: 0, 
                  filter: 'invert(92%) hue-rotate(145deg) brightness(1.1) contrast(1.1) saturate(1.2)' 
                }} 
                className="w-full h-full opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                frameBorder="0" 
                scrolling="no"
                title="Agenda MitZay"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-[3rem] inset-shadow-sm"></div>
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
        const isAtEnd = el.scrollLeft >= (el.scrollWidth - el.clientWidth - 10);
        if (isAtEnd && e.deltaY > 0) return;
        if (e.deltaY === 0) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
        if (isAtEnd && e.deltaY < 0) return;
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
  }, [scrollRef, handleScroll, activeSection]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div ref={scrollRef} className="flex h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar bg-black">
        <div className="horizontal-section flex items-center justify-center">
          <div className="glow-overlay bg-primary opacity-30"></div>
          <Hero onScrollToAgenda={() => onScrollToSection(4)} />
        </div>

        <div className="horizontal-section bg-black flex items-center px-12 md:px-20 overflow-hidden relative">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-luminosity">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-primary/5 to-black/90 z-[1]"></div>
          <div className="w-full max-w-[1300px] mx-auto relative z-10 py-10">
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
                    <div className="overflow-hidden rounded-xl mb-6 aspect-[16/9] relative border border-primary/10 shadow-inner bg-black/40">
                      <video loop playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80"
                        onMouseEnter={(e) => { e.currentTarget.muted = false; e.currentTarget.play().catch(err => console.debug("Sound blocked:", err)); }}
                        onMouseLeave={(e) => { e.currentTarget.pause(); }}>
                        <source src={service.image} type="video/mp4" />
                      </video>
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
            <AnimatedSection delay={2.5} triggerOnSectionActive isActive={activeSection === 1}>
              <CommunityCTA variant="primary" />
            </AnimatedSection>
          </div>
        </div>

        <div className="horizontal-section bg-black flex items-center px-12 md:px-24 overflow-hidden relative">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766445635/3129595-hd_1920_1080_30fps_ntfqag.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-pink-500/10 to-black/90 z-[1]"></div>
          <div className="w-full max-w-5xl mx-auto relative z-10 py-10">
            <header className="mb-12">
              <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 2}>
                <h2 className="text-pink-400 text-[9px] font-black tracking-[0.5em] uppercase mb-4">Pruebas de Valor</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.6} triggerOnSectionActive isActive={activeSection === 2}>
                <h3 className="font-poppins text-4xl lg:text-5xl font-bold tracking-tight leading-none text-white drop-shadow-lg">Impacto Real</h3>
              </AnimatedSection>
            </header>
            <AnimatedSection delay={1.1} triggerOnSectionActive isActive={activeSection === 2}>
              <div className="glass p-8 lg:p-14 rounded-[3.5rem] border border-pink-500/20 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
                {CASE_STUDIES.map((study, idx) => (
                  <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-center transition-all duration-700 ${idx === currentCaseSlide ? 'opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-8'}`}>
                    <div className="w-full lg:w-1/2 relative group/image">
                      <div className="aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.15)] border border-white/10">
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale group-hover/image:grayscale-0 transition-all duration-700">
                          <source src={study.image} type="video/mp4" />
                        </video>
                      </div>
                      <button onClick={prevCase} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 glass rounded-full bg-black/40 text-pink-400 z-20"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                      <button onClick={nextCase} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 glass rounded-full bg-black/40 text-pink-400 z-20"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg></button>
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
            <AnimatedSection delay={2.0} triggerOnSectionActive isActive={activeSection === 2}>
              <CommunityCTA variant="pink" className="scale-90" />
            </AnimatedSection>
          </div>
        </div>

        <div className="horizontal-section bg-black flex items-center px-12 md:px-24 overflow-hidden relative">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-luminosity">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black z-[1]"></div>
          <div className="w-full max-w-6xl mx-auto relative z-10 py-10">
            <header className="mb-16">
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
            <AnimatedSection delay={2.5} triggerOnSectionActive isActive={activeSection === 3}>
              <CommunityCTA variant="blue" className="scale-90" />
            </AnimatedSection>
          </div>
        </div>

        <div id="agenda" className="horizontal-section bg-black flex items-center px-12 md:px-24 overflow-hidden relative">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen">
            <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/60 via-black/80 to-black z-[1]"></div>
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-24 items-center relative z-10">
            <div className="w-full lg:w-2/5 space-y-12 text-left">
              <div>
                  <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 4}>
                    <div className="inline-block bg-primary/10 text-primary px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-8 border border-primary/30 shadow-[0_0_15px_rgba(0,220,1,0.2)]">Sincronización Directa</div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.6} triggerOnSectionActive isActive={activeSection === 4}>
                    <h2 className="font-poppins text-4xl lg:text-6xl font-medium leading-[1.05] tracking-tight mb-8 text-white">{CALENDLY_SECTION.headline}</h2>
                  </AnimatedSection>
                  <AnimatedSection delay={1.1} triggerOnSectionActive isActive={activeSection === 4}>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-md">{CALENDLY_SECTION.copy}</p>
                    <CommunityCTA variant="green" hideOfferLabel inactive className="items-start mt-10 scale-95 origin-left" />
                  </AnimatedSection>
              </div>
            </div>
            <AnimatedSection delay={1.6} triggerOnSectionActive isActive={activeSection === 4} className="w-full lg:w-3/5 h-[550px]">
              <div className="w-full h-full relative">
                <GoogleCalendarEmbed />
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        <div className="horizontal-section flex items-center justify-center px-12 md:px-24 bg-black">
          <AnimatedSection delay={0.1} triggerOnSectionActive isActive={activeSection === 5} className="w-full max-w-5xl">
              <Footer onNavigate={onNavigate} onScrollToSection={onScrollToSection} />
          </AnimatedSection>
        </div>

        <NeuralNexusSection />
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-[100] md:left-20 md:w-[calc(100%-5rem)]">
        <div className="h-full bg-primary shadow-[0_0_15px_#00DC01] transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 glass rounded-full border border-primary/20 z-[100] scale-90 md:scale-100">
        {Array.from({ length: 7 }).map((_, i) => (
          <button key={i} onClick={() => onScrollToSection(i)} className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === i ? 'bg-primary w-8 shadow-[0_0_10px_#00DC01]' : 'bg-white/20 hover:bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
};

const ServicesPage: React.FC<{ onNavigate: (page: Page) => void, onScrollToSection: (index: number) => void }> = ({ onNavigate, onScrollToSection }) => (
    <div className="max-w-6xl mx-auto pb-40">
      <header className="relative w-full z-[100] flex flex-col items-center pt-16">
        <div id="fly-in">
           <div><span>MitZay Agency</span>Nuestros Servicios</div>
           <div><span>Diseño Web</span>Arquitectura Digital</div>
           <div><span>Contenido IA</span>Marketing Exponencial</div>
           <div><span>Automatización</span>Eficiencia Total</div>
           <div><span>Manejo de Redes</span>Comunidad y Ventas</div>
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
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => onScrollToSection(4), 100);
                  }}
                  className="w-full py-5 bg-primary text-black font-black rounded-2xl text-[11px] md:text-xs uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(0,220,1,0.4)] hover:shadow-primary/60 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  SOLICITAR INFORMACIÓN
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection delay={1.5} className="mt-20">
        <div className="glass p-12 rounded-[4rem] border border-primary/20 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-4">¿Quieres transformar tu negocio?</h3>
          <p className="text-gray-300 mb-8">Únete a nuestra comunidad exclusiva y obtén acceso a descuentos masivos en herramientas de IA.</p>
          <CommunityCTA variant="primary" />
        </div>
      </AnimatedSection>
    </div>
);

const CoursesPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth, height = window.innerHeight, points: any[] = [], target = { x: width / 2, y: height / 2 }, animateHeader = true;
    const initHeader = () => {
      width = window.innerWidth; height = window.innerHeight; target = { x: width / 2, y: height / 2 }; canvas.width = width; canvas.height = height;
      points = [];
      for (let x = 0; x < width; x = x + width / 20) { for (let y = 0; y < height; y = y + height / 20) { points.push({ x: x + Math.random() * width / 20, originX: x + Math.random() * width / 20, y: y + Math.random() * height / 20, originY: y + Math.random() * height / 20 }); } }
      for (let i = 0; i < points.length; i++) {
        let closest = [], p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          let p2 = points[j];
          if (!(p1 === p2)) {
            let placed = false;
            for (let k = 0; k < 5; k++) { if (!placed && closest[k] === undefined) { closest[k] = p2; placed = true; } }
            for (let k = 0; k < 5; k++) { if (!placed && getDistance(p1, p2) < getDistance(p1, closest[k])) { closest[k] = p2; placed = true; } }
          }
        }
        p1.closest = closest;
      }
      for (let i in points) { points[i].circle = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)'); }
    };
    const mouseMove = (e: MouseEvent) => { target.x = e.pageX || e.clientX; target.y = e.pageY || e.clientY; };
    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in points) {
          const dist = getDistance(target, points[i]);
          if (dist < 4000) { points[i].active = 0.3; points[i].circle.active = 0.6; }
          else if (dist < 20000) { points[i].active = 0.1; points[i].circle.active = 0.3; }
          else if (dist < 40000) { points[i].active = 0.02; points[i].circle.active = 0.1; }
          else { points[i].active = 0; points[i].circle.active = 0; }
          drawLines(points[i]); points[i].circle.draw();
        }
      }
      requestAnimationFrame(animate);
    };
    const drawLines = (p: any) => { if (!p.active) return; for (let i in p.closest) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.closest[i].x, p.closest[i].y); ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')'; ctx.stroke(); } };
    function Circle(pos: any, rad: any, color: any) { this.pos = pos; this.radius = rad; this.color = color; this.draw = function () { if (!this.active) return; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false); ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')'; ctx.fill(); }; }
    const getDistance = (p1: any, p2: any) => Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    initHeader(); window.addEventListener('mousemove', mouseMove); window.addEventListener('resize', initHeader); animate();
    return () => { animateHeader = false; window.removeEventListener('mousemove', mouseMove); window.removeEventListener('resize', initHeader); };
  }, []);

  return (
    <div id="large-header" className="large-header demo-1">
      <canvas ref={canvasRef} id="demo-canvas" className="absolute inset-0 pointer-events-none"></canvas>
      <div className="main-title text-center">
        <AnimatedSection delay={0.4} className="animate-slide-up">
          <h1 className="text-5xl md:text-8xl font-poppins font-bold mb-10 tracking-tighter text-white"><span className="thin">Aprende con</span> MitZay</h1>
        </AnimatedSection>
        <AnimatedSection delay={0.8} className="flex flex-col items-center">
          <p className="text-xl md:text-2xl text-gray-200 mb-16 leading-[1.6] max-w-4xl mx-auto font-medium px-4 text-center">
            Nuestra academia gratuita está en construcción.<br />Dominarás la IA y el Marketing Digital<br />para escalar tu negocio al siguiente nivel.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={1.2} className="w-full flex flex-col items-center">
          <div className="glass p-10 md:p-16 rounded-[4rem] border border-primary/20 w-full max-w-2xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-xl flex flex-col items-center">
              <h4 className="font-black text-[11px] uppercase tracking-[0.4em] mb-10 text-primary/60 text-center">Early Access List</h4>
              <form className="flex flex-col gap-5 w-full" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Tu mejor correo electrónico" className="w-full bg-white/5 border border-primary/20 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary transition-all font-bold text-base text-white placeholder:text-gray-500 text-center" />
                <button className="bg-primary text-black font-black px-12 py-5 rounded-2xl hover:scale-[1.02] transition-all text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-primary/20 w-full">NOTIFICARME AL LANZAR</button>
              </form>
          </div>
          <CommunityCTA variant="primary" className="scale-110" />
        </AnimatedSection>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 1800); return () => clearTimeout(timer); }, []);
  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    const seo = SEO_DATA[page];
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
    window.scrollTo(0, 0);
  }, []);
  const handleScrollToSection = useCallback((index: number) => { const el = horizontalScrollRef.current; if (el) { el.scrollTo({ left: el.clientWidth * index, behavior: 'smooth' }); } }, []);
  if (isLoading) return <LoadingScreen />;
  return (
    <div className="h-screen w-screen bg-dark text-white font-sans selection:bg-primary selection:text-black overflow-hidden flex">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} onToggleAssistant={() => setIsAssistantOpen(true)} onScrollToSection={handleScrollToSection} />
      <main className="flex-1 md:ml-20 relative z-10 h-screen overflow-hidden transition-all duration-300">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} scrollRef={horizontalScrollRef} activeSection={activeSection} setActiveSection={setActiveSection} scrollProgress={scrollProgress} setScrollProgress={setScrollProgress} onScrollToSection={handleScrollToSection} />
        )}
        {currentPage !== 'home' && (
           <div className={`h-screen overflow-y-auto no-scrollbar py-10 px-4 md:px-16 lg:px-32 relative ${currentPage === 'services' ? 'services-gradient-bg' : (currentPage === 'courses' ? '' : 'bg-black')}`}>
              {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} onScrollToSection={handleScrollToSection} />}
              {currentPage === 'courses' && <CoursesPage />}
              <div className={`mt-32 max-w-5xl mx-auto pb-20 relative z-10 ${currentPage === 'courses' ? 'hidden' : ''}`}>
                <Footer onNavigate={handleNavigate} onScrollToSection={handleScrollToSection} />
              </div>
           </div>
        )}
      </main>
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      <WhatsAppButton />
    </div>
  );
};

export default App;
