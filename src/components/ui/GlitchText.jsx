import { useState, useEffect } from 'react';

export default function GlitchText({ text, className = '' }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);
    }, Math.random() * 2000 + 1000); // Random between 1-3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`glitch ${className} ${isGlitching ? 'glitching' : ''}`}
      data-text={text}
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      {text}
    </span>
  );
}
