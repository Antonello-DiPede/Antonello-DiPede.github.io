import { useLanguage } from '../context/LanguageContext.jsx';
import GlassPanel from '../components/GlassPanel.jsx';
import LogoBadge from '../components/LogoBadge.jsx';

export default function WorkExperience() {
  const { t, visible } = useLanguage();
  const items = t.experience.items;

  return (
    <div className="px-6 sm:px-12 py-14 sm:py-20 flex justify-center">
      <div className="w-full max-w-3xl">
        <p
          className="fade-content text-xs tracking-widest mb-3 font-mono"
          style={{ color: 'var(--color-steel)', opacity: visible ? 1 : 0 }}
        >
          {t.experience.sectionLabel}
        </p>
        <h1
          className="fade-content text-3xl sm:text-4xl font-bold mb-10 font-display"
          style={{ color: 'var(--color-heading)', opacity: visible ? 1 : 0 }}
        >
          {t.pages.experienceTitle}
        </h1>

        <div className="relative pl-8">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px"
            style={{ background: 'var(--surface-border-soft)' }}
            aria-hidden="true"
          />

          {items.map((item, i) => (
            <div key={i} className="relative mb-8 last:mb-0">
              <div
                className="absolute -left-8 top-7 w-3.5 h-3.5 rounded-full"
                style={{ background: 'var(--color-amber)', boxShadow: '0 0 12px var(--glow-amber-strong)' }}
                aria-hidden="true"
              />

              <GlassPanel className="p-6 sm:p-8">
                <div className="flex gap-4 relative z-10">
                  <LogoBadge src={item.logo} initials={item.initials} alt={item.company} />

                  <div className="flex-1 min-w-0">
                    <div
                      className="fade-content flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-1"
                      style={{ opacity: visible ? 1 : 0 }}
                    >
                      <h2 className="text-lg font-semibold font-display" style={{ color: 'var(--color-heading)' }}>
                        {item.company}
                      </h2>
                      <span className="text-xs font-mono tracking-wide shrink-0" style={{ color: 'var(--color-steel)' }}>
                        {item.period}
                      </span>
                    </div>

                    <p
                      className="fade-content text-sm mb-1"
                      style={{ color: 'var(--color-text-muted)', opacity: visible ? 1 : 0 }}
                    >
                      {item.role}
                    </p>
                    <p
                      className="fade-content text-xs mb-3"
                      style={{ color: 'var(--color-text-dim)', opacity: visible ? 1 : 0 }}
                    >
                      {item.location}
                    </p>

                    {item.description && (
                      <p
                        className="fade-content text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-muted)', opacity: visible ? 1 : 0 }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
