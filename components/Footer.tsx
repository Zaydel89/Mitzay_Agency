import React from 'react';
import { FOOTER_CONTENT } from '../constants';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onScrollToSection?: (index: number) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onScrollToSection }) => {
  return (
    <footer className="w-full glass p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] border border-primary/20 text-center relative overflow-hidden">
      <div className="relative z-10">
        <img src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1768423930/favicon_verde_fovlm5.png" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6" />
        <h4 className="font-poppins font-bold text-2xl sm:text-3xl mb-3 sm:mb-4">MitZay<span className="text-primary">.</span></h4>
        <p className="text-gray-400 text-[10px] sm:text-xs max-w-xs mx-auto mb-8 sm:mb-10">{FOOTER_CONTENT.microcopy}</p>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          {FOOTER_CONTENT.socials.map(s => (
            <a key={s.name} href={s.url} className="px-4 sm:px-5 py-2 glass rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">{s.name}</a>
          ))}
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <p className="text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">{FOOTER_CONTENT.legal}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;