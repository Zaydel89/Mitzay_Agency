
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

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 group transition-all"
        >
          <div className="w-8 h-8 bg-primary rounded shadow-[0_0_10px_#00DC01] group-hover:rotate-12 transition-transform"></div>
          <span className="font-poppins font-bold text-2xl tracking-tight">MitZay<span className="text-primary">.</span></span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`text-sm font-medium transition-colors ${
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
            <span className="text-xs uppercase tracking-widest font-semibold">Hablar con IA</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="bg-primary text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/30"
          >
            Agendar Consulta
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-b border-white/10 p-6 flex flex-col gap-6 animate-fade-in shadow-2xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMobileMenuOpen(false); }}
              className={`text-xl font-bold font-poppins text-left ${
                currentPage === link.page ? 'text-primary' : 'text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => { onToggleAssistant(); setMobileMenuOpen(false); }}
            className="bg-white/5 p-4 rounded-xl border border-white/10 text-left"
          >
            Preguntar a la IA
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
