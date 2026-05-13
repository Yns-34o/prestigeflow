import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCart } from './CartContext'

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[var(--noir-light)] border-l border-white/5 z-[999] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} className="text-[var(--gold)]" />
                <h3 className="font-display text-lg tracking-wide">Votre Panier</h3>
                {count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-[var(--gold)]/10 text-[var(--gold)] text-[10px] tracking-wider uppercase rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[var(--text-secondary)] hover:text-white transition-colors p-1">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-4">
                    <ShoppingBag size={24} className="text-[var(--text-muted)]" />
                  </div>
                  <p className="text-[var(--text-secondary)] mb-1 font-display text-base">Votre panier est vide</p>
                  <p className="text-[var(--text-muted)] text-xs tracking-wider mb-6">Découvrez nos créations culinaires</p>
                  <Link href="/menu" onClick={() => setIsOpen(false)} className="btn-outline !py-2 !px-5 !text-[10px]">
                    Explorer la carte
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-3 p-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-medium text-white truncate pr-2">{item.name}</h4>
                          <button onClick={() => removeItem(item.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors flex-shrink-0">
                            <X size={12} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 border border-white/10 rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors text-[10px]"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs w-4 text-center text-white">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 border border-white/10 rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors text-[10px]"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="text-[var(--gold)] font-display text-sm">{(item.price * item.qty).toFixed(2)} &euro;</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/5 px-6 py-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--text-tertiary)] text-[11px] tracking-[0.1em] uppercase">Sous-total</span>
                  <span className="text-white text-sm">{total.toFixed(2)} &euro;</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--text-tertiary)] text-[11px] tracking-[0.1em] uppercase">Livraison</span>
                  <span className="text-[var(--gold)] text-xs tracking-wider">OFFERTE</span>
                </div>
                <div className="h-px bg-white/5 mb-4" />
                <div className="flex items-center justify-between mb-5">
                  <span className="text-white text-sm font-medium tracking-wider uppercase">Total</span>
                  <span className="font-display text-xl text-[var(--gold)]">{total.toFixed(2)} &euro;</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold w-full justify-center !py-3.5 !text-[10px]"
                >
                  Commander <ArrowRight size={12} />
                </Link>

                {/* Delivery Options */}
                <div className="mt-5 pt-5 border-t border-white/5">
                  <p className="text-[var(--text-muted)] text-[10px] tracking-wider uppercase mb-4 text-center">Ou commandez via</p>
                  <div className="flex gap-3">
                    <a
                      href="https://www.ubereats.com/fr/paris/food-delivery/prestigeflow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#06C167]/20 to-[#06C167]/0 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center gap-2 p-3.5 bg-gradient-to-br from-[#06C167]/10 to-[#06C167]/5 border border-[#06C167]/20 rounded-xl hover:border-[#06C167]/40 hover:scale-105 transition-all duration-300">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Uber_Eats_2020.svg/240px-Uber_Eats_2020.svg.png"
                          alt="Uber Eats"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    </a>
                    <a
                      href="https://www.deliveroo.fr/fr/menu/paris/prestigeflow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00CCBC]/20 to-[#00CCBC]/0 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center gap-2 p-3.5 bg-gradient-to-br from-[#00CCBC]/10 to-[#00CCBC]/5 border border-[#00CCBC]/20 rounded-xl hover:border-[#00CCBC]/40 hover:scale-105 transition-all duration-300">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Deliveroo_logo.svg/240px-Deliveroo_logo.svg.png"
                          alt="Deliveroo"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
