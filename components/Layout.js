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
    <>
      {loading && (
        <div className="preloader">
          <div className="preloader-logo">PrestigeFlow</div>
          <div className="preloader-line" />
          <div className="preloader-tag">Restaurant Gastronomique — Paris</div>
        </div>
      )}

      <div className={`noise-overlay transition-opacity duration-700 ${loading ? 'opacity-0 invisible' : 'opacity-100'}`}>
        <Navbar />
        <CartDrawer />
        <main className="page-enter">{children}</main>
        <Footer />
      </div>
    </>
  )
}
