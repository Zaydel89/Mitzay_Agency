
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
      <div className="text-lg md:text-2xl font-black text-primary tracking-tighter tabular-nums drop-shadow-[0_0_8px_rgba(0,220,1,0.3)]">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[6px] md:text-[7px] font-black text-gray-500 uppercase tracking-[0.2em] mt-0.5">{label}</div>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-3 md:gap-7 py-4 px-6 glass border border-primary/20 rounded-[2rem] mb-12 max-w-[360px] mx-auto relative group/countdown overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/countdown:opacity-100 transition-opacity duration-500"></div>
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
      
      <div className="flex flex-col items-center md:items-start mr-2">
        <span className="text-[7px] font-black text-primary uppercase tracking-[0.3em] mb-0.5 animate-pulse">Acceso VIP</span>
        <span className="text-[8px] font-bold text-white uppercase tracking-widest whitespace-nowrap">Cierre de Comunidad</span>
      </div>

      <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

      <div className="flex gap-3 md:gap-5">
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
    <footer className="w-full glass p-10 md:p-12 rounded-[3.5rem] border border-primary/20 shadow-3xl text-center relative overflow-hidden group">
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
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-6 flex items-center justify-center hover:rotate-6 transition-transform cursor-pointer" onClick={() => onNavigate('home')}>
             <img 
               src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1766544939/LOGO_BN-removebg-preview_eamv9k.png" 
               alt="Logo MitZay" 
               className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,220,1,0.6)]"
             />
          </div>
          <span className="font-poppins font-bold text-3xl tracking-tighter text-white">MitZay<span className="text-primary">.</span></span>
          <p className="text-gray-300 text-[13px] md:text-sm mt-4 max-w-xs mx-auto leading-relaxed font-medium">
            {FOOTER_CONTENT.microcopy}
          </p>
        </div>

        {/* Countdown Section */}
        <CountdownTimer />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="text-left">
              <h4 className="font-black mb-4 text-primary/40 uppercase tracking-[0.4em] text-[8px]">Secciones Home</h4>
              <ul className="space-y-3">
                {HOME_SECTIONS.map(sec => (
                  <li key={sec.index}>
                    <button 
                      onClick={() => {
                        onNavigate('home');
                        setTimeout(() => onScrollToSection?.(sec.index), 100);
                      }} 
                      className="text-gray-400 hover:text-primary transition-colors font-bold text-[11px] tracking-tight uppercase"
                    >
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-left">
              <h4 className="font-black mb-4 text-primary/40 uppercase tracking-[0.4em] text-[8px]">Contacto</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://api.whatsapp.com/send?phone=5215536317581&text=Hola%20Zaydel%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20tus%20servicios%20en%20MitZay%20Agency." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-primary transition-colors font-bold text-[11px] tracking-tight flex items-center gap-2 group/item"
                  >
                    <div className="w-1 h-1 bg-primary/40 rounded-full group-hover/item:bg-primary transition-colors"></div>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:zaydel.mitzay@gmail.com" 
                    className="text-gray-400 hover:text-primary transition-colors font-bold text-[11px] tracking-tight flex items-center gap-2 group/item"
                  >
                    <div className="w-1 h-1 bg-primary/40 rounded-full group-hover/item:bg-primary transition-colors"></div>
                    Email
                  </a>
                </li>
                <li>
                  <a 
                    href="https://t.me/mitzay_ia" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-primary transition-colors font-bold text-[11px] tracking-tight flex items-center gap-2 group/item"
                  >
                    <div className="w-1 h-1 bg-primary/40 rounded-full group-hover/item:bg-primary transition-colors"></div>
                    Telegram
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 text-left">
              <h4 className="font-black mb-4 text-primary/40 uppercase tracking-[0.4em] text-[8px]">Social</h4>
              <div className="flex flex-wrap gap-2">
                {FOOTER_CONTENT.socials.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-lg text-gray-400 hover:bg-primary hover:text-black transition-all font-black text-[8px] tracking-widest uppercase border border-white/5"
                    aria-label={social.name}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
        </div>

        <div className="pt-10 border-t border-white/10 space-y-4">
          <div className="flex justify-center gap-6 text-[7px] font-black uppercase tracking-[0.4em] text-gray-500">
             <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
             <a href="#" className="hover:text-primary transition-colors">Cookies</a>
             <a href="#" className="hover:text-primary transition-colors">Aviso Legal</a>
          </div>
          <p className="text-[7px] text-gray-600 font-black uppercase tracking-[0.6em]">
             {FOOTER_CONTENT.legal}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
