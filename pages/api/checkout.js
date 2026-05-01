import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { items, delivery, note, discount, total } = req.body

    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.desc || '',
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }))

    if (discount > 0) {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: { name: 'Réduction (code promo)' },
          unit_amount: -Math.round(discount * 100),
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'apple_pay', 'google_pay', 'link'],
      mode: 'payment',
      line_items,
      success_url: `${req.headers.origin}/cart?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${req.headers.origin}/cart?canceled=true`,
      metadata: {
        delivery_type: delivery.type,
        delivery_time: delivery.time || '',
        customer_name: delivery.name,
        customer_email: delivery.email,
        customer_phone: delivery.phone,
        delivery_address: delivery.address || '',
        note: note || '',
      },
    })

    // Save order locally
    try {
      const fs = await import('fs')
      const path = await import('path')
      const ordersPath = path.join(process.cwd(), 'data', 'orders.json')
      let orders = []
      try { orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8')) } catch {}
      orders.push({
        id: session.id,
        items,
        delivery,
        note,
        discount,
        total,
        status: 'pending',
        paymentMethod: 'stripe',
        createdAt: new Date().toISOString(),
      })
      fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2))
    } catch {}

    res.status(200).json({ sessionId: session.id, url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
