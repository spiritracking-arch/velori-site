import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Sale' }

const STORE_NAME = process.env.NEXT_PUBLIC_STORE_NAME || 'Velori'
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'zojewel.com'

export default function CGVPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontStyle: 'italic', fontSize: 'var(--text-4xl)', marginBottom: '2rem' }}>
          Terms of Sale
        </h1>

        <div style={{ lineHeight: 1.8, color: 'var(--color-text-light)' }}>
          <Section title="1. General">
            <p>These terms govern all purchases made on {SITE_DOMAIN} operated by {STORE_NAME}.
            By placing an order, you agree to these terms in full.</p>
          </Section>

          <Section title="2. Products">
            <p>All products are subject to availability. Prices are displayed in Euros (€) inclusive of VAT.
            We reserve the right to modify prices without prior notice.</p>
          </Section>

          <Section title="3. Ordering">
            <p>Orders are placed through our secure Stripe checkout. A confirmation email is sent upon
            successful payment. Orders cannot be modified once submitted.</p>
          </Section>

          <Section title="4. Shipping">
            <p>We deliver across the European Union. Standard delivery takes 7–15 business days.
            Free shipping on orders over €50. Shipping costs for orders under €50: €4.99.</p>
          </Section>

          <Section title="5. Returns">
            <p>You have 30 days from receipt to return any item in its original condition.
            Contact us at contact@{SITE_DOMAIN} to initiate a return. Return shipping is at the customer's expense.</p>
          </Section>

          <Section title="6. Warranty">
            <p>All products come with a 2-year warranty against manufacturing defects.
            This warranty does not cover normal wear and tear or accidental damage.</p>
          </Section>

          <Section title="7. Governing Law">
            <p>These terms are governed by French law. Any disputes shall be subject to the jurisdiction
            of French courts.</p>
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
