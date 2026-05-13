'use client'

import { useState, useEffect } from 'react'

const COOKIE_KEY = 'velori-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: '0.5rem' }}>
          We use cookies
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-light)', fontWeight: 300 }}>
          We use essential cookies to ensure our website works properly.
          By clicking "Accept", you consent to our use of cookies in accordance with our{' '}
          <a href="/politique-confidentialite" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
            Privacy Policy
          </a>.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-primary" onClick={accept}>Accept</button>
        <button className="btn btn-outline" onClick={decline}>Decline</button>
      </div>
    </div>
  )
}
