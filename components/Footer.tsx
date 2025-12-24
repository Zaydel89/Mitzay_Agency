
import React from 'react';
import { Page } from '../types';
import { FOOTER_CONTENT, NAV_LINKS, HOME_SECTIONS } from '../constants';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onScrollToSection?: (index: number) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onScrollToSection }) => {
  return (
    <footer className="w-full glass p-14 md:p-16 rounded-[4rem] border border-primary/20 shadow-3xl text-center relative overflow-hidden group">
      {/* Dynamic Background Video with Green Tint */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen brightness-50 grayscale hover:grayscale-0 transition-all duration-1000"
      >
        <source src="https://res.cloudinary.com/dsiuc68hp/video/upload/v1766435418/3129671-hd_1920_1080_30fps_wx862f.mp4" type="video/mp4" />
      </video>

      {/* Layer Overlays for Deep Green Aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-green-950/60 to-black/80 z-[1]"></div>
      <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay z-[1]"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full z-[1] animate-pulse-slow"></div>
      
      {/* Content Area */}
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="w-20 h-20 mb-8 flex items-center justify-center hover:rotate-6 transition-transform cursor-pointer" onClick={() => onNavigate('home')}>
             <img 
               src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1766544939/LOGO_BN-removebg-preview_eamv9k.png" 
               alt="Logo MitZay" 
               className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,220,1,0.6)]"
             />
          </div>
          <span className="font-poppins font-bold text-4xl tracking-tighter text-white">MitZay<span className="text-primary">.</span></span>
          <p className="text-gray-300 text-sm md:text-base mt-6 max-w-sm mx-auto leading-relaxed font-medium">
            {FOOTER_CONTENT.microcopy}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="font-black mb-6 text-primary/40 uppercase tracking-[0.4em] text-[8px]">Secciones Home</h4>
              <ul className="space-y-4">
                {HOME_SECTIONS.map(sec => (
                  <li key={sec.index}>
                    <button 
                      onClick={() => {
                        onNavigate('home');
                        setTimeout(() => onScrollToSection?.(sec.index), 100);
                      }} 
                      className="text-gray-400 hover:text-primary transition-colors font-bold text-xs tracking-tight uppercase"
                    >
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-left">
              <h4 className="font-black mb-6 text-primary/40 uppercase tracking-[0.4em] text-[8px]">Contacto</h4>
              <p className="text-gray-400 font-bold mb-3 text-sm tracking-tight">{FOOTER_CONTENT.contact}</p>
              <a href="mailto:info@mitzay.agency" className="text-primary font-black hover:underline uppercase tracking-widest text-[9px] shadow-primary/20 drop-shadow-sm">
                Escríbenos →
              </a>
            </div>

            <div className="col-span-2 text-left">
              <h4 className="font-black mb-6 text-primary/40 uppercase tracking-[0.4em] text-[8px]">Social</h4>
              <div className="flex flex-wrap gap-3">
                {FOOTER_CONTENT.socials.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    className="px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-xl text-gray-400 hover:bg-primary hover:text-black transition-all font-black text-[9px] tracking-widest uppercase border border-white/5"
                    aria-label={social.name}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
        </div>

        <div className="pt-12 border-t border-white/10 space-y-6">
          <div className="flex justify-center gap-8 text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">
             <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
             <a href="#" className="hover:text-primary transition-colors">Cookies</a>
             <a href="#" className="hover:text-primary transition-colors">Aviso Legal</a>
          </div>
          <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.8em]">
             {FOOTER_CONTENT.legal}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
