import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.success) {
        localStorage.setItem('admin_token', data.token)
        window.location.href = '/admin/dashboard'
      } else {
        setError(data.error || 'Erreur de connexion')
      }
    } catch {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head><title>Administration — PrestigeFlow</title></Head>
      <section className="min-h-screen flex items-center justify-center px-6 bg-[var(--noir)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-6 border border-[var(--gold)] flex items-center justify-center">
              <Lock size={24} className="text-[var(--gold)]" />
            </div>
            <h1 className="font-display text-2xl text-white mb-2">Administration</h1>
            <p className="text-[rgba(255,255,255,0.3)] text-sm">PrestigeFlow Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="input-luxury !pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)] hover:text-[var(--gold)] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center !py-4 disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </motion.div>
      </section>
    </>
  )
}
