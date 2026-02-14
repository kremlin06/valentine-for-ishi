import { useState } from 'react';
import styled from 'styled-components';
import { milestones } from '../data/timeline';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { fadeInUp, slideInLeft, slideInRight } from '../styles/animations';

const TimelineSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  color: ${({ theme }) => theme.colors.ishisBlue};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const TimelineContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.valentinePink},
      ${({ theme }) => theme.colors.ishisBlue}
    );
  }
`;

const MilestoneCard = styled.div`
  position: relative;
  padding-left: 60px;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ index, isVisible }) => 
    isVisible 
      ? index % 2 === 0 ? slideInLeft : slideInRight 
      : 'none'
  } 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.1}s;
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 12px;
  top: 8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.valentinePink};
  border: 3px solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.valentinePink};
  z-index: 2;
`;

const Emoji = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const Card = styled.div`
  background: ${({ theme, expanded }) => 
    expanded ? theme.colors.softCream : theme.colors.white
  };
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  touch-action: manipulation;
  
  &:active {
    transform: scale(0.98);
  }
`;

const Date = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.valentinePink};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const Preview = styled.p`
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  opacity: 0.8;
  line-height: 1.6;
`;

const FullStory = styled.p`
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  line-height: 1.8;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.softRose};
  animation: ${fadeInUp} 0.3s ease-out;
`;

const CloseButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.valentinePink};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-weight: 600;
  width: 100%;
  min-height: 44px;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:active {
    transform: scale(0.95);
    background: ${({ theme }) => theme.colors.loveRed};
  }
`;

const MilestoneItem = ({ milestone, index }) => {
  const [expanded, setExpanded] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <MilestoneCard 
      ref={elementRef} 
      isVisible={hasIntersected}
      index={index}
    >
      <TimelineDot />
      <Card expanded={expanded} onClick={!expanded ? toggleExpanded : undefined}>
        <Date>{milestone.date}</Date>
        <Title>
          <Emoji>{milestone.emoji}</Emoji>
          {milestone.title}
        </Title>
        <Preview>{milestone.preview}</Preview>
        
        {expanded && (
          <>
            <FullStory>{milestone.fullStory}</FullStory>
            <CloseButton onClick={toggleExpanded}>Close</CloseButton>
          </>
        )}
      </Card>
    </MilestoneCard>
  );
};

const Timeline = () => {
  return (
    <TimelineSection id="timeline">
      <SectionTitle>Our Journey Together</SectionTitle>
      <TimelineContainer>
        {milestones.map((milestone, index) => (
          <MilestoneItem 
            key={milestone.id} 
            milestone={milestone} 
            index={index}
          />
        ))}
      </TimelineContainer>
    </TimelineSection>
  );
};

export default Timeline;
