
import React from 'react';
import { Page } from '../types';
import { FOOTER_CONTENT, NAV_LINKS } from '../constants';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded shadow-[0_0_10px_#00DC01]"></div>
              <span className="font-poppins font-bold text-2xl">MitZay<span className="text-primary">.</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {FOOTER_CONTENT.microcopy}
            </p>
          </div>

          <div>
            <h4 className="font-poppins font-bold mb-6 text-white uppercase tracking-widest text-xs">Agencia</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.page}>
                  <button onClick={() => onNavigate(link.page)} className="text-gray-500 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-bold mb-6 text-white uppercase tracking-widest text-xs">Contacto</h4>
            <p className="text-gray-500 text-sm mb-4">{FOOTER_CONTENT.contact}</p>
            <a href="mailto:info@mitzay.agency" className="text-primary text-sm font-bold hover:underline">
              Escríbenos ahora →
            </a>
          </div>

          <div>
            <h4 className="font-poppins font-bold mb-6 text-white uppercase tracking-widest text-xs">Social</h4>
            <div className="flex flex-wrap gap-4">
              {FOOTER_CONTENT.socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all"
                  aria-label={social.name}
                >
                  <span className="text-xs font-bold uppercase tracking-tighter">
                    {social.name.substring(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
          <p className="text-xs text-gray-600">
            {FOOTER_CONTENT.legal}
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors">{FOOTER_CONTENT.privacy}</a>
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors">{FOOTER_CONTENT.cookies}</a>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[10px] text-gray-800 uppercase tracking-[0.8em] font-black">
            ENGINEERING THE FUTURE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
