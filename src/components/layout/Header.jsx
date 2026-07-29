import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'INICIO', href: '/#inicio' },
  { name: 'SERVICIOS', href: '/#servicios' },
  { name: 'PROYECTOS', href: '/#portfolio' },
  { name: 'SOBRE NOSOTROS', href: '/#nosotros' },
  { name: 'BLOG', href: '/blog' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-logo-container">
          <a 
            href="/" 
            className="header-logo-badge"
            aria-label="Media Design — Inicio"
            style={{ 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              padding: '10px 14px', 
              borderRadius: '10px', 
              background: '#0c0c14', 
              position: 'relative' 
            }}
          >
            {/* Borde gradiente con mask trick */}
            <span style={{
              position: 'absolute', 
              inset: 0, 
              borderRadius: '10px', 
              padding: '1.5px',
              background: 'linear-gradient(135deg, #2fe4ff, #9d5cff, #ff3ad8)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor', 
              maskComposite: 'exclude', 
              pointerEvents: 'none'
            }} />

            {/* Contenido del logo */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              position: 'relative', 
              zIndex: 1 
            }}>
              <span className="logo-text logo-text-media" style={{ 
                fontFamily: "'Anton', sans-serif", 
                fontSize: '32px', 
                color: '#fff', 
                lineHeight: 1, 
                display: 'block', 
                letterSpacing: '2px' 
              }}>
                MEDIA
              </span>
              <span className="logo-text logo-text-design" style={{ 
                fontFamily: "'Anton', sans-serif", 
                fontSize: '32px', 
                color: '#fff', 
                lineHeight: 0.92, 
                display: 'block', 
                letterSpacing: '2px', 
                filter: 'url(#rough)' 
              }}>
                DESIGN
              </span>
              {/* Línea divisora gradiente */}
              <span style={{ 
                display: 'block', 
                width: '100%', 
                height: '1px', 
                background: 'linear-gradient(90deg, #2fe4ff, #ff3ad8)', 
                margin: '6px 0 5px', 
                opacity: 0.4 
              }} />
              {/* Subtítulo */}
              <span className="logo-subtitle-text" style={{ 
                fontSize: '8.5px', 
                letterSpacing: '1.8px', 
                color: '#2fe4ff', 
                fontFamily: "'Chakra Petch', sans-serif", 
                whiteSpace: 'nowrap' 
              }}>
                ESTUDIO DIGITAL INTEGRAL
              </span>
            </div>
          </a>
          <div className="header-logo-glow"></div>
        </div>

        <nav className="header-nav" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="header-nav__link">
              {link.name}
            </a>
          ))}
        </nav>

        <a href="/#contacto" className="header-cta header-cta--desktop">
          CONTACTO
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`burger-button${isMenuOpen ? ' is-open' : ''}`}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="mobile-menu__link"
            >
              {link.name}
            </a>
          ))}
          <a href="/#contacto" onClick={() => setIsMenuOpen(false)} className="mobile-menu__cta">
            CONTACTO
          </a>
        </div>
      )}

      <style>{`
        /* ===== KEYFRAMES ===== */
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes logoGlow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-8px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes slideInMobile {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== HEADER BASE ===== */
        .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background: rgba(7,7,11,.75);
          border-bottom: 1px solid rgba(255,255,255,.08);
          transition: all .35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 24px rgba(0,0,0,.1);
          animation: slideDown 0.5s ease-out;
        }
        
        .site-header.is-scrolled {
          background: rgba(7,7,11,.95);
          border-bottom: 1px solid rgba(47,228,255,.2);
          box-shadow: 
            0 8px 32px rgba(0,0,0,.3),
            0 0 20px rgba(47,228,255,.08);
        }

        /* ===== LOGO MEJORADO ===== */
        .header-logo-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .header-logo-badge {
          position: relative;
          animation: logoFloat 3s ease-in-out infinite;
          transition: transform .3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .header-logo-container:hover .header-logo-badge {
          transform: scale(1.05);
          animation-play-state: paused;
          filter: 
            drop-shadow(0 0 12px rgba(47,228,255,.6))
            drop-shadow(0 0 20px rgba(255,58,216,.4))
            brightness(1.1);
        }
        
        /* Responsive mobile para textos del logo */
        @media (max-width: 640px) {
          .header-logo-badge {
            padding: 8px 10px !important;
          }
          
          .logo-text-media,
          .logo-text-design {
            font-size: 22px !important;
          }
          
          .logo-subtitle-text {
            font-size: 7px !important;
            letter-spacing: 1.2px !important;
          }
        }
        
        .header-logo-glow {
          position: absolute;
          inset: -8px;
          background: radial-gradient(
            ellipse at center,
            rgba(47,228,255,.3) 0%,
            rgba(157,92,255,.2) 40%,
            transparent 70%
          );
          filter: blur(12px);
          opacity: 0;
          transition: opacity .3s ease;
          z-index: 1;
          pointer-events: none;
          animation: logoGlow 4s ease-in-out infinite;
        }
        
        .header-logo:hover .header-logo-glow {
          opacity: 1;
          animation: none;
        }

        /* ===== NAVEGACIÓN MEJORADA ===== */
        .header-nav {
          display: none;
          gap: 34px;
          align-items: center;
          white-space: nowrap;
        }
        
        .header-nav__link {
          position: relative;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: var(--color-nav);
          text-decoration: none;
          font-family: 'Chakra Petch', sans-serif;
          transition: color .25s ease;
          padding: 4px 0;
        }
        
        .header-nav__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--color-cyan), var(--color-magenta));
          transition: width .3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }
        
        .header-nav__link:hover,
        .header-nav__link:focus-visible {
          color: var(--color-cyan);
        }
        
        .header-nav__link:hover::after {
          width: 100%;
        }

        /* ===== CTA BUTTON MEJORADO ===== */
        .header-cta {
          position: relative;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: var(--color-white);
          text-decoration: none;
          padding: 11px 24px;
          border: 1.5px solid var(--color-purple);
          border-radius: 30px;
          font-family: 'Chakra Petch', sans-serif;
          transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            rgba(157,92,255,.15) 0%,
            rgba(47,228,255,.05) 100%
          );
          box-shadow: 
            0 0 14px rgba(157,92,255,.3) inset,
            0 0 14px rgba(157,92,255,.2);
        }
        
        .header-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .header-cta:hover,
        .header-cta:focus-visible {
          background: linear-gradient(
            135deg,
            rgba(157,92,255,.3) 0%,
            rgba(47,228,255,.15) 100%
          );
          border-color: var(--color-cyan);
          box-shadow: 
            0 0 20px rgba(157,92,255,.5),
            0 0 30px rgba(47,228,255,.3);
          transform: translateY(-2px);
        }

        /* ===== BURGER BUTTON ===== */
        .burger-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: inline-flex;
          flex-direction: column;
          justify-content: space-between;
          width: 32px;
          height: 24px;
          position: relative;
          z-index: 51;
        }
        
        .burger-line {
          display: block;
          width: 100%;
          height: 2px;
          border-radius: 999px;
          background: var(--color-cyan);
          transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 8px rgba(47,228,255,.4);
        }
        
        .burger-button:hover .burger-line {
          background: var(--color-magenta);
          box-shadow: 0 0 12px rgba(255,58,216,.6);
        }
        
        .burger-button.is-open .burger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        
        .burger-button.is-open .burger-line:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }
        
        .burger-button.is-open .burger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* ===== MOBILE MENU MEJORADO ===== */
        .mobile-menu {
          background: linear-gradient(
            180deg,
            rgba(7,7,11,.98) 0%,
            rgba(14,14,21,.98) 100%
          );
          border-top: 1px solid rgba(47,228,255,.15);
          padding: 24px 24px 32px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          animation: slideInMobile 0.3s ease-out;
          box-shadow: 
            0 8px 32px rgba(0,0,0,.4),
            inset 0 1px 0 rgba(47,228,255,.1);
        }
        
        .mobile-menu__link {
          display: block;
          padding: 16px 12px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: var(--color-nav);
          text-decoration: none;
          font-family: 'Chakra Petch', sans-serif;
          border-bottom: 1px solid rgba(255,255,255,.06);
          transition: all .25s ease;
          position: relative;
          overflow: hidden;
        }
        
        .mobile-menu__link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, var(--color-cyan), var(--color-magenta));
          transform: scaleY(0);
          transition: transform .3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-menu__link:hover,
        .mobile-menu__link:focus-visible {
          color: var(--color-cyan);
          background: rgba(47,228,255,.05);
          padding-left: 18px;
        }
        
        .mobile-menu__link:hover::before {
          transform: scaleY(1);
        }
        
        .mobile-menu__cta {
          display: block;
          margin-top: 24px;
          padding: 15px 0;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: var(--color-white);
          text-decoration: none;
          border: 1.5px solid var(--color-purple);
          border-radius: 30px;
          font-family: 'Chakra Petch', sans-serif;
          background: linear-gradient(
            135deg,
            rgba(157,92,255,.2) 0%,
            rgba(47,228,255,.1) 100%
          );
          box-shadow: 
            0 0 20px rgba(157,92,255,.3),
            inset 0 0 20px rgba(157,92,255,.2);
          transition: all .3s ease;
        }
        
        .mobile-menu__cta:hover {
          background: linear-gradient(
            135deg,
            rgba(157,92,255,.4) 0%,
            rgba(47,228,255,.2) 100%
          );
          border-color: var(--color-cyan);
          box-shadow: 
            0 0 30px rgba(47,228,255,.5),
            inset 0 0 30px rgba(157,92,255,.3);
          transform: scale(1.02);
        }

        /* ===== RESPONSIVE ===== */
        .header-cta--desktop {
          display: none;
        }
        
        .burger-button {
          display: inline-flex;
        }
        
        @media (min-width: 768px) {
          .header-nav {
            display: flex;
          }
          .header-cta--desktop {
            display: inline-flex;
          }
          .burger-button {
            display: none;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .header-logo-wrapper {
            animation: none;
          }
          
          .header-logo-glow {
            animation: none;
          }
        }
      `}</style>
    </header>
  );
}
