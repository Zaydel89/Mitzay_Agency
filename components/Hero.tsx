
import React, { useState, useEffect } from 'react';
import { HERO_CONTENT, CTA_VARIATIONS, CALENDLY_URL } from '../constants';

const Hero: React.FC = () => {
  const [ctaIndex, setCtaIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % CTA_VARIATIONS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-full flex items-center justify-center text-center px-12 md:px-24 overflow-hidden">
      {/* Optimized Overlay Layer: Vignette effect to keep center clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 z-10 pointer-events-none"></div>
      
      {/* Enhanced Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-45 contrast-110 brightness-90"
        poster="https://images.squarespace-cdn.com/content/v1/51be3e56e4b09edc5f81e74c/1551795622591-1FBFE410OXSXACYA5C8Q/SciFi_WaspYellow.gif?format=1500w&poster=true"
      >
        <source src="https://images.squarespace-cdn.com/content/v1/51be3e56e4b09edc5f81e74c/1551795622591-1FBFE410OXSXACYA5C8Q/SciFi_WaspYellow.gif?format=2500w" type="video/mp4" />
      </video>

      <div className="relative z-20 max-w-6xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-primary">Transformación Digital IA</span>
        </div>
        
        <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] mb-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <span className="block mb-3">Convierte tu presencia digital</span>
          <span className="block text-primary drop-shadow-[0_0_20px_rgba(0,220,1,0.2)]">en ingresos recurrentes con IA</span>
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed mb-14 drop-shadow-sm">
          {HERO_CONTENT.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-block px-14 py-5 bg-primary text-black font-black rounded-2xl text-sm shadow-[0_15px_30px_rgba(0,220,1,0.25)] hover:shadow-primary/40 transition-all hover:scale-[1.03] active:scale-95 uppercase tracking-[0.2em]"
          >
            {CTA_VARIATIONS[ctaIndex]}
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4 opacity-70">
         <span className="text-[8px] font-black uppercase tracking-[0.6em] -rotate-90 origin-right translate-x-full text-primary">Explorar</span>
         <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(0,220,1,0.2)]">
            <svg className="w-4 h-4 rotate-[-90deg] text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 14l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
         </div>
      </div>
    </section>
  );
};

export default Hero;
