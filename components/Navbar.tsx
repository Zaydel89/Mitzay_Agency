
import React, { useState } from 'react';
import { Page } from '../types';
import { NAV_LINKS, HOME_SECTIONS } from '../constants';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onScrollToSection?: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onScrollToSection }) => {
  const [isHomeHovered, setIsHomeHovered] = useState(false);

  return (
    <>
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <nav 
        className="fixed left-0 top-0 h-screen w-20 hover:w-64 glass border-r border-white/10 z-[100] hidden md:flex flex-col py-10 px-4 transition-all duration-300 group/sidebar overflow-hidden"
        onMouseEnter={() => setIsHomeHovered(true)}
        onMouseLeave={() => setIsHomeHovered(false)}
      >
        <div className="flex-1 flex flex-col">
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
            <span className="font-poppins font-black text-2xl tracking-tighter opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">
              MitZay<span className="text-primary">.</span>
            </span>
          </button>

          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-4 pl-3 opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
              Menú Principal
            </p>
            
            {NAV_LINKS.map((link) => (
              <div key={link.page} className="flex flex-col">
                <button
                  onClick={() => onNavigate(link.page)}
                  className={`flex items-center gap-5 px-3 py-3 rounded-xl transition-all duration-300 group ${
                    currentPage === link.page 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                    <span className={`w-2 h-2 rounded-full ${currentPage === link.page ? 'bg-primary animate-pulse' : 'bg-gray-700'}`}></span>
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
                    {link.label}
                  </span>
                </button>

                {/* Submenú de secciones para HOME */}
                {link.page === 'home' && (
                  <div className={`flex flex-col gap-1 ml-9 mt-2 overflow-hidden transition-all duration-500 ${isHomeHovered ? 'max-h-64 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                    {HOME_SECTIONS.map((section) => (
                      <button
                        key={section.index}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('home');
                          setTimeout(() => onScrollToSection?.(section.index), 50);
                        }}
                        className="text-left text-[8px] font-bold text-gray-500 hover:text-primary py-1.5 uppercase tracking-widest transition-colors whitespace-nowrap"
                      >
                        • {section.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* MOBILE TAB BAR NAVIGATION (Updated with Logo and Agency Name) */}
      <nav className="fixed bottom-0 left-0 w-full h-16 glass border-t border-white/10 z-[150] flex md:hidden items-center justify-between px-6">
        {/* Brand in Menu */}
        <button 
          onClick={() => {
            onNavigate('home');
            onScrollToSection?.(0);
          }} 
          className="flex items-center gap-2"
        >
          <img 
            src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1766544939/LOGO_BN-removebg-preview_eamv9k.png" 
            alt="Logo" 
            className="w-6 h-6" 
          />
          <span className="font-poppins font-black text-[10px] tracking-tight">
            MitZay<span className="text-primary">.</span>
          </span>
        </button>

        <div className="flex items-center gap-6">
          {NAV_LINKS.filter(link => link.page !== 'home').map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`flex flex-col items-center gap-1 ${currentPage === link.page ? 'text-primary' : 'text-gray-500'}`}
            >
              <span className="text-[8px] font-black tracking-widest uppercase">{link.label}</span>
            </button>
          ))}
          {currentPage === 'home' && (
             <button
               onClick={() => onScrollToSection?.(0)}
               className="flex flex-col items-center gap-1 text-gray-500"
             >
               <span className="text-[8px] font-black tracking-widest uppercase">INICIO</span>
             </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
