const CMS_URL = process.env.CMS_URL || 'https://cms.zojewel.com'
const LOCALE = process.env.SITE_LOCALE || 'en'

/** Headers communs pour les requêtes CMS */
function cmsHeaders() {
  return { 'Content-Type': 'application/json' }
}

/** Fetch générique avec revalidation ISR (60s par défaut) */
async function cmsFetch<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${CMS_URL}/api${path}`, {
    headers: cmsHeaders(),
    next: { revalidate },
  })
  if (!res.ok) throw new Error(`CMS fetch failed: ${path} (${res.status})`)
  return res.json()
}

// ─── Types ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  titleEn: string
  title?: string          // localisé
  description?: any       // Lexical
  images: { url: string; alt?: string }[]
  pricing: {
    finalPrice: number
    aliexpressPrice?: number
  }
  slug?: string
  category?: { id: string; nameEn: string; name?: string }
  variants?: { type: string; value: string; label?: string }[]
  stripePriceId?: string
  metaTitle?: string
  metaDescription?: string
  translationStatus: 'draft' | 'translating' | 'published'
}

export interface Category {
  id: string
  nameEn: string
  name?: string
  slug?: string
  image?: { url: string }
}

// ─── Fonctions ─────────────────────────────────────────────────────────────

/** Produits publiés pour la locale courante */
export async function getProducts({
  page = 1,
  limit = 12,
  category,
}: {
  page?: number
  limit?: number
  category?: string
} = {}) {
  const params = new URLSearchParams({
    locale: LOCALE,
    depth: '1',
    limit: String(limit),
    page: String(page),
    'where[translationStatus][equals]': 'published',
    sort: '-createdAt',
  })

  if (category) {
    params.set('where[category.slug][equals]', category)
  }

  const data = await cmsFetch<{ docs: Product[]; totalDocs: number; totalPages: number }>(
    `/products?${params}`
  )
  return data
}

/** Produits mis en avant (homepage) */
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const data = await getProducts({ limit })
  return data.docs
}

/** Un produit par slug */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const params = new URLSearchParams({
    locale: LOCALE,
    depth: '1',
    'where[slug][equals]': slug,
    'where[translationStatus][equals]': 'published',
    limit: '1',
  })

  const data = await cmsFetch<{ docs: Product[] }>(`/products?${params}`)
  return data.docs[0] ?? null
}

/** Tous les slugs publiés (pour sitemap) */
export async function getAllSlugs(): Promise<string[]> {
  const params = new URLSearchParams({
    locale: LOCALE,
    'where[translationStatus][equals]': 'published',
    limit: '1000',
    select: 'slug',
  })

  const data = await cmsFetch<{ docs: { slug?: string }[] }>(`/products?${params}`, 3600)
  return data.docs.map(d => d.slug).filter(Boolean) as string[]
}

/** Toutes les catégories */
export async function getCategories(): Promise<Category[]> {
  const params = new URLSearchParams({ locale: LOCALE, limit: '50' })
  const data = await cmsFetch<{ docs: Category[] }>(`/categories?${params}`, 3600)
  return data.docs
}

/** Config du site courant */
export async function getSiteConfig() {
  const params = new URLSearchParams({
    'where[locale][equals]': LOCALE,
    limit: '1',
  })
  const data = await cmsFetch<{ docs: any[] }>(`/site-configs?${params}`, 3600)
  return data.docs[0] ?? null
}

/** URL complète d'une image CMS */
export function cmsImageUrl(url: string): string {
  if (!url) return '/placeholder.jpg'
  if (url.startsWith('http')) return url
  return `${CMS_URL}${url}`
}

/** Formate un prix en EUR */
export function formatPrice(price: number, locale = LOCALE): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-GB' : locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

/** Extrait le texte brut d'un Lexical node */
export function lexicalToText(lexical: any): string {
  if (!lexical?.root?.children) return ''
  return lexical.root.children
    .flatMap((node: any) => node.children ?? [])
    .filter((n: any) => n.type === 'text')
    .map((n: any) => n.text)
    .join(' ')
}
