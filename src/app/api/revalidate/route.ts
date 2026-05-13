import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')

  if (!REVALIDATE_SECRET || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { productId, slug } = await req.json()

    // Revalide les pages concernées
    revalidatePath('/')
    revalidatePath('/catalogue')

    if (slug) {
      revalidatePath(`/${slug}`)
    }

    return NextResponse.json({ revalidated: true, productId, slug })
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
