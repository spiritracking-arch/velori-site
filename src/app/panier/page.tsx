'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import { formatPrice } from '@/lib/cms'

const LOCALE = process.env.NEXT_PUBLIC_SITE_LOCALE || 'en'
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'zojewel.com'

export default function CartPage() {
  const { items, totalItems, totalPrice, remove, updateQty } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    if (!items.length) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/checkout`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(i => ({
              productId: i.productId,
              quantity: i.quantity,
            })),
            locale: LOCALE,
            successUrl: `https://${SITE_DOMAIN}/commande/succes?session={CHECKOUT_SESSION_ID}`,
            cancelUrl: `https://${SITE_DOMAIN}/panier`,
          }),
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      if (data.url) window.location.href = data.url
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (totalItems === 0) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div className="container">
          <h1 style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>Your cart is empty</h1>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
            Discover our collection and find something you love.
          </p>
          <Link href="/catalogue" className="btn btn-primary">Explore Catalogue</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1 style={{ fontStyle: 'italic', fontSize: 'var(--text-4xl)', marginBottom: '3rem' }}>
          Your Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
        </h1>

        {/* ─── Articles ──────────────────────────────────────────────────── */}
        <div style={{ marginBottom: '2rem' }}>
          {items.map(item => (
            <div key={item.productId} className="cart-item">
              {/* Image */}
              <div style={{ position: 'relative', width: 80, height: 80, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--color-bg-alt)' }}>
                {item.imageUrl && (
                  <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} />
                )}
              </div>

              {/* Infos */}
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)' }}>{item.title}</p>
                {item.variantLabel && (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)', marginTop: 2 }}>{item.variantLabel}</p>
                )}
                <p style={{ color: 'var(--color-primary)', marginTop: '0.5rem', fontSize: 'var(--text-sm)' }}>
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>

              {/* Quantité + Supprimer */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateQty(item.productId, item.quantity - 1)}>−</button>
                  <span style={{ minWidth: 24, textAlign: 'center', fontSize: 'var(--text-sm)' }}>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.productId, item.quantity + 1)}>+</button>
                </div>
                <button
                  onClick={() => remove(item.productId)}
                  style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-light)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Résumé + CTA ──────────────────────────────────────────────── */}
        <div style={{
          background: 'var(--color-bg-alt)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--color-text-light)' }}>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--color-text-light)' }}>Shipping</span>
            <span style={{ color: 'var(--color-primary)' }}>
              {totalPrice >= 50 ? 'Free' : formatPrice(4.99)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)' }}>
            <span>Total</span>
            <span>{formatPrice(totalPrice >= 50 ? totalPrice : totalPrice + 4.99)}</span>
          </div>

          {error && (
            <p style={{ color: '#c0392b', fontSize: 'var(--text-sm)', marginTop: '1rem' }}>{error}</p>
          )}

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', fontSize: 'var(--text-sm)' }}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Redirecting to payment…' : 'Proceed to Checkout'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-text-light)', marginTop: '1rem' }}>
            🔒 Secure payment via Stripe
          </p>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link href="/catalogue" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-light)', textDecoration: 'underline' }}>
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
