
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { Page, DetailedService } from './types';
import { 
  SEO_DATA, 
  SERVICES_PAGE_CONTENT, 
  COURSES_PAGE_CONTENT, 
  SERVICES_OVERVIEW, 
  VIDEOBLOG_PLACEHOLDER, 
  CASE_STUDIES, 
  TESTIMONIALS, 
  CALENDLY_SECTION, 
  CALENDLY_URL 
} from './constants';
import AnimatedSection from './components/AnimatedSection';

// --- Shared Components --- //
const CTAButton: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
    <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block min-w-[200px] text-center font-poppins font-bold bg-primary text-black py-4 px-8 rounded-full text-base transition-all duration-300 ease-in-out transform shadow-[0_0_15px_rgba(0,220,1,0.2)] hover:scale-105 active:scale-95 ${className}`}
    >
        {text}
    </a>
);

const CalendlyEmbed = () => {
    useEffect(() => {
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head?.appendChild(script);
    }, []);

    return (
        <div 
            className="calendly-inline-widget w-full rounded-3xl overflow-hidden border border-primary/10 bg-surface shadow-2xl"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '650px' }}
        >
        </div>
    );
};

// --- Page Views --- //

const HomePage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [currentCaseSlide, setCurrentCaseSlide] = useState(0);

  const nextCase = () => setCurrentCaseSlide((prev) => (prev + 1) % CASE_STUDIES.length);
  const prevCase = () => setCurrentCaseSlide((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);

  return (
    <>
      <Hero />
      
      {/* 2. Qué Hacemos */}
      <AnimatedSection className="bg-surface/30 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-primary text-xs font-black tracking-[0.4em] uppercase mb-4">Especialidades</h2>
            <h3 className="font-poppins text-3xl md:text-5xl lg:text-6xl font-extrabold">Qué Hacemos</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SERVICES_OVERVIEW.map((service, index) => (
              <div key={index} className="glass p-6 md:p-8 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all flex flex-col group">
                <div className="overflow-hidden rounded-2xl mb-6 aspect-video">
                  <img src={service.image} alt={service.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-poppins text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">{service.description}</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                   {service.features.slice(0, 2).map((f, i) => (
                     <span key={i} className="text-[10px] text-gray-500 border border-white/10 px-2 py-1 rounded-full">{f}</span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Videoblog */}
      <AnimatedSection className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4">{VIDEOBLOG_PLACEHOLDER.title}</h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16 text-sm md:text-base leading-relaxed px-4">
            {VIDEOBLOG_PLACEHOLDER.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {VIDEOBLOG_PLACEHOLDER.posts.map((post, index) => (
              <div key={index} className="glass rounded-3xl overflow-hidden border border-white/5 group flex flex-col hover:translate-y-[-8px] transition-all duration-300">
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">▶</div>
                  </div>
                  <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-poppins font-bold text-base md:text-lg mb-3 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 md:mt-16">
            <button onClick={() => onNavigate('courses')} className="w-full sm:w-auto px-10 py-4 border-2 border-primary text-primary font-black rounded-full hover:bg-primary hover:text-black transition-all text-sm uppercase tracking-widest">
              VER MÁS CONTENIDO
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Casos de Éxito */}
      <AnimatedSection className="bg-surface/50 py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-primary text-xs font-black tracking-[0.4em] uppercase mb-4">Resultados Reales</h2>
            <h3 className="font-poppins text-3xl md:text-5xl lg:text-6xl font-extrabold">Casos de Éxito</h3>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="glass p-6 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 relative overflow-hidden min-h-[450px] md:min-h-[500px] flex flex-col justify-center">
              {CASE_STUDIES.map((study, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center transition-all duration-700 ${idx === currentCaseSlide ? 'opacity-100 scale-100' : 'hidden opacity-0 scale-95'}`}>
                  <div className="w-full lg:w-1/2 aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src={study.image} alt={study.alt} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full lg:w-1/2 space-y-6 text-left">
                    <h3 className="text-2xl md:text-4xl font-poppins font-bold text-primary leading-tight">{study.title}</h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{study.description}</p>
                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                      {study.kpis.map((kpi, kIdx) => (
                        <div key={kIdx} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs">✓</span>
                          <span className="text-sm md:text-base font-bold text-white">{kpi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center lg:justify-start gap-4 mt-12">
                <button onClick={prevCase} className="p-4 glass rounded-full hover:bg-primary/20 text-primary transition-all active:scale-90" aria-label="Anterior">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextCase} className="p-4 glass rounded-full hover:bg-primary/20 text-primary transition-all active:scale-90" aria-label="Siguiente">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Testimonios */}
      <AnimatedSection className="py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-5xl font-extrabold text-center mb-16 md:mb-24 px-4 leading-tight">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 flex flex-col relative pt-16 mt-8 hover:border-primary/20 transition-all duration-500">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10">
                  <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-10 right-10 text-6xl text-primary/10 font-serif leading-none">“</div>
                <p className="text-gray-300 italic mb-8 leading-relaxed text-center relative z-10 text-sm md:text-base">
                  "{t.quote.split(t.highlight)[0]}<span className="text-primary not-italic font-bold bg-primary/5 px-1 rounded">{t.highlight}</span>{t.quote.split(t.highlight)[1]}"
                </p>
                <div className="text-center mt-auto border-t border-white/5 pt-6">
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-1 font-black">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6. Agenda */}
      <AnimatedSection id="agenda" className="bg-surface py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block bg-primary text-black px-4 py-1 rounded-full text-[10px] font-black uppercase mb-6 tracking-widest">Cupos Limitados</div>
          <h2 className="font-poppins text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">{CALENDLY_SECTION.headline}</h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto px-4">{CALENDLY_SECTION.copy}</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <CalendlyEmbed />
        </div>
      </AnimatedSection>
    </>
  );
};

