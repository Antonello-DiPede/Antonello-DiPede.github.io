# Sicurezza — Note OWASP Top 10

Questo sito è, per ora, **completamente statico** (nessun backend, nessun form che invia dati). La superficie di attacco è quindi ridotta, ma abbiamo comunque applicato queste misure fin da subito:

## Misure già applicate

- **A03:2021 – Injection**: React esegue l'escaping automatico di tutto il testo renderizzato. Non viene mai usato `dangerouslySetInnerHTML`, `eval`, o inserimento di HTML da fonti esterne/non fidate.
- **A05:2021 – Security Misconfiguration**:
  - Content-Security-Policy impostata via meta tag in `index.html` (limita le origini da cui possono essere caricati script, stili, font, immagini).
  - `.gitignore` esclude `.env` e altri file che potrebbero contenere segreti: **non committare mai credenziali, chiavi API o token nel repository**, nemmeno in commit futuri.
  - `rel="noopener noreferrer"` su tutti i link esterni (GitHub, LinkedIn) per prevenire *reverse tabnabbing*.
- **A06:2021 – Vulnerable and Outdated Components**:
  - Il workflow di deploy esegue `npm audit` ad ogni build (attualmente non bloccante — vedi nota sotto).
  - Consigliato: attiva **Dependabot** su GitHub (Settings → Security → Dependabot alerts) per ricevere notifiche automatiche su dipendenze vulnerabili.
- **A08:2021 – Software and Data Integrity Failures**: le GitHub Actions usate nel workflow sono azioni ufficiali versionate (`actions/checkout@v4`, ecc.), non script di terze parti non verificati.
- **Route allowlist (mitigazione path/URL injection)**: `src/App.jsx` definisce esplicitamente solo le 5 rotte previste (`/`, `/education`, `/projects`, `/experience`, `/contact`). Qualsiasi altro percorso — digitato a mano, da link rotto, o da tentativo di manipolazione dell'URL — viene intercettato da una rotta wildcard (`path="*"`) e reindirizzato alla Home, invece di produrre contenuto o errori non controllati. `public/404.html` + lo script in `index.html` gestiscono inoltre il caso di accesso diretto o refresh su una rotta valida (necessario perché GitHub Pages è hosting statico e non conosce le rotte gestite lato client da React Router).

## Limiti noti (dovuti a GitHub Pages)

GitHub Pages non permette di impostare header HTTP personalizzati (es. `X-Frame-Options`, `Strict-Transport-Security` avanzato). La CSP è quindi applicata solo via meta tag, che copre meno casi rispetto a un header HTTP reale. Se in futuro si aggiunge un dominio personalizzato dietro un proxy come Cloudflare, si possono impostare header di sicurezza completi lì.

## Quando aggiungeremo il form di richiesta CV via email

Quella funzionalità (rimandata per ora) introdurrà un vero punto di input utente, quindi andranno applicate ulteriori misure OWASP:

- **A03 Injection**: validazione e sanitizzazione rigorosa di tutti i campi del form, sia lato client che — soprattutto — lato server/servizio terzo.
- **A04 Insecure Design**: rate limiting sulle richieste (per evitare spam/abuso del bottone di invio) e CAPTCHA o honeypot field anti-bot.
- **A07 Identification and Authentication Failures**: se si aggiunge un'area admin per gestire le richieste, autenticazione solida (no password deboli, considerare 2FA).
- **Email header injection**: mai costruire l'header dell'email concatenando direttamente l'input utente.
- Nessuna chiave API o credenziale del servizio email deve mai finire nel codice frontend (sarebbe visibile a chiunque apra il sito): va gestita lato server/funzione serverless con variabili d'ambiente.

## Nota su `npm audit` nel workflow

Attualmente `npm audit` gira ma non blocca il deploy (`|| true` nel workflow) per evitare interruzioni impreviste. Quando il progetto sarà stabile, valuta di rimuovere `|| true` per bloccare automaticamente i deploy in presenza di vulnerabilità gravi non risolte.
