import Stripe from 'stripe'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    return Response.json(
      { error: 'STRIPE_SECRET_KEY is not configured' },
      { status: 500 },
    )
  }

  const stripe = new Stripe(stripeSecretKey)

  const formData = await request.formData()
  const priceId = formData.get('priceId')

  if (!priceId || typeof priceId !== 'string') {
    throw new Error('Missing Stripe price ID')
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
  })

  redirect(session.url || '/shop')
}