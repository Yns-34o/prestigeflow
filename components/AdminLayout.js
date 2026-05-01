import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, LogOut, Menu, X, ChevronRight } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Commandes', icon: ShoppingBag },
  { href: '/admin/menu', label: 'La Carte', icon: UtensilsCrossed },
]

export default function AdminLayout({ children, title }) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.replace('/admin')
    } else {
      setAuthed(true)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  if (!authed) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[var(--noir)]">
        <div className="w-6 h-6 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
      </section>
    )
  }

  return (
    <>
      <Head><title>{title} — Admin PrestigeFlow</title></Head>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[var(--noir-light)] border-b border-[var(--noir-border)] z-50 flex items-center justify-between px-4">
        <span className="font-display text-[var(--gold)] text-sm">PrestigeFlow</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-60 bg-[var(--noir-light)] border-r border-[var(--noir-border)] z-40 flex flex-col transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-[var(--noir-border)]">
          <span className="font-display text-lg text-gradient-gold">PrestigeFlow</span>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {navItems.map(item => {
            const active = router.pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                  active
                    ? 'text-[var(--gold)] bg-[rgba(200,169,126,0.06)] border-l-2 border-[var(--gold)]'
                    : 'text-[rgba(255,255,255,0.4)] hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
                }`}
              >
                <item.icon size={16} />
                {item.label}
                {active && <ChevronRight size={12} className="ml-auto" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[var(--noir-border)]">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2 text-sm text-[rgba(255,255,255,0.3)] hover:text-red-400 transition-colors w-full">
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <main className="lg:ml-60 pt-14 lg:pt-0 min-h-screen bg-[var(--noir)]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </>
  )
}
