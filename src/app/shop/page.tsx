import Link from 'next/link'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function ShopPage() {
  const payload = await getPayload({ config })

  const categories = await payload.find({
    collection: 'categories',
    sort: 'name',
  })

  return (
    <html>
      <body>
        <main>
        <h1>Shop</h1>

        <h2>Categories</h2>

        <ul>
            {categories.docs.map((category) => (
            <li key={category.id}>
                <Link href={`/shop/${category.slug}`}>
                {category.name}
                </Link>
            </li>
            ))}
        </ul>
        </main>
      </body>
    </html>
  )
}