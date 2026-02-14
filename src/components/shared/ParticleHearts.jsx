import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { floatUp } from '../../styles/animations';
import { randomInRange } from '../../utils/performance';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ParticlesContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

const Heart = styled.div`
  position: absolute;
  bottom: -20px;
  left: ${({ left }) => left}%;
  font-size: ${({ size }) => size}px;
  color: ${({ theme, color }) => color};
  opacity: 0.6;
  animation: ${floatUp} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
  will-change: transform;
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.3;
  }
`;

const ParticleHearts = ({ count = 20 }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  // Generate particle configurations once on mount
  const particles = useMemo(() => {
    const colors = ['#FF006E', '#FFAFCC', '#EF476F', '#3A86FF'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: randomInRange(0, 100),
      size: randomInRange(12, 24),
      duration: randomInRange(8, 15),
      delay: randomInRange(0, 8),
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, [count]);

  useEffect(() => {
    // Pause animations when page is hidden
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <ParticlesContainer>
      {particles.map((particle) => (
        <Heart
          key={particle.id}
          left={particle.left}
          size={particle.size}
          duration={particle.duration}
          delay={particle.delay}
          color={particle.color}
        >
          ♥
        </Heart>
      ))}
    </ParticlesContainer>
  );
};

export default ParticleHearts;
