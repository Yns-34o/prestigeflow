import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, Users, Check, ArrowRight, Sparkles, Mail, ChefHat, Phone } from 'lucide-react'

const timeSlots = [
  '12:00', '12:30', '13:00',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
]

const partySizes = ['1', '2', '3', '4', '5', '6', '7', '8+']

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function ReservationPage() {
  const [form, setForm] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
    occasion: '',
    requests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const glassCardRef = useRef(null)

  useEffect(() => {
    if (submitted && glassCardRef.current) {
      glassCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [submitted])

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Head>
        <title>Réservation — PrestigeFlow | Réservez votre Table Paris</title>
        <meta name="description" content="Réservez votre table au restaurant PrestigeFlow à Paris. Réservation en ligne pour une expérience gastronomique 3 étoiles Michelin d'exception." />
        <link rel="canonical" href="https://prestigeflow.fr/reservation" />
        <meta property="og:title" content="Réservation — PrestigeFlow" />
        <meta property="og:description" content="Réservez votre table en ligne. Restaurant 3 étoiles Michelin à Paris." />
        <meta property="og:url" content="https://prestigeflow.fr/reservation" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&q=80" alt="Restaurant ambiance" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.4)] to-[rgba(10,10,10,0.95)]" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">
            Réservation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-display text-3xl md:text-5xl lg:text-7xl text-white mt-4 mb-4"
          >
            Votre <span className="italic text-gradient-gold">Table</span>
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ delay: 0.7, duration: 0.7 }} className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* Reservation Content */}
      <section className="py-16 bg-[var(--noir)]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div ref={glassCardRef} className="glass-card p-8 md:p-12 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)] opacity-5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--gold)] opacity-3 rounded-full blur-2xl" />

              {!submitted ? (
                // Form Content
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                  {/* Left: Phone Reservation */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] flex items-center justify-center">
                        <Phone size={24} className="text-[var(--noir)]" />
                      </div>
                      <span className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">Réservation Téléphonique</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-white mb-3">
                      Préférez-vous parler à notre équipe ?
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                      Notre concierge est à votre disposition pour vous assister dans votre réservation et répondre à toutes vos questions.
                    </p>
                    <a
                      href="tel:+33142689900"
                      className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-dark)] rounded-full text-[var(--noir)] font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,122,0.4)] hover:-translate-y-1"
                    >
                      <Phone size={20} className="group-hover:animate-pulse" />
                      <span className="text-lg tracking-wide">+33 1 42 68 99 00</span>
                    </a>
                    <p className="text-[var(--text-muted)] text-xs">
                      Disponible tous les jours de 10h à 22h
                    </p>
                  </div>

                {/* Right: Reservation Form */}
                <div className="flex-1">
                  <form onSubmit={handleSubmit}>
                    {/* Date, Time, Guests */}
                    <Reveal className="mb-12">
                      <h3 className="font-display text-2xl text-white mb-8 flex items-center gap-3">
                        <Calendar size={20} className="text-[var(--gold)]" />
                        Date & Heure
                      </h3>

                      <div className="mb-8">
                        <label className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase mb-3 block">Date</label>
                        <input
                          type="date"
                          required
                          value={form.date}
                          onChange={e => update('date', e.target.value)}
                          className="input-luxury"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="mb-8">
                        <label className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                          <Clock size={14} /> Heure
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {timeSlots.map(t => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => update('time', t)}
                              className={`time-slot ${form.time === t ? 'active' : ''}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                          <Users size={14} /> Nombre de convives
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {partySizes.map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => update('guests', s)}
                              className={`time-slot ${form.guests === s ? 'active' : ''}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Reveal>

                    {/* Contact */}
                    <Reveal delay={0.1} className="mb-12">
                      <h3 className="font-display text-2xl text-white mb-8 flex items-center gap-3">
                        <Users size={20} className="text-[var(--gold)]" />
                        Vos Informations
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase mb-2 block">Nom complet</label>
                          <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} className="input-luxury" placeholder="Jean Dupont" />
                        </div>
                        <div>
                          <label className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase mb-2 block">Email</label>
                          <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="input-luxury" placeholder="jean@email.com" />
                        </div>
                        <div>
                          <label className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase mb-2 block">Téléphone</label>
                          <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} className="input-luxury" placeholder="+33 6 12 34 56 78" />
                        </div>
                        <div>
                          <label className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase mb-2 block">Occasion (optionnel)</label>
                          <div className="relative">
                            <select
                              value={form.occasion}
                              onChange={e => update('occasion', e.target.value)}
                              className="input-luxury select-luxury appearance-none cursor-pointer pr-10"
                            >
                              <option value="">Aucune</option>
                              <option value="anniversaire">Anniversaire</option>
                              <option value="romantique">Dîner romantique</option>
                              <option value="affaires">Repas d'affaires</option>
                              <option value="celebration">Célébration</option>
                              <option value="autre">Autre</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4L6 8L10 4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>

                    {/* Special requests */}
                    <Reveal delay={0.2} className="mb-12">
                      <h3 className="font-display text-2xl text-white mb-6">Demandes Spéciales</h3>
                      <textarea
                        value={form.requests}
                        onChange={e => update('requests', e.target.value)}
                        className="input-luxury min-h-[120px] resize-none"
                        placeholder="Allergies, régime alimentaire, préférences de table..."
                      />
                    </Reveal>

                    {/* Submit Button */}
                    <Reveal delay={0.3} className="text-center">
                      <button type="submit" className="btn-gold text-base px-12 py-4">
                        Confirmer la réservation <ArrowRight size={16} />
                      </button>
                      <p className="text-[var(--text-muted)] text-xs mt-4">
                        Réservation gratuite. Annulation possible jusqu'à 24h avant.
                      </p>
                    </Reveal>
                  </form>
                </div>
              </div>
              ) : (
                // Confirmation Message
                <div className="relative z-10 text-center">
                  {/* Animated Checkmark */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                    className="relative mb-8"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 border-2 border-[var(--gold)] rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--gold)]/5 to-transparent relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5, delay: 0.6 }}
                        className="absolute inset-0 border-2 border-[var(--gold)] rounded-full animate-pulse"
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', duration: 0.6, delay: 0.8 }}
                      >
                        <Check size={40} className="text-[var(--gold)]" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Sparkles size={20} className="text-[var(--gold)]" />
                      </motion.div>
                    </div>
                  </motion.div>


                  {/* Main Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="font-display text-4xl md:text-5xl text-white mb-6"
                  >
                    Réservation <span className="text-gradient-gold">Confirmée</span>
                  </motion.h2>


                  {/* Personalized Thank You */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-8"
                  >
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
                      Merci infiniment, <span className="text-white font-semibold">{form.name}</span>.
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                      Votre table pour <span className="text-[var(--gold)]">{form.guests}</span> personne{parseInt(form.guests) > 1 ? 's' : ''} le{' '}
                      <span className="text-white">{form.date}</span> à <span className="text-[var(--gold)]">{form.time}</span> a été préparée avec le plus grand soin par notre équipe.
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                      Un email de confirmation vous a été envoyé à <span className="text-white">{form.email}</span>.
                    </p>
                  </motion.div>


                  {/* Premium Quote */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mb-8 p-6 border border-[var(--gold)]/30 rounded-lg bg-gradient-to-br from-[var(--gold)]/5 to-transparent relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
                    <p className="text-[var(--text-secondary)] italic text-sm leading-relaxed text-center relative z-10">
                      "L'excellence n'est pas un acte, mais une habitude. Nous vous réservons une expérience inoubliable, où chaque plat raconte une histoire et chaque moment devient un souvenir précieux."
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
                  </motion.div>

                  {/* What to Expect */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
                  >
                    <div className="p-4 border border-white/10 rounded-lg bg-white/5 text-center">
                      <Mail size={24} className="text-[var(--gold)] mx-auto mb-2" />
                      <p className="text-white text-sm font-medium mb-1">Email de Confirmation</p>
                      <p className="text-[var(--text-tertiary)] text-xs">Envoyé à {form.email}</p>
                    </div>
                    <div className="p-4 border border-white/10 rounded-lg bg-white/5 text-center">
                      <ChefHat size={24} className="text-[var(--gold)] mx-auto mb-2" />
                      <p className="text-white text-sm font-medium mb-1">Préparation Chef</p>
                      <p className="text-[var(--text-tertiary)] text-xs">Menu personnalisé</p>
                    </div>
                    <div className="p-4 border border-white/10 rounded-lg bg-white/5 text-center">
                      <Calendar size={24} className="text-[var(--gold)] mx-auto mb-2" />
                      <p className="text-white text-sm font-medium mb-1">Rappel 24h</p>
                      <p className="text-[var(--text-tertiary)] text-xs">Notification avant votre venue</p>
                    </div>
                  </motion.div>

                  {/* Premium Closing Statement */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mb-10"
                  >
                    <p className="text-[var(--gold)] text-sm tracking-[0.2em] uppercase mb-2">
                      À très bientôt
                    </p>
                    <p className="text-white text-xl font-display italic">
                      Nous avons hâte de vous accueillir pour une expérience gastronomique d'exception.
                    </p>
                  </motion.div>

                  {/* Back Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <Link href="/" className="btn-outline inline-flex items-center gap-2 group">
                      Retour à l'accueil
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-[var(--noir-light)] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="w-12 h-12 mx-auto mb-4 border border-[var(--gold)] rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-[var(--gold)]" />
            </div>
            <h4 className="font-display text-lg text-white mb-2 text-center">Horaires</h4>
            <p className="text-[var(--text-tertiary)] text-sm text-center">Lun — Ven : 12h-14h30 / 19h-23h</p>
            <p className="text-[var(--text-tertiary)] text-sm text-center">Sam — Dim : 12h-15h / 19h-00h</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="w-12 h-12 mx-auto mb-4 border border-[var(--gold)] rounded-xl flex items-center justify-center">
              <Users size={20} className="text-[var(--gold)]" />
            </div>
            <h4 className="font-display text-lg text-white mb-2 text-center">Groupes</h4>
            <p className="text-[var(--text-tertiary)] text-sm text-center">Salon privé disponible pour</p>
            <p className="text-[var(--text-tertiary)] text-sm text-center">des groupes de 8 à 30 personnes</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-12 h-12 mx-auto mb-4 border border-[var(--gold)] rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-[var(--gold)]" />
            </div>
            <h4 className="font-display text-lg text-white mb-2 text-center">Dress Code</h4>
            <p className="text-[var(--text-tertiary)] text-sm text-center">Tenue élégante requise.</p>
            <p className="text-[var(--text-tertiary)] text-sm text-center">Veste recommandée pour les messieurs.</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
