import { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ShoppingBag, Filter, Sparkles, ArrowRight } from 'lucide-react'
import { useCart } from '../components/CartContext'

const categories = ['Tous', 'Entrées', 'Plats', 'Desserts', 'Boissons']

const menuItems = [
  // Entrées
  { id: 1, name: 'Tartare de Saumon', desc: 'Avocat, agrumes, huile de sésame noir, micro-pousses wasabi', price: 38, category: 'Entrées', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', tag: 'Populaire' },
  { id: 2, name: 'Foie Gras Mi-Cuit', desc: 'Chutney de figues, brioche toastée, fleur de sel de Guérande', price: 45, category: 'Entrées', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80', tag: 'Signature' },
  { id: 3, name: 'Velouté aux Cèpes', desc: 'Truffe noire du Périgord, crème fouettée, éclats de noisettes', price: 28, category: 'Entrées', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80' },
  { id: 4, name: 'Carpaccio de Saint-Jacques', desc: 'Agrumes, caviar d\'Aquitaine, vinaigrette passion', price: 42, category: 'Entrées', img: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&q=80', tag: 'Chef' },
  // Plats
  { id: 5, name: 'Homard Bleu Rôti', desc: 'Émulsion de safran, jus corsé aux agrumes, caviar d\'Aquitaine', price: 85, category: 'Plats', img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80', tag: 'Signature' },
  { id: 6, name: 'Wagyu A5 Grillé', desc: 'Jus truffé, pommes dauphines, asperges vertes de Provence', price: 95, category: 'Plats', img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80', tag: 'Chef' },
  { id: 7, name: 'Bar de Ligne', desc: 'Croûte d\'herbes, beurre blanc, fenouil confit aux agrumes', price: 68, category: 'Plats', img: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80' },
  { id: 8, name: 'Pigeon en Croûte', desc: 'Farce forestière, sauce Périgueux, salisifis caramélisés', price: 72, category: 'Plats', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80' },
  { id: 9, name: 'Risotto aux Truffes', desc: 'Parmesan 36 mois, huile de truffe blanche d\'Alba', price: 52, category: 'Plats', img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80' },
  // Desserts
  { id: 10, name: 'Soufflé au Chocolat', desc: 'Ganache Valrhona 70%, glace vanille bourbon de Madagascar', price: 32, category: 'Desserts', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', tag: 'Signature' },
  { id: 11, name: 'Tarte Tatin', desc: 'Pommes caramélisées au beurre salé, crème fraîche battue', price: 26, category: 'Desserts', img: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&q=80' },
  { id: 12, name: 'Paris-Brest', desc: 'Praliné noisette du Piémont, crème mousseline, éclats caramélisés', price: 28, category: 'Desserts', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80', tag: 'Populaire' },
  { id: 13, name: 'Crème Brûlée Vanille', desc: 'Gousse de Tahiti, tuile croustillante aux amandes', price: 22, category: 'Desserts', img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80' },
  // Boissons
  { id: 14, name: 'Matcha Latte Artisanal', desc: 'Matcha cérémoniel du Japon, lait d\'amande, mousse onctueuse', price: 18, category: 'Boissons', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80', tag: 'Signature' },
  { id: 15, name: 'Elixir de Fruits Rouges', desc: 'Framboises fraîches, grenade, menthe, eau de source pétillante', price: 16, category: 'Boissons', img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80' },
  { id: 16, name: 'Café Turc Prestige', desc: 'Grains torréfiés artisanalement, cardamome, fleur d\'oranger', price: 14, category: 'Boissons', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', tag: 'Populaire' },
  { id: 17, name: 'Sélection de Thés Rares', desc: 'Darjeeling, Oolong, Thé blanc — servis en théière artisanale', price: 22, category: 'Boissons', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80' },
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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--noir)] via-transparent to-transparent opacity-60" />
        </div>

        {/* Tag */}
        {item.tag && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="absolute top-4 right-4 px-3 py-1 bg-[var(--gold)] text-[var(--noir)] text-[10px] tracking-[0.15em] uppercase font-semibold rounded-full"
          >
            {item.tag}
          </motion.span>
        )}

        {/* Quick Add */}
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
          className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            justAdded
              ? 'bg-[var(--gold)] text-[var(--noir)]'
              : 'bg-[var(--noir-light)]/90 backdrop-blur-sm border border-white/20 text-white hover:bg-[var(--gold)] hover:text-[var(--noir)]'
          }`}
        >
          <Plus size={18} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-xl text-white">{item.name}</h3>
          <p className="text-[var(--gold)] font-display text-lg">{item.price.toFixed(2)} €</p>
        </div>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">{item.desc}</p>

        {/* Quantity & Add */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => qty > 1 && setQty(qty - 1)}
              className="w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-white font-medium">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              justAdded
                ? 'bg-[var(--gold)] text-[var(--noir)]'
                : 'btn-gold'
            }`}
          >
            {justAdded ? <Sparkles size={18} /> : <ShoppingBag size={18} />}
            <span>{justAdded ? 'Ajouté !' : 'Ajouter au panier'}</span>
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
        <title>La Carte — PrestigeFlow | Menu Gastronomique</title>
        <meta name="description" content="Découvrez notre carte gastronomique : entrées raffinées, plats d'exception, desserts signature et boissons d'exception." />
        <link rel="canonical" href="https://prestigeflow.fr/menu" />
        <meta property="og:title" content="La Carte — PrestigeFlow" />
        <meta property="og:description" content="Menu gastronomique : entrées, plats, desserts et boissons." />
        <meta property="og:url" content="https://prestigeflow.fr/menu" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" alt="Menu hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.5)] to-[rgba(10,10,10,0.95)]" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">
            Saveurs d'Exception
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="font-display text-4xl md:text-6xl lg:text-8xl text-white mt-4 mb-4">
            Notre <span className="italic text-gradient-gold">Carte</span>
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 140 }} transition={{ delay: 0.7, duration: 0.7 }} className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="text-[var(--text-secondary)] text-base max-w-xl mt-8">
            Une expérience culinaire où chaque plat raconte une histoire, chaque instant devient un souvenir inoubliable.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-[var(--noir)] border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 flex-wrap py-4 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-[11px] md:text-[12px] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 rounded-full flex-shrink-0 ${
                  activeCategory === cat ? 'bg-[var(--gold)] text-[var(--noir)] font-medium' : 'text-[var(--text-secondary)] hover:text-white'
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
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="wait">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <MenuItemCard item={item} delay={i * 0.06} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--noir)] to-[var(--noir-light)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl md:text-4xl text-white mb-4"
            >
              Livraison <span className="text-[var(--gold)]">Premium</span>
            </motion.h2>
            <p className="text-[var(--text-secondary)] text-base">
              Profitez de notre cuisine gastronomique livrée directement chez vous par nos partenaires de confiance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.a
              href="https://www.ubereats.com/fr/paris/food-delivery/prestigeflow"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-8 hover:border-[var(--gold)]/30 transition-all duration-400">
                <div className="w-20 h-20 mx-auto mb-6 bg-[var(--noir-light)] border border-[var(--noir-border)] rounded-xl flex items-center justify-center group-hover:border-[var(--gold)] transition-all duration-300">
                  <img src="/uber-eats-logo.svg" alt="Uber Eats" className="h-14" />
                </div>
                <h4 className="font-display text-xl text-white mb-3">Uber Eats</h4>
                <p className="text-[var(--text-secondary)] text-sm mb-6">Livraison rapide et fiable</p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] text-[var(--noir)] rounded-lg text-sm font-semibold hover:bg-[var(--gold-light)] transition-all duration-300">
                  Commander
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://www.deliveroo.fr/fr/menu/paris/prestigeflow"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-8 hover:border-[var(--gold)]/30 transition-all duration-400">
                <div className="w-20 h-20 mx-auto mb-6 bg-[var(--noir-light)] border border-[var(--noir-border)] rounded-xl flex items-center justify-center group-hover:border-[var(--gold)] transition-all duration-300">
                  <img src="/deliveroo-logo.svg" alt="Deliveroo" className="h-14" />
                </div>
                <h4 className="font-display text-xl text-white mb-3">Deliveroo</h4>
                <p className="text-[var(--text-secondary)] text-sm mb-6">La qualité livrée chez vous</p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] text-[var(--noir)] rounded-lg text-sm font-semibold hover:bg-[var(--gold-light)] transition-all duration-300">
                  Commander
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </>
  )
}
