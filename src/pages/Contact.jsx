import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, CredlyIcon } from '../components/BrandIcons.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import GlassPanel from '../components/GlassPanel.jsx';

// L'Access Key di Web3Forms NON è un segreto: è pensata per stare nel codice
// pubblico del client (funziona come un alias verso la tua email, non dà
// accesso a nulla). Sostituisci il valore qui sotto con quella che ricevi
// via email dopo esserti registrato su https://web3forms.com
const WEB3FORMS_ACCESS_KEY = '2df1298c-3efc-4798-b6a8-0fddbd4b0ed9';

const CONTACT_INFO = {
  email: 'antonellodipede@gmail.com',
  phoneDisplay: '+33 07 43 60 64 18',
  phoneHref: '+33743606418',
  location: 'Antibes, France',
  github: 'https://github.com/Antonello-DiPede',
  linkedin: 'https://www.linkedin.com/in/antonello-di-pede',
  credly: 'https://www.credly.com/users/antonellodipede',
};

const iconBoxStyle = {
  background: 'var(--surface-bg)',
  border: '1px solid var(--surface-border)',
};

const inputStyle = {
  background: 'var(--input-bg)',
  border: '1px solid var(--surface-border)',
  color: 'var(--color-icon-text)',
};

export default function Contact() {
  const { t, visible } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  // status: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Nuovo messaggio dal portfolio da ${form.name}`,
          from_name: 'Portfolio — Antonello Di Pede',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="px-6 sm:px-12 py-14 sm:py-20 flex justify-center">
      <GlassPanel className="w-full max-w-4xl p-8 sm:p-14">
        <p
          className="fade-content text-xs tracking-widest mb-3 font-mono relative z-10"
          style={{ color: 'var(--color-steel)', opacity: visible ? 1 : 0 }}
        >
          {t.contact.sectionLabel}
        </p>
        <h1
          className="fade-content text-3xl sm:text-4xl font-bold mb-4 font-display relative z-10"
          style={{ color: 'var(--color-heading)', opacity: visible ? 1 : 0 }}
        >
          {t.pages.contactTitle}
        </h1>
        <p
          className="fade-content text-base mb-10 relative z-10 max-w-xl"
          style={{ color: 'var(--color-text-muted)', opacity: visible ? 1 : 0 }}
        >
          {t.contact.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          {/* Contatti diretti */}
          <div className="space-y-5">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-3 text-sm transition hover:-translate-y-0.5"
              style={{ color: 'var(--color-icon-text)' }}
            >
              <span className="p-2 rounded-lg" style={iconBoxStyle}>
                <Mail size={16} />
              </span>
              {CONTACT_INFO.email}
            </a>

            <a
              href={`tel:${CONTACT_INFO.phoneHref}`}
              className="flex items-center gap-3 text-sm transition hover:-translate-y-0.5"
              style={{ color: 'var(--color-icon-text)' }}
            >
              <span className="p-2 rounded-lg" style={iconBoxStyle}>
                <Phone size={16} />
              </span>
              {CONTACT_INFO.phoneDisplay}
            </a>

            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-icon-text)' }}>
              <span className="p-2 rounded-lg" style={iconBoxStyle}>
                <MapPin size={16} />
              </span>
              {CONTACT_INFO.location}
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl transition hover:-translate-y-0.5"
                style={{ ...iconBoxStyle, color: 'var(--color-icon-text)' }}
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl transition hover:-translate-y-0.5"
                style={{ ...iconBoxStyle, color: 'var(--color-icon-text)' }}
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={CONTACT_INFO.credly}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Credly"
                className="p-2.5 rounded-xl transition hover:-translate-y-0.5"
                style={{ ...iconBoxStyle, color: 'var(--color-icon-text)' }}
              >
                <CredlyIcon size={18} />
              </a>
            </div>
          </div>

          {/* Form collegato a Web3Forms */}
          <div>
            <h2
              className="fade-content text-sm font-semibold mb-4 tracking-wide"
              style={{ color: 'var(--color-heading)', opacity: visible ? 1 : 0 }}
            >
              {t.contact.formTitle}
            </h2>

            {status === 'success' ? (
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {t.contact.successBody}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Honeypot Web3Forms: il nome "botcheck" e il tipo checkbox sono
                    richiesti esattamente così dalla loro documentazione. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    {t.contact.nameField}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.nameField}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    {t.contact.emailField}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={150}
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailField}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    {t.contact.messageField}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={2000}
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.contact.messageField}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={inputStyle}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs" style={{ color: 'var(--color-amber)' }}>
                    {t.contact.errorPrefix}{' '}
                    <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: 'var(--color-steel)' }}>
                      {CONTACT_INFO.email}
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'var(--color-amber)', color: 'var(--color-ink)', boxShadow: '0 8px 24px var(--glow-amber-soft)' }}
                >
                  <Send size={16} /> {status === 'sending' ? t.contact.sendingLabel : t.contact.sendButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
