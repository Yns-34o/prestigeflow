import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ShoppingBag, Sparkles, ChevronDown } from 'lucide-react'
import { useCart } from './CartContext'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Accueil', icon: '🏠' },
  { href: '/menu', label: 'La Carte', icon: '🍽️' },
  { href: '/reservation', label: 'Réservation', icon: '✨' },
  { href: '/about', label: 'Notre Histoire', icon: '📖' },
  { href: '/gallery', label: 'Galerie', icon: '🖼️' },
  { href: '/contact', label: 'Contact', icon: '📞' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRef = useRef(null)
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
      {/* Desktop & Tablet Navigation */}
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
        {/* Scroll Progress Bar - Elegant Thin Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          style={{ scaleX: scrollYProgress }}
          initial={{ scaleX: 0 }}
          transformOrigin="left"
        />

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(200,169,126,0.2)] to-transparent opacity-0 transition-opacity duration-500" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-16 md:h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group" onClick={() => setMobileOpen(false)}>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-9 h-9 md:w-11 md:h-11"
              >
                <div className="absolute inset-0 border border-[rgba(200,169,126,0.4)] rounded-xl rotate-45 group-hover:border-[var(--gold)] group-hover:shadow-[0_0_25px_rgba(200,169,126,0.3)] transition-all duration-500" />
                <div className="absolute inset-1 bg-gradient-to-br from-[rgba(200,169,126,0.1)] to-transparent rounded-lg rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center font-display text-[var(--gold)] text-base md:text-xl font-bold">P</span>
              </motion.div>
              <div className="flex flex-col -rotate-45">
                <span className="font-display text-[11px] md:text-[15px] tracking-[0.2em] text-white leading-none">PRESTIGE</span>
                <span className="text-[7px] md:text-[9px] tracking-[0.4em] text-[var(--gold)] uppercase">Flow</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-400 rounded-full ${
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
            <div className="flex items-center gap-2 md:gap-4">
              {/* Cart */}
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 md:p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(200,169,126,0.1)] hover:border-[var(--gold)] hover:bg-[rgba(200,169,126,0.08)] transition-all duration-300 group"
              >
                <ShoppingBag size={16} className="text-[rgba(255,255,255,0.6)] group-hover:text-[var(--gold)] transition-colors" />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-[10px] font-bold flex items-center justify-center rounded-full shadow-[0_2px_10px_rgba(200,169,126,0.4)]"
                  >
                    {count}
                  </motion.span>
                )}
              </motion.button>

              {/* Reservation Button - Desktop */}
              <Link
                href="/reservation"
                className="hidden xl:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:shadow-[0_4px_20px_rgba(200,169,126,0.4)] transition-all duration-400 hover:-translate-y-0.5"
              >
                <Sparkles size={12} />
                Réserver
              </Link>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(true)}
                whileTap={{ scale: 0.9 }}
                className="xl:hidden p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(200,169,126,0.1)] hover:border-[var(--gold)] transition-all duration-300"
              >
                <Menu size={18} className="text-white" />
              </motion.button>
            </div>
          </div>

          {/* Tablet Navigation - Elegant Horizontal Scroll */}
          <nav className="hidden md:flex xl:hidden pb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide w-full">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium whitespace-nowrap rounded-full transition-all duration-300 flex-shrink-0 ${
                    pathname === link.href
                      ? 'bg-[var(--gold)] text-[var(--noir)] shadow-[0_2px_10px_rgba(200,169,126,0.3)]'
                      : 'text-[rgba(255,255,255,0.5)] hover:text-[var(--gold)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(200,169,126,0.08)] border border-[rgba(200,169,126,0.1)]'
                  }`}
                >
                  <span className="text-sm">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              <Link
                href="/reservation"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-[10px] tracking-[0.15em] uppercase font-semibold whitespace-nowrap rounded-full shadow-[0_2px_10px_rgba(200,169,126,0.3)] flex-shrink-0 ml-2"
              >
                <Sparkles size={10} />
                Réserver
              </Link>
            </div>
          </nav>
        </div>
      </motion.nav>

      {/* Mobile Navigation - Bottom Bar Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[rgba(5,5,5,0.95)] backdrop-blur-2xl border-t border-[rgba(200,169,126,0.1)]">
        <div className="flex items-center justify-around py-2 px-1 safe-area-bottom">
          {links.slice(0, 5).map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all duration-300 min-w-[60px] ${
                pathname === link.href
                  ? 'text-[var(--gold)] bg-[rgba(200,169,126,0.08)]'
                  : 'text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)]'
              }`}
            >
              <span className="text-[18px]">{link.icon}</span>
              <span className="text-[8px] tracking-[0.1em] uppercase font-medium leading-none">{link.label.split(' ')[0]}</span>
            </Link>
          ))}
          <Link
            href="/reservation"
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] shadow-[0_2px_10px_rgba(200,169,126,0.3)] min-w-[60px]"
          >
            <Sparkles size={16} />
            <span className="text-[8px] tracking-[0.1em] uppercase font-bold leading-none">Réserver</span>
          </Link>
        </div>
        {/* Home Indicator - iOS Style */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 bg-[rgba(255,255,255,0.2)] rounded-full" />
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
              <X size={22} className="text-white" />
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-4 left-4 flex items-center gap-2"
            >
              <div className="w-8 h-8 border border-[rgba(200,169,126,0.4)] rounded-lg rotate-45 flex items-center justify-center">
                <span className="font-display text-[var(--gold)] text-sm font-bold -rotate-45">P</span>
              </div>
              <span className="font-display text-sm text-white tracking-wider">PRESTIGE</span>
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
                    className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                      pathname === link.href
                        ? 'bg-[rgba(200,169,126,0.1)] border border-[var(--gold)]'
                        : 'bg-[rgba(255,255,255,0.02)] border border-transparent hover:border-[rgba(200,169,126,0.2)] hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                    <span className={`font-display text-xl tracking-wider ${pathname === link.href ? 'text-[var(--gold)]' : 'text-white group-hover:text-[var(--gold)]'} transition-colors`}>
                      {link.label}
                    </span>
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeMobileNav"
                        className="ml-auto w-2 h-2 bg-[var(--gold)] rounded-full"
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
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--noir)] text-sm tracking-wider uppercase font-bold rounded-2xl shadow-[0_4px_20px_rgba(200,169,126,0.4)] hover:shadow-[0_6px_30px_rgba(200,169,126,0.5)] transition-all duration-400"
              >
                <Sparkles size={16} />
                Réserver une table
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-20" />
    </>
  )
}
