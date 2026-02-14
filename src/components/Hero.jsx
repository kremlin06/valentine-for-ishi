import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ParticleHearts from './shared/ParticleHearts';
import { fadeIn, fadeInUp } from '../styles/animations';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.softCream} 0%,
    ${({ theme }) => theme.colors.white} 100%
  );
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  overflow: hidden;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['7xl']};
  color: ${({ theme }) => theme.colors.valentinePink};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  
  @media (max-width: 375px) {
    font-size: ${({ theme }) => theme.fontSizes['6xl']};
  }
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  animation: ${fadeInUp} 1s ease-out 0.3s both;
  position: relative;
  z-index: 2;
  max-width: 500px;
  line-height: 1.8;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  animation: ${fadeInUp} 1s ease-out 0.6s both;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.md};
  touch-action: manipulation;
  
  &::before {
    content: '↓';
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    color: ${({ theme }) => theme.colors.ishisBlue};
    display: block;
    animation: float 2s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }
`;

const SecretMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: ${({ theme }) => theme.zIndex.modal};
  max-width: 90%;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-out;
  
  h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    color: ${({ theme }) => theme.colors.valentinePink};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.deepLoveBlue};
    line-height: 1.8;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
  animation: ${fadeIn} 0.3s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.softRose};
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:active {
    transform: scale(0.95);
    background: ${({ theme }) => theme.colors.valentinePink};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Hero = () => {
  const [showSecret, setShowSecret] = useState(false);
  const touchStartTime = useRef(null);
  const longPressTimer = useRef(null);

  const handleTouchStart = () => {
    touchStartTime.current = Date.now();
    longPressTimer.current = setTimeout(() => {
      setShowSecret(true);
    }, 3000); // 3 second long press
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const closeSecret = () => {
    setShowSecret(false);
  };

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  return (
    <HeroSection>
      <ParticleHearts count={20} />
      
      <Title
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        For Ishi ♥
      </Title>
      
      <Subtitle>
        A journey through our love story, crafted with all my heart
      </Subtitle>
      
      <ScrollIndicator onClick={handleScroll} />
      
      {showSecret && (
        <>
          <Overlay onClick={closeSecret} />
          <SecretMessage>
            <CloseButton onClick={closeSecret}>×</CloseButton>
            <h3>You found the secret! ✨</h3>
            <p>
              You've always had a knack for discovering hidden treasures. 
              That's just one of the million reasons I love you. 
              Your curiosity, your attention to detail, the way you explore 
              every little corner of life with wonder - it's magical.
            </p>
          </SecretMessage>
        </>
      )}
    </HeroSection>
  );
};

export default Hero;
