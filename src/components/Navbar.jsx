import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

function ItalyFlag({ size = 20 }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" aria-hidden="true">
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#F1F2F1" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </svg>
  );
}

function UKFlag({ size = 20 }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#00247D" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#CF142B" strokeWidth="2" />
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="6" />
      <path d="M15,0 V20 M0,10 H30" stroke="#CF142B" strokeWidth="3.5" />
    </svg>
  );
}

const navGlassStyle = {
  background: 'var(--nav-glass-bg)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  borderColor: 'var(--nav-glass-border)',
  boxShadow: 'inset 0 1px 0 var(--surface-border-soft)',
};

export default function Navbar() {
  const { lang, switchLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/education', label: t.nav.education },
    { to: '/certificates', label: t.nav.certificates },
    { to: '/projects', label: t.nav.projects },
    { to: '/experience', label: t.nav.experience },
    { to: '/contact', label: t.nav.contact },
  ];

  const linkClass = ({ isActive }) =>
    `transition ${isActive ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-nav-inactive)] hover:text-[var(--color-text)]'}`;

  return (
    <nav className="sticky top-0 z-50 border-b" style={navGlassStyle}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Selettore lingua - sempre in alto a sinistra */}
        <div className="flex gap-2">
          <button
            onClick={() => switchLanguage('en')}
            aria-label="English"
            aria-pressed={lang === 'en'}
            className="p-1.5 rounded-lg transition"
            style={{
              background: lang === 'en' ? 'var(--surface-border)' : 'transparent',
              border: `1px solid ${lang === 'en' ? 'var(--color-amber)' : 'transparent'}`,
            }}
          >
            <UKFlag />
          </button>
          <button
            onClick={() => switchLanguage('it')}
            aria-label="Italiano"
            aria-pressed={lang === 'it'}
            className="p-1.5 rounded-lg transition"
            style={{
              background: lang === 'it' ? 'var(--surface-border)' : 'transparent',
              border: `1px solid ${lang === 'it' ? 'var(--color-amber)' : 'transparent'}`,
            }}
          >
            <ItalyFlag />
          </button>
        </div>

        {/* Nav links desktop */}
        <div className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ background: 'var(--surface-bg)', border: '1px solid var(--surface-border)' }}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Nav links mobile */}
      {open && (
        <div className="md:hidden flex flex-col gap-1 px-4 pb-4 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <div className="py-2">{link.label}</div>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
