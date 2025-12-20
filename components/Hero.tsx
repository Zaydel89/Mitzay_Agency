
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
    <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
      {/* Video Background Layer */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="https://images.squarespace-cdn.com/content/v1/51be3e56e4b09edc5f81e74c/1551795622591-1FBFE410OXSXACYA5C8Q/SciFi_WaspYellow.gif?format=1500w&poster=true"
      >
        <source src="https://images.squarespace-cdn.com/content/v1/51be3e56e4b09edc5f81e74c/1551795622591-1FBFE410OXSXACYA5C8Q/SciFi_WaspYellow.gif?format=2500w" type="video/mp4" />
      </video>

      <div className="relative z-20 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">Transformación Digital IA</span>
        </div>
        
        <h1 className="font-poppins text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-2xl">
          <span className="block md:hidden">{HERO_CONTENT.h1_mobile}</span>
          <span className="hidden md:block leading-[1.1]">{HERO_CONTENT.h1}</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto font-medium leading-relaxed">
          {HERO_CONTENT.subheadline}
        </p>

        <div className="pt-8">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-primary text-black font-extrabold rounded-full text-lg shadow-[0_0_30px_rgba(0,220,1,0.4)] hover:shadow-[0_0_60px_rgba(0,220,1,0.6)] transition-all hover:scale-110 active:scale-95 min-w-[300px]"
          >
            {CTA_VARIATIONS[ctaIndex]}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
