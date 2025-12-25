
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { FOOTER_CONTENT, NAV_LINKS, HOME_SECTIONS } from '../constants';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onScrollToSection?: (index: number) => void;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(`December 31, ${currentYear} 23:59:59`);
      
      // Si ya pasó el 31 de diciembre de este año, apuntar al próximo año
      if (now > targetDate) {
        targetDate = new Date(`December 31, ${currentYear + 1} 23:59:59`);
      }

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="text-2xl md:text-3xl font-black text-primary tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(0,220,1,0.3)]">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[7px] md:text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] mt-1">{label}</div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-6 md:gap-10 py-8 px-10 glass border border-primary/20 rounded-3xl mb-16 max-w-lg mx-auto relative group/countdown overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/countdown:opacity-100 transition-opacity duration-500"></div>
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      
      <div className="flex flex-col items-center md:items-start mr-4">
        <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-1 animate-pulse">Acceso VIP</span>
        <span className="text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap">Cierre de Comunidad</span>
      </div>

      <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>

      <div className="flex gap-4 md:gap-6">
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  );
};

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
        <div className="flex flex-col items-center mb-10">
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

        {/* Countdown Section */}
        <CountdownTimer />

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
              <span className="text-primary font-black uppercase tracking-widest text-[9px] block mb-4">
                Escríbenos
              </span>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://api.whatsapp.com/send?phone=5215536317581&text=Hola%20Zaydel%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20servicios%20en%20MitZay%20Agency." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-primary transition-colors font-bold text-xs tracking-tight flex items-center gap-2 group/item"
                  >
                    <div className="w-1 h-1 bg-primary/40 rounded-full group-hover/item:bg-primary transition-colors"></div>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:zaydel.mitzay@gmail.com" 
                    className="text-gray-400 hover:text-primary transition-colors font-bold text-xs tracking-tight flex items-center gap-2 group/item"
                  >
                    <div className="w-1 h-1 bg-primary/40 rounded-full group-hover/item:bg-primary transition-colors"></div>
                    zaydel.mitzay@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="https://t.me/mitzay_ia" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-primary transition-colors font-bold text-xs tracking-tight flex items-center gap-2 group/item"
                  >
                    <div className="w-1 h-1 bg-primary/40 rounded-full group-hover/item:bg-primary transition-colors"></div>
                    Telegram
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 text-left">
              <h4 className="font-black mb-6 text-primary/40 uppercase tracking-[0.4em] text-[8px]">Social</h4>
              <div className="flex flex-wrap gap-3">
                {FOOTER_CONTENT.socials.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
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
