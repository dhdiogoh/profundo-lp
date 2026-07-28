import { LenisProvider } from './context/LenisContext.jsx';
import { RevealProvider } from './context/RevealContext.jsx';
import { MenuModalProvider } from './context/MenuModalContext.jsx';
import { useSmoothAnchors } from './hooks/useSmoothAnchors.js';
import { useButtonBubbles } from './hooks/useButtonBubbles.js';
import { useImageErrorFallback } from './hooks/useImageErrorFallback.js';

import CustomCursor from './components/CustomCursor.jsx';
import CustomScrollbar from './components/CustomScrollbar.jsx';
import Preloader from './components/Preloader.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Sobre from './components/Sobre.jsx';
import MomentoTipografico from './components/MomentoTipografico.jsx';
import Culinaria from './components/Culinaria.jsx';
import Menus from './components/Menus.jsx';
import Atmosfera from './components/Atmosfera.jsx';
import WaveDivider from './components/WaveDivider.jsx';
import Localizacao from './components/Localizacao.jsx';
import Footer from './components/Footer.jsx';
import MenuModal from './components/MenuModal.jsx';

export default function App() {
  return (
    <LenisProvider>
      <RevealProvider>
        <MenuModalProvider>
          <Main />
        </MenuModalProvider>
      </RevealProvider>
    </LenisProvider>
  );
}

function Main() {
  useSmoothAnchors();
  useButtonBubbles();
  useImageErrorFallback();

  return (
    <>
      <CustomCursor />
      <CustomScrollbar />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <MomentoTipografico />
        <Culinaria />
        <Menus />
        <Atmosfera />
        <WaveDivider />
        <Localizacao />
      </main>
      <Footer />
      <MenuModal />
    </>
  );
}
