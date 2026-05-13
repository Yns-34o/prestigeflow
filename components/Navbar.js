import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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

// Links to show on tablet
const tabletLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'La Carte' },
  { href: '/reservation', label: 'Réservation' },
  { href: '/about', label: 'Notre Histoire' },
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
      {/* Main Navigation */}
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        initial={{ y: '-100%' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          style={{ scaleX: scrollYProgress }}
          initial={{ scaleX: 0 }}
          transformOrigin="left"
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="md:hidden h-16 flex items-center justify-between">
            {/* Left: Menu Toggle */}
            <motion.button
              onClick={() => setMobileOpen(true)}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Menu size={20} className="text-white" />
            </motion.button>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 border border-[var(--gold)] rounded-lg flex items-center justify-center"
              >
                <span className="font-display text-[var(--gold)] text-sm font-bold">P</span>
              </motion.div>
              <span className="font-display text-sm text-white tracking-wider">PRESTIGE</span>
            </Link>

            {/* Right: Cart */}
            <motion.button
              onClick={() => setIsOpen(true)}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] text-[var(--noir)] text-[9px] font-bold flex items-center justify-center rounded-full"
                >
                  {count}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:flex lg:hidden h-16 items-center justify-between gap-6">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-9 h-9 border border-[var(--gold)] rounded-lg flex items-center justify-center"
              >
                <span className="font-display text-[var(--gold)] text-base font-bold">P</span>
              </motion.div>
              <div className="flex flex-col -rotate-45">
                <span className="font-display text-[13px] tracking-[0.2em] text-white leading-none">PRESTIGE</span>
                <span className="text-[7px] tracking-[0.4em] text-[var(--gold)] uppercase">Flow</span>
              </div>
            </Link>

            {/* Center: Navigation Links */}
            <nav className="flex-1 flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {tabletLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-[10px] tracking-[0.12em] uppercase font-medium transition-colors duration-300 rounded-lg whitespace-nowrap flex-shrink-0 ${
                      pathname === link.href
                        ? 'text-[var(--gold)] bg-[var(--gold)]/8'
                        : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.button
                onClick={() => setIsOpen(true)}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--gold)] text-[var(--noir)] text-[9px] font-bold flex items-center justify-center rounded-full"
                  >
                    {count}
                  </motion.span>
                )}
              </motion.button>

              <Link
                href="/reservation"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--gold)] text-[var(--noir)] text-[9px] tracking-[0.12em] uppercase font-semibold rounded-lg hover:bg-[var(--gold-light)] transition-colors"
              >
                Réserver
              </Link>

              <motion.button
                onClick={() => setMobileOpen(true)}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Menu size={16} className="text-white" />
              </motion.button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex h-20 items-center justify-between gap-6">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 border border-[var(--gold)] rounded-xl flex items-center justify-center"
              >
                <span className="font-display text-[var(--gold)] text-lg font-bold">P</span>
              </motion.div>
              <div className="flex flex-col -rotate-45">
                <span className="font-display text-[15px] tracking-[0.25em] text-white leading-none">PRESTIGE</span>
                <span className="text-[9px] tracking-[0.5em] text-[var(--gold)] uppercase">Flow</span>
              </div>
            </Link>

            {/* Center: Navigation Links */}
            <nav className="flex-1 flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 rounded-lg whitespace-nowrap flex-shrink-0 ${
                      pathname === link.href
                        ? 'text-[var(--gold)]'
                        : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--gold)] rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Delivery Buttons */}
              <a
                href="https://www.ubereats.com/fr/paris/food-delivery/prestigeflow"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <img
                  src="/uber-eats-logo.svg"
                  alt="Uber Eats"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-black text-xs font-semibold">Uber Eats</span>
              </a>
              <a
                href="https://www.deliveroo.fr/fr/menu/paris/prestigeflow"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <img
                  src="/deliveroo-logo.svg"
                  alt="Deliveroo"
                  className="h-6 w-auto object-contain"
                />
                <span className="text-black text-xs font-semibold">Deliveroo</span>
              </a>

              <div className="w-px h-6 bg-white/10" />

              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--gold)] text-[var(--noir)] text-[10px] font-bold flex items-center justify-center rounded-full"
                  >
                    {count}
                  </motion.span>
                )}
              </motion.button>

              <Link
                href="/reservation"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] text-[var(--noir)] text-xs tracking-wider uppercase font-semibold rounded-full hover:bg-[var(--gold-light)] transition-colors"
              >
                Réserver
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[rgba(10,10,10,0.98)] backdrop-blur-3xl"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full hover:bg-white/5 transition-colors"
            >
              <X size={20} className="text-white" />
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute top-4 left-4 flex items-center gap-2"
            >
              <div className="w-8 h-8 border border-[var(--gold)] rounded-lg rotate-45 flex items-center justify-center">
                <span className="font-display text-[var(--gold)] text-xs font-bold -rotate-45">P</span>
              </div>
              <span className="font-display text-xs text-white tracking-wider">PRESTIGE</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center justify-center h-full gap-3 pt-16 px-6">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.04, duration: 0.3 }}
                  className="w-full max-w-sm"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-4 px-5 py-4 rounded-xl transition-colors ${
                      pathname === link.href
                        ? 'text-[var(--gold)]'
                        : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    <span className="font-display text-xl tracking-wide">{link.label}</span>
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeMobileNav"
                        className="ml-auto w-1 h-1 bg-[var(--gold)] rounded-full"
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
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 left-0 right-0 px-6"
            >
              <Link
                href="/reservation"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 bg-[var(--gold)] text-[var(--noir)] text-sm tracking-wider uppercase font-bold rounded-xl"
              >
                Réserver une table
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
