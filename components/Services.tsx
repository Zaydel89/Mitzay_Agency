
import React from 'react';
import { SERVICES_OVERVIEW } from '../constants';
import AnimatedSection from './AnimatedSection';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-primary text-sm font-bold tracking-[0.4em] uppercase mb-4">Ecosistema MitZay</h2>
          <h3 className="text-4xl md:text-6xl font-poppins font-bold">Arquitectura para el Crecimiento</h3>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Combinamos diseño estético con ingeniería de automatización para resultados exponenciales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_OVERVIEW.map((service, index) => (
            <AnimatedSection key={service.id}>
              <div 
                className="glass p-8 h-full rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all hover:translate-y-[-12px] group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-8xl">{service.icon}</span>
                </div>
                
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                
                <h4 className="text-2xl font-poppins font-bold mb-4">{service.title}</h4>
                <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    Saber Más
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
