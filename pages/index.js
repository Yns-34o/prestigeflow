import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown, Star, ArrowRight, Wine, Award, Users, Sparkles } from 'lucide-react'

/* ────────── Animated Section Wrapper ────────── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
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
function ParallaxSection({ src, alt, overlay = 'rgba(5,5,5,0.5)', height = '70vh', children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.div className="absolute inset-0 w-full h-[140%] -top-[20%]" style={{ y, scale }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: overlay }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,5,5,0.3)] via-transparent to-[rgba(5,5,5,0.5)]" />
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
    const duration = 2500
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
      <div className="font-display text-5xl md:text-7xl text-gradient-gold">{count}{suffix}</div>
      <div className="text-[rgba(255,255,255,0.3)] text-[11px] mt-3 tracking-[0.2em] uppercase">{label}</div>
    </div>
  )
}

/* ────────── Floating Decoration ────────── */
function FloatingDeco({ className }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="29" stroke="rgba(200,169,126,0.08)" strokeWidth="0.5" />
        <circle cx="30" cy="30" r="20" stroke="rgba(200,169,126,0.05)" strokeWidth="0.5" />
      </svg>
    </motion.div>
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
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,5,5,0.3)] via-[rgba(5,5,5,0.15)] to-[rgba(5,5,5,0.97)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,5,5,0.6)] via-transparent to-transparent" />

        {/* Floating decorations */}
        <FloatingDeco className="top-[15%] right-[10%] hidden lg:block" />
        <FloatingDeco className="bottom-[20%] left-[5%] hidden lg:block" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-5 mb-8"
          >
            <motion.div initial={{ width: 0 }} animate={{ width: 50 }} transition={{ delay: 0.8, duration: 0.8 }} className="h-[1px] bg-gradient-to-r from-transparent to-[var(--gold)]" />
            <span className="text-[var(--gold)] text-[10px] tracking-[0.5em] uppercase font-body flex items-center gap-2">
              <Sparkles size={10} /> Restaurant Gastronomique <Sparkles size={10} />
            </span>
            <motion.div initial={{ width: 0 }} animate={{ width: 50 }} transition={{ delay: 0.8, duration: 0.8 }} className="h-[1px] bg-gradient-to-l from-transparent to-[var(--gold)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl md:text-[8rem] lg:text-[10rem] tracking-[0.03em] text-white mb-4 leading-[0.85]"
          >
            Prestige
            <span className="text-gradient-gold block md:inline">Flow</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-[1px] w-[160px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mb-6 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="font-display text-lg md:text-2xl text-[rgba(255,255,255,0.5)] italic max-w-xl"
          >
            L&apos;art de la gastronomie française, sublimé
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-12"
          >
            <Link href="/reservation" className="btn-gold !px-12 !py-4">Réserver une table</Link>
            <Link href="/menu" className="btn-outline !px-12 !py-4">Découvrir la carte</Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-[rgba(255,255,255,0.2)]">Explorer</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <ChevronDown size={14} className="text-[var(--gold)]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 2.5 }}
          className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-[var(--gold)]" />
          <span className="text-[8px] tracking-[0.4em] text-[var(--gold)] font-light" style={{ writingMode: 'vertical-lr' }}>PARIS — FRANCE</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 2.5 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-[var(--gold)]" />
          <span className="text-[8px] tracking-[0.4em] text-[var(--gold)] font-light" style={{ writingMode: 'vertical-rl' }}>3 ÉTOILES MICHELIN</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </motion.div>
      </section>

      {/* ══════════ ABOUT PREVIEW ══════════ */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-20 items-center">
            <Reveal>
              <div className="relative group">
                <div className="absolute -inset-6 border border-[rgba(200,169,126,0.06)] group-hover:border-[rgba(200,169,126,0.15)] transition-all duration-700" />
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                    alt="Chef en cuisine"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.7)] via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[var(--gold)]" />
                  <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase">Depuis 1987</span>
                </div>
                {/* Decorative corners */}
                <div className="deco-corner tl" />
                <div className="deco-corner tr" />
                <div className="deco-corner bl" />
                <div className="deco-corner br" />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[var(--gold)]" /> Notre Philosophie
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] text-white mt-6 mb-8 leading-[1.1]">
                  <TextReveal text="L'excellence" delay={0} className="font-display text-4xl md:text-[3.5rem] text-white" />
                  <br />
                  <span className="text-gradient-gold italic">sans compromis</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="divider-gold mb-8" />
                <p className="text-[rgba(255,255,255,0.4)] leading-[1.9] mb-5 text-[15px]">
                  Depuis plus de trois décennies, PrestigeFlow redéfinit l&apos;art culinaire parisien.
                  Notre chef étoilé compose chaque plat comme une œuvre d&apos;éphémère,
                  mêlant tradition française et audace créative pour éveiller vos sens.
                </p>
                <p className="text-[rgba(255,255,255,0.4)] leading-[1.9] mb-10 text-[15px]">
                  Dans un cadre où l&apos;élégance rencontre l&apos;intimité, chaque dîner devient
                  une expérience inoubliable, célébrant les plus beaux produits de notre terroir.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link href="/about" className="btn-outline group/btn">
                  Découvrir notre histoire
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Counters */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-16 md:mt-24 pt-12 md:pt-20 border-t border-[rgba(200,169,126,0.05)]">
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
          <Reveal className="text-center mb-12 md:mb-20">
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--gold)]" /> Nos Créations <div className="w-8 h-[1px] bg-[var(--gold)]" />
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] text-white mt-6 mb-5">
              Plats <span className="italic text-gradient-gold">Signatures</span>
            </h2>
            <div className="divider-gold-wide mx-auto mt-4" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {signatureDishes.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 0.15}>
                <div className="menu-card group">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={dish.img} alt={dish.name} className="menu-img w-full h-full object-cover" />
                  </div>
                  <div className="menu-overlay">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-[1px] bg-[var(--gold)]" />
                      <span className="badge-gold !text-[8px]"><span className="badge-dot" /> Signature</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-white mb-2">{dish.name}</h3>
                    <p className="text-[rgba(255,255,255,0.4)] text-sm mb-4 leading-relaxed">{dish.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--gold)] font-display text-2xl">{dish.price} &euro;</span>
                      <Link href="/menu" className="text-[rgba(255,255,255,0.3)] hover:text-[var(--gold)] transition-all text-[11px] tracking-[0.2em] uppercase flex items-center gap-1.5 group/btn">
                        Voir plus <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-14">
            <Link href="/menu" className="btn-outline group/btn">
              Voir la carte complète
              <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════ EXPERIENCE PARALLAX ══════════ */}
      <ParallaxSection
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
        alt="Restaurant ambiance"
        overlay="linear-gradient(to bottom, rgba(5,5,5,0.6), rgba(5,5,5,0.75))"
        height="85vh"
      >
        <div className="text-center px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="w-16 h-16 mx-auto mb-8 border border-[rgba(200,169,126,0.3)] rounded-2xl flex items-center justify-center">
              <Wine size={28} className="text-[var(--gold)]" />
            </div>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[4rem] text-white mb-8 leading-[1.05]">
              Une expérience<br/><span className="italic text-gradient-gold">sensorielle</span>
            </h2>
            <p className="text-[rgba(255,255,255,0.4)] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Chaque visite est un voyage. De l&apos;accueil personnalisé à la dernière gorgée,
              nous composons un moment suspendu hors du temps.
            </p>
            <Link href="/reservation" className="btn-gold !px-14 !py-4">Vivre l&apos;expérience</Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12 md:mb-20">
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--gold)]" /> Témoignages <div className="w-8 h-[1px] bg-[var(--gold)]" />
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] text-white mt-6 mb-5">
              Ce qu&apos;ils <span className="italic text-gradient-gold">en disent</span>
            </h2>
            <div className="divider-gold-wide mx-auto mt-4" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.15}>
                <div className="testimonial-card glass-card p-6 md:p-10">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={13} fill={s < t.stars ? 'var(--gold)' : 'none'} className={s < t.stars ? 'text-[var(--gold)]' : 'text-[rgba(200,169,126,0.15)]'} />
                    ))}
                  </div>
                  <p className="text-[rgba(255,255,255,0.5)] text-[15px] leading-[1.8] mb-8 italic font-display">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="border-t border-[rgba(200,169,126,0.06)] pt-5">
                    <p className="text-white text-sm font-medium tracking-wide">{t.author}</p>
                    <p className="text-[var(--gold)] text-[11px] tracking-[0.15em] mt-1">{t.role}</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <Reveal>
                <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[var(--gold)]" /> Le Chef
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] text-white mt-6 mb-8 leading-[1.1]">
                  Alexandre<br/><span className="italic text-gradient-gold">Montfort</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="divider-gold mb-8" />
                <p className="text-[rgba(255,255,255,0.4)] leading-[1.9] mb-6 text-[15px]">
                  Formé par les plus grands — Ducasse, Robuchon, Pierre Hermé —
                  Alexandre Montfort porte la flamme de la haute gastronomie française
                  avec une passion qui se goûte dans chaque assiette.
                </p>
                <blockquote className="border-l-2 border-[var(--gold)] pl-8 my-10">
                  <p className="font-display text-xl md:text-2xl text-white italic leading-relaxed">
                    &ldquo;La cuisine est le seul art qui sollicite les cinq sens en même temps.
                    Mon devoir est de les émerveiller tous.&rdquo;
                  </p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2.5">
                    <Award size={16} className="text-[var(--gold)]" />
                    <span className="text-[13px] text-[rgba(255,255,255,0.4)]">3 Étoiles Michelin</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users size={16} className="text-[var(--gold)]" />
                    <span className="text-[13px] text-[rgba(255,255,255,0.4)]">Meilleur Ouvrier de France</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -top-5 -right-5 w-full h-full border border-[rgba(200,169,126,0.08)] group-hover:border-[rgba(200,169,126,0.15)] transition-all duration-700" />
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                    alt="Chef Alexandre Montfort"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.5)] via-transparent to-transparent" />
                </div>
                <div className="deco-corner tl" />
                <div className="deco-corner tr" />
                <div className="deco-corner bl" />
                <div className="deco-corner br" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ GALLERY PREVIEW ══════════ */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--gold)]" /> Ambiance <div className="w-8 h-[1px] bg-[var(--gold)]" />
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[3.5rem] text-white mt-6 mb-5">
              Notre <span className="italic text-gradient-gold">Galerie</span>
            </h2>
            <div className="divider-gold-wide mx-auto mt-4" />
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="gallery-item aspect-square group">
                  <img src={img} alt={`Galerie ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="gallery-overlay">
                    <div className="w-10 h-10 border border-[rgba(200,169,126,0.4)] rounded-xl flex items-center justify-center">
                      <ArrowRight size={14} className="text-[var(--gold)] -rotate-45" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/gallery" className="btn-outline group/btn">
              Voir toute la galerie
              <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════ RESERVATION CTA ══════════ */}
      <ParallaxSection
        src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1920&q=80"
        alt="Boissons raffinées"
        overlay="linear-gradient(135deg, rgba(5,5,5,0.88), rgba(5,5,5,0.65))"
        height="65vh"
      >
        <div className="text-center px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--gold)]" /> Réservation <div className="w-8 h-[1px] bg-[var(--gold)]" />
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-[4rem] text-white mt-6 mb-6 leading-[1.05]">
              Votre table<br/><span className="italic text-gradient-gold">vous attend</span>
            </h2>
            <p className="text-[rgba(255,255,255,0.4)] leading-relaxed mb-10 text-[15px]">
              Réservez votre expérience gastronomique et laissez-nous créer
              un moment d&apos;exception rien que pour vous.
            </p>
            <Link href="/reservation" className="btn-gold !px-14 !py-4 !text-[13px]">Réserver maintenant</Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="py-24 bg-[var(--noir)] border-t border-[rgba(200,169,126,0.04)]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase">Newsletter</span>
            <h3 className="font-display text-3xl text-white mt-4 mb-3">Restez inspiré</h3>
            <p className="text-[rgba(255,255,255,0.3)] text-sm mb-10">
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
