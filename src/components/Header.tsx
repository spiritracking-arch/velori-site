'use client'

import Link from 'next/link'
import { useCart } from './CartContext'

const LOCALE = process.env.NEXT_PUBLIC_SITE_LOCALE || 'en'
const STORE_NAME = process.env.NEXT_PUBLIC_STORE_NAME || 'Velori'

const NAV_LABELS: Record<string, { catalogue: string; collections: string }> = {
  en: { catalogue: 'Catalogue', collections: 'Collections' },
  fr: { catalogue: 'Catalogue', collections: 'Collections' },
  de: { catalogue: 'Katalog', collections: 'Kollektionen' },
  es: { catalogue: 'Catálogo', collections: 'Colecciones' },
  it: { catalogue: 'Catalogo', collections: 'Collezioni' },
  pt: { catalogue: 'Catálogo', collections: 'Coleções' },
  nl: { catalogue: 'Catalogus', collections: 'Collecties' },
}

export default function Header() {
  const { totalItems } = useCart()
  const labels = NAV_LABELS[LOCALE] ?? NAV_LABELS.en

  return (
    <header className="header">
      <div className="container header-inner">
        {/* Logo */}
        <Link href="/" className="header-logo">
          {STORE_NAME}
        </Link>

        {/* Nav */}
        <nav aria-label="Navigation principale">
          <ul className="header-nav">
            <li><Link href="/catalogue">{labels.catalogue}</Link></li>
            <li><Link href="/catalogue?cat=bijoux">Bijoux</Link></li>
            <li><Link href="/catalogue?cat=montres">Montres</Link></li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link href="/panier" className="cart-icon" aria-label="Panier">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
