
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Page, Service, PortfolioItem, Testimonial } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnimatedSection from './components/AnimatedSection';
import NeuralNexusSection from './components/NeuralNexusSection';
import WhatsAppButton from './components/WhatsAppButton';
import { 
  SERVICES_PAGE_CONTENT, 
  SERVICES_OVERVIEW, 
  PORTFOLIO_ITEMS, 
  TESTIMONIALS, 
  CALENDLY_SECTION, 
  CALENDLY_URL,
  DISCOUNT_CONFIG
} from './constants';

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
      const payload = {
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        email: formData.email,
        date: new Date().toISOString()
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();
      
      setStep(2);
    } catch (err) {
      setError("Error de conexión con el núcleo. Reintenta en unos segundos.");
    } finally {
      setIsSubmitting(false);
    }
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
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-primary text-[9px] font-black tracking-[0.4em] uppercase">Oferta de Lanzamiento</span>
                </div>
                <h3 className="text-4xl sm:text-5xl font-black mb-6 leading-[1.1] tracking-tighter text-white">
                  NO TE QUEDES <br/><span className="text-primary italic">FUERA</span> DEL FUTURO.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Estás a un paso de desbloquear el <span className="text-white font-bold">25% DE DESCUENTO</span> en todo nuestro ecosistema. Registra tus datos para recibir el acceso VIP y tu código exclusivo.
                </p>
              </div>

              <div className="space-y-4">
                <input required type="text" placeholder="Nombre completo" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm" />
                <input required type="tel" placeholder="WhatsApp (Ej: +52...)" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm" />
                <input required type="email" placeholder="Correo electrónico" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm" />
              </div>

              {error && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest animate-pulse">{error}</p>}

              <button type="submit" disabled={isSubmitting} className="group relative w-full py-5 bg-primary text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                <span className="relative z-10">{isSubmitting ? 'VERIFICANDO NÚCLEO...' : 'RECLAMAR MI BENEFICIO'}</span>
              </button>
              
              <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest">
                Protección de datos MitZay v2.5 • Sin Spam
              </p>
            </form>
          ) : (
            <div className="text-center space-y-10 py-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/40 relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <h3 className="text-4xl font-black mb-3">¡BIENVENIDO AL ELITE!</h3>
                <p className="text-gray-400 text-sm">Tu código ha sido activado y enviado a <span className="text-white">{formData.email}</span>.</p>
              </div>
              <div 
                onClick={handleCopy}
                className="p-10 bg-primary/5 border-2 border-dashed border-primary/30 rounded-[2.5rem] relative cursor-pointer hover:bg-primary/10 transition-all group"
              >
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-4">CÓDIGO ACTIVO:</p>
                <p className="text-5xl sm:text-6xl font-black text-white tracking-widest">{DISCOUNT_CONFIG.code}</p>
                <div className={`absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-primary text-black transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
                  Copiado
                </div>
                <p className="mt-6 text-[9px] text-primary/60 font-black uppercase tracking-widest animate-pulse">Haz clic para copiar código</p>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  "El éxito no es para quien más trabaja, sino para quien mejor automatiza."
                </p>
                <button onClick={onClose} className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px] hover:text-primary transition-colors">Finalizar Registro</button>
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
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-primary font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] animate-pulse">OFERTA DE TEMPORADA</span>
      </div>
      <p className="text-white font-bold text-[10px] sm:text-xs">{DISCOUNT_CONFIG.subText}</p>
    </div>
    <button 
      onClick={onClick}
      className="px-6 sm:px-8 py-3 sm:py-4 glass border border-primary/50 text-primary font-black rounded-2xl text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all group overflow-hidden relative"
    >
      <span className="relative z-10">OBTENER MI 25% OFF</span>
      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
    </button>
  </div>
);

const VideoModal: React.FC<{ url: string; isOpen: boolean; onClose: () => void }> = ({ url, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" 
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-6xl aspect-video glass rounded-[1.5rem] sm:rounded-[2rem] border border-primary/20 overflow-hidden shadow-2xl animate-scale-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 glass rounded-full flex items-center justify-center border border-white/10 hover:bg-primary hover:text-black transition-all group"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <video 
          autoPlay 
          controls 
          className="w-full h-full object-contain bg-black"
        >
          <source src={url} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
        return (
          <svg key={i} className="w-3 h-3 text-gray-700 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
};

const ServiceCard: React.FC<{ service: Service; index: number; activeSection: number; onPlay: (url: string) => void }> = ({ service, index, activeSection, onPlay }) => {
  return (
    <AnimatedSection delay={index * 0.1} isActive={activeSection === 1} triggerOnSectionActive className="h-full">
      <div className="glass p-5 sm:p-6 rounded-3xl border border-primary/10 hover:border-primary/50 transition-all h-full group flex flex-col">
        <div 
          className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/5 relative bg-black/50 cursor-pointer"
          onClick={() => onPlay(service.image)}
        >
          <video 
            loop muted autoPlay playsInline 
            className="w-full h-full object-cover transition-all duration-700 grayscale sm:opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
          >
            <source src={service.image} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
            <div className="w-12 h-12 sm:w-14 sm:h-14 glass border border-primary/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,220,1,0.3)] group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </div>
        <h4 className="font-bold text-base sm:text-lg mb-2 text-primary uppercase tracking-tight">{service.title}</h4>
        <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed flex-1">{service.description}</p>
      </div>
    </AnimatedSection>
  );
};

const PortfolioCard: React.FC<{ item: PortfolioItem; index: number; activeSection: number; onPlay: (url: string) => void }> = ({ item, index, activeSection, onPlay }) => {
  return (
    <AnimatedSection delay={index * 0.1} isActive={activeSection === 2} triggerOnSectionActive className="h-full">
      <div className="glass p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all flex flex-col h-full group">
        <div 
          className="w-full aspect-video rounded-2xl overflow-hidden mb-5 border border-white/5 relative bg-black/80 cursor-pointer"
          onClick={() => onPlay(item.video)}
        >
          <video 
            loop muted autoPlay playsInline 
            className="w-full h-full object-cover transition-all duration-1000 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
          >
            <source src={item.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 glass border border-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,220,1,0.2)]">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
        <h4 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{item.title}</h4>
        <p className="text-[10px] sm:text-[11px] text-gray-400 leading-relaxed line-clamp-4">{item.description}</p>
      </div>
    </AnimatedSection>
  );
};

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

  const openVideoModal = (url: string) => setModalVideo({ url, isOpen: true });
  const closeVideoModal = () => setModalVideo({ url: '', isOpen: false });

  const navigateToAgenda = () => {
    setCurrentPage('home');
    setTimeout(() => scrollToSection(4), 150);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      {isLoading && <LoadingScreen />}
      
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onScrollToSection={scrollToSection}
      />

      <main className="md:pl-20 h-full">
        {currentPage === 'home' && (
          <div className="relative h-screen w-full overflow-hidden bg-black">
            <div 
              ref={scrollRef} 
              className="flex flex-row h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar"
            >
              {/* SECTION 0: HERO */}
              <div className="horizontal-section flex flex-col items-center justify-center relative px-6">
                <BackgroundVideo />
                <Hero onScrollToAgenda={() => scrollToSection(4)} />
              </div>

              {/* SECTION 1: ECOSISTEMA */}
              <div className="horizontal-section flex items-center px-6 sm:px-10 md:px-20 relative">
                <BackgroundVideo />
                <div className="w-full max-w-7xl mx-auto relative z-20 py-10 sm:py-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12">
                    <div>
                      <h2 className="text-primary text-[8px] sm:text-[10px] font-black tracking-[0.5em] uppercase mb-2 sm:mb-4">Capacidades</h2>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold leading-tight">Nuestro Ecosistema</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-y-auto sm:overflow-visible max-h-[60vh] sm:max-h-none no-scrollbar pb-4 sm:pb-0">
                    {SERVICES_OVERVIEW.map((s, i) => (
                      <ServiceCard key={s.id} service={s} index={i} activeSection={activeSection} onPlay={openVideoModal} />
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 2: PORTAFOLIO */}
              <div className="horizontal-section flex items-center px-6 sm:px-10 md:px-20 relative">
                <BackgroundVideo />
                <div className="w-full max-w-[90rem] mx-auto relative z-20 py-10 sm:py-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12">
                    <div>
                      <h2 className="text-primary text-[8px] sm:text-[10px] font-black tracking-[0.5em] uppercase mb-2 sm:mb-4">Muestra</h2>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold">Portafolio</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-y-auto sm:overflow-visible max-h-[60vh] sm:max-h-none no-scrollbar pb-4 sm:pb-0">
                    {PORTFOLIO_ITEMS.map((item, i) => (
                      <PortfolioCard key={i} item={item} index={i} activeSection={activeSection} onPlay={openVideoModal} />
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: TESTIMONIALS */}
              <div className="horizontal-section flex items-center px-6 sm:px-10 md:px-20 relative">
                <BackgroundVideo />
                <div className="w-full max-w-7xl mx-auto relative z-20 py-10 sm:py-0">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-primary text-[8px] sm:text-[10px] font-black tracking-[0.5em] uppercase mb-2 sm:mb-4">Experiencias</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold">Confianza de Élite</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-y-auto sm:overflow-visible max-h-[65vh] sm:max-h-none no-scrollbar pb-6 sm:pb-0">
                    {TESTIMONIALS.map((t, i) => (
                      <AnimatedSection key={i} delay={i * 0.05} isActive={activeSection === 3} triggerOnSectionActive>
                        <div className="glass p-4 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 h-full flex flex-col hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-3 mb-3">
                            <img src={t.image} className="w-8 h-8 rounded-full border border-primary/20 object-cover" alt={t.name} />
                            <div className="leading-tight">
                              <p className="font-bold text-[9px] sm:text-[10px]">{t.name}</p>
                              <p className="text-[7px] sm:text-[8px] text-gray-500 uppercase tracking-widest">{t.title}</p>
                              <StarRating rating={t.rating} />
                            </div>
                          </div>
                          <p className="text-gray-300 text-[9px] sm:text-[10px] italic flex-1 leading-relaxed">"{t.quote}"</p>
                          {t.highlight && (
                            <div className="mt-2 pt-2 border-t border-white/5">
                              <span className="text-[7px] sm:text-[8px] font-black text-primary uppercase tracking-widest">{t.highlight}</span>
                            </div>
                          )}
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 4: AGENDA - Black Calendar with Green Neon Outline */}
              <div className="horizontal-section flex items-start sm:items-center px-6 sm:px-10 md:px-20 relative overflow-y-auto no-scrollbar">
                <BackgroundVideo />
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-start sm:items-center relative z-20 pt-20 pb-20 sm:pt-0 sm:pb-0">
                  <AnimatedSection isActive={activeSection === 4} triggerOnSectionActive className="text-center sm:text-left">
                    <h2 className="text-primary text-[8px] sm:text-[10px] font-black tracking-[0.5em] uppercase mb-4">Let's talk</h2>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-poppins font-bold leading-tight mb-6 sm:mb-8">{CALENDLY_SECTION.headline}</h3>
                    <p className="text-gray-400 text-sm sm:text-lg mb-8 max-w-md mx-auto sm:mx-0">{CALENDLY_SECTION.copy}</p>
                    <div className="flex flex-col gap-6 items-center sm:items-start">
                      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                        className="inline-block px-10 py-5 bg-primary text-black font-black uppercase tracking-widest text-xs sm:text-sm rounded-2xl shadow-primary/30 shadow-2xl hover:scale-105 transition-all">
                        Reservar ahora
                      </a>
                      <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="mt-2" />
                    </div>
                  </AnimatedSection>
                  
                  {/* Calendar container with increased height and Neon Green Glow */}
                  <AnimatedSection delay={0.2} isActive={activeSection === 4} triggerOnSectionActive className="h-[700px] sm:h-[850px] w-full">
                    <div className="w-full h-full rounded-[2.5rem] border-2 border-primary/40 overflow-hidden relative shadow-[0_0_50px_rgba(0,220,1,0.15)] bg-black group transition-all duration-500 hover:border-primary hover:shadow-[0_0_60px_rgba(0,220,1,0.25)]">
                       <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none z-0"></div>
                       <iframe 
                        src={CALENDLY_URL} 
                        className="w-full h-full relative z-10 border-0 invert-[0.88] hue-rotate-[140deg] brightness-[0.9] saturate-[0.8] contrast-[1.1]" 
                        title="Agenda MitZay"
                        loading="lazy"
                       ></iframe>
                    </div>
                  </AnimatedSection>
                </div>
              </div>

              {/* SECTION 5: FOOTER */}
              <div className="horizontal-section flex flex-col items-center justify-center px-6 relative">
                <BackgroundVideo />
                <div className="relative z-20 w-full max-w-4xl mx-auto">
                  <Footer onNavigate={setCurrentPage} />
                </div>
              </div>

              {/* SECTION 6: NEXUS */}
              <div className="horizontal-section relative overflow-hidden flex flex-col items-center justify-center">
                <NeuralNexusSection />
              </div>
            </div>

            {/* PROGRESS BAR (ESCRITORIO) */}
            <div className="fixed bottom-0 left-0 sm:left-20 w-full sm:w-[calc(100%-5rem)] h-1 bg-white/5 z-[100]">
              <div className="h-full bg-primary shadow-[0_0_15px_#00DC01] transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
            </div>
          </div>
        )}

        {currentPage === 'services' && (
          <div className="h-screen overflow-y-auto no-scrollbar relative">
            <BackgroundVideo fixed />
            <div className="relative z-20 py-20 sm:py-32 px-6 sm:px-10 max-w-6xl mx-auto">
              <header className="mb-16 sm:mb-20 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-6">
                  <span className="text-primary text-[8px] sm:text-[9px] font-black tracking-[0.4em] uppercase">Elite Solutions</span>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-poppins font-semibold text-white mb-6 sm:mb-8 tracking-tight leading-none">
                  {SERVICES_PAGE_CONTENT.title}
                </h1>
                <p className="text-base sm:text-xl text-gray-400 max-w-3xl leading-relaxed font-light mb-10">
                  {SERVICES_PAGE_CONTENT.intro}
                </p>
                <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="justify-center sm:justify-start" />
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-32">
                {SERVICES_PAGE_CONTENT.detailedServices.map((s, i) => (
                  <AnimatedSection key={i} delay={i * 0.05} 
                    className="glass p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 group hover:border-primary/40 transition-all duration-700 relative flex flex-col h-full overflow-hidden">
                    <div className="relative z-10 flex-1">
                      <div className="inline-block p-3 sm:p-4 rounded-2xl bg-primary/5 mb-6 sm:mb-8 border border-white/5">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-poppins font-bold mb-4 sm:mb-6 text-white group-hover:text-primary transition-all duration-500">{s.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm mb-8 leading-relaxed">{s.objective}</p>
                      <div className="space-y-3 sm:space-y-4 pt-6 mb-10 border-t border-white/5">
                        {s.deliverables.map((d, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span className="text-[9px] sm:text-[10px] text-primary/80 font-black uppercase tracking-[0.2em]">{d}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={navigateToAgenda} className="w-full py-4 glass border border-primary/20 text-primary font-black rounded-2xl text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Me interesa</button>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'courses' && (
          <div className="h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <BackgroundVideo fixed />
            <div className="glass p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-primary/20 max-w-2xl relative z-20">
              <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8">Cursos Gratis <span className="text-primary">—</span> Próximamente</h1>
              <p className="text-gray-400 text-sm sm:text-base mb-8">Estamos terminando de pulir nuestra academia IA. Deja tu correo para acceso prioritario.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <input type="email" placeholder="tu@email.com" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-sm" />
                <button className="bg-primary text-black font-black px-10 py-4 rounded-2xl uppercase tracking-widest text-[10px] sm:text-xs">Unirme</button>
              </div>
              <DiscountCTA onClick={() => setIsDiscountOpen(true)} className="justify-center" />
            </div>
          </div>
        )}
      </main>

      <VideoModal url={modalVideo.url} isOpen={modalVideo.isOpen} onClose={closeVideoModal} />
      <RegistrationModal isOpen={isDiscountOpen} onClose={() => setIsDiscountOpen(false)} />
      <WhatsAppButton />
    </div>
  );
};

export default App;
