import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown, Star, ArrowRight, Wine, Award, Users, Sparkles } from 'lucide-react'

/* ────────── Animated Section Wrapper ────────── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────── Character-by-character text reveal ────────── */
function TextReveal({ text, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

/* ────────── Parallax Section ────────── */
function ParallaxSection({ src, alt, overlay = 'rgba(10,10,10,0.5)', height = '70vh', children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ y }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: overlay }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.3)] via-transparent to-[rgba(10,10,10,0.5)]" />
      <div className="relative z-10 h-full flex items-center justify-center">{children}</div>
    </div>
  )
}

/* ────────── Counter Animation ────────── */
function AnimatedCounter({ end, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end])
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-6xl text-gradient-gold">{count}{suffix}</div>
      <div className="text-[var(--text-tertiary)] text-[10px] mt-3 tracking-[0.15em] uppercase">{label}</div>
    </div>
  )
}


/* ══════════════════════════════════════════════════
   LANDING PAGE
   ══════════════════════════════════════════════════ */

const signatureDishes = [
  {
    name: 'Homard Bleu Rôti',
    desc: 'Émulsion de safran, jus corsé aux agrumes, caviar d\'Aquitaine',
    price: '85',
    img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
  },
  {
    name: 'Wagyu A5 Grillé',
    desc: 'Jus truffé, pommes dauphines, asperges vertes de Provence',
    price: '95',
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
  },
  {
    name: 'Soufflé au Chocolat Noir',
    desc: 'Ganache Valrhona 70%, glace vanille bourbon de Madagascar',
    price: '32',
    img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
  },
]

