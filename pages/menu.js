import { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ShoppingBag, Filter, Sparkles, ArrowRight } from 'lucide-react'
import { useCart } from '../components/CartContext'

const categories = ['Tous', 'Entrées', 'Plats', 'Desserts', 'Boissons']

const menuItems = [
  // Entrées
  { id: 1, name: 'Tartare de Saumon', desc: 'Avocat, agrumes, huile de sésame noir, micro-pousses wasabi', price: 38, category: 'Entrées', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', tag: 'Populaire' },
  { id: 2, name: 'Foie Gras Mi-Cuit', desc: 'Chutney de figues, brioche toastée, fleur de sel de Guérande', price: 45, category: 'Entrées', img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=80', tag: 'Signature' },
  { id: 3, name: 'Velouté aux Cèpes', desc: 'Truffe noire du Périgord, crème fouettée, éclats de noisettes', price: 28, category: 'Entrées', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80' },
  { id: 4, name: 'Carpaccio de Saint-Jacques', desc: 'Agrumes, caviar d\'Aquitaine, vinaigrette passion', price: 42, category: 'Entrées', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80', tag: 'Chef' },
  // Plats
  { id: 5, name: 'Homard Bleu Rôti', desc: 'Émulsion de safran, jus corsé aux agrumes, caviar d\'Aquitaine', price: 85, category: 'Plats', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80', tag: 'Signature' },
  { id: 6, name: 'Wagyu A5 Grillé', desc: 'Jus truffé, pommes dauphines, asperges vertes de Provence', price: 95, category: 'Plats', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80', tag: 'Chef' },
  { id: 7, name: 'Bar de Ligne', desc: 'Croûte d\'herbes, beurre blanc, fenouil confit aux agrumes', price: 68, category: 'Plats', img: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&q=80' },
  { id: 8, name: 'Pigeon en Croûte', desc: 'Farce forestière, sauce Périgueux, salsifis caramélisés', price: 72, category: 'Plats', img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80' },
  { id: 9, name: 'Risotto aux Truffes', desc: 'Parmesan 36 mois, huile de truffe blanche d\'Alba', price: 52, category: 'Plats', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80' },
  // Desserts
  { id: 10, name: 'Soufflé au Chocolat', desc: 'Ganache Valrhona 70%, glace vanille bourbon de Madagascar', price: 32, category: 'Desserts', img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80', tag: 'Signature' },
  { id: 11, name: 'Tarte Tatin', desc: 'Pommes caramélisées au beurre salé, crème fraîche battue', price: 26, category: 'Desserts', img: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?w=600&q=80' },
  { id: 12, name: 'Paris-Brest', desc: 'Praliné noisette du Piémont, crème mousseline, éclats caramélisés', price: 28, category: 'Desserts', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80', tag: 'Populaire' },
  { id: 13, name: 'Crème Brûlée Vanille', desc: 'Gousse de Tahiti, tuile croustillante aux amandes', price: 22, category: 'Desserts', img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80' },
  // Boissons
  { id: 14, name: 'Matcha Latte Artisanal', desc: 'Matcha cerémoniel du Japon, lait d\'amande, mousse onctueuse', price: 18, category: 'Boissons', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80', tag: 'Signature' },
  { id: 15, name: 'Elixir de Fruits Rouges', desc: 'Framboises fraîches, grenade, menthe, eau de source pétillante', price: 16, category: 'Boissons', img: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80' },
  { id: 16, name: 'Café Turc Prestige', desc: 'Grains torréfiés artisanalement, cardamome, fleur d\'oranger', price: 14, category: 'Boissons', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&q=80', tag: 'Populaire' },
  { id: 17, name: 'Sélection de Thés Rares', desc: 'Darjeeling, Oolong, Thé blanc — servis en théière artisanale', price: 22, category: 'Boissons', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80' },
]

function MenuItemCard({ item, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const handleAdd = () => {
    addItem({ ...item, qty })
    setQty(1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card overflow-hidden group"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.9)] via-[rgba(5,5,5,0.15)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,0.85)] via-[rgba(5,5,5,0.15)] to-transparent" />
        {item.tag && (
          <span className="absolute top-4 left-4 badge-gold backdrop-blur-md">
            <span className="badge-dot" /> {item.tag}
          </span>
        )}
        <div className="absolute top-4 right-4 font-display text-2xl text-[var(--gold)]">
          {item.price} &euro;
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-white group-hover:text-[var(--gold)] transition-colors duration-300 mb-2">{item.name}</h3>
        <p className="text-[rgba(255,255,255,0.35)] text-sm leading-relaxed mb-6">{item.desc}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-10 h-10 md:w-8 md:h-8 border border-[rgba(200,169,126,0.1)] rounded-lg flex items-center justify-center text-[rgba(255,255,255,0.3)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all"
            >
              <Minus size={12} />
            </button>
            <span className="text-sm w-5 text-center text-white font-medium">{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="w-10 h-10 md:w-8 md:h-8 border border-[rgba(200,169,126,0.1)] rounded-lg flex items-center justify-center text-[rgba(255,255,255,0.3)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all"
            >
              <Plus size={12} />
            </button>
          </div>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-2.5 text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full transition-all duration-300 ${
              justAdded
                ? 'bg-green-500 text-white'
                : 'bg-[var(--gold)] text-[var(--noir)] hover:bg-[var(--gold-light)] hover:shadow-[0_4px_20px_rgba(200,169,126,0.3)]'
            }`}
          >
            {justAdded ? (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>Ajouté ✓</motion.span>
            ) : (
              <><ShoppingBag size={12} /> Ajouter</>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const filtered = activeCategory === 'Tous' ? menuItems : menuItems.filter(i => i.category === activeCategory)

  return (
    <>
      <Head>
        <title>La Carte — PrestigeFlow | Menu Gastronomique Paris</title>
        <meta name="description" content="Découvrez la carte gastronomique de PrestigeFlow. Plats signatures, entrées raffinées, desserts d'exception et sélection de boissons. Commandez en ligne." />
        <link rel="canonical" href="https://prestigeflow.fr/menu" />
        <meta property="og:title" content="La Carte — PrestigeFlow" />
        <meta property="og:description" content="Menu gastronomique 3 étoiles. Commandez en ligne vos plats d'exception." />
        <meta property="og:url" content="https://prestigeflow.fr/menu" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[350px] md:min-h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80" alt="Culinary creations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,5,5,0.5)] to-[rgba(5,5,5,0.97)]" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <span className="text-[var(--gold)] text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--gold)]" /> Gastronomie <div className="w-8 h-[1px] bg-[var(--gold)]" />
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-3xl md:text-5xl lg:text-[5rem] text-white mt-6 mb-5"
          >
            La <span className="italic text-gradient-gold">Carte</span>
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }} className="h-[1px] w-[140px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[var(--noir)] border-b border-[rgba(200,169,126,0.04)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 flex-wrap py-6">
            <Filter size={15} className="text-[var(--gold)] mr-1 flex-shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 md:px-6 md:py-2.5 text-[11px] tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[var(--gold)] text-[var(--noir)] font-semibold shadow-[0_4px_20px_rgba(200,169,126,0.2)] rounded-full'
                    : 'text-[rgba(255,255,255,0.35)] hover:text-white border border-[rgba(200,169,126,0.08)] hover:border-[rgba(200,169,126,0.2)] rounded-full'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((item, i) => (
                <MenuItemCard key={item.id} item={item} delay={i * 0.07} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-10 border-t border-[rgba(200,169,126,0.05)] text-center"
          >
            <p className="text-[rgba(255,255,255,0.25)] text-[12px] tracking-[0.15em] uppercase flex items-center justify-center gap-2">
              <Sparkles size={12} className="text-[var(--gold)]" />
              Nos plats évoluent au fil des saisons et de l&apos;inspiration du Chef
              <Sparkles size={12} className="text-[var(--gold)]" />
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
