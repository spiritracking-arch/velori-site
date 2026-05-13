import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function SuccessPage() {
  return (
    <div className="section" style={{ textAlign: 'center', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: 560 }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✓</div>
        <span className="badge">Order Confirmed</span>
        <div className="divider" />
        <h1 style={{ fontStyle: 'italic', fontSize: 'var(--text-4xl)', marginBottom: '1.5rem' }}>
          Thank you for your order
        </h1>
        <p style={{ color: 'var(--color-text-light)', lineHeight: 1.8, marginBottom: '3rem' }}>
          Your payment has been confirmed. You will receive a confirmation email shortly.
          Your order will be processed and dispatched within 1–3 business days.
        </p>
        <Link href="/catalogue" className="btn btn-primary">Continue Shopping</Link>
      </div>
    </div>
  )
}
