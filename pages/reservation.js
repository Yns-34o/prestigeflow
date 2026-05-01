import { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, Users, Check, ArrowRight } from 'lucide-react'

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
]

const partySizes = ['1', '2', '3', '4', '5', '6', '7', '8+']

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
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
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.5)] to-[rgba(10,10,10,0.95)]" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">
            Réservation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-3xl md:text-5xl lg:text-7xl text-white mt-4 mb-4"
          >
            Votre <span className="italic text-gradient-gold">Table</span>
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ delay: 0.8, duration: 0.8 }} className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
      </section>

      {submitted ? (
        <section className="section-padding bg-[var(--noir)]">
          <div className="max-w-lg mx-auto px-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }}>
              <div className="w-20 h-20 mx-auto mb-6 border-2 border-[var(--gold)] flex items-center justify-center">
                <Check size={32} className="text-[var(--gold)]" />
              </div>
            </motion.div>
            <h2 className="font-display text-3xl text-white mb-4">Réservation Confirmée</h2>
            <p className="text-[rgba(255,255,255,0.5)] leading-relaxed mb-8">
              Merci, {form.name}. Votre table pour {form.guests} personne{parseInt(form.guests) > 1 ? 's' : ''} le{' '}
              {form.date} à {form.time} a été réservée avec succès.
              Vous recevrez un email de confirmation à {form.email}.
            </p>
            <Link href="/" className="btn-outline">Retour à l&apos;accueil</Link>
          </div>
        </section>
      ) : (
        <section className="section-padding bg-[var(--noir)]">
          <div className="max-w-4xl mx-auto px-6">
            <form onSubmit={handleSubmit}>
              {/* Date, Time, Guests */}
              <Reveal className="mb-12">
                <h3 className="font-display text-2xl text-white mb-8 flex items-center gap-3">
                  <Calendar size={20} className="text-[var(--gold)]" />
                  Date & Heure
                </h3>

                <div className="mb-8">
                  <label className="text-[rgba(255,255,255,0.5)] text-xs tracking-[0.2em] uppercase mb-3 block">Date</label>
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
                  <label className="text-[rgba(255,255,255,0.5)] text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
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
                  <label className="text-[rgba(255,255,255,0.5)] text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
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
                    <label className="text-[rgba(255,255,255,0.5)] text-xs tracking-[0.2em] uppercase mb-2 block">Nom complet</label>
                    <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} className="input-luxury" placeholder="Jean Dupont" />
                  </div>
                  <div>
                    <label className="text-[rgba(255,255,255,0.5)] text-xs tracking-[0.2em] uppercase mb-2 block">Email</label>
                    <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="input-luxury" placeholder="jean@email.com" />
                  </div>
                  <div>
                    <label className="text-[rgba(255,255,255,0.5)] text-xs tracking-[0.2em] uppercase mb-2 block">Téléphone</label>
                    <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} className="input-luxury" placeholder="+33 6 12 34 56 78" />
                  </div>
                  <div>
                    <label className="text-[rgba(255,255,255,0.5)] text-xs tracking-[0.2em] uppercase mb-2 block">Occasion (optionnel)</label>
                    <select value={form.occasion} onChange={e => update('occasion', e.target.value)} className="input-luxury">
                      <option value="">Aucune</option>
                      <option value="anniversaire">Anniversaire</option>
                      <option value="romantique">Dîner romantique</option>
                      <option value="affaires">Repas d'affaires</option>
                      <option value="celebration">Célébration</option>
                      <option value="autre">Autre</option>
                    </select>
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

              {/* Submit */}
              <Reveal delay={0.3} className="text-center">
                <button type="submit" className="btn-gold text-base px-12 py-4">
                  Confirmer la réservation <ArrowRight size={16} />
                </button>
                <p className="text-[rgba(255,255,255,0.3)] text-xs mt-4">
                  Réservation gratuite. Annulation possible jusqu&apos;à 24h avant.
                </p>
              </Reveal>
            </form>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-16 bg-[var(--noir-light)] border-t border-[rgba(200,169,126,0.06)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Reveal>
              <div className="w-12 h-12 mx-auto mb-4 border border-[var(--gold)] rounded-xl flex items-center justify-center">
                <Calendar size={20} className="text-[var(--gold)]" />
              </div>
              <h4 className="font-display text-lg text-white mb-2">Horaires</h4>
              <p className="text-[rgba(255,255,255,0.4)] text-sm">Lun — Ven : 12h-14h30 / 19h-23h</p>
              <p className="text-[rgba(255,255,255,0.4)] text-sm">Sam — Dim : 12h-15h / 19h-00h</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="w-12 h-12 mx-auto mb-4 border border-[var(--gold)] rounded-xl flex items-center justify-center">
                <Users size={20} className="text-[var(--gold)]" />
              </div>
              <h4 className="font-display text-lg text-white mb-2">Groupes</h4>
              <p className="text-[rgba(255,255,255,0.4)] text-sm">Salon privé disponible pour</p>
              <p className="text-[rgba(255,255,255,0.4)] text-sm">des groupes de 8 à 30 personnes</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="w-12 h-12 mx-auto mb-4 border border-[var(--gold)] rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-[var(--gold)]" />
              </div>
              <h4 className="font-display text-lg text-white mb-2">Dress Code</h4>
              <p className="text-[rgba(255,255,255,0.4)] text-sm">Tenue élégante requise.</p>
              <p className="text-[rgba(255,255,255,0.4)] text-sm">Veste recommandée pour les messieurs.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
