import { useState, useEffect } from 'react';

export default function GlitchText({ text, className = '' }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, Math.random() * 3000 + 2000); // Random between 2-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`glitch ${className} ${isGlitching ? 'glitching' : ''}`}
      data-text={text}
    >
      {text}
    </span>
  );
}
