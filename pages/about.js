import { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Award, Heart, Leaf, Star } from 'lucide-react'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function ParallaxImage({ src, alt, height = '60vh' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ y }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[rgba(10,10,10,0.4)]" />
    </div>
  )
}

const timeline = [
  { year: '1987', title: 'Les Origines', desc: 'Pierre Montfort ouvre les portes de PrestigeFlow dans un hôtel particulier du 8ème arrondissement, avec une vision : créer un temple de la gastronomie française.' },
  { year: '1995', title: 'Première Étoile', desc: 'Le Guide Michelin décerne sa première étoile au restaurant, reconnaissant l\'excellence et la créativité de la cuisine proposée.' },
  { year: '2003', title: 'Passage de Témoin', desc: 'Alexandre Montfort prend la direction de la cuisine après avoir forgé son talent auprès des plus grands chefs français.' },
  { year: '2010', title: 'La Triple Couronne', desc: 'PrestigeFlow obtient sa troisième étoile Michelin, entrant dans le cercle très fermé des restaurants triplement étoilés.' },
  { year: '2018', title: 'Renouveau', desc: 'Une rénovation complète des lieux offre un cadre repensé, mêlant héritage architectural et design contemporain.' },
  { year: '2024', title: 'L\'Excellence Continue', desc: 'PrestigeFlow poursuit sa quête de perfection, avec un engagement renforcé envers la durabilité et les producteurs locaux.' },
]

const values = [
  { icon: Heart, title: 'Passion', desc: 'Chaque plat est le fruit d\'une passion dévorante pour l\'art culinaire et le goût de l\'excellence.' },
  { icon: Leaf, title: 'Saisonnalité', desc: 'Nous travaillons en harmonie avec les saisons, sourcing uniquement les produits les plus frais et les plus nobles.' },
  { icon: Award, title: 'Excellence', desc: 'La quête de la perfection guide chacun de nos gestes, de la sélection des produits au service à table.' },
  { icon: Star, title: 'Créativité', desc: 'L\'innovation culinaire est notre moteur. Nous repoussons les limites tout en honorant la tradition française.' },
]

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Notre Histoire — PrestigeFlow | Restaurant Gastronomique depuis 1987</title>
        <meta name="description" content="Découvrez l'histoire de PrestigeFlow, de sa création en 1987 à sa consécration avec trois étoiles Michelin. Un héritage culinaire d'excellence." />
        <link rel="canonical" href="https://prestigeflow.fr/about" />
        <meta property="og:title" content="Notre Histoire — PrestigeFlow" />
        <meta property="og:description" content="De 1987 à nos jours, l'histoire d'un restaurant 3 étoiles Michelin." />
        <meta property="og:url" content="https://prestigeflow.fr/about" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[350px] md:min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&q=80" alt="Chef cooking" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.3)] to-[rgba(10,10,10,0.95)]" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">
            Notre Histoire
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="font-display text-3xl md:text-5xl lg:text-7xl text-white mt-4 mb-4">
            La <span className="italic text-gradient-gold">Saga</span> PrestigeFlow
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ delay: 0.7, duration: 0.7 }} className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-4 border border-white/5" />
                <div className="relative overflow-hidden aspect-square">
                  <img src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80" alt="Restaurant" className="w-full h-full object-cover" />
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <span className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">Notre Récit</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display text-3xl md:text-4xl text-white mt-4 mb-6">
                  Un héritage<br/><span className="italic text-gradient-gold">de passion</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="divider-gold mb-6" />
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  En 1987, Pierre Montfort transforme un hôtel particulier du 8ème arrondissement de Paris en un sanctuaire
                  de la gastronomie française. Sa philosophie est simple : ne jamais transiger sur la qualité.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  Trois décennies plus tard, son fils Alexandre perpétue cet héritage avec la même exigence et une créativité
                  qui a valu à PrestigeFlow trois étoiles Michelin et une place parmi les plus grandes tables de France.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Aujourd&apos;hui, PrestigeFlow continue de repousser les frontières de l&apos;excellence culinaire,
                  en alliant tradition et innovation au service d&apos;une expérience gastronomique unique.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Break */}
      <ParallaxImage src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&q=80" alt="Restaurant interior" height="50vh" />

      {/* Timeline */}
      <section className="section-padding bg-[var(--noir-light)]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">Chronologie</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-4 mb-4">
              Les grandes <span className="italic text-gradient-gold">dates</span>
            </h2>
            <div className="divider-gold-wide mx-auto mt-4" />
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10" />

            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block flex-1" />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--gold)] -translate-y-1 mt-6" />
                  <div className="flex-1 pl-8 md:pl-0">
                    <span className="font-display text-3xl text-[var(--gold)]">{item.year}</span>
                    <h3 className="font-display text-xl text-white mt-1 mb-2">{item.title}</h3>
                    <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">Nos Piliers</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-4 mb-4">
              Nos <span className="italic text-gradient-gold">Valeurs</span>
            </h2>
            <div className="divider-gold-wide mx-auto mt-4" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="glass-card p-8 text-center h-full">
                  <div className="w-14 h-14 mx-auto mb-6 border border-[var(--gold)] rounded-xl flex items-center justify-center">
                    <v.icon size={24} className="text-[var(--gold)]" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-3">{v.title}</h3>
                  <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-[var(--noir-light)] border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4">Vivez l&apos;expérience</h3>
            <p className="text-[var(--text-secondary)] mb-8">
              Découvrez par vous-même ce qui fait de PrestigeFlow une institution de la gastronomie parisienne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservation" className="btn-gold">Réserver une table</Link>
              <Link href="/menu" className="btn-outline">Voir la carte</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
