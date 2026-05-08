import { useState, useRef } from 'react'
import Head from 'next/head'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Camera, Globe } from 'lucide-react'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  return (
    <>
      <Head>
        <title>Contact — PrestigeFlow | 42 Avenue des Champs-Élysées, Paris</title>
        <meta name="description" content="Contactez le restaurant PrestigeFlow au 42 Avenue des Champs-Élysées, Paris. Réservations au +33 1 42 68 99 00. Informations pratiques et plan d'accès." />
        <link rel="canonical" href="https://prestigeflow.fr/contact" />
        <meta property="og:title" content="Contact — PrestigeFlow" />
        <meta property="og:description" content="Contactez-nous au 42 Avenue des Champs-Élysées, Paris 8e." />
        <meta property="og:url" content="https://prestigeflow.fr/contact" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&q=80" alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.4)] to-[rgba(10,10,10,0.95)]" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">Contact</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="font-display text-3xl md:text-5xl lg:text-7xl text-white mt-4 mb-4">
            Nous <span className="italic text-gradient-gold">Contacter</span>
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ delay: 0.7, duration: 0.7 }} className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
      </section>

      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="font-display text-3xl text-white mb-6">Informations</h2>
                <div className="divider-gold mb-8" />
              </Reveal>

              <div className="flex flex-col gap-6">
                <Reveal delay={0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-[var(--gold)]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium mb-1">Adresse</h4>
                      <p className="text-[var(--text-tertiary)] text-sm">42 Avenue des Champs-Élysées</p>
                      <p className="text-[var(--text-tertiary)] text-sm">75008 Paris, France</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[var(--gold)]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium mb-1">Téléphone</h4>
                      <a href="tel:+33142689900" className="text-[var(--text-tertiary)] text-sm hover:text-[var(--gold)] transition-colors">+33 1 42 68 99 00</a>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[var(--gold)]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium mb-1">Email</h4>
                      <p className="text-[var(--text-tertiary)] text-sm">contact@prestigeflow.fr</p>
                      <p className="text-[var(--text-tertiary)] text-sm">reservation@prestigeflow.fr</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.25}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-[var(--gold)]" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium mb-1">Horaires</h4>
                      <p className="text-[var(--text-tertiary)] text-sm">Lun — Ven : 12h-14h30 / 19h-23h</p>
                      <p className="text-[var(--text-tertiary)] text-sm">Sam — Dim : 12h-15h / 19h-00h</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex gap-3 mt-4">
                    <a href="#" className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all">
                      <Camera size={16} />
                    </a>
                    <a href="#" className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all">
                      <Globe size={16} />
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                <div className="glass-card p-8 md:p-10">
                  {sent ? (
                    <div className="text-center py-12">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                        <div className="w-16 h-16 mx-auto mb-6 border-2 border-[var(--gold)] flex items-center justify-center">
                          <Send size={24} className="text-[var(--gold)]" />
                        </div>
                      </motion.div>
                      <h3 className="font-display text-2xl text-white mb-3">Message Envoyé</h3>
                      <p className="text-[var(--text-secondary)]">Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                      <h3 className="font-display text-2xl text-white mb-6">Envoyez-nous un message</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label className="text-[var(--text-secondary)] text-xs tracking-[0.15em] uppercase mb-2 block">Nom</label>
                          <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} className="input-luxury" placeholder="Votre nom" />
                        </div>
                        <div>
                          <label className="text-[rgba(255,255,255,0.4)] text-xs tracking-[0.15em] uppercase mb-2 block">Email</label>
                          <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="input-luxury" placeholder="votre@email.com" />
                        </div>
                      </div>

                      <div className="mb-5">
                        <label className="text-[rgba(255,255,255,0.4)] text-xs tracking-[0.15em] uppercase mb-2 block">Sujet</label>
                        <input type="text" required value={form.subject} onChange={e => update('subject', e.target.value)} className="input-luxury" placeholder="Sujet de votre message" />
                      </div>

                      <div className="mb-6">
                        <label className="text-[rgba(255,255,255,0.4)] text-xs tracking-[0.15em] uppercase mb-2 block">Message</label>
                        <textarea required value={form.message} onChange={e => update('message', e.target.value)} className="input-luxury min-h-[150px] resize-none" placeholder="Votre message..." />
                      </div>

                      <button type="submit" className="btn-gold w-full justify-center">
                        <Send size={14} /> Envoyer le message
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Map placeholder */}
          <Reveal className="mt-16">
            <div className="relative h-[280px] md:h-[400px] bg-[var(--noir-card)] border border-white/5 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.215!2d2.305!3d48.8698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4d0bd5679%3A0x1f7e25674e0a9b50!2sChamps-%C3%89lys%C3%A9es!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(0.9)' }}
                allowFullScreen
                loading="lazy"
                title="Localisation PrestigeFlow"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
