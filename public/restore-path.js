// Ripristina il percorso reale codificato da 404.html, PRIMA che React Router
// monti l'app. Vedi public/404.html per la spiegazione completa del perché
// serve (GitHub Pages è hosting statico e non conosce le rotte di React Router).
//
// Questo file sta in public/ apposta: essendo uno script caricato da file
// esterno (stesso dominio), rispetta la CSP "script-src 'self'" senza bisogno
// di 'unsafe-inline' o di un hash — a differenza di uno <script> inline in
// index.html, che verrebbe bloccato.
(function (l) {
  if (l.search[1] === '/') {
    var decoded = l.search
      .slice(1)
      .split('&')
      .map(function (s) {
        return s.replace(/~and~/g, '&');
      })
      .join('?');
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
})(window.location);
