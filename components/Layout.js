import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[var(--noir)]" style={{ maxWidth: '100vw', overflowX: 'hidden', position: 'relative' }}>
      {loading && (
        <div className="preloader" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
          <div className="preloader-logo">PrestigeFlow</div>
          <div className="preloader-line" />
          <div className="preloader-tag">Restaurant Gastronomique — Paris</div>
        </div>
      )}

      <div className={`noise-overlay transition-opacity duration-700 ${loading ? 'opacity-0 invisible' : 'opacity-100'}`} style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
        <Navbar />
        <CartDrawer />
        <main className="page-enter" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
