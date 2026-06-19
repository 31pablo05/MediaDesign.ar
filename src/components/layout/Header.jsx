import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO',          href: '#inicio' },
    { name: 'SERVICIOS',       href: '#servicios' },
    { name: 'PROYECTOS',       href: '#portfolio' },
    { name: 'SOBRE NOSOTROS',  href: '#nosotros' },
    { name: 'BLOG',            href: '#blog' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: isScrolled ? 'rgba(7,7,11,.86)' : 'rgba(7,7,11,.72)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        transition: 'background .3s',
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '18px 56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Logo */}
        <a href="#inicio" style={{ display: 'flex', flexDirection: 'column', lineHeight: .82, textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 30, letterSpacing: 1, color: '#fff', filter: 'url(#rough)' }}>
            MEDIA
          </span>
          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 30, letterSpacing: 1, color: '#fff', filter: 'url(#rough)' }}>
            DESIGN
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 34, whiteSpace: 'nowrap' }} className="hidden md:flex">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: '1.5px',
                color: '#bcc1cc',
                textDecoration: 'none',
                fontFamily: "'Chakra Petch', sans-serif",
                transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2fe4ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#bcc1cc')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="#contacto"
          className="hidden md:block"
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            letterSpacing: '1.5px',
            color: '#fff',
            textDecoration: 'none',
            padding: '11px 24px',
            border: '1.5px solid #9d5cff',
            borderRadius: 30,
            boxShadow: '0 0 14px rgba(157,92,255,.35) inset, 0 0 14px rgba(157,92,255,.25)',
            fontFamily: "'Chakra Petch', sans-serif",
            transition: 'background .2s, box-shadow .2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(157,92,255,.18)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(157,92,255,.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = '0 0 14px rgba(157,92,255,.35) inset, 0 0 14px rgba(157,92,255,.25)';
          }}
        >
          CONTACTO
        </a>

        {/* Hamburguesa mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          aria-label="Abrir menú"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
        >
          <div style={{ width: 24, height: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ display: 'block', width: '100%', height: 2, background: '#2fe4ff', borderRadius: 2, transition: 'transform .25s, opacity .25s', transform: isMenuOpen ? 'rotate(45deg) translate(6px,6px)' : 'none' }} />
            <span style={{ display: 'block', width: '100%', height: 2, background: '#2fe4ff', borderRadius: 2, transition: 'opacity .25s', opacity: isMenuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '100%', height: 2, background: '#2fe4ff', borderRadius: 2, transition: 'transform .25s', transform: isMenuOpen ? 'rotate(-45deg) translate(6px,-6px)' : 'none' }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          style={{
            background: 'rgba(7,7,11,.96)',
            borderTop: '1px solid rgba(255,255,255,.06)',
            padding: '20px 24px 28px',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '14px 0',
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: '1.5px',
                color: '#bcc1cc',
                textDecoration: 'none',
                fontFamily: "'Chakra Petch', sans-serif",
                borderBottom: '1px solid rgba(255,255,255,.05)',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: 'block',
              marginTop: 20,
              padding: '14px 0',
              textAlign: 'center',
              fontSize: 13.5,
              fontWeight: 600,
              letterSpacing: '1.5px',
              color: '#fff',
              textDecoration: 'none',
              border: '1.5px solid #9d5cff',
              borderRadius: 30,
              fontFamily: "'Chakra Petch', sans-serif",
            }}
          >
            CONTACTO
          </a>
        </div>
      )}
    </header>
  );
}
