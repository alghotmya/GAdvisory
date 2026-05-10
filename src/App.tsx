import { useEffect, useRef, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'
import {
  credentials,
  domains,
  engagements,
  knowledge,
  mandate,
  profile,
  profilePhotos,
} from './content'
import { articles } from './articles/loadArticles'
import { headlines, type SiteLang } from './headlines'

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
      className={`section reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()}
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

  return (
    <div className="app">
      <div className="app__bg" aria-hidden />
      <header className="nav">
        <a className="nav__brand" href="#top">
          <img
            className="nav__avatar"
            src={activePhoto.src}
            alt=""
            width={40}
            height={40}
            decoding="async"
          />
          <span className="nav__name">{profile.name}</span>
        </a>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="nav__toggle-lines" />
          Menu
        </button>
        <nav id="site-nav" className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="nav__cta"
            href="/resume.pdf"
            download={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
          >
            Résumé PDF
          </a>
        </nav>
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
              <figcaption className="hero__caption">{h.heroCaption}</figcaption>
            </figure>
            <div className="hero__thumbs" role="group" aria-label="Profile photos">
              {profilePhotos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  className={`hero__thumb ${i === photoIndex ? 'hero__thumb--active' : ''}`}
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
            <div className="hero__lang" role="group" aria-label={h.langLabel}>
              <button
                type="button"
                className={`hero__lang-btn ${lang === 'en' ? 'hero__lang-btn--active' : ''}`}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                {h.langEn}
              </button>
              <button
                type="button"
                className={`hero__lang-btn ${lang === 'fr' ? 'hero__lang-btn--active' : ''}`}
                onClick={() => setLang('fr')}
                aria-pressed={lang === 'fr'}
              >
                {h.langFr}
              </button>
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
              <a className="btn btn--primary" href="/resume.pdf" download>
                Download executive résumé
              </a>
              <a className="btn btn--ghost" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              {profile.contactEmail ? (
                <a className="btn btn--ghost" href={`mailto:${profile.contactEmail}`}>
                  Email
                </a>
              ) : null}
            </div>
          </div>
          <aside className="hero__aside" aria-label="Positioning">
            <div className="hero__card">
              <h2 className="hero__card-title">How I operate</h2>
              <ul className="hero__list">
                <li>Clarity before scale — scope that survives first contact with reality.</li>
                <li>One accountable narrative from workshop whiteboard to steering deck.</li>
                <li>Decisions logged, dissent understood, commitments traceable.</li>
              </ul>
            </div>
          </aside>
        </section>

        <Section id="mandate">
          <div className="section__head">
            <h2 className="section__title">The mandate</h2>
            <p className="section__lede">
              Not generic project management—leadership for programs where the technology is hard,
              the politics are harder, and the organization is watching.
            </p>
          </div>
          <div className="cards cards--3">
            {mandate.map((m) => (
              <article key={m.title} className="card">
                <h3 className="card__title">{m.title}</h3>
                <p className="card__body">{m.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="domains">
          <div className="section__head">
            <h2 className="section__title">Domains of practice</h2>
            <p className="section__lede">
              Depth across the full arc: from executive charter to production reality—especially
              when the work touches security, resilience, and customer trust.
            </p>
          </div>
          <div className="domains">
            {domains.map((d, i) => (
              <div key={d.name} className="domain">
                <span className="domain__idx">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="domain__name">{d.name}</h3>
                  <p className="domain__detail">{d.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="engagements">
          <div className="section__head">
            <h2 className="section__title">Representative engagements</h2>
            <p className="section__lede">
              Codenames and rounded, directional metrics protect client identity. Figures are
              illustrative of the class of outcomes delivered—not projections or guarantees for any
              future engagement.
            </p>
          </div>
          <div className="engage-grid">
            {engagements.map((e) => (
              <article key={e.codename} className="engage">
                <header className="engage__head">
                  <span className="engage__code">{e.codename}</span>
                  <span className="engage__role">{e.role}</span>
                </header>
                <p className="engage__context">{e.context}</p>
                <p className="engage__outcome">{e.outcome}</p>
                <ul className="engage__metrics" aria-label="Illustrative impact indicators">
                  {e.metrics.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <ul className="engage__stack">
                  {e.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="knowledge">
          <div className="section__head">
            <h2 className="section__title">Knowledge atlas</h2>
            <p className="section__lede">
              How methods, platforms, and delivery discipline compound—strategic advisory first,
              with rigor underneath.
            </p>
          </div>
          <div className="atlas">
            <div className="atlas__col">
              <h3 className="atlas__heading">Cloud &amp; platform</h3>
              <ul>
                {knowledge.cloud.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="atlas__col">
              <h3 className="atlas__heading">Program craft</h3>
              <ul>
                {knowledge.delivery.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="atlas__col">
              <h3 className="atlas__heading">Consulting practice</h3>
              <ul>
                {knowledge.practices.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="creds">
            <h3 className="creds__title">Credentials &amp; proof</h3>
            <ul>
              {credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="articles" className="section section--articles">
          <div className="section__head">
            <h2 className="section__title">{h.articlesSectionTitle}</h2>
            <p className="section__lede">{h.articlesSectionLede}</p>
            {h.articlesLangNote ? (
              <p className="articles__lang-note">{h.articlesLangNote}</p>
            ) : null}
          </div>

          {selectedArticle ? (
            <div className="article-reader">
              <button
                type="button"
                className="btn btn--ghost article-reader__back"
                onClick={() => {
                  setArticleId(null)
                  window.location.hash = '#articles'
                }}
              >
                {h.backToArticles}
              </button>
              <div className="article-md">
                <ReactMarkdown>{selectedArticle.body}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <ul className="articles__grid">
              {articles.map((a) => (
                <li key={a.id}>
                  <article className="articles__card">
                    <span className="articles__num">{String(a.id).padStart(2, '0')}</span>
                    <h3 className="articles__card-title">{a.title}</h3>
                    {a.takeaway ? <p className="articles__takeaway">{a.takeaway}</p> : null}
                    <button
                      type="button"
                      className="articles__read btn btn--ghost"
                      onClick={() => {
                        setArticleId(a.id)
                        window.location.hash = `#article-${a.slug}`
                      }}
                    >
                      {h.readArticle}
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section id="connect" className="section section--connect">
          <div className="connect">
            <h2 className="connect__title">Begin the conversation</h2>
            <p className="connect__text">
              For boards, CIO offices, and program sponsors who need a steady hand on complex cloud
              work—especially when the engagement is sensitive, visible, and non-negotiable on
              trust.
            </p>
            <div className="connect__actions">
              <a className="btn btn--primary" href="/resume.pdf" download>
                Download PDF résumé
              </a>
              <a className="btn btn--ghost" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn profile
              </a>
            </div>
            <p className="connect__fineprint">
              Engagement metrics shown elsewhere on this page are anonymized and rounded for
              confidentiality.
            </p>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="footer__sep">·</span>
        <span>{h.footerLine}</span>
      </footer>
    </div>
  )
}

export default App
