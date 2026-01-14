
import React, { useState } from 'react';
import { Page } from '../types';
import { NAV_LINKS, HOME_SECTIONS } from '../constants';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onScrollToSection?: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onScrollToSection }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogoClick = () => {
    onNavigate('home');
    if (onScrollToSection) {
      onScrollToSection(0);
    }
  };

  return (
    <>
      <nav 
        className="fixed left-0 top-0 h-screen w-20 hover:w-64 glass border-r border-white/10 z-[100] hidden md:flex flex-col py-10 px-4 transition-all duration-300 group/sidebar overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-1 flex flex-col">
          <button onClick={handleLogoClick} className="flex items-center gap-4 mb-12 px-2 group">
            <img src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1766544939/LOGO_BN-removebg-preview_eamv9k.png" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(0,220,1,0.5)]" />
            <span className="font-poppins font-black text-2xl tracking-tighter opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">MitZay<span className="text-primary">.</span></span>
          </button>

          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <div key={link.page} className="flex flex-col">
                <button
                  onClick={() => onNavigate(link.page)}
                  className={`flex items-center gap-5 px-3 py-3 rounded-xl transition-all duration-300 ${currentPage === link.page ? 'bg-primary/10 text-primary border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="text-[10px] font-black tracking-widest uppercase opacity-0 group-hover/sidebar:opacity-100 transition-opacity">{link.label}</span>
                </button>
                {link.page === 'home' && isHovered && (
                  <div className="ml-9 mt-2 flex flex-col gap-1">
                    {HOME_SECTIONS.map((sec) => (
                      <button key={sec.index} onClick={() => onScrollToSection?.(sec.index)} className="text-left text-[8px] font-bold text-gray-500 hover:text-primary py-1 uppercase tracking-widest whitespace-nowrap transition-colors">• {sec.label}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* MOBILE NAV BAR */}
      <nav className="fixed bottom-0 left-0 w-full h-16 glass border-t border-white/10 z-[150] flex md:hidden items-center justify-around px-4">
        {NAV_LINKS.map(link => (
          <button 
            key={link.page} 
            onClick={() => onNavigate(link.page)} 
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1.5 transition-all ${currentPage === link.page ? 'text-primary' : 'text-gray-500'}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${currentPage === link.page ? 'bg-primary' : 'bg-transparent'} transition-all`}></div>
            <span className="text-[7px] font-black tracking-[0.2em] uppercase text-center">{link.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
