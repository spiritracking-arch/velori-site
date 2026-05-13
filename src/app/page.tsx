import type { Metadata } from 'next'
import { getFeaturedProducts, getCategories, formatPrice } from '@/lib/cms'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Fine Jewelry & Watches — Velori',
}

const TICKER_ITEMS = [
  '✦ Free shipping on orders over €50',
  '✦ 30-day returns',
  '✦ 2-year warranty',
  '✦ Secure payment via Stripe',
  '✦ Delivered across the European Union',
]

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(6),
    getCategories(),
  ])

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow badge">New Collection 2025</p>
          <h1>Elegance, refined</h1>
          <p>Handpicked jewelry and watches for those who appreciate the finer things in life.</p>
          <a href="/catalogue" className="btn btn-primary">Explore the Collection</a>
        </div>
      </section>

      {/* ─── Bannière défilante ──────────────────────────────────────────── */}
      <div style={{
        background: 'var(--color-cta)',
        color: 'var(--color-cta-text)',
        padding: '0.75rem 0',
        overflow: 'hidden',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
      }}>
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ padding: '0 3rem', whiteSpace: 'nowrap' }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ─── Produits mis en avant ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Our Selection</span>
            <div className="divider" />
            <h2>Favourites</h2>
          </div>

          {featured.length > 0 ? (
            <div className="product-grid">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-light)' }}>
              Products coming soon.
            </p>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/catalogue" className="btn btn-outline">View All Products</a>
          </div>
        </div>
      </section>

      {/* ─── Section éditoriale ──────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
          <span className="badge">Our Story</span>
          <div className="divider" />
          <h2 style={{ marginBottom: '1.5rem' }}>Crafted with intention</h2>
          <p style={{ color: 'var(--color-text-light)', fontWeight: 300, fontSize: 'var(--text-lg)', lineHeight: 1.8 }}>
            Every piece in our collection is selected for its quality, its story, and its ability
            to transcend time. We believe jewelry is not just an accessory — it&apos;s an expression
            of who you are.
          </p>
        </div>
      </section>

      {/* ─── Catégories ──────────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Shop by Category</h2>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <a
                  key={cat.id}
                  href={`/catalogue?cat=${cat.slug || cat.id}`}
                  className="btn btn-outline"
                  style={{ minWidth: 160 }}
                >
                  {cat.name || cat.nameEn}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
