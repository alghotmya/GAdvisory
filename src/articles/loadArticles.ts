export type Article = {
  id: number
  slug: string
  title: string
  takeaway: string
  body: string
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72)
}

const modules = import.meta.glob<string>('./post-*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const sortedPaths = Object.keys(modules).sort((a, b) => {
  const n = (p: string) => parseInt(p.match(/post-(\d+)/)?.[1] ?? '0', 10)
  return n(a) - n(b)
})

function titleFromMarkdown(raw: string): string {
  const first = raw.trim().split('\n')[0]?.trim() ?? ''
  if (first.startsWith('# ')) return first.slice(2).trim()
  const h2 = raw.match(/^##\s*\d+\.\s*(.+)$/m)
  return h2?.[1]?.trim() ?? 'Article'
}

function takeawayFromMarkdown(raw: string): string {
  const m = raw.match(/\*\*Advisor takeaway:\*\*\s*([\s\S]*?)$/im)
  return m?.[1]?.replace(/\*\*/g, '').trim() ?? ''
}

export const articles: Article[] = sortedPaths.map((path, i) => {
  const raw = (modules[path] ?? '').trim()
  const title = titleFromMarkdown(raw)
  return {
    id: i + 1,
    slug: slugify(title),
    title,
    takeaway: takeawayFromMarkdown(raw),
    body: raw,
  }
})
