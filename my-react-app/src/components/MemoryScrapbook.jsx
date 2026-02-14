import { useState, useRef } from 'react';
import styled from 'styled-components';
import { photos } from '../data/photos';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { scaleIn, fadeIn } from '../styles/animations';

const ScrapbookSection = styled.section`
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
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 375px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const PolaroidCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transform: rotate(${({ rotation }) => rotation}deg);
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => isVisible ? scaleIn : 'none'} 0.5s ease-out;
  animation-delay: ${({ index }) => index * 0.1}s;
  animation-fill-mode: both;
  touch-action: manipulation;
  min-height: 44px;
  
  &:active {
    transform: rotate(0deg) scale(0.95);
  }
  
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.softCream};
  }
`;

const Caption = styled.p`
  font-family: 'Great Vibes', cursive;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.deepLoveBlue};
  text-align: center;
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  animation: ${fadeIn} 0.3s ease-out;
  touch-action: none;
`;

const LightboxContent = styled.div`
  max-width: 90%;
  max-height: 80vh;
  position: relative;
  animation: ${scaleIn} 0.3s ease-out;
  
  img {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }
`;

const LightboxCaption = styled.p`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const LightboxDate = styled.p`
  color: ${({ theme }) => theme.colors.softRose};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const CloseButton = styled.button`
  position: absolute;
  top: -${({ theme }) => theme.spacing.xl};
  right: 0;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.valentinePink};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:active {
    transform: scale(0.9);
    background: ${({ theme }) => theme.colors.loveRed};
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => direction === 'prev' ? 'left: 0;' : 'right: 0;'}
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.valentinePink};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  z-index: 10;
  
  &:active {
    transform: translateY(-50%) scale(0.9);
  }
`;

const PhotoItem = ({ photo, index, onClick }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <PolaroidCard
      ref={elementRef}
      rotation={photo.rotation}
      isVisible={hasIntersected}
      index={index}
      onClick={onClick}
    >
      <img 
        src={photo.src} 
        alt={photo.caption}
        loading="lazy"
      />
      <Caption>{photo.caption}</Caption>
    </PolaroidCard>
  );
};

const MemoryScrapbook = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigatePhoto = (direction) => {
    if (lightboxIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % photos.length
      : (lightboxIndex - 1 + photos.length) % photos.length;
    
    setLightboxIndex(newIndex);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        navigatePhoto('next');
      } else {
        navigatePhoto('prev');
      }
    }
    
    touchStartX.current = null;
  };

  return (
    <ScrapbookSection id="scrapbook">
      <SectionTitle>Our Memories</SectionTitle>
      <PhotoGrid>
        {photos.map((photo, index) => (
          <PhotoItem
            key={photo.id}
            photo={photo}
            index={index}
            onClick={() => openLightbox(index)}
          />
        ))}
      </PhotoGrid>

      {lightboxIndex !== null && (
        <Lightbox 
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeLightbox}>×</CloseButton>
            
            <NavigationButton 
              direction="prev" 
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('prev');
              }}
            >
              ‹
            </NavigationButton>
            
            <img 
              src={photos[lightboxIndex].src} 
              alt={photos[lightboxIndex].caption}
            />
            
            <NavigationButton 
              direction="next"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('next');
              }}
            >
              ›
            </NavigationButton>
            
            <LightboxCaption>{photos[lightboxIndex].caption}</LightboxCaption>
            <LightboxDate>{photos[lightboxIndex].date}</LightboxDate>
          </LightboxContent>
        </Lightbox>
      )}
    </ScrapbookSection>
  );
};

export default MemoryScrapbook;
