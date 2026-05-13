import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/cms'
import { cmsImageUrl, formatPrice } from '@/lib/cms'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const title = product.title || product.titleEn
  const price = product.pricing?.finalPrice ?? 0
  const image = product.images?.[0]
  const slug = product.slug || product.id
  const imageUrl = image ? cmsImageUrl(image.url) : '/placeholder.jpg'

  return (
    <Link href={`/${slug}`} className="product-card">
      <div className="product-card-image">
        <Image
          src={imageUrl}
          alt={image?.alt || title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 320px"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <p className="product-card-title">{title}</p>
      <p className="product-card-price">{formatPrice(price)}</p>
    </Link>
  )
}
