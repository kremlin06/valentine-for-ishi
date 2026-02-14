import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { letter } from '../data/letter';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { fadeInUp, wiggle } from '../styles/animations';

const BottleSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.softCream} 0%,
    ${({ theme }) => theme.colors.white} 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  color: ${({ theme }) => theme.colors.ishisBlue};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => isVisible ? fadeInUp : 'none'} 0.6s ease-out;
`;

const BottleContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => isVisible ? fadeInUp : 'none'} 0.6s ease-out 0.2s both;
  touch-action: manipulation;
`;

const BottleSVG = styled.svg`
  width: 150px;
  height: 200px;
  animation: ${wiggle} 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
  
  &:active {
    transform: scale(0.95);
  }
`;

const Prompt = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity ${({ theme }) => theme.transitions.base};
`;

const LetterContainer = styled.div`
  max-width: 600px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  position: relative;
  animation: ${fadeInUp} 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.valentinePink},
      ${({ theme }) => theme.colors.ishisBlue}
    );
    border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
  }
`;

const LetterText = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  line-height: 1.8;
  white-space: pre-wrap;
  
  &::after {
    content: '${({ showCursor }) => showCursor ? '|' : ''}';
    animation: ${({ showCursor }) => showCursor ? 'blink 1s infinite' : 'none'};
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const CloseButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.valentinePink};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-weight: 600;
  width: 100%;
  min-height: 44px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:active {
    transform: scale(0.95);
    background: ${({ theme }) => theme.colors.loveRed};
  }
`;

const MessageBottle = () => {
  const [bottleOpened, setBottleOpened] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typewriterInterval = useRef(null);
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const openBottle = () => {
    setBottleOpened(true);
    setDisplayedText('');
    setShowCursor(true);

    let index = 0;
    const text = letter.text;
    const speed = 30; // milliseconds per character

    typewriterInterval.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typewriterInterval.current);
        setShowCursor(false);
      }
    }, speed);
  };

  const closeBottle = () => {
    if (typewriterInterval.current) {
      clearInterval(typewriterInterval.current);
    }
    setBottleOpened(false);
    setDisplayedText('');
  };

  useEffect(() => {
    return () => {
      if (typewriterInterval.current) {
        clearInterval(typewriterInterval.current);
      }
    };
  }, []);

  return (
    <BottleSection ref={elementRef} id="message">
      <SectionTitle isVisible={hasIntersected}>
        A Message for You
      </SectionTitle>

      {!bottleOpened ? (
        <>
          <BottleContainer isVisible={hasIntersected} onClick={openBottle}>
            <BottleSVG viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg">
              {/* Bottle */}
              <path
                d="M 60 40 L 60 20 Q 60 10 70 10 L 80 10 Q 90 10 90 20 L 90 40 Q 100 45 100 60 L 100 170 Q 100 190 80 190 L 70 190 Q 50 190 50 170 L 50 60 Q 50 45 60 40 Z"
                fill="#E8F4F8"
                stroke="#3A86FF"
                strokeWidth="2"
                opacity="0.8"
              />
              {/* Cork */}
              <rect
                x="65"
                y="5"
                width="20"
                height="15"
                rx="2"
                fill="#8B4513"
              />
              {/* Paper inside */}
              <rect
                x="60"
                y="80"
                width="30"
                height="60"
                rx="2"
                fill="#FFF5F7"
                stroke="#FF006E"
                strokeWidth="1"
              />
              {/* Lines on paper */}
              <line x1="65" y1="90" x2="85" y2="90" stroke="#FF006E" strokeWidth="1" opacity="0.5" />
              <line x1="65" y1="100" x2="85" y2="100" stroke="#FF006E" strokeWidth="1" opacity="0.5" />
              <line x1="65" y1="110" x2="85" y2="110" stroke="#FF006E" strokeWidth="1" opacity="0.5" />
              <line x1="65" y1="120" x2="85" y2="120" stroke="#FF006E" strokeWidth="1" opacity="0.5" />
            </BottleSVG>
          </BottleContainer>
          <Prompt show={hasIntersected}>
            Tap the bottle to open your surprise ♥
          </Prompt>
        </>
      ) : (
        <LetterContainer>
          <LetterText showCursor={showCursor}>
            {displayedText}
          </LetterText>
          <CloseButton onClick={closeBottle}>
            Close & Seal the Bottle
          </CloseButton>
        </LetterContainer>
      )}
    </BottleSection>
  );
};

export default MessageBottle;
