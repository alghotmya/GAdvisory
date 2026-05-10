const VISIT_NOTIFY_SESSION_KEY = 'resume_visit_notify_v1'
const NOTIFY_EMAIL = 'a.maher010@gmail.com'
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`

/**
 * Sends you a short email when the portfolio is opened (via FormSubmit).
 * Throttled to **once per browser tab session** so refreshes do not flood your inbox.
 *
 * First-time setup: FormSubmit may email you once to **activate** the endpoint—click the link they send.
 *
 * This address appears in client code (required for the service). Abuse risk exists; FormSubmit
 * provides basic spam controls—use filters in Gmail if needed.
 */
export function notifyVisitEmail(): void {
  try {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(VISIT_NOTIFY_SESSION_KEY)) {
      return
    }
  } catch {
    /* private / strict mode */
  }

  const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en'
  const message = [
    'Someone opened your portfolio site.',
    '',
    `Path: ${window.location.pathname}${window.location.search}${window.location.hash}`,
    `Referrer: ${document.referrer || '(none / direct)'}`,
    `Language: ${lang}`,
    `Time (UTC): ${new Date().toISOString()}`,
    `User-agent: ${navigator.userAgent}`,
  ].join('\n')

  void fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: 'Portfolio site opened',
      name: 'Automated visit ping',
      email: NOTIFY_EMAIL,
      message,
      _gotcha: '',
      _captcha: 'false',
    }),
    mode: 'cors',
    credentials: 'omit',
    keepalive: true,
  })
    .then((res) => {
      if (res.ok) {
        try {
          sessionStorage.setItem(VISIT_NOTIFY_SESSION_KEY, '1')
        } catch {
          /* ignore */
        }
      }
    })
    .catch(() => {
      /* ignore — must not affect UX */
    })
}
