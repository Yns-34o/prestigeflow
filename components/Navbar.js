import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react'
import { useCart } from './CartContext'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'La Carte' },
  { href: '/reservation', label: 'Réservation' },
  { href: '/about', label: 'Notre Histoire' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { count, setIsOpen } = useCart()
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious()
    setScrolled(latest > 50)
    const hideThreshold = typeof window !== 'undefined' && window.innerWidth < 1024 ? 80 : 200
    if (latest > hideThreshold && latest > prev) setHidden(true)
    else setHidden(false)
  })

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Main Navigation - Top on All Devices */}
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        initial={{ y: '-100%' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(5,5,5,0.92)] backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-[rgba(200,169,126,0.08)]'
            : 'bg-gradient-to-b from-[rgba(5,5,5,0.8)] to-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          style={{ scaleX: scrollYProgress }}
          initial={{ scaleX: 0 }}
          transformOrigin="left"
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-14 md:h-16 lg:h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group" onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11"
              >
                <div className="absolute inset-0 border border-[rgba(200,169,126,0.4)] rounded-lg md:rounded-xl rotate-45 group-hover:border-[var(--gold)] group-hover:shadow-[0_0_25px_rgba(200,169,126,0.3)] transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(200,169,126,0.1)] to-transparent rounded-md md:rounded-lg rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center font-display text-[var(--gold)] text-sm md:text-base lg:text-xl font-bold">P</span>
              </motion.div>
              <div className="flex flex-col -rotate-45">
                <span className="font-display text-[10px] md:text-[13px] lg:text-[15px] tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] text-white leading-none">PRESTIGE</span>
                <span className="text-[6px] md:text-[8px] lg:text-[9px] tracking-[0.35em] md:tracking-[0.4em] lg:tracking-[0.5em] text-[var(--gold)] uppercase">Flow</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 md:px-5 py-2 md:py-2.5 text-[10px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium transition-all duration-400 rounded-full ${
                    pathname === link.href
                      ? 'text-[var(--gold)] bg-[rgba(200,169,126,0.08)]'
                      : 'text-[rgba(255,255,255,0.6)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    {link.label}
                  </motion.span>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--gold)] rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              {/* Cart */}
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 md:p-2.5 lg:p-3 rounded-lg md:rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(200,169,126,0.1)] hover:border-[var(--gold)] hover:bg-[rgba(200,169,126,0.08)] transition-all duration-300 group"
              >
                <ShoppingBag size={14} md:size={16} className="text-[rgba(255,255,255,0.6)] group-hover:text-[var(--gold)] transition-colors" />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[16px] md:min-w-[18px] h-[16px] md:h-[18px] bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-[8px] md:text-[10px] font-bold flex items-center justify-center rounded-full shadow-[0_2px_10px_rgba(200,169,126,0.4)]"
                  >
                    {count}
                  </motion.span>
                )}
              </motion.button>

              {/* Reservation Button - Desktop */}
              <Link
                href="/reservation"
                className="hidden xl:flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] uppercase font-semibold rounded-full hover:shadow-[0_4px_20px_rgba(200,169,126,0.4)] transition-all duration-400 hover:-translate-y-0.5"
              >
                <Sparkles size={10} md:size={12} />
                Réserver
              </Link>

              {/* Mobile/Tablet Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(true)}
                whileTap={{ scale: 0.9 }}
                className="xl:hidden p-2 md:p-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(200,169,126,0.1)] hover:border-[var(--gold)] transition-all duration-300"
              >
                <Menu size={16} md:size={18} className="text-white" />
              </motion.button>
            </div>
          </div>

          {/* Tablet Navigation - Elegant Horizontal Scroll Below Main Bar */}
          <nav className="hidden md:flex xl:hidden pb-2 md:pb-3">
            <div className="flex items-center gap-1 md:gap-1.5 overflow-x-auto scrollbar-hide w-full">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex-shrink-0 px-3 md:px-4 py-1.5 md:py-2 text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.15em] uppercase font-medium rounded-full transition-all duration-300 ${
                    pathname === link.href
                      ? 'bg-[var(--gold)] text-[var(--noir)] shadow-[0_2px_10px_rgba(200,169,126,0.3)]'
                      : 'text-[rgba(255,255,255,0.5)] hover:text-[var(--gold)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(200,169,126,0.08)] border border-[rgba(200,169,126,0.1)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/reservation"
                className="flex-shrink-0 ml-2 md:ml-3 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.15em] uppercase font-semibold rounded-full shadow-[0_2px_10px_rgba(200,169,126,0.3)]"
              >
                Réserver
              </Link>
            </div>
          </nav>
        </div>
      </motion.nav>

      {/* Mobile Navigation Bar - Compact Horizontal Below Main */}
      <nav className="md:hidden fixed top-14 left-0 right-0 z-40 bg-[rgba(5,5,5,0.95)] backdrop-blur-2xl border-b border-[rgba(200,169,126,0.08)]">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex-shrink-0 px-3 py-1.5 text-[9px] tracking-[0.1em] uppercase font-medium rounded-full transition-all duration-300 ${
                pathname === link.href
                  ? 'bg-[var(--gold)] text-[var(--noir)] shadow-[0_2px_8px_rgba(200,169,126,0.3)]'
                  : 'text-[rgba(255,255,255,0.5)] hover:text-[var(--gold)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(200,169,126,0.08)] border border-[rgba(200,169,126,0.1)]'
              }`}
            >
              {link.label.split(' ')[0]}
            </Link>
          ))}
          <Link
            href="/reservation"
            className="flex-shrink-0 ml-1 px-3 py-1.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-[9px] tracking-[0.1em] uppercase font-semibold rounded-full shadow-[0_2px_8px_rgba(200,169,126,0.3)]"
          >
            Réserver
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[rgba(5,5,5,0.97)] backdrop-blur-3xl"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(200,169,126,0.2)] hover:border-[var(--gold)] transition-all duration-300 z-10"
            >
              <X size={20} className="text-white" />
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-4 left-4 flex items-center gap-2"
            >
              <div className="w-7 h-7 border border-[rgba(200,169,126,0.4)] rounded-md rotate-45 flex items-center justify-center">
                <span className="font-display text-[var(--gold)] text-xs font-bold -rotate-45">P</span>
              </div>
              <span className="font-display text-xs text-white tracking-wider">PRESTIGE</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center justify-center h-full gap-2 pt-12">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full max-w-xs"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-4 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                      pathname === link.href
                        ? 'bg-[rgba(200,169,126,0.1)] border border-[var(--gold)]'
                        : 'bg-[rgba(255,255,255,0.02)] border border-transparent hover:border-[rgba(200,169,126,0.2)] hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    <span className={`font-display text-lg md:text-xl tracking-wide ${pathname === link.href ? 'text-[var(--gold)]' : 'text-white group-hover:text-[var(--gold)]'} transition-colors`}>
                      {link.label}
                    </span>
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeMobileNav"
                        className="ml-auto w-1.5 h-1.5 bg-[var(--gold)] rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-0 right-0 px-6"
            >
              <Link
                href="/reservation"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 md:py-4 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-xs md:text-sm tracking-wider uppercase font-bold rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(200,169,126,0.4)] hover:shadow-[0_6px_30px_rgba(200,169,126,0.5)] transition-all duration-400"
              >
                <Sparkles size={14} md:size={16} />
                Réserver une table
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
