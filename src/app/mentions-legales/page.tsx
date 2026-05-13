import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Legal Notice' }

const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'zojewel.com'
const STORE_NAME  = process.env.NEXT_PUBLIC_STORE_NAME  || 'Velori'

export default function MentionsLegalesPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontStyle: 'italic', fontSize: 'var(--text-4xl)', marginBottom: '2rem' }}>Legal Notice</h1>
        <div style={{ lineHeight: 1.8, color: 'var(--color-text-light)' }}>
          <p><strong>Website:</strong> {SITE_DOMAIN}</p>
          <p><strong>Company:</strong> {STORE_NAME}</p>
          <p><strong>Hosting:</strong> OVH / Hetzner Cloud</p>
          <p><strong>Contact:</strong> contact@{SITE_DOMAIN}</p>
          <br />
          <p>This website is published for informational and commercial purposes.
          All content is the exclusive property of {STORE_NAME} and is protected by applicable copyright laws.</p>
        </div>
      </div>
    </div>
  )
}
