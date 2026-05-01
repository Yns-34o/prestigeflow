export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password } = req.body
  if (password === process.env.ADMIN_PASSWORD) {
    // Simple token for demo — in production use JWT or session
    const token = Buffer.from(`admin:${Date.now()}`).toString('base64')
    return res.status(200).json({ success: true, token })
  }

  res.status(401).json({ error: 'Mot de passe incorrect' })
}
