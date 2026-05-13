import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'zojewel.com'
const STORE_NAME  = process.env.NEXT_PUBLIC_STORE_NAME  || 'Velori'

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontStyle: 'italic', fontSize: 'var(--text-4xl)', marginBottom: '2rem' }}>Privacy Policy</h1>
        <div style={{ lineHeight: 1.8, color: 'var(--color-text-light)' }}>
          <Section title="Data We Collect">
            <p>When you place an order, we collect: your name, email address, shipping address,
            and payment information (processed securely by Stripe — we do not store card details).</p>
          </Section>
          <Section title="How We Use Your Data">
            <p>Your data is used solely to process and deliver your orders, and to communicate
            order status updates. We do not sell or share your data with third parties,
            except as required to fulfil your order (e.g. shipping carriers).</p>
          </Section>
          <Section title="Cookies">
            <p>We use essential cookies only (cart state, consent preference).
            We do not use advertising or tracking cookies.</p>
          </Section>
          <Section title="Your Rights (GDPR)">
            <p>You have the right to access, rectify, or delete your personal data.
            To exercise these rights, contact us at: privacy@{SITE_DOMAIN}</p>
          </Section>
          <Section title="Data Retention">
            <p>Order data is retained for 5 years as required by French commercial law.
            Account data is deleted upon request.</p>
          </Section>
          <Section title="Contact">
            <p>{STORE_NAME} — privacy@{SITE_DOMAIN}</p>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: 'var(--text-xl)', fontStyle: 'italic', color: 'var(--color-text)', marginBottom: '0.75rem' }}>{title}</h2>
      {children}
    </div>
  )
}
