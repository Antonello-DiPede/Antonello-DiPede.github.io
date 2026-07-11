import { Award, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import GlassPanel from '../components/GlassPanel.jsx';

export default function Certificates() {
  const { t, visible } = useLanguage();
  const items = t.certificates.items;
  const featured = items.find((c) => c.featured);
  const others = items.filter((c) => !c.featured);

  return (
    <div className="px-6 sm:px-12 py-14 sm:py-20 flex justify-center">
      <div className="w-full max-w-5xl">
        <p
          className="fade-content text-xs tracking-widest mb-3 font-mono"
          style={{ color: 'var(--color-steel)', opacity: visible ? 1 : 0 }}
        >
          {t.certificates.sectionLabel}
        </p>
        <h1
          className="fade-content text-3xl sm:text-4xl font-bold mb-10 font-display"
          style={{ color: 'var(--color-heading)', opacity: visible ? 1 : 0 }}
        >
          {t.pages.certificatesTitle}
        </h1>

        {/* Certificato in evidenza */}
        {featured && (
          <GlassPanel className="p-8 sm:p-10 mb-6">
            <div
              className="fade-content relative z-10"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <Award size={32} style={{ color: 'var(--color-amber)' }} className="mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold font-display mb-2" style={{ color: 'var(--color-heading)' }}>
                {featured.title}
              </h2>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                {featured.issuer}
              </p>
              <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
                {featured.description}
              </p>
              <a
                href={featured.file}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition hover:-translate-y-0.5"
                style={{ background: 'var(--color-amber)', color: 'var(--color-ink)', boxShadow: '0 8px 24px var(--glow-amber-soft)' }}
              >
                <Download size={16} /> {t.certificates.downloadLabel}
              </a>
            </div>
          </GlassPanel>
        )}

        {/* Altri certificati */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {others.map((c, i) => (
            <GlassPanel key={i} className="p-6 sm:p-8 flex flex-col h-full">
              <div className="fade-content relative z-10 flex flex-col h-full" style={{ opacity: visible ? 1 : 0 }}>
                <ShieldCheck size={22} style={{ color: 'var(--color-steel)' }} className="mb-3" />
                <h2 className="text-lg font-semibold font-display mb-1" style={{ color: 'var(--color-heading)' }}>
                  {c.title}
                </h2>
                <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  {c.issuer}
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                  {c.description}
                </p>

                {c.credentialId && (
                  <div className="mb-4">
                    <p
                      className="text-xs font-mono px-3 py-2 rounded-lg inline-block"
                      style={{ background: 'var(--input-bg)', border: '1px solid var(--surface-border)', color: 'var(--color-icon-text)' }}
                    >
                      {t.certificates.credentialIdLabel}: {c.credentialId}
                    </p>
                    <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-dim)' }}>
                      {t.certificates.credentialIdHint}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-auto pt-2">
                  <a
                    href={c.file}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition hover:-translate-y-0.5"
                    style={{ background: 'var(--color-amber)', color: 'var(--color-ink)' }}
                  >
                    <Download size={14} /> {t.certificates.downloadLabel}
                  </a>
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition hover:-translate-y-0.5"
                      style={{ background: 'var(--surface-bg)', border: '1px solid var(--surface-border)', color: 'var(--color-icon-text)' }}
                    >
                      <ExternalLink size={14} /> {t.certificates.verifyLabel}
                    </a>
                  )}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
