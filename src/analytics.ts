import type { SiteLang } from './headlines'

/**
 * Optional aggregate page-view ping. Configure at build time:
 * VITE_PAGE_VIEW_WEBHOOK_URL=https://...
 *
 * Sends a small JSON POST (no cookies, no stored IDs). Your endpoint must allow
 * CORS from your site origin, or the browser will block the request.
 */
export function sendPageViewPing(lang: SiteLang): void {
  const url = import.meta.env.VITE_PAGE_VIEW_WEBHOOK_URL
  if (!url || typeof url !== 'string') return
  if (!url.startsWith('https://')) {
    if (import.meta.env.DEV) {
      console.warn('[analytics] VITE_PAGE_VIEW_WEBHOOK_URL must be an https:// URL')
    }
    return
  }

  const payload = {
    event: 'pageview' as const,
    path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    referrer: document.referrer || null,
    lang,
    ts: new Date().toISOString(),
  }

  void fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    mode: 'cors',
    credentials: 'omit',
    keepalive: true,
  }).catch(() => {
    /* ignore — analytics must not affect UX */
  })
}
