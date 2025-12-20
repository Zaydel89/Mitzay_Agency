
import React from 'react';
import { CALENDLY_SECTION, CALENDLY_URL } from '../constants';
import AnimatedSection from './AnimatedSection';

const Contact: React.FC = () => {
  const openCalendly = () => {
    // Assuming Calendly is already in index.html, we use the widget
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <h2 className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4">Contacto Directo</h2>
          <h3 className="text-5xl md:text-6xl font-poppins font-bold mb-8">{CALENDLY_SECTION.headline}</h3>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            {CALENDLY_SECTION.copy}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 glass rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="text-2xl">📧</div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Email</p>
                <p className="font-bold">info@mitzay.agency</p>
              </div>
            </div>
            <div className="p-6 glass rounded-2xl border border-white/5 flex items-center gap-4">
              <div className="text-2xl">🌐</div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Ubicación</p>
                <p className="font-bold">Madrid & Global</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass rounded-[3rem] p-12 text-center border border-white/10 shadow-3xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 animate-pulse">
                📅
              </div>
              <h4 className="text-3xl font-poppins font-bold mb-4">Hablemos hoy</h4>
              <p className="text-gray-400 mb-10 max-w-sm mx-auto">
                Selecciona tu zona horaria y elige un hueco de 15 minutos en el calendario de MitZay.
              </p>
              <button 
                onClick={openCalendly}
                className="px-12 py-5 bg-primary text-black font-extrabold rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,220,1,0.2)] hover:shadow-primary/40 text-lg"
              >
                Reservar Sesión
              </button>
              <div className="mt-8 flex justify-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/10"></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;
