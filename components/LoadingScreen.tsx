
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dark">
      <style>{`
        .loader-container {
          background-image: radial-gradient(circle farthest-corner at center, #0A0A0A 0%, #000000 100%);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .loader {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          perspective: 800px;
          margin-bottom: 24px;
        }

        .inner {
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border-radius: 50%;  
        }

        .inner.one {
          left: 0%;
          top: 0%;
          animation: rotate-one 1s linear infinite;
          border-bottom: 3px solid #00DC01;
          box-shadow: 0 4px 12px rgba(0, 220, 1, 0.2);
        }

        .inner.two {
          right: 0%;
          top: 0%;
          animation: rotate-two 1s linear infinite;
          border-right: 3px solid #00DC01;
          box-shadow: 4px 0 12px rgba(0, 220, 1, 0.2);
        }

        .inner.three {
          right: 0%;
          bottom: 0%;
          animation: rotate-three 1s linear infinite;
          border-top: 3px solid #00DC01;
          box-shadow: 0 -4px 12px rgba(0, 220, 1, 0.2);
        }

        @keyframes rotate-one {
          0% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); }
          100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); }
        }

        @keyframes rotate-two {
          0% { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); }
          100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); }
        }

        @keyframes rotate-three {
          0% { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }
          100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); }
        }

        .loader-text {
          color: #00DC01;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          animation: pulse 2s ease-in-out infinite;
          margin-top: 10px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
      
      <div className="loader-container">
        <div className="loader">
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
        <div className="loader-text">Inicializando Núcleo IA</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
