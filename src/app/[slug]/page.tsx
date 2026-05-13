import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, cmsImageUrl, formatPrice, lexicalToText } from '@/lib/cms'
import ProductDetail from './ProductDetail'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Not Found' }

  const title = product.metaTitle || product.title || product.titleEn
  const description = product.metaDescription || lexicalToText(product.description)
  const image = product.images?.[0] ? cmsImageUrl(product.images[0].url) : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return <ProductDetail product={product} />
}
