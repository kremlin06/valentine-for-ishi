import { useState } from 'react';
import styled from 'styled-components';
import { reasons as initialReasons } from '../data/reasons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { fadeInUp, shake } from '../styles/animations';

const ReasonsSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.softCream} 0%,
    ${({ theme }) => theme.colors.white} 100%
  );
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  color: ${({ theme }) => theme.colors.valentinePink};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Counter = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 375px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const CardWrapper = styled.div`
  perspective: 1000px;
  min-height: 100px;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ revealed }) => revealed ? 'rotateY(180deg)' : 'rotateY(0)'};
  cursor: pointer;
  touch-action: manipulation;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100px;
  backface-visibility: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardFront = styled(CardFace)`
  background: ${({ theme }) => theme.colors.valentinePink};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  animation: ${({ shouldShake }) => shouldShake ? shake : 'none'} 0.3s ease-in-out;
  
  &:active {
    transform: scale(0.95);
  }
`;

const CardBack = styled(CardFace)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  transform: rotateY(180deg);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  line-height: 1.4;
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 375px) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const Number = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  opacity: 0.7;
`;

const ReasonCard = ({ reason, onReveal }) => {
  const [shouldShake, setShouldShake] = useState(false);

  const handleClick = () => {
    if (!reason.revealed) {
      setShouldShake(true);
      setTimeout(() => {
        onReveal(reason.id);
        setShouldShake(false);
      }, 300);
    }
  };

  return (
    <CardWrapper>
      <Card revealed={reason.revealed} onClick={handleClick}>
        <CardFront shouldShake={shouldShake}>
          <Number>{reason.id}</Number>
          ?
        </CardFront>
        <CardBack>
          <Number>{reason.id}</Number>
          {reason.text}
        </CardBack>
      </Card>
    </CardWrapper>
  );
};

const ReasonsGrid = () => {
  const [reasons, setReasons] = useState(initialReasons);
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const revealedCount = reasons.filter(r => r.revealed).length;

  const handleReveal = (id) => {
    setReasons(prev =>
      prev.map(reason =>
        reason.id === id ? { ...reason, revealed: true } : reason
      )
    );
  };

  return (
    <ReasonsSection ref={elementRef} id="reasons">
      <SectionTitle>100 Reasons I Adore You</SectionTitle>
      <Counter>{revealedCount}/100 discovered ♥</Counter>
      
      <Grid>
        {reasons.map((reason, index) => (
          <ReasonCard
            key={reason.id}
            reason={reason}
            onReveal={handleReveal}
          />
        ))}
      </Grid>
    </ReasonsSection>
  );
};

export default ReasonsGrid;
