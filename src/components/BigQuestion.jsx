import { useState } from 'react';
import styled from 'styled-components';
import Confetti from './shared/Confetti';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { fadeInUp, heartbeat, shake } from '../styles/animations';
import { randomInRange } from '../utils/performance';

const QuestionSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.valentinePink} 0%,
    ${({ theme }) => theme.colors.loveRed} 50%,
    ${({ theme }) => theme.colors.deepLoveBlue} 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '♥';
    position: absolute;
    font-size: 300px;
    color: rgba(255, 255, 255, 0.05);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${heartbeat} 2s ease-in-out infinite;
  }
`;

const Question = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => isVisible ? fadeInUp : 'none'} 0.8s ease-out;
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 375px) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => isVisible ? fadeInUp : 'none'} 0.8s ease-out 0.2s both;
`;

const YesButton = styled.button`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.valentinePink};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  min-width: 150px;
  min-height: 60px;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  transition: all ${({ theme }) => theme.transitions.fast};
  animation: ${heartbeat} 1.5s ease-in-out infinite;
  touch-action: manipulation;
  
  &:active {
    transform: scale(0.95);
    animation: none;
  }
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NoButton = styled.button`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  min-width: 150px;
  min-height: 60px;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: ${({ attempts }) => attempts > 0 ? 'absolute' : 'relative'};
  left: ${({ posX }) => posX}%;
  top: ${({ posY }) => posY}%;
  transform: ${({ attempts, scale }) => 
    attempts > 0 ? `translate(-50%, -50%) scale(${scale})` : 'none'
  };
  touch-action: manipulation;
  animation: ${({ attempts }) => attempts > 0 ? shake : 'none'} 0.3s ease-in-out;
  
  &:active {
    transform: ${({ attempts, scale }) => 
      attempts > 0 
        ? `translate(-50%, -50%) scale(${scale * 0.95})` 
        : 'scale(0.95)'
    };
  }
`;

const AnswerMessage = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(29, 53, 87, 0.95);
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeInUp} 0.6s ease-out;
`;

const MessageTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  color: ${({ theme }) => theme.colors.softRose};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  animation: ${heartbeat} 1s ease-in-out infinite;
  
  @media (max-width: 375px) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const MessageText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  line-height: 1.8;
  max-width: 600px;
`;

const Hearts = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  animation: ${heartbeat} 1.5s ease-in-out infinite;
`;

const BigQuestion = () => {
  const [answered, setAnswered] = useState(false);
  const [noButtonAttempts, setNoButtonAttempts] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 50, y: 50 });
  const [confettiActive, setConfettiActive] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const handleYes = () => {
    setAnswered(true);
    setConfettiActive(true);
    
    // Haptic feedback if supported
    if (window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100, 50, 100]);
    }
  };

  const handleNo = () => {
    setNoButtonAttempts(prev => prev + 1);
    
    // Move button to random position
    setNoButtonPos({
      x: randomInRange(10, 90),
      y: randomInRange(10, 90),
    });
    
    // Haptic feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  // Calculate scale based on attempts (gets smaller each time)
  const noButtonScale = Math.max(0.3, 1 - (noButtonAttempts * 0.2));

  // After 3 attempts, hide the No button
  const showNoButton = noButtonAttempts < 3;

  return (
    <QuestionSection ref={elementRef} id="big-question">
      <Confetti active={confettiActive} />
      
      {!answered ? (
        <>
          <Question isVisible={hasIntersected}>
            Will you be my Valentine?
          </Question>
          
          <ButtonContainer isVisible={hasIntersected}>
            <YesButton onClick={handleYes}>
              Yes! ♥
            </YesButton>
            
            {showNoButton && (
              <NoButton
                onClick={handleNo}
                attempts={noButtonAttempts}
                posX={noButtonPos.x}
                posY={noButtonPos.y}
                scale={noButtonScale}
              >
                No
              </NoButton>
            )}
          </ButtonContainer>
          
          {noButtonAttempts >= 3 && (
            <MessageText style={{ marginTop: '2rem', maxWidth: '400px' }}>
              The "No" button ran away! I guess that means... 😊
            </MessageText>
          )}
        </>
      ) : (
        <AnswerMessage>
          <MessageTitle>
            She said YES! 💝
          </MessageTitle>
          
          <Hearts>
            ♥ ♥ ♥
          </Hearts>
          
          <MessageText>
            You've made me the happiest person in the world, Ishi.
            I promise to love you, cherish you, and make every day
            as special as you make mine. Happy Valentine's Day, my love! ♥
          </MessageText>
          
          <MessageText style={{ marginTop: '2rem', fontSize: '1rem', opacity: 0.8 }}>
            (Now scroll back up and discover all the reasons why I love you!)
          </MessageText>
        </AnswerMessage>
      )}
    </QuestionSection>
  );
};

export default BigQuestion;
