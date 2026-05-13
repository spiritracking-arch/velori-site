import type { Metadata } from 'next'
import { getProducts, getCategories } from '@/lib/cms'
import ProductCard from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'Browse our full collection of jewelry and watches.',
}

interface Props {
  searchParams: Promise<{ cat?: string; page?: string }>
}

export default async function CataloguePage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1', 10))
  const category = params.cat

  const [{ docs: products, totalPages, totalDocs }, categories] = await Promise.all([
    getProducts({ page: currentPage, limit: 12, category }),
    getCategories(),
  ])

  return (
    <div className="section">
      <div className="container">
        {/* ─── En-tête ───────────────────────────────────────────────────── */}
        <div className="section-header">
          <h1 style={{ fontSize: 'var(--text-4xl)', fontStyle: 'italic' }}>
            {category
              ? categories.find(c => c.slug === category)?.name || category
              : 'All Products'}
          </h1>
          <p style={{ color: 'var(--color-text-light)', fontSize: 'var(--text-sm)', marginTop: '0.5rem' }}>
            {totalDocs} product{totalDocs !== 1 ? 's' : ''}
          </p>
        </div>

        {/* ─── Filtres catégories ────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem', justifyContent: 'center' }}>
          <a
            href="/catalogue"
            className={`btn ${!category ? 'btn-primary' : 'btn-outline'}`}
            style={{ minWidth: 100 }}
          >
            All
          </a>
          {categories.map(cat => (
            <a
              key={cat.id}
              href={`/catalogue?cat=${cat.slug || cat.id}`}
              className={`btn ${category === cat.slug ? 'btn-primary' : 'btn-outline'}`}
              style={{ minWidth: 100 }}
            >
              {cat.name || cat.nameEn}
            </a>
          ))}
        </div>

        {/* ─── Grille produits ──────────────────────────────────────────── */}
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-light)', padding: '4rem 0' }}>
            No products found in this category.
          </p>
        )}

        {/* ─── Pagination ───────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <a
                key={p}
                href={`/catalogue?${category ? `cat=${category}&` : ''}page=${p}`}
                className={`btn ${p === currentPage ? 'btn-primary' : 'btn-outline'}`}
                style={{ minWidth: 44, padding: '0.5rem 0.75rem' }}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
