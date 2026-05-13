import type { Metadata } from 'next'
import { CartProvider } from '@/components/CartContext'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import '@/styles/globals.css'

// Chargement du thème selon THEME_KEY
const THEME_KEY = process.env.THEME_KEY || 'elegant'
const SITE_LOCALE = process.env.SITE_LOCALE || 'en'
const STORE_NAME = process.env.NEXT_PUBLIC_STORE_NAME || 'Velori'
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'zojewel.com'

// Import dynamique du CSS thème (résolu au build)
if (THEME_KEY === 'minimal') {
  require('@/styles/themes/minimal.css')
} else {
  require('@/styles/themes/elegant.css')
}

export const metadata: Metadata = {
  title: {
    default: `${STORE_NAME} — Fine Jewelry & Watches`,
    template: `%s | ${STORE_NAME}`,
  },
  description: 'Curated jewelry and watches delivered across Europe.',
  metadataBase: new URL(`https://${SITE_DOMAIN}`),
  openGraph: {
    siteName: STORE_NAME,
    locale: SITE_LOCALE,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={SITE_LOCALE}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  )
}
