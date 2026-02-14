import styled from 'styled-components';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.valentinePink},
    ${({ theme }) => theme.colors.ishisBlue}
  );
  width: ${({ progress }) => progress}%;
  transition: width 0.1s ease-out;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  box-shadow: 0 0 10px rgba(255, 0, 110, 0.5);
`;

const ScrollProgress = () => {
  const scrollProgress = useScrollProgress();

  return <ProgressBar progress={scrollProgress} />;
};

export default ScrollProgress;
