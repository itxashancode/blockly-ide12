export const createBounceAnimation = (element: HTMLElement, duration: number = 1000) => {
  element.style.animation = `bounce ${duration}ms ease-in-out`;
};

export const createWobbleAnimation = (element: HTMLElement, intensity: number = 5) => {
  element.style.transform = `translateX(${Math.sin(Date.now() * 0.01) * intensity}px)`;
};

export const createNeonGlow = (element: HTMLElement, color: string = '#007ACC') => {
  element.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`;
};

export const createPressEffect = (element: HTMLElement) => {
  element.style.transform = 'translateY(4px) scale(0.98)';
  setTimeout(() => {
    element.style.transform = 'translateY(0) scale(1)';
  }, 150);
};

// Keyframes for CSS animations
export const getGlobalAnimations = () => `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-10px); }
    50% { transform: translateY(5px); }
    75% { transform: translateY(-3px); }
  }
  
  @keyframes wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(1deg); }
    50% { transform: rotate(-1deg); }
    75% { transform: rotate(0.5deg); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px #007ACC; }
    50% { box-shadow: 0 0 20px #007ACC, 0 0 30px #007ACC; }
  }
  
  @keyframes blockSnap {
    0% { transform: scale(0.8); opacity: 0; }
    70% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;