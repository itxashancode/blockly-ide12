import React, { useState } from 'react';
import { createPressEffect } from '../../utils/animationUtils';

interface BlockyButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // Make it optional
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  blocky?: boolean;
  animated?: boolean;
  type?: 'button' | 'submit' | 'reset'; // Add type prop
  disabled?: boolean; // Add disabled prop
}

const BlockyButton: React.FC<BlockyButtonProps> = ({
  children,
  onClick,
  color = '#007ACC',
  size = 'md',
  blocky = true,
  animated = true,
  type = 'button',
  disabled = false
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (disabled) return;
    
    const button = e.currentTarget as HTMLElement;
    if (animated) {
      createPressEffect(button);
    }
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    // Check if onClick exists before calling it
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      disabled={disabled}
      className={`
        relative font-mono font-bold tracking-wider
        border-2 border-[#007ACC]
        transition-all duration-150
        active:translate-y-1
        ${sizeClasses[size]}
        ${blocky ? 'rounded-none' : 'rounded-lg'}
        ${isPressed ? 'translate-y-1 scale-95' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        backgroundColor: color,
        color: '#FFFFFF',
        transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered && !disabled
          ? `0 8px 0 ${color}80, 0 12px 20px rgba(0, 122, 204, 0.3)`
          : `0 4px 0 ${color}80, 0 6px 10px rgba(0, 122, 204, 0.2)`,
        animation: animated && !disabled ? 'glow 2s infinite alternate' : 'none',
        pointerEvents: disabled ? 'none' : 'auto'
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
          animation: disabled ? 'none' : 'shimmer 2s infinite'
        }}
      />
    </button>
  );
};

export default BlockyButton;