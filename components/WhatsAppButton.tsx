
import React from 'react';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "34600000000"; // Sustituir por el número real de MitZay Agency
  const message = "Hola MitZay Agency, me gustaría recibir información sobre vuestros servicios de IA y Marketing.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

  return (
    <>
      <style>{`
        /* Lógica de Toggle para el botón */
        .chat-menu:checked ~ .sticky-button .chat-icon {
          display: none;
        }
        .chat-menu:not(:checked) ~ .sticky-button .close-icon {
          display: none;
        }
        
        .sticky-button label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .sticky-chat {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 220, 1, 0.2);
          border-radius: 2rem;
          padding: 1.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-header .title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          line-height: 1.2;
        }

        .chat-header .title span {
          display: block;
          font-size: 0.7rem;
          color: #00DC01;
          font-weight: 400;
        }

        .chat-text {
          font-size: 0.85rem;
          color: #d1d5db;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .chat-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #00DC01;
          color: #000;
          font-weight: 900;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.8rem;
          border-radius: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .chat-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 220, 1, 0.3);
        }

        .chat-button svg {
          width: 1.2rem;
          height: 1.2rem;
        }
      `}</style>

      <input type="checkbox" id="whatsapp-toggle" className="chat-menu hidden" />
      
      <div className="sticky-button bg-primary text-black rounded-full shadow-[0_15px_40px_rgba(0,220,1,0.4)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center animate-bounce group">
        <label htmlFor="whatsapp-toggle" className="relative">
          {/* Tooltip */}
          <div className="absolute -top-14 right-0 bg-white text-black text-[9px] font-black px-5 py-2.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl tracking-tighter">
             HABLAR CON NOSOTROS
          </div>

          {/* WhatsApp Icon */}
          <svg className="chat-icon w-7 h-7 fill-black" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.448-1.271.607-1.445.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.101-.177.211-.077.383.1.173.444.73.954 1.185.657.587 1.21.768 1.383.853.173.085.274.072.376-.045.101-.116.434-.506.549-.68.116-.173.231-.144.39-.087.158.058 1.012.477 1.185.564.173.085.289.129.332.202.043.073.043.419-.101.824z" />
          </svg>
          
          {/* Close Icon */}
          <svg className="close-icon w-6 h-6 stroke-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </label>
      </div>

      <div className="sticky-chat">
        <div className="chat-content">
          <div className="chat-header">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
               <svg viewBox="0 0 24 24" className="w-6 h-6 fill-primary">
                 <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.448-1.271.607-1.445.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.101-.177.211-.077.383.1.173.444.73.954 1.185.657.587 1.21.768 1.383.853.173.085.274.072.376-.045.101-.116.434-.506.549-.68.116-.173.231-.144.39-.087.158.058 1.012.477 1.185.564.173.085.289.129.332.202.043.073.043.419-.101.824z" />
               </svg>
            </div>
            <div className="title">
              MitZay Agency
              <span>Atención Inmediata</span>
            </div>
          </div>
          <div className="chat-text">
            ¡Hola! 👋 Soy Zaydel. ¿Tienes alguna duda sobre cómo la IA puede automatizar tus ventas hoy mismo?
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="chat-button">
            Enviar mensaje
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default WhatsAppButton;