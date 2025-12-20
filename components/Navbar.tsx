
import React from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onToggleAssistant: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onToggleAssistant }) => {
  return (
    <nav className="fixed left-0 top-0 h-screen w-20 hover:w-64 glass border-r border-white/10 z-[100] hidden md:flex flex-col py-10 px-4 hover:px-6 justify-between transition-all duration-300 group/sidebar overflow-hidden">
      {/* Top: Logo */}
      <div>
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-4 group mb-16 px-2"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-xl shadow-[0_0_15px_#00DC01] group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center text-black font-black">
            M
          </div>
          <span className="font-poppins font-black text-2xl tracking-tighter opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            MitZay<span className="text-primary">.</span>
          </span>
        </button>

        {/* Center: Navigation */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-4 pl-3 opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">
            Navegación
          </p>
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`flex items-center gap-5 px-3 py-4 rounded-2xl transition-all duration-300 group ${
                currentPage === link.page 
                ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(0,220,1,0.1)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                <span className={`w-2 h-2 rounded-full ${currentPage === link.page ? 'bg-primary animate-pulse' : 'bg-gray-700 group-hover:bg-gray-400 transition-colors'}`}></span>
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {link.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom: Action Buttons */}
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
        
        <div className="pt-4 border-t border-white/5">
          <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest text-center group-hover/sidebar:block hidden transition-all duration-300">
            Engineering the Future
          </p>
          <div className="w-full flex justify-center group-hover/sidebar:hidden">
            <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