const ServicesPage: React.FC = () => (
  <main className="pt-24 md:pt-32 pb-16 md:pb-24">
    <div className="max-w-5xl mx-auto px-4 md:px-6 text-center mb-16 md:mb-24">
      <h1 className="text-4xl md:text-7xl font-poppins font-extrabold mb-6 tracking-tight leading-tight">
        {SERVICES_PAGE_CONTENT.title}
      </h1>
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
        {SERVICES_PAGE_CONTENT.intro}
      </p>
    </div>
    
    <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-8 md:space-y-12">
      {SERVICES_PAGE_CONTENT.detailedServices.map((service, index) => (
        <AnimatedSection key={index} className="p-0">
          <div className="glass p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 hover:border-primary/20 transition-all group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
              <h2 className="text-2xl md:text-4xl font-poppins font-bold text-primary leading-tight group-hover:translate-x-2 transition-transform">{service.title}</h2>
              <span className="bg-primary/10 border border-primary/20 px-5 py-2 rounded-full text-[10px] font-black uppercase text-primary tracking-widest whitespace-nowrap">
                {service.time}
              </span>
            </div>
            <p className="text-gray-300 mb-10 text-base md:text-lg leading-relaxed">{service.objective}</p>
            <div className="space-y-6">
              <h3 className="font-black text-xs uppercase tracking-widest text-white/40">Entregables Clave:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm md:text-base text-gray-400 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="mt-1.5 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#00DC01] flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12">
               <CTAButton text="RESUELVE TUS DUDAS" className="w-full sm:w-auto" />
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </main>
);

const CoursesPage: React.FC = () => (
  <main className="pt-32 pb-20 px-4 md:px-6 min-h-[80vh] flex items-center justify-center text-center">
    <div className="max-w-2xl mx-auto">
      <div className="text-7xl md:text-8xl mb-10 animate-pulse">🚀</div>
      <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6 leading-tight">
        {COURSES_PAGE_CONTENT.title}
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-md mx-auto">
        {COURSES_PAGE_CONTENT.description}
      </p>
      <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-3xl">
        <h4 className="font-bold text-xl mb-6">Apúntate a la lista de espera</h4>
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Tu mejor email" 
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-all text-sm"
          />
          <button className="bg-primary text-black font-black px-10 py-4 rounded-2xl hover:scale-105 transition-all text-sm uppercase tracking-widest shadow-xl">
            NOTIFICARME
          </button>
        </form>
      </div>
    </div>
  </main>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    const seo = SEO_DATA[page];
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[160px] opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] opacity-40"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onToggleAssistant={() => setIsAssistantOpen(true)} 
        />
        
        <div className="flex-grow">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'courses' && <CoursesPage />}
        </div>

        <Footer onNavigate={handleNavigate} />
        
        <AIAssistant 
          isOpen={isAssistantOpen} 
          onClose={() => setIsAssistantOpen(false)} 
        />
      </div>

      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-black rounded-full shadow-3xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 z-50 animate-bounce group"
          aria-label="Hablar con IA"
        >
          <div className="absolute -top-12 right-0 bg-white text-black text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
             ¿CÓMO PUEDO AYUDARTE?
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
