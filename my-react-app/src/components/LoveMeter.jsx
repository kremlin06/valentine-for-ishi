import { useState } from 'react';
import styled from 'styled-components';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { fadeInUp, spin, shake } from '../styles/animations';

const MeterSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.white};
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

const MeterContainer = styled.div`
  width: 100%;
  max-width: 400px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => isVisible ? fadeInUp : 'none'} 0.6s ease-out 0.2s both;
`;

const GaugeWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 140px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
`;

const GaugeBg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 140px 140px 0 0;
  border: 8px solid ${({ theme }) => theme.colors.softRose};
  border-bottom: none;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ level }) => level}%;
    height: 100%;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.valentinePink},
      ${({ theme }) => theme.colors.loveRed}
    );
    transition: width 0.3s ease-out;
  }
`;

const Needle = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 4px;
  height: 120px;
  background: ${({ theme }) => theme.colors.deepLoveBlue};
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(${({ rotation }) => rotation}deg);
  transition: transform 0.3s ease-out;
  z-index: 2;
  animation: ${({ broken }) => broken ? spin : 'none'} 2s linear infinite;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.deepLoveBlue};
  }
`;

const LevelText = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme, broken }) => 
    broken ? theme.colors.loveRed : theme.colors.deepLoveBlue
  };
  font-weight: 700;
  min-height: 60px;
  animation: ${({ broken }) => broken ? shake : 'none'} 0.5s ease-in-out;
`;

const SliderContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.softRose} 0%,
    ${({ theme }) => theme.colors.valentinePink} ${({ value }) => value}%,
    ${({ theme }) => theme.colors.softRose} ${({ value }) => value}%
  );
  outline: none;
  appearance: none;
  touch-action: pan-y;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.valentinePink};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.md};
    transition: all ${({ theme }) => theme.transitions.fast};
    
    &:active {
      transform: scale(1.2);
      background: ${({ theme }) => theme.colors.loveRed};
    }
  }
  
  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.valentinePink};
    cursor: pointer;
    border: none;
    box-shadow: ${({ theme }) => theme.shadows.md};
    
    &:active {
      transform: scale(1.2);
      background: ${({ theme }) => theme.colors.loveRed};
    }
  }
`;

const Instruction = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const LoveMeter = () => {
  const [loveLevel, setLoveLevel] = useState(0);
  const [meterBroken, setMeterBroken] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setLoveLevel(value);
    
    if (value >= 100 && !meterBroken) {
      setMeterBroken(true);
      // Haptic feedback if supported
      if (window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100]);
      }
    } else if (value < 100 && meterBroken) {
      setMeterBroken(false);
    }
  };

  // Calculate needle rotation (-90deg to 90deg)
  const needleRotation = meterBroken ? 0 : (loveLevel / 100) * 180 - 90;

  const getLevelText = () => {
    if (meterBroken) {
      return (
        <>
          <div style={{ fontSize: '3rem' }}>∞</div>
          <div>Error: Love overflow!</div>
          <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
            (Can't measure infinite love)
          </div>
        </>
      );
    }
    
    if (loveLevel < 25) return 'Just getting started...';
    if (loveLevel < 50) return 'Growing stronger!';
    if (loveLevel < 75) return 'This is serious!';
    if (loveLevel < 95) return 'Off the charts!';
    return 'Maximum capacity!';
  };

  return (
    <MeterSection ref={elementRef} id="love-meter">
      <SectionTitle isVisible={hasIntersected}>
        How Much Do I Love You?
      </SectionTitle>
      
      <MeterContainer isVisible={hasIntersected}>
        <GaugeWrapper>
          <GaugeBg level={loveLevel} />
          <Needle rotation={needleRotation} broken={meterBroken} />
        </GaugeWrapper>
        
        <LevelText broken={meterBroken}>
          {getLevelText()}
        </LevelText>
        
        <SliderContainer>
          <Slider
            type="range"
            min="0"
            max="100"
            value={loveLevel}
            onChange={handleSliderChange}
          />
        </SliderContainer>
        
        <Instruction>
          Drag the slider to measure... but be careful! 💝
        </Instruction>
      </MeterContainer>
    </MeterSection>
  );
};

export default LoveMeter;