const testimonials = [
  {
    text: "Une expérience culinaire qui transcende l'ordinaire. Chaque bouchée est une révélation, chaque instant un souvenir gravé dans le marbre de la mémoire. PrestigeFlow est bien plus qu'un restaurant.",
    author: 'Marie-Claire Dubois',
    role: 'Critique Gastronomique — Le Figaro',
    stars: 5,
  },
  {
    text: "Le service est aussi raffiné que la cuisine. On se sent privilégié dès que l'on franchit la porte. Un rendez-vous incontournable pour les amateurs de haute gastronomie parisienne.",
    author: 'Jean-Pierre Lefèvre',
    role: 'Éditeur — Le Guide des Saveurs',
    stars: 5,
  },
  {
    text: "J'ai célébré mon anniversaire ici et c'était absolument magistral. L'attention au détail, la présentation, les saveurs — tout est perfection. Un moment suspendu dans le temps.",
    author: 'Isabelle Moreau',
    role: 'Directrice — UNESCO Culture',
    stars: 5,
  },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80',
  'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80',
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], ['0%', '15%'])

  return (
    <>
      <Head>
        <title>PrestigeFlow — Restaurant Gastronomique 3 Étoiles Paris</title>
        <meta name="description" content="PrestigeFlow, restaurant gastronomique d'exception à Paris. Trois étoiles Michelin. Une expérience culinaire unique par le Chef Alexandre Montfort." />
        <link rel="canonical" href="https://prestigeflow.fr" />
        <meta property="og:title" content="PrestigeFlow — Restaurant Gastronomique 3 Étoiles Paris" />
        <meta property="og:description" content="Restaurant gastronomique 3 étoiles Michelin au cœur de Paris. Cuisine française d'exception." />
        <meta property="og:url" content="https://prestigeflow.fr" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PrestigeFlow — Restaurant Gastronomique Paris" />
        <meta name="twitter:description" content="Restaurant 3 étoiles Michelin. Cuisine française d'exception par le Chef Montfort." />
      </Head>

      {/* ══════════ HERO ══════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="/hero-restaurant.jpg"
            alt="PrestigeFlow — Restaurant Gastronomique"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.4)] via-[rgba(10,10,10,0.2)] to-[rgba(10,10,10,0.95)]" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.7, duration: 0.6 }} className="h-px bg-gradient-to-r from-transparent to-[var(--gold)]" />
            <span className="text-[var(--gold)] text-[10px] tracking-[0.3em] uppercase font-body flex items-center gap-2">
              <Sparkles size={10} /> Restaurant Gastronomique <Sparkles size={10} />
            </span>
            <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.7, duration: 0.6 }} className="h-px bg-gradient-to-l from-transparent to-[var(--gold)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[0.03em] text-white mb-4 leading-[0.9]"
          >
            Prestige
            <span className="text-gradient-gold block md:inline">Flow</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px w-[100px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mb-6 origin-center mx-auto"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="font-display text-base md:text-xl text-[var(--text-secondary)] italic max-w-xl"
          >
            L&apos;art de la gastronomie française, sublimé
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <Link href="/reservation" className="btn-gold !px-10 !py-3 !text-[10px]">Réserver une table</Link>
            <Link href="/menu" className="btn-outline !px-10 !py-3 !text-[10px]">Découvrir la carte</Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)]">Explorer</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <ChevronDown size={12} className="text-[var(--gold)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════ ABOUT PREVIEW ══════════ */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal>
              <div className="relative group">
                <div className="absolute -inset-4 border border-white/5 group-hover:border-[var(--gold)] transition-all duration-500" />
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                    alt="Chef en cuisine"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.8)] via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2">
                  <div className="h-px bg-[var(--gold)]" />
                  <span className="text-[var(--gold)] text-[10px] tracking-[0.3em] uppercase">Depuis 1987</span>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="text-[var(--gold)] text-[10px] tracking-[0.3em] uppercase flex items-center gap-3">
                  <div className="h-px w-8 bg-[var(--gold)]" /> Notre Philosophie
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl md:text-3xl lg:text-[3.5rem] text-white mt-5 mb-6 leading-[1.1]">
                  L'<span className="text-gradient-gold italic">excellence</span> sans compromis
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="divider-gold mb-6" />
                <p className="text-[var(--text-secondary)] leading-[1.8] mb-4 text-[15px]">
                  Depuis plus de trois décennies, PrestigeFlow redéfinit l&apos;art culinaire parisien.
                  Notre chef étoilé compose chaque plat comme une œuvre d&apos;éphémère.
                </p>
                <p className="text-[var(--text-secondary)] leading-[1.8] mb-8 text-[15px]">
                  Dans un cadre où l&apos;élégance rencontre l&apos;intimité, chaque dîner devient
                  une expérience inoubliable.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link href="/about" className="btn-outline group/btn">
                  Découvrir notre histoire
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Counters */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-16 md:mt-20 pt-12 md:pt-16 border-t border-white/5">
              <AnimatedCounter end={37} suffix="+" label="Années d'excellence" />
              <AnimatedCounter end={3} label="Étoiles Michelin" />
              <AnimatedCounter end={150} suffix="k" label="Convives par an" />
              <AnimatedCounter end={12} label="Prix & Distinctions" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ SIGNATURE DISHES ══════════ */}
      <section className="section-padding bg-[var(--noir-light)]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12 md:mb-16">
            <span className="text-[var(--gold)] text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[var(--gold)]" /> Nos Créations <div className="h-px w-8 bg-[var(--gold)]" />
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[4rem] text-white mt-5 mb-4">
              Plats <span className="italic text-gradient-gold">Signatures</span>
            </h2>
            <div className="divider-gold-wide mx-auto mt-4" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {signatureDishes.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 0.1}>
                <div className="menu-card group">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={dish.img} alt={dish.name} className="menu-img w-full h-full object-cover" />
                  </div>
                  <div className="menu-overlay">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-px w-4 bg-[var(--gold)]" />
                      <span className="badge-gold !text-[9px]"><span className="badge-dot" /> Signature</span>
                    </div>
                    <h3 className="font-display text-lg md:text-xl lg:text-2xl text-white mb-2">{dish.name}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">{dish.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--gold)] font-display text-xl md:text-2xl">{dish.price} &euro;</span>
                      <Link href="/menu" className="text-[var(--text-tertiary)] hover:text-[var(--gold)] transition-all text-[10px] tracking-[0.15em] uppercase flex items-center gap-1.5">
                        Voir plus <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/menu" className="btn-outline !text-[10px]">
              Voir la carte complète
              <ArrowRight size={12} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════ EXPERIENCE PARALLAX ══════════ */}
      <ParallaxSection
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
        alt="Restaurant ambiance"
        overlay="rgba(10,10,10,0.6)"
        height="80vh"
      >
        <div className="text-center px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="w-14 h-14 mx-auto mb-6 border border-white/10 rounded-xl flex items-center justify-center">
              <Wine size={24} className="text-[var(--gold)]" />
            </div>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[4rem] text-white mb-6 leading-[1.05]">
              Une expérience<br/><span className="italic text-gradient-gold">sensorielle</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.8] mb-8 max-w-xl mx-auto">
              Chaque visite est un voyage. De l&apos;accueil personnalisé à la dernière gorgée,
              nous composons un moment suspendu hors du temps.
            </p>
            <Link href="/reservation" className="btn-gold !px-12 !py-3.5 !text-[10px]">Vivre l&apos;expérience</Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12 md:mb-16">
            <span className="text-[var(--gold)] text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[var(--gold)]" /> Témoignages <div className="h-px w-8 bg-[var(--gold)]" />
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[4rem] text-white mt-5 mb-4">
              Ce qu&apos;ils <span className="italic text-gradient-gold">en disent</span>
            </h2>
            <div className="divider-gold-wide mx-auto mt-4" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <div className="testimonial-card glass-card p-5 md:p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={11} className={s < t.stars ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-white/20'} />
                    ))}
                  </div>
                  <p className="text-[var(--text-secondary)] text-[14px] leading-[1.8] mb-6 italic font-display">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-white text-sm font-medium tracking-wide">{t.author}</p>
                    <p className="text-[var(--gold)] text-[10px] tracking-[0.1em] mt-1">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CHEF SPOTLIGHT ══════════ */}
      <section className="section-padding bg-[var(--noir-light)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Reveal>
                <span className="text-[var(--gold)] text-[10px] tracking-[0.3em] uppercase flex items-center gap-3">
                  <div className="h-px w-8 bg-[var(--gold)]" /> Le Chef
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl md:text-3xl lg:text-[3.5rem] text-white mt-5 mb-6 leading-[1.1]">
                  Alexandre<br/><span className="italic text-gradient-gold">Montfort</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="divider-gold mb-6" />
                <p className="text-[var(--text-secondary)] leading-[1.8] mb-4 text-[15px]">
                  Formé par les plus grands — Ducasse, Robuchon, Pierre Hermé —
                  Alexandre Montfort porte la flamme de la haute gastronomie française.
                </p>
                <blockquote className="border-l-2 border-[var(--gold)] pl-6 my-8">
                  <p className="font-display text-lg md:text-xl text-white italic leading-relaxed">
                    &ldquo;La cuisine est le seul art qui sollicite les cinq sens en même temps.
                    Mon devoir est de les émerveiller tous.&rdquo;
                  </p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-[var(--gold)]" />
                    <span className="text-xs text-[var(--text-secondary)]">3 Étoiles Michelin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[var(--gold)]" />
                    <span className="text-xs text-[var(--text-secondary)]">Meilleur Ouvrier de France</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-3 border border-white/5 group-hover:border-[var(--gold)] transition-all duration-500" />
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                    alt="Chef Alexandre Montfort"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.6)] via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ GALLERY PREVIEW ══════════ */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <span className="text-[var(--gold)] text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[var(--gold)]" /> Ambiance <div className="h-px w-8 bg-[var(--gold)]" />
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[4rem] text-white mt-5 mb-4">
              Notre <span className="italic text-gradient-gold">Galerie</span>
            </h2>
            <div className="divider-gold-wide mx-auto mt-4" />
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="gallery-item aspect-square group">
                  <img src={img} alt={`Galerie ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="gallery-overlay">
                    <div className="w-9 h-9 border border-white/5 rounded-lg flex items-center justify-center">
                      <ArrowRight size={12} className="text-[var(--gold)] -rotate-45" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-10">
            <Link href="/gallery" className="btn-outline !text-[10px]">
              Voir toute la galerie
              <ArrowRight size={12} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════ RESERVATION CTA ══════════ */}
      <ParallaxSection
        src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1920&q=80"
        alt="Boissons raffinées"
        overlay="rgba(10,10,10,0.75)"
        height="60vh"
      >
        <div className="text-center px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--gold)]" /> Réservation <div className="w-8 h-[1px] bg-[var(--gold)]" />
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[4rem] text-white mt-6 mb-6 leading-[1.05]">
              Votre table<br/><span className="italic text-gradient-gold">vous attend</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-[15px]">
              Réservez votre expérience gastronomique et laissez-nous créer
              un moment d&apos;exception rien que pour vous.
            </p>
            <Link href="/reservation" className="btn-gold !px-12 !py-3.5 !text-[10px]">Réserver maintenant</Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ══════════ DELIVERY PLATFORMS ══════════ */}
      <section className="section-padding bg-[var(--noir-light)] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-[1px] bg-[var(--gold)]" />
              <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase">Livraison à domicile</span>
              <div className="w-12 h-[1px] bg-[var(--gold)]" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-[4rem] text-white mt-4 mb-4">
              Commandez sur nos <span className="italic text-gradient-gold">partenaires</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-12 text-[15px] px-2 max-w-2xl mx-auto">
              Profitez de nos créations culinaires d&apos;exception chez vous grâce à nos partenaires de livraison premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <a
                href="https://www.ubereats.com/fr/paris/food-delivery/prestigeflow"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-br from-[#06C167] to-[#00A854] rounded-2xl hover:scale-105 hover:shadow-[0_8px_30px_rgba(6,193,103,0.3)] transition-all duration-300"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Uber_Eats_2020.svg/240px-Uber_Eats_2020.svg.png"
                  alt="Uber Eats"
                  className="h-9 object-contain"
                />
                <div className="text-left">
                  <span className="text-white text-lg font-semibold block">Uber Eats</span>
                  <span className="text-white/80 text-xs">Commander maintenant</span>
                </div>
              </a>
              <a
                href="https://www.deliveroo.fr/fr/menu/paris/prestigeflow"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-br from-[#00CCBC] to-[#00B5A6] rounded-2xl hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,204,188,0.3)] transition-all duration-300"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Deliveroo_logo.svg/240px-Deliveroo_logo.svg.png"
                  alt="Deliveroo"
                  className="h-9 object-contain"
                />
                <div className="text-left">
                  <span className="text-white text-lg font-semibold block">Deliveroo</span>
                  <span className="text-white/80 text-xs">Commander maintenant</span>
                </div>
              </a>
            </div>
            <p className="text-[var(--text-muted)] text-xs tracking-wider">
              <span className="text-[var(--gold)]">★</span> Service premium · Livraison rapide · Qualité préservée
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="py-20 bg-[var(--noir)] border-t border-white/5">
        <div className="max-w-xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase">Newsletter</span>
            <h3 className="font-display text-3xl text-white mt-4 mb-3">Restez inspiré</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-10">
              Recevez nos créations saisonnières et nos événements exclusifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <input
                type="email"
                placeholder="votre@email.com"
                className="input-luxury flex-1 !border-r-0 focus:!border-r"
              />
              <button className="btn-gold !rounded-none whitespace-nowrap">S&apos;inscrire</button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
