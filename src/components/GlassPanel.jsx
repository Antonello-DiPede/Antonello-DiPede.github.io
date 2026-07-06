export default function GlassPanel({ children, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: '32px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(32px) saturate(190%)',
        WebkitBackdropFilter: 'blur(32px) saturate(190%)',
        border: '1px solid var(--glass-border)',
        boxShadow:
          '0 24px 70px var(--shadow-color), inset 0 1px 0 var(--glass-edge-highlight), inset 0 0 40px var(--glass-inner-glow)',
      }}
    >
      {/* Riflesso "liquid glass" che scorre lentamente sul pannello */}
      <div
        className="sheen absolute top-0 left-0 pointer-events-none"
        style={{
          width: '40%',
          height: '160%',
          background: 'linear-gradient(90deg, transparent, var(--glass-sheen), transparent)',
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
