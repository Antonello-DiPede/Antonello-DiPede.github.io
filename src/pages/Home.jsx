import { Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import GlassPanel from '../components/GlassPanel.jsx';
import AnimatedLock from '../components/AnimatedLock.jsx';

const SOCIAL_LINKS = {
  github: 'https://github.com/Antonello-DiPede',
  linkedin: 'https://www.linkedin.com/in/antonello-di-pede',
};

export default function Home() {
  const { t, visible } = useLanguage();

  return (
    <div className="px-6 sm:px-12 py-14 sm:py-20 flex justify-center">
      <GlassPanel className="w-full max-w-4xl p-8 sm:p-16">
        <div className="absolute top-6 right-6 z-10">
          <AnimatedLock />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-start">
          <img
            src="/profile.png"
            alt="Antonello Di Pede"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shrink-0"
            style={{ border: '1px solid var(--surface-border-soft)' }}
          />

          <div className="max-w-2xl">
            <p
              className="text-xs tracking-widest mb-3 font-mono"
              style={{ color: 'var(--color-steel)' }}
            >
              {t.home.eyebrow}
            </p>
            <h1
              className="fade-content text-3xl sm:text-5xl font-bold mb-4 leading-tight font-display"
              style={{
                color: 'var(--color-heading)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(6px)',
              }}
            >
              {t.home.role}
            </h1>
            <p
              className="fade-content text-lg leading-relaxed mb-8"
              style={{
                color: 'var(--color-text-muted)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(6px)',
              }}
            >
              {t.home.about}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/DiPedeAntonelloResume.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition hover:-translate-y-0.5"
                style={{ background: 'var(--color-amber)', color: 'var(--color-ink)', boxShadow: '0 8px 24px var(--glow-amber-soft)' }}
              >
                <Download size={16} /> {t.home.cvButton}
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.home.githubLabel}
                className="p-2.5 rounded-xl transition hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface-bg)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--color-icon-text)',
                  boxShadow: 'inset 0 1px 0 var(--icon-inset-highlight)',
                }}
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.home.linkedinLabel}
                className="p-2.5 rounded-xl transition hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface-bg)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--color-icon-text)',
                  boxShadow: 'inset 0 1px 0 var(--icon-inset-highlight)',
                }}
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
