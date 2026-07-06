import { GithubIcon } from '../components/BrandIcons.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import GlassPanel from '../components/GlassPanel.jsx';

export default function Projects() {
  const { t, visible } = useLanguage();
  const items = t.projects.items;

  return (
    <div className="px-6 sm:px-12 py-14 sm:py-20 flex justify-center">
      <div className="w-full max-w-5xl">
        <p
          className="fade-content text-xs tracking-widest mb-3 font-mono"
          style={{ color: 'var(--color-steel)', opacity: visible ? 1 : 0 }}
        >
          {t.projects.sectionLabel}
        </p>
        <h1
          className="fade-content text-3xl sm:text-4xl font-bold mb-10 font-display"
          style={{ color: 'var(--color-heading)', opacity: visible ? 1 : 0 }}
        >
          {t.pages.projectsTitle}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <GlassPanel key={i} className="p-6 sm:p-8 flex flex-col h-full">
              <div
                className="fade-content flex items-start justify-between gap-3 mb-3 relative z-10"
                style={{ opacity: visible ? 1 : 0 }}
              >
                <h2 className="text-lg font-semibold font-display leading-snug" style={{ color: 'var(--color-heading)' }}>
                  {item.title}
                </h2>
                {item.mark ? (
                  <span className="text-xs font-mono shrink-0 whitespace-nowrap" style={{ color: 'var(--color-amber)' }}>
                    {t.projects.markLabel}: {item.mark}
                  </span>
                ) : (
                  <span className="text-xs font-mono shrink-0 whitespace-nowrap" style={{ color: 'var(--color-steel)' }}>
                    {item.badge}
                  </span>
                )}
              </div>

              <p
                className="fade-content text-sm mb-4 leading-relaxed relative z-10"
                style={{ color: 'var(--color-text-muted)', opacity: visible ? 1 : 0 }}
              >
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                {item.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-full"
                    style={{
                      background: 'var(--input-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--color-nav-inactive)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm font-medium transition hover:-translate-y-0.5 relative z-10"
                style={{ color: 'var(--color-icon-text)' }}
              >
                <GithubIcon size={16} /> {t.projects.viewLabel}
              </a>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
