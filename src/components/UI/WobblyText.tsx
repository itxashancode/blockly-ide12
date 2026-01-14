import React, { useEffect, useRef } from 'react';

interface WobblyTextProps {
  text: string;
  intensity?: number;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const WobblyText: React.FC<WobblyTextProps> = ({
  text,
  intensity = 3,
  animated = true,
  size = 'md'
}) => {
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl'
  };
  
  useEffect(() => {
    if (!animated) return;
    
    let animationFrameId: number;
    
    const animate = () => {
      const time = Date.now() * 0.001;
      
      lettersRef.current.forEach((letter, index) => {
        if (letter) {
          const offset = index * 0.2;
          const x = Math.sin(time + offset) * intensity;
          const y = Math.cos(time * 1.3 + offset) * intensity;
          const rotation = Math.sin(time * 0.7 + offset) * 5;
          
          letter.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animated, intensity]);
  
  return (
    <div className={`${sizeClasses[size]} font-bold font-mono tracking-tighter`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={el => lettersRef.current[index] = el}
          className="inline-block text-[#9CDCFE]"
          style={{
            animationDelay: `${index * 0.05}s`,
            animation: animated ? 'bounce 2s infinite' : 'none'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default WobblyText;