import { getAllSlugs } from '@/lib/cms'

const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'zojewel.com'

export const dynamic = 'force-dynamic'

export async function GET() {
  const slugs = await getAllSlugs()
  const base = `https://${SITE_DOMAIN}`

  const urls = [
    { loc: base, priority: '1.0', changefreq: 'daily' },
    { loc: `${base}/catalogue`, priority: '0.9', changefreq: 'daily' },
    ...slugs.map(slug => ({
      loc: `${base}/${slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    })),
    { loc: `${base}/cgv`, priority: '0.3', changefreq: 'monthly' },
    { loc: `${base}/mentions-legales`, priority: '0.3', changefreq: 'monthly' },
    { loc: `${base}/politique-confidentialite`, priority: '0.3', changefreq: 'monthly' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
