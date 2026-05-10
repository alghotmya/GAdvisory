import { useEffect, useRef, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import './App.css'
import { articles } from './articles/loadArticles'
import {
  credentials,
  domains,
  engagements,
  knowledge,
  mandate,
  profile,
  profilePhotos,
} from './content'
import { headlines, type SiteLang } from './headlines'
import { sendPageViewPing } from './analytics'

function getNavLinks(lang: SiteLang) {
  const h = headlines[lang]
  return [
    { id: 'mandate', label: 'Mandate' },
    { id: 'domains', label: 'Domains' },
    { id: 'engagements', label: 'Engagements' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'articles', label: h.articlesNav },
    { id: 'connect', label: 'Connect' },
  ]
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  const { ref, visible } = useReveal()
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'mx-auto max-w-[1120px] px-6 py-14 md:py-16',
        'reveal',
        visible && 'reveal--visible',
        className,
      )}
    >
      {children}
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [lang, setLang] = useState<SiteLang>('en')
  const [articleId, setArticleId] = useState<number | null>(null)

  const activePhoto = profilePhotos[photoIndex] ?? profilePhotos[0]
  const h = headlines[lang]
  const navLinks = getNavLinks(lang)
  const selectedArticle = articleId != null ? articles.find((a) => a.id === articleId) : null

  useEffect(() => {
    document.documentElement.lang = lang === 'fr' ? 'fr' : 'en'
  }, [lang])

  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash.replace(/^#/, '')
      if (raw.startsWith('article-')) {
        const slug = raw.slice('article-'.length)
        const a = articles.find((x) => x.slug === slug)
        if (a) setArticleId(a.id)
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  useEffect(() => {
    if (!import.meta.env.VITE_PAGE_VIEW_WEBHOOK_URL) return
    sendPageViewPing(lang)
    const onHash = () => sendPageViewPing(lang)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [lang])

  return (
    <div className="app">
      <div className="app__bg" aria-hidden />
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-4">
          <a className="flex items-center gap-3 no-underline" href="#top">
            <img
              className="size-10 rounded-full border-2 border-primary/60 object-cover shadow-md"
              src={activePhoto.src}
              alt=""
              width={40}
              height={40}
              decoding="async"
            />
            <span className="font-display text-base font-semibold tracking-wide text-foreground">
              {profile.name}
            </span>
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-2 text-sm font-medium text-foreground md:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="flex flex-col gap-1" aria-hidden>
              <span className="h-0.5 w-4 bg-foreground" />
              <span className="h-0.5 w-4 bg-foreground" />
              <span className="h-0.5 w-4 bg-foreground" />
            </span>
            Menu
          </button>
          <nav
            id="site-nav"
            className={cn(
              'absolute left-0 right-0 top-full flex-col gap-2 border-b border-border bg-background/95 p-4 md:static md:flex md:flex-row md:flex-wrap md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0',
              menuOpen ? 'flex' : 'hidden md:flex',
            )}
          >
            {navLinks.map((l) => (
              <a
                key={l.id}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Button asChild size="sm" className="rounded-full md:ml-2">
              <a
                href="/resume.pdf"
                download={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
              >
                Résumé PDF
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__visual">
            <figure className="hero__figure">
              <div className="hero__portrait-ring">
                <img
                  className="hero__portrait"
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  width={560}
                  height={700}
                  decoding="async"
                />
              </div>
            </figure>
            <div className="hero__thumbs" role="group" aria-label="Profile photos">
              {profilePhotos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  className={cn('hero__thumb', i === photoIndex && 'hero__thumb--active')}
                  onClick={() => setPhotoIndex(i)}
                  aria-pressed={i === photoIndex}
                  aria-label={p.label}
                >
                  <img src={p.src} alt="" width={64} height={64} decoding="async" />
                </button>
              ))}
            </div>
          </div>
          <div className="hero__content">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div
                className="inline-flex rounded-full border border-border bg-muted/25 p-1"
                role="group"
                aria-label={h.langLabel}
              >
                <Button
                  type="button"
                  size="sm"
                  variant={lang === 'en' ? 'default' : 'ghost'}
                  className="rounded-full px-4"
                  onClick={() => setLang('en')}
                  aria-pressed={lang === 'en'}
                >
                  {h.langEn}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={lang === 'fr' ? 'default' : 'ghost'}
                  className="rounded-full px-4"
                  onClick={() => setLang('fr')}
                  aria-pressed={lang === 'fr'}
                >
                  {h.langFr}
                </Button>
              </div>
            </div>
            <p className="hero__eyebrow">
              <span className="hero__pulse" aria-hidden />
              {h.eyebrow}
            </p>
            <h1 className="hero__title">
              {profile.name}
              <span className="hero__title-sub">{h.shortTitle}</span>
              <span className="hero__title-focus">{h.roleFocus}</span>
            </h1>
            <p className="hero__tagline">{h.tagline}</p>
            <p className="hero__loc">{profile.location}</p>
            <div className="hero__actions">
              <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20">
                <a href="/resume.pdf" download>
                  Download executive résumé
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border/80">
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </Button>
              {profile.contactEmail ? (
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href={`mailto:${profile.contactEmail}`}>Email</a>
                </Button>
              ) : null}
            </div>
          </div>
          <aside className="hero__aside" aria-label="Positioning">
            <Card className="border-border/80 bg-card/90 shadow-xl shadow-black/30">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-xl">How I operate</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                  <li>Clarity before scale — scope that survives first contact with reality.</li>
                  <li>One accountable narrative from workshop whiteboard to steering deck.</li>
                  <li>Decisions logged, dissent understood, commitments traceable.</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </section>

        <Section id="mandate">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              The mandate
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Not generic project management—leadership for programs where the technology is hard,
              the politics are harder, and the organization is watching.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {mandate.map((m) => (
              <Card
                key={m.title}
                className="border-border/80 bg-card/60 transition-shadow hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader>
                  <CardTitle className="text-base text-accent">{m.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{m.body}</CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="domains">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Domains of practice
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Depth across the full arc: from executive charter to production reality—especially when
              the work touches security, resilience, and customer trust.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {domains.map((d, i) => (
              <Card key={d.name} className="border-border/80 bg-card/50">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                  <span className="pt-1 font-mono text-xs font-bold tracking-widest text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="space-y-2">
                    <CardTitle className="font-display text-lg font-semibold">{d.name}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {d.detail}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="engagements">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Representative engagements
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Codenames and rounded, directional metrics protect client identity. Figures are
              illustrative of the class of outcomes delivered—not projections or guarantees for any
              future engagement.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {engagements.map((e) => (
              <Card
                key={e.codename}
                className="border-border/80 bg-gradient-to-b from-card/80 to-card/40 shadow-md"
              >
                <CardHeader className="flex flex-row flex-wrap items-baseline justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="font-display text-2xl tracking-wide">{e.codename}</CardTitle>
                  <Badge variant="secondary" className="text-[0.65rem] uppercase tracking-widest">
                    {e.role}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">{e.context}</p>
                  <p className="text-foreground/90">{e.outcome}</p>
                  <ul className="engage__metrics" aria-label="Illustrative impact indicators">
                    {e.metrics.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {e.stack.map((s) => (
                      <Badge key={s} variant="outline" className="font-normal text-muted-foreground">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="knowledge">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Knowledge atlas
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              How methods, platforms, and delivery discipline compound—strategic advisory first,
              with rigor underneath.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border/80 bg-card/50">
              <CardHeader>
                <CardTitle className="text-accent">Cloud &amp; platform</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                  {knowledge.cloud.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border/80 bg-card/50">
              <CardHeader>
                <CardTitle className="text-accent">Program craft</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                  {knowledge.delivery.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border/80 bg-card/50">
              <CardHeader>
                <CardTitle className="text-accent">Consulting practice</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                  {knowledge.practices.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6 border-dashed border-primary/40 bg-primary/5">
            <CardHeader>
              <CardTitle className="font-display text-lg">Credentials &amp; proof</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                {credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Section>

        <Section id="articles" className="pb-20">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {h.articlesSectionTitle}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">{h.articlesSectionLede}</p>
            {h.articlesLangNote ? (
              <p className="mt-2 text-sm italic text-muted-foreground">{h.articlesLangNote}</p>
            ) : null}
          </div>

          {selectedArticle ? (
            <div className="mx-auto max-w-2xl">
              <Button
                type="button"
                variant="outline"
                className="mb-6 rounded-full"
                onClick={() => {
                  setArticleId(null)
                  window.location.hash = '#articles'
                }}
              >
                {h.backToArticles}
              </Button>
              <Card className="border-border/80 bg-card/70 p-6 md:p-8">
                <div className="article-md">
                  <ReactMarkdown>{selectedArticle.body}</ReactMarkdown>
                </div>
              </Card>
            </div>
          ) : (
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <li key={a.id}>
                  <Card className="flex h-full flex-col border-border/80 bg-card/60 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                    <CardHeader className="pb-2">
                      <span className="text-[0.7rem] font-bold tracking-widest text-primary">
                        {String(a.id).padStart(2, '0')}
                      </span>
                      <CardTitle className="font-display text-lg leading-snug">{a.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      {a.takeaway ? (
                        <p className="text-sm leading-relaxed text-muted-foreground">{a.takeaway}</p>
                      ) : null}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-full rounded-full"
                        onClick={() => {
                          setArticleId(a.id)
                          window.location.hash = `#article-${a.slug}`
                        }}
                      >
                        {h.readArticle}
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section id="connect" className="pb-24">
          <Card className="mx-auto max-w-xl border-border/80 bg-gradient-to-b from-card/90 to-card/50 text-center shadow-xl">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Begin the conversation</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                For boards, CIO offices, and program sponsors who need a steady hand on complex
                cloud work—especially when the engagement is sensitive, visible, and non-negotiable
                on trust.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="rounded-full">
                <a href="/resume.pdf" download>
                  Download PDF résumé
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                  LinkedIn profile
                </a>
              </Button>
            </CardFooter>
            <p className="px-6 pb-6 text-xs text-muted-foreground">
              Engagement metrics shown elsewhere on this page are anonymized and rounded for
              confidentiality.
            </p>
          </Card>
        </Section>
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-sm text-muted-foreground">
        <div>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="mx-2 opacity-50">·</span>
          <span>{h.footerLine}</span>
        </div>
        {import.meta.env.VITE_PAGE_VIEW_WEBHOOK_URL ? (
          <p className="mx-auto mt-4 max-w-2xl px-4 text-xs leading-relaxed text-muted-foreground/90">
            {h.privacyAnalytics}
          </p>
        ) : null}
      </footer>
    </div>
  )
}

export default App
