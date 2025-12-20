
import React, { useState, useEffect } from 'react';
import { HERO_CONTENT, CTA_VARIATIONS, CALENDLY_URL } from '../constants';

const Hero: React.FC = () => {
  const [ctaIndex, setCtaIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % CTA_VARIATIONS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center text-center px-4 md:px-6 overflow-hidden pt-20">
      {/* Video Background Layer */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
        poster="https://images.squarespace-cdn.com/content/v1/51be3e56e4b09edc5f81e74c/1551795622591-1FBFE410OXSXACYA5C8Q/SciFi_WaspYellow.gif?format=1500w&poster=true"
      >
        <source src="https://images.squarespace-cdn.com/content/v1/51be3e56e4b09edc5f81e74c/1551795622591-1FBFE410OXSXACYA5C8Q/SciFi_WaspYellow.gif?format=2500w" type="video/mp4" />
      </video>

      <div className="relative z-20 max-w-6xl mx-auto space-y-6 md:space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-primary">Transformación Digital IA</span>
        </div>
        
        <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl mx-auto">
          <span className="block md:hidden max-w-[280px] mx-auto leading-tight sm:max-w-none">{HERO_CONTENT.h1_mobile}</span>
          <span className="hidden md:block leading-[1.1] max-w-[900px] mx-auto" style={{ textWrap: 'balance' }}>
            {HERO_CONTENT.h1}
          </span>
        </h1>
        
        <p className="mt-4 md:mt-8 text-base md:text-lg lg:text-xl text-gray-300 max-w-[280px] sm:max-w-2xl lg:max-w-3xl mx-auto font-medium leading-relaxed">
          {HERO_CONTENT.subheadline}
        </p>

        <div className="pt-6 md:pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-block px-8 md:px-12 py-4 md:py-5 bg-primary text-black font-extrabold rounded-full text-base md:text-lg shadow-[0_0_20px_rgba(0,220,1,0.3)] hover:shadow-[0_0_40px_rgba(0,220,1,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            {CTA_VARIATIONS[ctaIndex]}
          </a>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest block sm:hidden">Plan personalizado en 30 min</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
