import React, { useState, useRef, useEffect } from 'react';
import { createBounceAnimation } from '../../utils/animationUtils';

interface AnimatedBlockProps {
  children: React.ReactNode;
  color?: string;
  draggable?: boolean;
  snapOnDrop?: boolean;
  onDragStart?: (data: any) => void;
  onDrop?: (data: any) => void;
}

const AnimatedBlock: React.FC<AnimatedBlockProps> = ({
  children,
  color = '#C586C0',
  draggable = false,
  snapOnDrop = true,
  onDragStart,
  onDrop
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (blockRef.current) {
      createBounceAnimation(blockRef.current, 2000);
    }
  }, []);
  
  const handleDragStart = (e: React.DragEvent) => {
    if (!draggable) return;
    
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'block', color }));
    
    if (onDragStart) {
      onDragStart({ type: 'block', color });
    }
    
    if (blockRef.current) {
      e.dataTransfer.setDragImage(blockRef.current, 20, 20);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    
    if (onDrop && data) {
      onDrop(JSON.parse(data));
    }
    
    if (snapOnDrop && blockRef.current) {
      blockRef.current.style.animation = 'blockSnap 0.3s ease-out';
      setTimeout(() => {
        if (blockRef.current) {
          blockRef.current.style.animation = '';
        }
      }, 300);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  return (
    <div
      ref={blockRef}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative p-4 m-2
        border-4 border-[#1E1E1E]
        transition-all duration-300
        cursor-${draggable ? 'grab' : 'default'}
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
        ${isHovered ? 'translate-y-[-5px]' : ''}
      `}
      style={{
        backgroundColor: color,
        transform: isHovered ? 'rotate(1deg)' : 'rotate(0deg)',
        boxShadow: isHovered
          ? '0 10px 25px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.2)',
        animation: 'blockSnap 0.5s ease-out'
      }}
    >
      <div className="absolute top-0 left-0 w-4 h-4 bg-[#1E1E1E]"></div>
      <div className="absolute top-0 right-0 w-4 h-4 bg-[#1E1E1E]"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#1E1E1E]"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#1E1E1E]"></div>
      
      <div className="relative z-10">
        {children}
      </div>
      
      {draggable && (
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#1E1E1E] flex items-center justify-center">
          <span className="text-white text-xs">↕</span>
        </div>
      )}
    </div>
  );
};

export default AnimatedBlock;