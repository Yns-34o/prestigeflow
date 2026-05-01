import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCart } from './CartContext'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'La Carte' },
  { href: '/reservation', label: 'Réservation' },
  { href: '/about', label: 'Notre Histoire' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { count, setIsOpen } = useCart()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious()
    setScrolled(latest > 50)
    if (latest > 300 && latest > prev) setHidden(true)
    else setHidden(false)
  })

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: -100 } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        initial={{ y: -100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[rgba(5,5,5,0.9)] backdrop-blur-2xl shadow-[0_1px_0_rgba(200,169,126,0.06)]'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll progress */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-[var(--gold)] origin-left"
          style={{ scaleX: 0 }}
        />

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div className="w-10 h-10 border border-[rgba(200,169,126,0.5)] rounded-lg flex items-center justify-center transition-all duration-700 group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:rotate-45 group-hover:shadow-[0_0_20px_rgba(200,169,126,0.3)]">
              <span className="font-display text-[var(--gold)] text-lg font-bold transition-colors duration-700 group-hover:text-[var(--noir)]">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[17px] tracking-[0.25em] text-white leading-none">PRESTIGE</span>
              <span className="text-[9px] tracking-[0.5em] text-[var(--gold)] uppercase">Flow</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[12px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.45)] hover:text-white transition-all duration-500 group py-1"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-[rgba(255,255,255,0.5)] hover:text-[var(--gold)] transition-all duration-300 group"
            >
              <ShoppingBag size={19} className="transition-transform group-hover:scale-110" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[var(--gold)] text-[var(--noir)] text-[9px] font-bold flex items-center justify-center rounded-full"
                >
                  {count}
                </motion.span>
              )}
            </button>

            <Link href="/reservation" className="hidden md:inline-flex btn-outline !py-2.5 !px-6 !text-[10px] !tracking-[0.2em]">
              Réserver
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-white hover:text-[var(--gold)] transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mobile-menu open"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-[var(--gold)] transition-colors"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl tracking-[0.08em] text-white hover:text-[var(--gold)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <Link href="/reservation" onClick={() => setMobileOpen(false)} className="btn-gold !px-10">
                Réserver une table
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
