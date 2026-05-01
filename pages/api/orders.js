export default async function handler(req, res) {
  const fs = await import('fs')
  const path = await import('path')
  const ordersPath = path.join(process.cwd(), 'data', 'orders.json')

  // Read orders
  if (req.method === 'GET') {
    try {
      const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'))
      return res.status(200).json(orders)
    } catch {
      return res.status(200).json([])
    }
  }

  // Update order status
  if (req.method === 'PATCH') {
    try {
      const { id, status } = req.body
      const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'))
      const order = orders.find(o => o.id === id)
      if (order) {
        order.status = status
        order.updatedAt = new Date().toISOString()
        fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2))
      }
      return res.status(200).json(order)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  // Save PayPal / Swile order
  if (req.method === 'POST') {
    try {
      const orderData = req.body
      let orders = []
      try { orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8')) } catch {}
      const order = {
        id: orderData.id || `ORD-${Date.now()}`,
        items: orderData.items,
        delivery: orderData.delivery,
        note: orderData.note,
        discount: orderData.discount || 0,
        total: orderData.total,
        status: 'paid',
        paymentMethod: orderData.paymentMethod,
        createdAt: new Date().toISOString(),
      }
      orders.push(order)
      fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2))
      return res.status(200).json(order)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  // Delete order
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body
      const orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'))
      const filtered = orders.filter(o => o.id !== id)
      fs.writeFileSync(ordersPath, JSON.stringify(filtered, null, 2))
      return res.status(200).json({ success: true })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
