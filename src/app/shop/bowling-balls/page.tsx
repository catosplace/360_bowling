import config from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  const payload = await getPayload({ config })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    where: {
      inStock: {
        equals: true,
      },
    },
  })

  return (
    <html>
      <body>
        <main>
          <h1>Shop</h1>

          <div>
            {products.docs.map((product) => {
              const image =
                typeof product.image === 'object' ? product.image : null
              console.log(product.image)

              return (
                <article key={product.id}>
                  <h2>{product.title}</h2>
                  {image?.url && (
                    <Image
                      src={image.url}
                      alt={image.alt || product.title}
                      width={image.width || 600}
                      height={image.height || 400}
                    />
                  )}
                  <p>{product.description}</p>
                  <p>${product.price}</p>

                  <form action="/api/checkout" method="POST">
                    <input
                      type="hidden"
                      name="priceId"
                      value={product.stripePriceId || ''}
                    />
                    <button type="submit" disabled={!product.stripePriceId}>
                      Buy now
                    </button>
                  </form>
              </article>
              )
            })}
          </div>
        </main>
      </body>
    </html>
  )
}