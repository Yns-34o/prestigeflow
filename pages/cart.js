import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Minus, Plus, X, ArrowRight, ArrowLeft, Check, Truck, MapPin, Clock, Gift, CreditCard, Wallet, Banknote } from 'lucide-react'
import { useCart } from '../components/CartContext'

const deliveryTimes = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

export default function CartPage() {
  const { items, removeItem, updateQty, total, count, clearCart, note, setNote } = useCart()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [delivery, setDelivery] = useState({ name: '', address: '', phone: '', email: '', type: 'delivery', time: '' })
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router.query.success === 'true') {
      clearCart()
      setStep(3)
    }
  }, [router.query])

  const applyPromo = () => {
    if (promo.toUpperCase() === 'PRESTIGE10') {
      setDiscount(total * 0.1)
    }
  }

  const finalTotal = total - discount

  const handleStripeCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, delivery, note, discount, total: finalTotal }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePayPalCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items, delivery, note, discount, total: finalTotal,
          paymentMethod: 'paypal',
        }),
      })
      if (res.ok) {
        clearCart()
        setStep(3)
      }
    } catch (err) {
      console.error('PayPal error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSwileCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items, delivery, note, discount, total: finalTotal,
          paymentMethod: 'swile',
        }),
      })
      if (res.ok) {
        clearCart()
        setStep(3)
      }
    } catch (err) {
      console.error('Swile error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    if (paymentMethod === 'stripe') return handleStripeCheckout()
    if (paymentMethod === 'paypal') return handlePayPalCheckout()
    if (paymentMethod === 'swile') return handleSwileCheckout()
  }

  if (items.length === 0 && step !== 3) {
    return (
      <>
        <Head><title>Panier — PrestigeFlow</title></Head>
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 bg-[var(--noir)]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-24 h-24 mx-auto mb-8 border border-white/10 flex items-center justify-center">
              <ShoppingBag size={40} className="text-[var(--text-muted)]" />
            </div>
            <h1 className="font-display text-3xl text-white mb-3 text-center">Votre panier est vide</h1>
            <p className="text-[var(--text-secondary)] mb-8 text-center text-sm">Découvrez nos créations et composez votre repas.</p>
            <div className="flex justify-center">
              <Link href="/menu" className="btn-gold">Explorer la carte <ArrowRight size={14} /></Link>
            </div>
          </motion.div>
        </section>
      </>
    )
  }

  if (step === 3) {
    return (
      <>
        <Head><title>Commande Confirmée — PrestigeFlow</title></Head>
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 bg-[var(--noir)]">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }}>
            <div className="w-28 h-28 mx-auto mb-8 border-2 border-[var(--gold)] flex items-center justify-center" style={{ animation: 'pulse-gold 2s infinite' }}>
              <Check size={48} className="text-[var(--gold)]" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h1 className="font-display text-4xl text-white text-center mb-4">Commande Confirmée</h1>
            <p className="text-[var(--text-secondary)] text-center max-w-md mb-2">
              Merci pour votre commande{delivery.name ? `, ${delivery.name}` : ''} !{' '}
              {delivery.type === 'delivery' ? 'Votre repas sera livré à l\'adresse indiquée.' : 'Votre commande sera prête pour un retrait au restaurant.'}
            </p>
            {delivery.time && <p className="text-[var(--gold)] text-center text-sm mb-8">Heure estimée : {delivery.time}</p>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-outline">Retour à l&apos;accueil</Link>
              <Link href="/menu" className="btn-gold">Commander à nouveau</Link>
            </div>
          </motion.div>
        </section>
      </>
    )
  }

  return (
    <>
      <Head><title>Panier — PrestigeFlow</title></Head>

      <section className="pt-28 pb-20 bg-[var(--noir)] min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-0 mb-16">
            {[
              { n: 1, label: 'Panier' },
              { n: 2, label: 'Livraison' },
              { n: 3, label: 'Paiement' },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={step >= s.n ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 flex items-center justify-center text-xs font-medium transition-all duration-500 rounded-full ${
                      step > s.n ? 'bg-[var(--gold)] text-[var(--noir)]' :
                      step === s.n ? 'border-2 border-[var(--gold)] text-[var(--gold)] shadow-[0_0_20px_rgba(200,169,126,0.15)]' :
                      'border border-white/10 text-[var(--text-tertiary)]'
                    }`}
                  >
                    {step > s.n ? <Check size={14} /> : s.n}
                  </motion.div>
                  <span className={`text-[10px] tracking-[0.15em] uppercase mt-2 ${step >= s.n ? 'text-[var(--gold)]' : 'text-[var(--text-tertiary)]'}`}>{s.label}</span>
                </div>
                {i < 2 && (
                  <div className={`w-12 md:w-24 h-[1px] mx-3 mb-5 transition-all duration-500 ${step > s.n ? 'bg-[var(--gold)]' : 'bg-white/5'}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h1 className="font-display text-3xl text-white mb-10">Votre Commande <span className="text-gradient-gold">({count})</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                  <div className="lg:col-span-2 flex flex-col gap-4">
                    <AnimatePresence>
                      {items.map(item => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          className="glass-card p-5 flex gap-5"
                        >
                          <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-display text-lg text-white">{item.name}</h3>
                                <p className="text-[var(--text-tertiary)] text-xs mt-0.5">{item.price.toFixed(2)} &euro; / unité</p>
                              </div>
                              <button onClick={() => removeItem(item.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors ml-2">
                                <X size={16} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-3">
                                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-9 h-9 md:w-7 md:h-7 border border-white/10 flex items-center justify-center text-[var(--text-tertiary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">
                                  <Minus size={10} />
                                </button>
                                <span className="text-sm text-white w-5 text-center font-medium">{item.qty}</span>
                                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-9 h-9 md:w-7 md:h-7 border border-white/10 flex items-center justify-center text-[var(--text-tertiary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">
                                  <Plus size={10} />
                                </button>
                              </div>
                              <span className="font-display text-lg text-[var(--gold)]">{(item.price * item.qty).toFixed(2)} &euro;</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Order note */}
                    <div className="mt-4">
                      <label className="text-[var(--text-secondary)] text-[10px] tracking-[0.2em] uppercase mb-2 block">Note pour le Chef (optionnel)</label>
                      <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        className="input-luxury min-h-[70px] resize-none !text-[13px]"
                        placeholder="Allergies, préférences, instructions spéciales..."
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <div className="glass-card p-5 md:p-7 sticky top-24 md:top-28">
                      <h3 className="font-display text-xl text-white mb-6 flex items-center gap-2">
                        <ShoppingBag size={16} className="text-[var(--gold)]" /> Récapitulatif
                      </h3>
                      <div className="flex flex-col gap-3 mb-5">
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between text-[13px]">
                            <span className="text-[var(--text-tertiary)] truncate pr-3">{item.name} x{item.qty}</span>
                            <span className="text-[var(--text-secondary)] whitespace-nowrap">{(item.price * item.qty).toFixed(2)} &euro;</span>
                          </div>
                        ))}
                      </div>
                      <div className="h-[1px] bg-white/5 my-4" />
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[var(--text-tertiary)]">Sous-total</span>
                        <span className="text-white">{total.toFixed(2)} &euro;</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[var(--text-tertiary)]">Livraison</span>
                        <span className="text-[var(--gold)] text-xs tracking-wider">OFFERTE</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-green-400">Réduction</span>
                          <span className="text-green-400">-{discount.toFixed(2)} &euro;</span>
                        </div>
                      )}
                      <div className="h-[1px] bg-white/5 my-4" />
                      <div className="flex justify-between mb-6">
                        <span className="text-white font-medium tracking-wider uppercase text-sm">Total</span>
                        <span className="font-display text-2xl text-gradient-gold">{finalTotal.toFixed(2)} &euro;</span>
                      </div>

                      {/* Promo code */}
                      <div className="flex gap-2 mb-6">
                        <div className="flex-1 relative">
                          <Gift size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                          <input
                            type="text"
                            value={promo}
                            onChange={e => setPromo(e.target.value)}
                            placeholder="Code promo"
                            className="input-luxury !py-2.5 !pl-8 !text-[12px]"
                          />
                        </div>
                        <button onClick={applyPromo} className="btn-outline !py-2.5 !px-4 !text-[10px]">OK</button>
                      </div>

                      <button onClick={() => setStep(2)} className="btn-gold w-full justify-center !py-4">
                        Continuer <ArrowRight size={14} />
                      </button>
                      <Link href="/menu" className="btn-outline w-full justify-center mt-3 flex !py-3 !text-[11px]">
                        <ArrowLeft size={12} /> Continuer mes achats
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 className="font-display text-3xl text-white mb-10">Livraison & Paiement</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left: Delivery info */}
                  <div>
                    <h3 className="text-[var(--gold)] text-[11px] tracking-[0.2em] uppercase mb-6">Mode de réception</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
                      {[
                        { type: 'delivery', icon: Truck, label: 'Livraison', sub: 'À domicile' },
                        { type: 'pickup', icon: MapPin, label: 'Retrait', sub: 'Au restaurant' },
                      ].map(opt => (
                        <button
                          key={opt.type}
                          onClick={() => setDelivery(p => ({ ...p, type: opt.type }))}
                          className={`glass-card p-6 text-center cursor-pointer group ${delivery.type === opt.type ? '!border-[var(--gold)] !bg-[rgba(200,169,126,0.04)]' : ''}`}
                        >
                          <opt.icon size={24} className={`mx-auto mb-3 transition-colors ${delivery.type === opt.type ? 'text-[var(--gold)]' : 'text-[rgba(255,255,255,0.25)] group-hover:text-[rgba(255,255,255,0.5)]'}`} />
                          <span className={`text-sm block font-medium transition-colors ${delivery.type === opt.type ? 'text-[var(--gold)]' : 'text-[rgba(255,255,255,0.4)]'}`}>{opt.label}</span>
                          <span className="text-[11px] text-[rgba(255,255,255,0.2)] mt-1 block">{opt.sub}</span>
                        </button>
                      ))}
                    </div>

                    {/* Delivery time */}
                    <div className="mb-8">
                      <label className="text-[var(--text-secondary)] text-[10px] tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                        <Clock size={12} className="text-[var(--gold)]" /> Heure souhaitée
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {deliveryTimes.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setDelivery(p => ({ ...p, time: t }))}
                            className={`time-slot ${delivery.time === t ? 'active' : ''}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[var(--text-secondary)] text-[10px] tracking-[0.2em] uppercase mb-2 block">Nom complet</label>
                          <input type="text" required value={delivery.name} onChange={e => setDelivery(p => ({ ...p, name: e.target.value }))} className="input-luxury" placeholder="Votre nom" />
                        </div>
                        <div>
                          <label className="text-[rgba(255,255,255,0.3)] text-[10px] tracking-[0.2em] uppercase mb-2 block">Email</label>
                          <input type="email" required value={delivery.email} onChange={e => setDelivery(p => ({ ...p, email: e.target.value }))} className="input-luxury" placeholder="votre@email.com" />
                        </div>
                      </div>
                      {delivery.type === 'delivery' && (
                        <div>
                          <label className="text-[rgba(255,255,255,0.3)] text-[10px] tracking-[0.2em] uppercase mb-2 block">Adresse de livraison</label>
                          <input type="text" required value={delivery.address} onChange={e => setDelivery(p => ({ ...p, address: e.target.value }))} className="input-luxury" placeholder="Adresse complète" />
                        </div>
                      )}
                      <div>
                        <label className="text-[rgba(255,255,255,0.3)] text-[10px] tracking-[0.2em] uppercase mb-2 block">Téléphone</label>
                        <input type="tel" required value={delivery.phone} onChange={e => setDelivery(p => ({ ...p, phone: e.target.value }))} className="input-luxury" placeholder="+33 6 12 34 56 78" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Payment */}
                  <div>
                    <h3 className="text-[var(--gold)] text-[11px] tracking-[0.2em] uppercase mb-6">Mode de paiement</h3>
                    <div className="flex flex-col gap-3 mb-8">
                      {[
                        { id: 'stripe', icon: CreditCard, label: 'Carte bancaire', sub: 'Visa, Mastercard, Apple Pay, Google Pay' },
                        { id: 'paypal', icon: Wallet, label: 'PayPal', sub: 'Paiement sécurisé via PayPal' },
                        { id: 'swile', icon: Banknote, label: 'Swile', sub: 'Titres-restaurant Swile' },
                      ].map(method => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`glass-card p-5 flex items-center gap-4 cursor-pointer group text-left ${paymentMethod === method.id ? '!border-[var(--gold)] !bg-[rgba(200,169,126,0.04)]' : ''}`}
                        >
                          <div className={`w-10 h-10 flex items-center justify-center border transition-colors ${paymentMethod === method.id ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-[rgba(200,169,126,0.1)] text-[rgba(255,255,255,0.3)]'}`}>
                            <method.icon size={18} />
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm block font-medium transition-colors ${paymentMethod === method.id ? 'text-[var(--gold)]' : 'text-white'}`}>{method.label}</span>
                            <span className="text-[11px] text-[rgba(255,255,255,0.3)]">{method.sub}</span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[var(--gold)]' : 'border-[rgba(200,169,126,0.15)]'}`}>
                            {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Order summary */}
                    <div className="glass-card p-6 mb-6">
                      <h3 className="text-[var(--text-tertiary)] text-[10px] tracking-[0.2em] uppercase mb-4">Récapitulatif</h3>
                      <div className="flex flex-col gap-2 mb-4">
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between text-[12px]">
                            <span className="text-[var(--text-tertiary)] truncate pr-3">{item.name} x{item.qty}</span>
                            <span className="text-[var(--text-secondary)] whitespace-nowrap">{(item.price * item.qty).toFixed(2)} &euro;</span>
                          </div>
                        ))}
                      </div>
                      <div className="h-[1px] bg-white/5 my-3" />
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--text-tertiary)] text-sm">Sous-total</span>
                        <span className="text-white text-sm">{total.toFixed(2)} &euro;</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-[var(--text-tertiary)] text-sm">Livraison</span>
                        <span className="text-[var(--gold)] text-xs">OFFERTE</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between mb-2">
                          <span className="text-green-400 text-sm">Réduction</span>
                          <span className="text-green-400 text-sm">-{discount.toFixed(2)} &euro;</span>
                        </div>
                      )}
                      <div className="h-[1px] bg-white/5 my-3" />
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium tracking-wider uppercase text-sm">Total</span>
                        <span className="font-display text-2xl text-gradient-gold">{finalTotal.toFixed(2)} &euro;</span>
                      </div>
                      {note && (
                        <p className="text-[var(--text-muted)] text-xs mt-3 border-t border-white/5 pt-3">
                          Note : {note}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(1)} className="btn-outline !py-3">
                        <ArrowLeft size={14} /> Retour
                      </button>
                      <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className="btn-gold flex-1 justify-center !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            Traitement...
                          </span>
                        ) : (
                          <>Payer {finalTotal.toFixed(2)} &euro; <Check size={14} /></>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
