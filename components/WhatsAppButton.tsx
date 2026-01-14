
import React from 'react';

const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/5215536317581?text=Hola%20MitZay%20Agency,%20me%20gustaría%20recibir%20más%20información%20sobre%20sus%20servicios.";

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,220,1,0.4)] hover:scale-110 transition-transform group relative"
        aria-label="Contactar por WhatsApp"
      >
        {/* Efecto de pulso externo */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
        
        <svg className="w-8 h-8 fill-black relative z-10" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.448-1.271.607-1.445.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.101-.177.211-.077.383.1.173.444.73.954 1.185.657.587 1.21.768 1.383.853.173.085.274.072.376-.045.101-.116.434-.506.549-.68.116-.173.231-.144.39-.087.158.058 1.012.477 1.185.564.173.085.289.129.332.202.043.073.043.419-.101.824z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
