import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

// Import components (we'll create these next)
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import MemoryScrapbook from './components/MemoryScrapbook';
import LoveMeter from './components/LoveMeter';
import ReasonsGrid from './components/ReasonsGrid';
import Playlist from './components/Playlist';
import MessageBottle from './components/MessageBottle';
import BigQuestion from './components/BigQuestion';
import ScrollProgress from './components/shared/ScrollProgress';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ScrollProgress />
      <Hero />
      <Timeline />
      <MemoryScrapbook />
      <LoveMeter />
      <ReasonsGrid />
      <Playlist />
      <MessageBottle />
      <BigQuestion />
    </ThemeProvider>
  );
}

export default App;
