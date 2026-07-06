export default function AnimatedLock({ size = 84 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 90" aria-hidden="true" focusable="false">
      <defs>
        <filter id="lock-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="40" cy="55" r="34" fill="var(--glow-steel-soft)" className="lock-halo" />
      <g className="lock-shackle" style={{ transformBox: 'view-box', transformOrigin: '54px 47px' }}>
        <path
          d="M26,47 V30 A14,14 0 0,1 54,30 V47"
          fill="none"
          stroke="var(--color-steel)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#lock-glow)"
        />
      </g>
      <rect x="16" y="45" width="48" height="38" rx="9" fill="var(--color-amber)" filter="url(#lock-glow)" />
      <circle cx="40" cy="61" r="5" fill="var(--color-ink)" />
      <rect x="37.5" y="61" width="5" height="12" rx="2" fill="var(--color-ink)" />
    </svg>
  );
}
