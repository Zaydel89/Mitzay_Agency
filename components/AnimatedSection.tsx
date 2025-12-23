
import React, { useEffect, useState, useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  triggerOnSectionActive?: boolean;
  isActive?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  id, 
  delay = 0,
  triggerOnSectionActive = false,
  isActive = false
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerOnSectionActive) {
      // Activamos la visibilidad cuando la sección está activa
      if (isActive) {
        const timer = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(timer);
      } else {
        // Reiniciamos al salir de la sección para que vuelva a desvanecerse al entrar
        setVisible(false);
      }
    } else {
      // Lógica de fallback para scroll vertical estándar
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [triggerOnSectionActive, isActive]);

  return (
    <div 
      id={id} 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-out ${
        visible ? 'opacity-100' : 'opacity-0 translate-y-0'
      }`}
      style={{ 
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
