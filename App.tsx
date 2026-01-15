
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Page, Service, PortfolioItem, Testimonial, DetailedPortfolioProject } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnimatedSection from './components/AnimatedSection';
import NeuralNexusSection from './components/NeuralNexusSection';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import { 
  SERVICES_PAGE_CONTENT, 
  SERVICES_OVERVIEW, 
  PORTFOLIO_ITEMS, 
  TESTIMONIALS, 
  CALENDLY_SECTION, 
  CALENDLY_URL,
  DISCOUNT_CONFIG,
  PORTFOLIO_CATALOG
} from './constants';

// CONFIGURACIÓN DE WEBHOOK
const N8N_WEBHOOK_URL = "https://n8n-n8n.4mdxie.easypanel.host/webhook/5adc2915-cca2-4864-8e4b-5620275cb293";

const BackgroundVideo: React.FC<{ fixed?: boolean }> = ({ fixed = false }) => (
  <div className={fixed ? "fixed inset-0 z-0" : "absolute inset-0 z-0"}>
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70 z-10"></div>
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-65 grayscale-[40%] brightness-90"
    >
      <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
    </video>
  </div>
);

const RegistrationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(DISCOUNT_CONFIG.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const cleanEmail = formData.email
        .trim()
        .toLowerCase()
        .replace(/^[^a-zA-Z0-9]+/, '');

      const payload = {
        fullname: formData.fullName.trim(),
        whatsapp: formData.whatsapp.trim(),
        email: cleanEmail
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error en el servidor");
      }
      
      setStep(2);
    } catch (err: any) {
      setError("Error de sincronización. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(`Hola! Acabo de reclamar mi código MITZAY25 en la web. Me gustaría agendar mi sesión estratégica.`);
    window.open(`https://wa.me/5215536317581?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative glass w-full max-w-lg p-1 rounded-[3rem] border border-primary/40 shadow-[0_0_80px_rgba(0,220,1,0.2)] animate-scale-up overflow-hidden">
        <div className="bg-black/60 p-8 sm:p-12 rounded-[2.8rem] relative z-10">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary text-[9px] font-black tracking-[0.4em] uppercase">Acceso VIP Prioritario</span>
                </div>
                <h3 className="text-4xl sm:text-5xl font-black mb-6 leading-[1.1] tracking-tighter text-white">
                  DOMINA LA <br/><span className="text-primary italic">ERA IA</span>.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Regístrate para desbloquear tu <span className="text-white font-bold">25% DE DESCUENTO</span> y recibir tu plan de acción.
                </p>
              </div>

              <div className="space-y-4">
                <input required type="text" placeholder="Nombre completo" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm text-white" />
                <input required type="tel" placeholder="WhatsApp" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm text-white" />
                <input required type="email" placeholder="Correo corporativo" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm text-white" />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">{error}</div>
              )}

              <button type="submit" disabled={isSubmitting} className="group relative w-full py-5 bg-primary text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                <span className="relative z-10">{isSubmitting ? 'SINCRONIZANDO...' : 'RECLAMAR CÓDIGO VIP'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center space-y-10 py-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/40 relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <h3 className="text-4xl font-black mb-3">¡ESTÁS DENTRO!</h3>
                <p className="text-gray-400 text-sm">Código <span className="text-primary font-bold">MITZAY25</span> activado. ¡Hablemos por WhatsApp!</p>
              </div>
              <div 
                onClick={handleCopy}
                className="p-10 bg-primary/5 border-2 border-dashed border-primary/30 rounded-[2.5rem] relative cursor-pointer hover:bg-primary/10 transition-all group"
              >
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-4">COPIAR CÓDIGO:</p>
                <p className="text-5xl sm:text-6xl font-black text-white tracking-widest">{DISCOUNT_CONFIG.code}</p>
                <div className={`absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-primary text-black transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>Copiado</div>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "El futuro pertenece a quienes automatizan hoy."
                </p>
                <button 
                  onClick={handleWhatsAppRedirect} 
                  className="w-full py-4 bg-primary text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.448-1.271.607-1.445.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.101-.177.211-.077.383.1.173.444.73.954 1.185.657.587 1.21.768 1.383.853.173.085.274.072.376-.045.101-.116.434-.506.549-.68.116-.173.231-.144.39-.087.158.058 1.012.477 1.185.564.173.085.289.129.332.202.043.073.043.419-.101.824z" /></svg>
                  SOLICITAR SESIÓN POR WHATSAPP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DiscountCTA: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className = "" }) => (
  <div className={`mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${className}`}>
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        <span className="text-primary font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em]">PROMO ACTIVA</span>
      </div>
      <p className="text-white font-bold text-[10px] sm:text-xs">25% OFF PARA NUEVOS SOCIOS</p>
    </div>
    <button onClick={onClick} className="px-6 sm:px-8 py-3 sm:py-4 glass border border-primary/50 text-primary font-black rounded-2xl text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all group overflow-hidden relative">
      <span className="relative z-10">OBTENER CÓDIGO</span>
      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
    </button>
  </div>
);

const VideoModal: React.FC<{ url: string; isOpen: boolean; onClose: () => void }> = ({ url, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={onClose}></div>
      <div className="relative w-full max-w-6xl aspect-video glass rounded-[1.5rem] sm:rounded-[2rem] border border-primary/20 overflow-hidden shadow-2xl animate-scale-up">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 w-12 h-12 glass rounded-full flex items-center justify-center border border-white/10 hover:bg-primary hover:text-black transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <video autoPlay controls className="w-full h-full object-contain bg-black">
          <source src={url} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-700 fill-current'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ServiceCard: React.FC<{ service: Service; index: number; activeSection: number; onPlay: (url: string) => void }> = ({ service, index, activeSection, onPlay }) => (
  <AnimatedSection delay={index * 0.1} isActive={activeSection === 1} triggerOnSectionActive className="h-full">
    <div className="glass p-5 sm:p-6 rounded-3xl border border-primary/10 hover:border-primary/50 transition-all h-full group flex flex-col text-white">
      <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/5 relative bg-black/50 cursor-pointer" onClick={() => onPlay(service.image)}>
        <video loop muted autoPlay playsInline className="w-full h-full object-cover transition-all duration-700 grayscale sm:opacity-60 group-hover:grayscale-0 group-hover:opacity-100">
          <source src={service.image} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
          <div className="w-14 h-14 glass border border-primary/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,220,1,0.3)] group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>
      <h4 className="font-bold text-lg mb-2 text-primary uppercase tracking-tight">{service.title}</h4>
      <p className="text-gray-400 text-xs leading-relaxed flex-1">{service.description}</p>
    </div>
  </AnimatedSection>
);

const PortfolioCard: React.FC<{ item: PortfolioItem; index: number; activeSection: number; onPlay: (url: string) => void }> = ({ item, index, activeSection, onPlay }) => (
  <AnimatedSection delay={index * 0.1} isActive={activeSection === 2} triggerOnSectionActive className="h-full">
    <div className="glass p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all flex flex-col h-full group text-white">
      <div className="w-full aspect-video rounded-2xl overflow-hidden mb-5 border border-white/5 relative bg-black/80 cursor-pointer" onClick={() => onPlay(item.video)}>
        <video loop muted autoPlay playsInline className="w-full h-full object-cover transition-all duration-1000 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100">
          <source src={item.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 glass border border-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,220,1,0.2)]">
            <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <h4 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{item.title}</h4>
      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-4">{item.description}</p>
    </div>
  </AnimatedSection>
);

const BrowserPreview: React.FC<{ url: string; title: string }> = ({ url, title }) => (
  <div className="w-full h-full flex flex-col glass rounded-t-[1.5rem] overflow-hidden shadow-2xl">
    {/* Browser Bar */}
    <div className="bg-white/10 px-4 py-3 flex items-center gap-4 border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
      </div>
      <div className="flex-1 bg-black/40 rounded-lg px-4 py-1 flex items-center justify-between">
        <span className="text-[9px] text-gray-400 font-mono tracking-tighter truncate">{url}</span>
        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
    {/* Iframe View (Simulated) */}
    <div className="flex-1 relative bg-black/20 group/preview overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover/preview:opacity-100 transition-opacity duration-1000 bg-neutral-900" 
           style={{ backgroundImage: `url(https://image.thum.io/get/width/1200/crop/800/noanimate/${url})` }}>
      </div>
      {/* Interaction Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 group-hover/preview:opacity-0 transition-opacity duration-500 pointer-events-none">
        <div className="text-center">
          <div className="w-16 h-16 glass border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <p className="text-[10px] font-black tracking-widest text-primary uppercase">Live Architecture</p>
        </div>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"></a>
    </div>
  </div>
);

const ProjectCatalogCard: React.FC<{ project: DetailedPortfolioProject }> = ({ project }) => (
  <div className="glass rounded-[3rem] border border-white/5 overflow-hidden group hover:border-primary/30 transition-all">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#050505] p-4 lg:p-12">
        <BrowserPreview url={project.url} title={project.title} />
      </div>
      <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-black/80 to-black/20">
        <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-4">{project.tagline}</span>
        <h3 className="text-4xl sm:text-5xl font-poppins font-light mb-8 group-hover:text-primary transition-colors tracking-tight">{project.title}</h3>
        <p className="text-gray-300 text-lg mb-10 leading-relaxed italic border-l-2 border-primary/30 pl-6 font-light">"{project.description}"</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h5 className="text-[10px] font-black uppercase text-white tracking-widest mb-3 opacity-60">Ingeniería & Layout</h5>
            <p className="text-gray-400 text-xs leading-relaxed font-light">{project.techFocus.layout}</p>
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase text-white tracking-widest mb-3 opacity-60">Interacción & UI</h5>
            <p className="text-gray-400 text-xs leading-relaxed font-light">{project.techFocus.effects}</p>
          </div>
          <div className="sm:col-span-2">
            <h5 className="text-[10px] font-black uppercase text-white tracking-widest mb-3 opacity-60">Rendimiento & Conversión</h5>
            <p className="text-gray-400 text-xs leading-relaxed font-light">{project.techFocus.performance}</p>
          </div>
        </div>
        
        <div className="mt-14 flex items-center gap-6">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-5 text-primary font-bold uppercase text-[10px] tracking-[0.3em] group/link hover:gap-7 transition-all px-8 py-5 glass border border-primary/20 rounded-2xl hover:bg-primary/10">
            VISITAR ECOSISTEMA
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalVideo, setModalVideo] = useState<{ url: string; isOpen: boolean }>({ url: '', isOpen: false });
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const progress = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    setScrollProgress(progress);
    const sectionIndex = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSection(sectionIndex);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768 || currentPage !== 'home') return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 1.2, behavior: 'auto' });
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, currentPage]);

  const scrollToSection = (index: number) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  const navigateToAgenda = () => {
    setCurrentPage('home');
    setTimeout(() => scrollToSection(4), 150);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      {isLoading && <LoadingScreen />}
      <Navbar currentPage={currentPage === 'portfolio-catalog' ? 'home' : currentPage} onNavigate={setCurrentPage} onScrollToSection={scrollToSection} />

      <main className="md:pl-20 h-full">
        {currentPage === 'home' && (
          <div className="relative h-screen w-full overflow-hidden bg-black">
            <div ref={scrollRef} className="flex flex-row h-screen overflow-x-auto snap-x snap-mandatory no-scrollbar">
              <div className="horizontal-section flex flex-col items-center justify-center relative px-6">
                <BackgroundVideo />
                <Hero onScrollToAgenda={() => scrollToSection(4)} />
              </div>

              <div className="horizontal-section flex items-center px-6 sm:px-10 md:px-20 relative">
                <BackgroundVideo />
                <div className="w-full max-w-7xl mx-auto relative z-20 py-10 sm:py-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12">
                    <div>
                      <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Capacidades</h2>
                      <h3 className="text-3xl sm:text-5xl font-poppins font-bold leading-tight">Nuestro Ecosistema</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {SERVICES_OVERVIEW.map((s, i) => (
                      <ServiceCard key={s.id} service={s} index={i} activeSection={activeSection} onPlay={setModalVideo} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="horizontal-section flex items-center px-6 sm:px-10 md:px-20 relative">
                <BackgroundVideo />
                <div className="w-full max-w-[90rem] mx-auto relative z-20">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                      <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4 text-center sm:text-left">Muestra</h2>
                      <h3 className="text-3xl sm:text-5xl font-poppins font-bold text-center sm:text-left">Portafolio</h3>
                    </div>
                    <button 
                      onClick={() => setCurrentPage('portfolio-catalog')}
                      className="px-8 py-4 glass border border-primary/40 text-primary font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all group"
                    >
                      Explorar Catálogo Élite
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PORTFOLIO_ITEMS.map((item, i) => (
                      <PortfolioCard key={i} item={item} index={i} activeSection={activeSection} onPlay={url => setModalVideo({url, isOpen:true})} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="horizontal-section flex items-center px-6 relative">
                <BackgroundVideo />
                <div className="w-full max-w-7xl mx-auto relative z-20">
                  <h3 className="text-3xl sm:text-5xl font-poppins font-bold mb-12">Confianza de Élite</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {TESTIMONIALS.map((t, i) => (
                      <AnimatedSection key={i} delay={i * 0.05} isActive={activeSection === 3} triggerOnSectionActive>
                        <div className="glass p-6 rounded-[2rem] border border-white/5 h-full flex flex-col hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-3 mb-3">
                            <img src={t.image} className="w-10 h-10 rounded-full border border-primary/20" alt={t.name} />
                            <div className="leading-tight">
                              <p className="font-bold text-xs">{t.name}</p>
                              <StarRating rating={t.rating} />
                            </div>
                          </div>
                          <p className="text-gray-300 text-xs italic flex-1">"{t.quote}"</p>
                          <span className="text-[10px] font-black text-primary uppercase mt-4">{t.highlight}</span>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </div>

              <div className="horizontal-section flex items-center px-6 relative">
                <BackgroundVideo />
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-20">
                  <AnimatedSection isActive={activeSection === 4} triggerOnSectionActive>
                    <h2 className="text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4">Let's talk</h2>
                    <h3 className="text-3xl sm:text-5xl font-poppins font-bold mb-8">{CALENDLY_SECTION.headline}</h3>
                    <p className="text-gray-400 text-lg mb-8 max-w-md">{CALENDLY_SECTION.copy}</p>
                    <div className="flex flex-col gap-6 items-start">
                      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-5 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-2xl hover:scale-105 transition-all">RESERVAR AHORA</a>
                      <DiscountCTA onClick={() => setIsDiscountOpen(true)} />
                    </div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.2} isActive={activeSection === 4} triggerOnSectionActive className="h-[700px] w-full">
                    <div className="w-full h-full rounded-[2.5rem] border-2 border-primary/40 overflow-hidden relative shadow-[0_0_50px_rgba(0,220,1,0.15)] bg-black">
                       <iframe src={CALENDLY_URL} className="w-full h-full border-0 invert-[0.88] hue-rotate-[140deg] brightness-[0.9] contrast-[1.1]"></iframe>
                    </div>
                  </AnimatedSection>
                </div>
              </div>

              <div className="horizontal-section flex flex-col items-center justify-center relative px-6">
                <BackgroundVideo />
                <Footer onNavigate={setCurrentPage} />
              </div>

              <div className="horizontal-section relative overflow-hidden flex flex-col items-center justify-center">
                <NeuralNexusSection />
              </div>
            </div>
            <div className="fixed bottom-0 left-0 sm:left-20 w-full sm:w-[calc(100%-5rem)] h-1 bg-white/5 z-[100]">
              <div className="h-full bg-primary shadow-[0_0_15px_#00DC01] transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
            </div>
          </div>
        )}

        {currentPage === 'portfolio-catalog' && (
          <div className="h-full bg-black relative overflow-y-auto no-scrollbar scroll-smooth">
            <BackgroundVideo fixed />
            <div className="relative z-20 max-w-7xl mx-auto px-6 py-32 sm:py-48">
              <button 
                onClick={() => setCurrentPage('home')}
                className="fixed top-8 left-8 sm:left-28 z-[150] flex items-center gap-4 text-primary font-black uppercase text-[10px] tracking-widest glass px-6 py-3 rounded-full border border-primary/30 hover:bg-primary hover:text-black transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                VOLVER AL INICIO
              </button>
              
              <div className="text-center mb-40">
                <h2 className="text-primary text-[11px] font-black tracking-[0.8em] uppercase mb-10 opacity-60">Selection of Works</h2>
                <h1 className="text-7xl sm:text-9xl font-inter font-extralight tracking-tightest leading-[0.9] mb-14 uppercase">
                  MI<br/><span className="text-primary font-light tracking-tighter">PORTAFOLIO</span>
                </h1>
                <div className="w-24 h-[1px] bg-primary/30 mx-auto mb-14"></div>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-light">
                  Una curaduría de infraestructuras digitales que fusionan la visión arquitectónica, el lujo editorial y la ingeniería de alta conversión.
                </p>
              </div>

              <div className="space-y-48 pb-60">
                {PORTFOLIO_CATALOG.map((project, i) => (
                  <ProjectCatalogCard key={i} project={project} />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'services' && (
          <div className="h-screen overflow-y-auto no-scrollbar relative">
            <BackgroundVideo fixed />
            <div className="relative z-20 py-32 px-10 max-w-6xl mx-auto text-center sm:text-left">
              <h1 className="text-5xl sm:text-8xl font-poppins font-semibold text-white mb-8 tracking-tight leading-none">{SERVICES_PAGE_CONTENT.title}</h1>
              <p className="text-xl text-gray-400 max-w-3xl mb-12 font-light">{SERVICES_PAGE_CONTENT.intro}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                {SERVICES_PAGE_CONTENT.detailedServices.map((s, i) => (
                  <div key={i} className="glass p-10 rounded-[3rem] border border-white/5 group hover:border-primary/40 transition-all flex flex-col text-white">
                    <h3 className="text-3xl font-poppins font-bold mb-6 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-1">{s.objective}</p>
                    <button onClick={navigateToAgenda} className="w-full py-4 glass border border-primary/20 text-primary font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Me interesa</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'courses' && (
          <div className="h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <BackgroundVideo fixed />
            <div className="glass p-16 rounded-[4rem] border border-primary/20 max-w-2xl relative z-20 text-white">
              <h1 className="text-5xl font-bold mb-8">Próximamente</h1>
              <p className="text-gray-400 text-lg mb-12">Estamos terminando de pulir nuestra academia IA. Deja tu correo para acceso prioritario.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="tu@email.com" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm text-white" />
                <button className="bg-primary text-black font-black px-10 py-4 rounded-2xl uppercase tracking-widest text-xs">Unirme</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <VideoModal url={modalVideo.url} isOpen={modalVideo.isOpen} onClose={() => setModalVideo({url:'', isOpen:false})} />
      <RegistrationModal 
        isOpen={isDiscountOpen} 
        onClose={() => setIsDiscountOpen(false)} 
      />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
};

export default App;
