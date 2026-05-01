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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[998]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-gradient-to-b from-[#0c0c0c] to-[#080808] border-l border-[rgba(200,169,126,0.08)] z-[999] flex flex-col md:rounded-l-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-[rgba(200,169,126,0.06)]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-[var(--gold)]" />
                <h3 className="font-display text-xl tracking-wider">Votre Panier</h3>
                <span className="badge-gold !py-0.5 !px-2">{count}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[rgba(255,255,255,0.3)] hover:text-white transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 border border-[rgba(200,169,126,0.1)] flex items-center justify-center mb-5">
                    <ShoppingBag size={32} className="text-[rgba(200,169,126,0.15)]" />
                  </div>
                  <p className="text-[rgba(255,255,255,0.35)] mb-2 font-display text-lg">Votre panier est vide</p>
                  <p className="text-[rgba(255,255,255,0.2)] text-xs tracking-wider mb-6">Découvrez nos créations culinaires</p>
                  <Link href="/menu" onClick={() => setIsOpen(false)} className="btn-outline !py-2.5 !px-6 !text-[11px]">
                    Explorer la carte
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(200,169,126,0.06)] hover:border-[rgba(200,169,126,0.12)] transition-all group"
                    >
                      <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <h4 className="text-[13px] font-medium text-white truncate pr-2">{item.name}</h4>
                          <button onClick={() => removeItem(item.id)} className="text-[rgba(255,255,255,0.2)] hover:text-red-400 transition-colors flex-shrink-0">
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-8 h-8 md:w-6 md:h-6 border border-[rgba(200,169,126,0.1)] flex items-center justify-center text-[rgba(255,255,255,0.3)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all text-[10px]"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs w-5 text-center text-white">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-8 h-8 md:w-6 md:h-6 border border-[rgba(200,169,126,0.1)] flex items-center justify-center text-[rgba(255,255,255,0.3)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all text-[10px]"
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
              <div className="border-t border-[rgba(200,169,126,0.06)] px-7 py-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[rgba(255,255,255,0.35)] text-xs tracking-[0.15em] uppercase">Sous-total</span>
                  <span className="text-white text-sm">{total.toFixed(2)} &euro;</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[rgba(255,255,255,0.35)] text-xs tracking-[0.15em] uppercase">Livraison</span>
                  <span className="text-[var(--gold)] text-xs tracking-wider">OFFERTE</span>
                </div>
                <div className="h-[1px] bg-[rgba(200,169,126,0.08)] mb-4" />
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white text-sm font-medium tracking-wider uppercase">Total</span>
                  <span className="font-display text-2xl text-[var(--gold)]">{total.toFixed(2)} &euro;</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold w-full justify-center !py-4"
                >
                  Commander <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
