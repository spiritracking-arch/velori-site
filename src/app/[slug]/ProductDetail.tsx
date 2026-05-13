'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/lib/cms'
import { cmsImageUrl, formatPrice, lexicalToText } from '@/lib/cms'
import { useCart } from '@/components/CartContext'

interface Props {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  const { add } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const title = product.title || product.titleEn
  const price = product.pricing?.finalPrice ?? 0
  const images = product.images ?? []
  const description = lexicalToText(product.description)

  // Groupe les variantes par type
  const variantsByType = (product.variants ?? []).reduce<Record<string, typeof product.variants>>((acc, v) => {
    if (!v) return acc
    acc[v.type] = acc[v.type] || []
    acc[v.type]!.push(v)
    return acc
  }, {})

  function handleAddToCart() {
    if (!product.stripePriceId) return

    add({
      productId: product.id,
      title,
      price,
      imageUrl: images[0] ? cmsImageUrl(images[0].url) : '',
      stripePriceId: product.stripePriceId,
      quantity: 1,
      variantLabel: selectedVariant || undefined,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container">
      <div className="product-layout">
        {/* ─── Galerie ────────────────────────────────────────────────── */}
        <div>
          <div className="product-gallery-main">
            {images[activeImage] ? (
              <Image
                src={cmsImageUrl(images[activeImage].url)}
                alt={images[activeImage].alt || title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--color-bg-alt)' }} />
            )}
          </div>

          {images.length > 1 && (
            <div className="product-gallery-thumbs">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={cmsImageUrl(img.url)}
                  alt={img.alt || `${title} ${i + 1}`}
                  className={`product-gallery-thumb ${i === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ─── Infos produit ──────────────────────────────────────────── */}
        <div style={{ paddingTop: '1rem' }}>
          <span className="badge">New Arrival</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--weight-light)', fontStyle: 'italic', margin: '1rem 0 0.5rem' }}>
            {title}
          </h1>

          <p className="product-price-large">{formatPrice(price)}</p>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', letterSpacing: 'var(--tracking-wider)', marginBottom: '1.5rem' }}>
            Free shipping · 30-day returns
          </p>

          {/* Variantes */}
          {Object.entries(variantsByType).map(([type, variants]) => (
            <div key={type} style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 500 }}>
                {type}
              </p>
              <div className="variant-selector">
                {variants?.map(v => (
                  <button
                    key={v?.value}
                    className={`variant-btn ${selectedVariant === v?.value ? 'selected' : ''}`}
                    onClick={() => setSelectedVariant(v?.value ?? null)}
                  >
                    {v?.label || v?.value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Bouton panier */}
          <button
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1rem', fontSize: 'var(--text-sm)', padding: '1rem 2rem' }}
            onClick={handleAddToCart}
            disabled={!product.stripePriceId}
          >
            {added ? '✓ Added to Cart' : !product.stripePriceId ? 'Unavailable' : 'Add to Cart'}
          </button>

          {/* Description */}
          {description && (
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
              <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: '1rem', fontStyle: 'italic' }}>Description</h2>
              <p style={{ color: 'var(--color-text-light)', lineHeight: 1.8, fontWeight: 300 }}>
                {description}
              </p>
            </div>
          )}

          {/* Garanties */}
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-light)' }}>
            {[
              ['🚚', 'Free shipping', 'Orders over €50'],
              ['↩️', '30-day returns', 'Hassle-free'],
              ['🛡️', '2-year warranty', 'All products'],
              ['🔒', 'Secure payment', 'Powered by Stripe'],
            ].map(([icon, label, sub]) => (
              <div key={label}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <p style={{ fontWeight: 500, marginTop: '0.25rem' }}>{label}</p>
                <p>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
