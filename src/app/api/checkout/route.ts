import Stripe from 'stripe'
import { redirect } from 'next/navigation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export async function POST(request: Request) {
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