
import React from 'react';
import { Page } from '../types';
import { FOOTER_CONTENT, NAV_LINKS } from '../constants';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full glass p-14 md:p-16 rounded-[4rem] border border-white/5 shadow-3xl text-center relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
      
      <div className="flex flex-col items-center mb-16 relative z-10">
        <div className="w-12 h-12 bg-primary rounded-2xl shadow-[0_0_20px_rgba(0,220,1,0.3)] mb-8 flex items-center justify-center text-black font-black text-lg">M</div>
        <span className="font-poppins font-black text-3xl tracking-tighter">MitZay<span className="text-primary">.</span></span>
        <p className="text-gray-500 text-sm md:text-base mt-6 max-w-sm mx-auto leading-relaxed font-medium">
          {FOOTER_CONTENT.microcopy}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 max-w-4xl mx-auto relative z-10">
          <div className="text-left">
            <h4 className="font-black mb-6 text-white/30 uppercase tracking-[0.4em] text-[8px]">Agencia</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.page}>
                  <button onClick={() => onNavigate(link.page)} className="text-gray-400 hover:text-primary transition-colors font-bold text-sm tracking-tight">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h4 className="font-black mb-6 text-white/30 uppercase tracking-[0.4em] text-[8px]">Contacto</h4>
            <p className="text-gray-400 font-bold mb-3 text-sm tracking-tight">{FOOTER_CONTENT.contact}</p>
            <a href="mailto:info@mitzay.agency" className="text-primary font-black hover:underline uppercase tracking-widest text-[9px]">
              Escríbenos →
            </a>
          </div>

          <div className="col-span-2 text-left">
            <h4 className="font-black mb-6 text-white/30 uppercase tracking-[0.4em] text-[8px]">Social</h4>
            <div className="flex flex-wrap gap-3">
              {FOOTER_CONTENT.socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  className="px-5 py-2.5 bg-white/5 rounded-xl text-gray-400 hover:bg-primary hover:text-black transition-all font-black text-[9px] tracking-widest uppercase border border-white/5"
                  aria-label={social.name}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
      </div>

      <div className="pt-12 border-t border-white/5 space-y-6 relative z-10">
        <div className="flex justify-center gap-8 text-[8px] font-black uppercase tracking-[0.4em] text-gray-600">
           <a href="#" className="hover:text-white transition-colors">Privacidad</a>
           <a href="#" className="hover:text-white transition-colors">Cookies</a>
           <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
        </div>
        <p className="text-[8px] text-gray-700 font-black uppercase tracking-[0.8em]">
           {FOOTER_CONTENT.legal}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
