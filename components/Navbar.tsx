
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onToggleAssistant: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onToggleAssistant }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  const navigateAndClose = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled || mobileMenuOpen ? 'glass py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <button 
          onClick={() => navigateAndClose('home')} 
          className="flex items-center gap-2 group transition-all"
        >
          <div className="w-8 h-8 bg-primary rounded shadow-[0_0_10px_#00DC01] group-hover:rotate-12 transition-transform"></div>
          <span className="font-poppins font-bold text-xl md:text-2xl tracking-tight">MitZay<span className="text-primary">.</span></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`text-xs lg:text-sm font-bold tracking-wide transition-colors ${
                currentPage === link.page ? 'text-primary' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onToggleAssistant}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 hover:border-primary/50 transition-all"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-widest font-black">Hablar con IA</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="bg-primary text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-tight hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/30"
          >
            Agendar Consulta
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-x-0 top-full glass border-b border-white/10 p-6 flex flex-col gap-6 transition-all duration-300 transform shadow-2xl ${mobileMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible'}`}>
        {NAV_LINKS.map((link) => (
          <button
            key={link.page}
            onClick={() => navigateAndClose(link.page)}
            className={`text-2xl font-bold font-poppins text-left ${
              currentPage === link.page ? 'text-primary' : 'text-white'
            }`}
          >
            {link.label}
          </button>
        ))}
        <div className="h-px bg-white/10 my-2"></div>
        <button 
          onClick={() => { onToggleAssistant(); setMobileMenuOpen(false); }}
          className="flex items-center justify-between bg-primary/10 p-5 rounded-2xl border border-primary/20 text-left group active:bg-primary/20"
        >
          <span className="font-bold text-primary">Preguntar a la IA</span>
          <div className="w-8 h-8 bg-primary text-black rounded-full flex items-center justify-center">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </button>
        <button
          onClick={() => navigateAndClose('home')}
          className="w-full bg-primary text-black py-4 rounded-2xl font-black text-center shadow-xl uppercase tracking-widest text-sm"
        >
          Agendar Consulta Gratis
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
