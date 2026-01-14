import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader-3d mb-12">
        <div className="inner-ring one"></div>
        <div className="inner-ring two"></div>
        <div className="inner-ring three"></div>
      </div>
      
      <div className="relative flex flex-col items-center">
        <img 
          src="https://res.cloudinary.com/dsiuc68hp/image/upload/v1768423930/favicon_verde_fovlm5.png" 
          className="w-10 h-10 object-contain mb-4 opacity-50 grayscale brightness-200"
          alt="MitZay Logo"
        />
        <div className="text-primary font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">
          Sincronizando Núcleo MitZay
        </div>
        <div className="mt-2 text-white/20 text-[8px] font-bold uppercase tracking-[0.2em]">
          Ecosistema Digital IA v2.5
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;