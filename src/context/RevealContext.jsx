import { createContext, useCallback, useContext, useRef, useState } from 'react';

const RevealContext = createContext({
  isRevealed: false,
  reveal: () => {},
  videoReady: false,
  markVideoReady: () => {},
});

export function RevealProvider({ children }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const firedRef = useRef(false);
  const videoFiredRef = useRef(false);

  const reveal = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    setIsRevealed(true);
  }, []);

  const markVideoReady = useCallback(() => {
    if (videoFiredRef.current) return;
    videoFiredRef.current = true;
    setVideoReady(true);
  }, []);

  return (
    <RevealContext.Provider value={{ isRevealed, reveal, videoReady, markVideoReady }}>
      {children}
    </RevealContext.Provider>
  );
}

export function useReveal() {
  return useContext(RevealContext);
}
