import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { songs } from '../data/songs';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { fadeInUp, spin } from '../styles/animations';

const PlaylistSection = styled.section`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.deepLoveBlue};
  color: ${({ theme }) => theme.colors.white};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  color: ${({ theme }) => theme.colors.softRose};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => isVisible ? fadeInUp : 'none'} 0.6s ease-out;
`;

const VinylContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => isVisible ? fadeInUp : 'none'} 0.6s ease-out 0.2s both;
`;

const Vinyl = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #1a1a1a 0%,
    #1a1a1a 28%,
    ${({ labelColor, theme }) => labelColor || theme.colors.valentinePink} 28%,
    ${({ labelColor, theme }) => labelColor || theme.colors.valentinePink} 45%,
    #1a1a1a 45%,
    #1a1a1a 100%
  );
  position: relative;
  animation: ${({ spinning }) => spinning ? spin : 'none'} 3s linear infinite;
  transition: animation 0.3s ease-out;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #1a1a1a;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.softCream};
  }
`;

const SongList = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const SongCard = styled.div`
  background: ${({ isActive, theme }) => 
    isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'
  };
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  border: 2px solid ${({ isActive, theme }) => 
    isActive ? theme.colors.softRose : 'transparent'
  };
  min-height: 44px;
  touch-action: manipulation;
  
  &:active {
    transform: scale(0.98);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const NowPlaying = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.softRose};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
`;

const SongTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
`;

const Artist = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.softRose};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Note = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.6;
  opacity: 0.9;
  max-height: ${({ isActive }) => isActive ? '200px' : '0'};
  overflow: hidden;
  transition: max-height ${({ theme }) => theme.transitions.base};
  margin-top: ${({ isActive, theme }) => isActive ? theme.spacing.sm : '0'};
  padding-top: ${({ isActive, theme }) => isActive ? theme.spacing.sm : '0'};
  border-top: ${({ isActive, theme }) => 
    isActive ? `1px solid ${theme.colors.softRose}` : 'none'
  };
`;

const Playlist = () => {
  const [activeSongId, setActiveSongId] = useState(null);
  const audioRef = useRef(null);
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const activeSong = songs.find(song => song.id === activeSongId);
  const vinylSpinning = activeSongId !== null;

  // When user selects a song, load and play it (or pause if same song clicked)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!activeSongId) {
      audio.pause();
      audio.removeAttribute('src');
      return;
    }

    const song = songs.find(s => s.id === activeSongId);
    if (!song?.src) return;

    audio.src = song.src;
    audio.play().catch(() => {
      // Autoplay blocked or file missing; clear selection
      setActiveSongId(null);
    });
  }, [activeSongId]);

  // When track ends, play next song in the list (loop back to first)
  const handleEnded = () => {
    const currentIndex = songs.findIndex(s => s.id === activeSongId);
    const nextIndex = currentIndex >= 0 && currentIndex < songs.length - 1
      ? currentIndex + 1
      : 0;
    const nextSong = songs[nextIndex];
    if (nextSong?.src) {
      setActiveSongId(nextSong.id);
    } else {
      setActiveSongId(null);
    }
  };

  const handleSongClick = (songId) => {
    setActiveSongId(current => current === songId ? null : songId);
  };

  return (
    <PlaylistSection ref={elementRef} id="playlist">
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        style={{ display: 'none' }}
      />
      <SectionTitle isVisible={hasIntersected}>
        Our Soundtrack
      </SectionTitle>
      
      <VinylContainer isVisible={hasIntersected}>
        <Vinyl 
          spinning={vinylSpinning}
          labelColor={activeSong?.color}
        />
      </VinylContainer>
      
      <SongList>
        {songs.map((song) => (
          <SongCard
            key={song.id}
            isActive={song.id === activeSongId}
            onClick={() => handleSongClick(song.id)}
          >
            {song.id === activeSongId && song.src && (
              <NowPlaying>▶ Now playing</NowPlaying>
            )}
            <SongTitle>{song.title}</SongTitle>
            <Artist>{song.artist}</Artist>
            <Note isActive={song.id === activeSongId}>
              {song.note}
            </Note>
          </SongCard>
        ))}
      </SongList>
    </PlaylistSection>
  );
};

export default Playlist;
