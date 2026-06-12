import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', href: '#inicio' },
    { name: 'SERVICIOS', href: '#servicios' },
    { name: 'PROYECTOS', href: '#portfolio' },
    { name: 'SOBRE NOSOTROS', href: '#nosotros' },
    { name: 'BLOG', href: '#blog' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-black/50 backdrop-blur-sm'
      }`}
      style={{ borderBottom: '1px solid rgba(0, 255, 255, 0.2)' }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col">
            <div className="text-xl leading-none" style={{ fontFamily: 'var(--font-display)' }}>
              MEDIA
            </div>
            <div className="text-3xl leading-none" style={{ fontFamily: 'var(--font-display)' }}>
              DESIGN
            </div>
            <div 
              className="text-[10px] mt-1 tracking-wider" 
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cyan)' }}
            >
              Estudio Digital Integral
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors relative group"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.name}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: 'var(--color-cyan)' }}
                />
              </a>
            ))}
          </div>

          {/* Contact Button (Desktop) */}
          <a
            href="#contacto"
            className="hidden md:block px-6 py-2 border-2 transition-all duration-200 hover:bg-[var(--color-magenta)] hover:text-black"
            style={{ 
              borderColor: 'var(--color-magenta)', 
              color: 'var(--color-magenta)',
              fontFamily: 'var(--font-body)'
            }}
          >
            CONTACTO
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span 
                className={`w-full h-0.5 bg-[var(--color-cyan)] transition-transform ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-[var(--color-cyan)] transition-opacity ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-[var(--color-cyan)] transition-transform ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[var(--color-cyan)]/20">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-white/70 hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setIsMenuOpen(false)}
              className="block mt-4 px-6 py-2 border-2 text-center transition-all duration-200"
              style={{ 
                borderColor: 'var(--color-magenta)', 
                color: 'var(--color-magenta)',
                fontFamily: 'var(--font-body)'
              }}
            >
              CONTACTO
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
