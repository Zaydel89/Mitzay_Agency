
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
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
        className={`inline-block min-w-[220px] text-center font-poppins font-semibold bg-primary text-black py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform shadow-[0_0_15px_rgba(0,220,1,0.3)] hover:scale-105 active:scale-95 ${className}`}
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
            className="calendly-inline-widget w-full rounded-3xl overflow-hidden border border-primary/20 bg-surface shadow-2xl"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
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
      <AnimatedSection className="bg-surface/30 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-5xl font-bold text-center mb-16">Qué Hacemos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_OVERVIEW.map((service, index) => (
              <div key={index} className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all flex flex-col group">
                <div className="overflow-hidden rounded-2xl mb-6 aspect-video">
                  <img src={service.image} alt={service.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-poppins text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 3. Videoblog */}
      <AnimatedSection className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-5xl font-bold text-center mb-4">{VIDEOBLOG_PLACEHOLDER.title}</h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">{VIDEOBLOG_PLACEHOLDER.description}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VIDEOBLOG_PLACEHOLDER.posts.map((post, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden border border-white/5 group flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-6">
                  <h3 className="font-poppins font-bold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-xs mb-4">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => onNavigate('courses')} className="px-8 py-3 border border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-black transition-all">
              VER MÁS
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. Casos de Éxito */}
      <AnimatedSection className="bg-surface/50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-5xl font-bold text-center mb-16">Casos de Éxito</h2>
          <div className="relative max-w-5xl mx-auto">
            <div className="glass p-8 md:p-12 rounded-[3rem] border border-white/5 relative overflow-hidden min-h-[400px]">
              {CASE_STUDIES.map((study, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row gap-12 items-center transition-all duration-700 ${idx === currentCaseSlide ? 'opacity-100' : 'hidden opacity-0'}`}>
                  <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-white/10">
                    <img src={study.image} alt={study.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full md:w-1/2 space-y-6 text-left">
                    <h3 className="text-3xl font-poppins font-bold text-primary">{study.title}</h3>
                    <p className="text-gray-400">{study.description}</p>
                    <div className="grid grid-cols-1 gap-4">
                      {study.kpis.map((kpi, kIdx) => (
                        <div key={kIdx} className="flex items-center gap-3 font-bold text-white">
                          <span className="text-primary">✓</span> {kpi}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center gap-4 mt-12">
                <button onClick={prevCase} className="p-3 glass rounded-full hover:bg-primary/20 text-primary transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextCase} className="p-3 glass rounded-full hover:bg-primary/20 text-primary transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. Testimonios */}
      <AnimatedSection className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-poppins text-3xl md:text-5xl font-bold text-center mb-16">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass p-10 rounded-3xl border border-white/5 flex flex-col relative pt-16 mt-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full overflow-hidden border-4 border-black shadow-2xl">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed text-center">
                  "{t.quote.split(t.highlight)[0]}<span className="text-primary not-italic font-bold">{t.highlight}</span>{t.quote.split(t.highlight)[1]}"
                </p>
                <div className="text-center mt-auto border-t border-white/5 pt-6">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6. Agenda */}
      <AnimatedSection id="agenda" className="bg-surface py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-5xl font-bold mb-6">{CALENDLY_SECTION.headline}</h2>
          <p className="text-gray-400 text-lg">{CALENDLY_SECTION.copy}</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <CalendlyEmbed />
        </div>
      </AnimatedSection>
    </>
  );
};

const ServicesPage: React.FC = () => (
  <main className="pt-32 pb-20">
    <div className="max-w-4xl mx-auto px-6 text-center mb-20">
      <h1 className="text-5xl md:text-7xl font-poppins font-extrabold mb-6 tracking-tight">
        {SERVICES_PAGE_CONTENT.title}
      </h1>
      <p className="text-xl text-gray-400 leading-relaxed">
        {SERVICES_PAGE_CONTENT.intro}
      </p>
    </div>
    
    <div className="max-w-4xl mx-auto px-6 space-y-12">
      {SERVICES_PAGE_CONTENT.detailedServices.map((service, index) => (
        <AnimatedSection key={index} className="p-0">
          <div className="glass p-10 rounded-3xl border border-white/5 hover:border-primary/30 transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-3xl font-poppins font-bold text-primary">{service.title}</h2>
              <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-xs font-semibold text-gray-400">
                {service.time}
              </span>
            </div>
            <p className="text-gray-300 mb-8">{service.objective}</p>
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Entregables:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
               <CTAButton text="RESUELVE TUS DUDAS" />
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </main>
);

const CoursesPage: React.FC = () => (
  <main className="pt-32 pb-20 px-6 min-h-[70vh] flex items-center justify-center text-center">
    <div className="max-w-2xl">
      <div className="text-8xl mb-8 animate-bounce">📚</div>
      <h1 className="text-5xl font-poppins font-extrabold mb-6">
        {COURSES_PAGE_CONTENT.title}
      </h1>
      <p className="text-xl text-gray-400 mb-12">
        {COURSES_PAGE_CONTENT.description}
      </p>
      <div className="glass p-8 rounded-3xl border border-white/10">
        <h4 className="font-bold mb-4">¡Sé el primero en enterarte!</h4>
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Tu email principal" 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 focus:outline-none focus:border-primary transition-all"
          />
          <button className="bg-primary text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-all">
            Suscribirme
          </button>
        </form>
      </div>
    </div>
  </main>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    const seo = SEO_DATA[page];
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-black">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onToggleAssistant={() => setIsAssistantOpen(true)} 
        />
        
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'courses' && <CoursesPage />}

        <Footer onNavigate={handleNavigate} />
        
        <AIAssistant 
          isOpen={isAssistantOpen} 
          onClose={() => setIsAssistantOpen(false)} 
        />
      </div>

      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-black rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50 animate-bounce"
          aria-label="Open AI Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
