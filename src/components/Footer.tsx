'use client'

import Link from 'next/link'

const STORE_NAME = process.env.NEXT_PUBLIC_STORE_NAME || 'Velori'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="header-logo" style={{ marginBottom: '1rem' }}>{STORE_NAME}</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-light)', maxWidth: 280, fontWeight: 300 }}>
              Fine jewelry & watches curated for every moment. Delivered across Europe.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 500 }}>Shop</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/catalogue">All Products</Link></li>
              <li><Link href="/catalogue?cat=bijoux">Jewelry</Link></li>
              <li><Link href="/catalogue?cat=montres">Watches</Link></li>
            </ul>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 500 }}>Legal</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/cgv">Terms of Sale</Link></li>
              <li><Link href="/mentions-legales">Legal Notice</Link></li>
              <li><Link href="/politique-confidentialite">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {STORE_NAME}. All rights reserved.</span>
          <ul className="footer-links" style={{ listStyle: 'none' }}>
            <li><Link href="/cgv">CGV</Link></li>
            <li><Link href="/politique-confidentialite">RGPD</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
