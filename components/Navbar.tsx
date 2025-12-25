
import React from 'react';
import { Page } from '../types';
import { NAV_LINKS, HOME_SECTIONS } from '../constants';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onToggleAssistant: () => void;
  onScrollToSection?: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onToggleAssistant, onScrollToSection }) => {
  return (
    <>
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <nav className="fixed left-0 top-0 h-screen w-20 hover:w-64 glass border-r border-white/10 z-[100] hidden md:flex flex-col py-10 px-4 hover:px-6 justify-between transition-all duration-300 group/sidebar overflow-hidden">
        <div className="overflow-y-auto no-scrollbar">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-4 group mb-12 px-2"
          >
            <div className="flex-shrink-0 w-10 h-10 transition-transform duration-500 group-hover:rotate-12">
              <img 
                src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1766544939/LOGO_BN-removebg-preview_eamv9k.png" 
                alt="MitZay Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,220,1,0.5)]" 
              />
            </div>
            <span className="font-poppins font-black text-2xl tracking-tighter opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              MitZay<span className="text-primary">.</span>
            </span>
          </button>

          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-2 pl-3 opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">
              Navegación
            </p>
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`flex items-center gap-5 px-3 py-3 rounded-xl transition-all duration-300 group ${
                  currentPage === link.page 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  <span className={`w-2 h-2 rounded-full ${currentPage === link.page ? 'bg-primary animate-pulse' : 'bg-gray-700'}`}></span>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onToggleAssistant}
            className="w-full flex items-center gap-5 p-3 rounded-2xl glass border border-primary/20 hover:border-primary/50 transition-all group overflow-hidden relative"
            title="Hablar con IA"
          >
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center relative z-10">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#00DC01]"></div>
            </div>
            <span className="relative z-10 text-[9px] uppercase tracking-widest font-black text-primary opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Hablar con IA
            </span>
          </button>
        </div>
      </nav>

      {/* MOBILE TAB BAR NAVIGATION */}
      <nav className="fixed bottom-0 left-0 w-full h-16 glass border-t border-white/10 z-[150] flex md:hidden items-center justify-around px-4">
        {NAV_LINKS.map((link) => (
          <button
            key={link.page}
            onClick={() => onNavigate(link.page)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentPage === link.page ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${currentPage === link.page ? 'bg-primary' : 'bg-transparent'}`}></div>
            <span className="text-[8px] font-black tracking-widest uppercase">
              {link.label}
            </span>
          </button>
        ))}
        
        {/* IA Assistant Toggle in Mobile Nav */}
        <button
          onClick={onToggleAssistant}
          className="relative flex flex-col items-center justify-center w-12 h-12 bg-primary/10 border border-primary/20 rounded-full text-primary -translate-y-4 shadow-[0_-10px_20px_rgba(0,220,1,0.2)]"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00DC01]"></div>
          <span className="text-[6px] font-black uppercase tracking-tighter mt-1">Chat IA</span>
        </button>

        {/* Home Quick Jump (Icon for scroll to top/home) */}
        <button
          onClick={() => {
            if (currentPage === 'home' && onScrollToSection) {
              onScrollToSection(0);
            } else {
              onNavigate('home');
            }
          }}
          className="flex flex-col items-center gap-1 text-gray-500"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-transparent"></div>
          <span className="text-[8px] font-black tracking-widest uppercase">
            {currentPage === 'home' ? 'Inicio' : 'Volver'}
          </span>
        </button>
      </nav>

      {/* MOBILE TOP LOGO (Header) */}
      <div className="fixed top-0 left-0 w-full h-16 glass border-b border-white/10 z-[150] flex md:hidden items-center justify-between px-6">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
          <img 
            src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1766544939/LOGO_BN-removebg-preview_eamv9k.png" 
            alt="Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-poppins font-black text-lg tracking-tighter">
            MitZay<span className="text-primary">.</span>
          </span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">IA Activa</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
