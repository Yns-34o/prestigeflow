import { useState, useRef } from 'react'
import Head from 'next/head'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', alt: 'Art culinaire', category: 'Cuisine', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80', alt: 'Homard bleu', category: 'Cuisine', span: '' },
  { src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', alt: 'Boissons raffinées', category: 'Ambiance', span: '' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80', alt: 'Table festive', category: 'Cuisine', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80', alt: 'Chef en action', category: 'Ambiance', span: '' },
  { src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80', alt: 'Service élégant', category: 'Ambiance', span: '' },
  { src: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=80', alt: 'Sélection de thés', category: 'Boissons', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80', alt: 'Wagyu A5', category: 'Cuisine', span: '' },
  { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80', alt: 'Dessert signature', category: 'Cuisine', span: '' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80', alt: 'Salle principale', category: 'Ambiance', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80', alt: 'Plat artistique', category: 'Cuisine', span: '' },
  { src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', alt: 'Boisson signature', category: 'Boissons', span: '' },
  { src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', alt: 'Pâtisseries', category: 'Cuisine', span: '' },
  { src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80', alt: 'Chef Montfort', category: 'Ambiance', span: '' },
  { src: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80', alt: 'Elixir de fruits', category: 'Boissons', span: '' },
  { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80', alt: 'Table romantique', category: 'Ambiance', span: 'col-span-2' },
]

const categories = ['Tous', 'Ambiance', 'Cuisine', 'Boissons']

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeCategory === 'Tous' ? galleryImages : galleryImages.filter(i => i.category === activeCategory)

  const openLightbox = (index) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox(lightbox > 0 ? lightbox - 1 : filtered.length - 1)
  const next = () => setLightbox(lightbox < filtered.length - 1 ? lightbox + 1 : 0)

  return (
    <>
      <Head>
        <title>Galerie — PrestigeFlow | Photos du Restaurant & Cuisine</title>
        <meta name="description" content="Découvrez l'ambiance et les créations culinaires de PrestigeFlow à travers notre galerie photo. Cuisine, ambiance et boissons d'exception." />
        <link rel="canonical" href="https://prestigeflow.fr/gallery" />
        <meta property="og:title" content="Galerie — PrestigeFlow" />
        <meta property="og:description" content="Photos du restaurant, de la cuisine et de l'ambiance PrestigeFlow." />
        <meta property="og:url" content="https://prestigeflow.fr/gallery" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" alt="Gallery hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,10,0.4)] to-[rgba(10,10,10,0.95)]" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">
            Ambiance
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="font-display text-3xl md:text-5xl lg:text-7xl text-white mt-4 mb-4">
            Notre <span className="italic text-gradient-gold">Galerie</span>
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ delay: 0.7, duration: 0.7 }} className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* Filter */}
      <section className="bg-[var(--noir)] border-b border-white/5 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-1 flex-wrap py-5 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] md:text-[12px] tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 rounded-full flex-shrink-0 ${
                  activeCategory === cat ? 'bg-[var(--gold)] text-[var(--noir)] font-medium' : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-[var(--noir)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 auto-rows-[300px] sm:auto-rows-[350px] md:auto-rows-[400px]"
            >
              {filtered.map((img, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div
                    className={`gallery-item ${img.span || ''} cursor-pointer`}
                    onClick={() => openLightbox(i)}
                  >
                    <img src={img.src} alt={img.alt} className="w-full min-h-full object-cover" />
                    <div className="gallery-overlay flex-col gap-2">
                      <span className="text-white text-sm font-display">{img.alt}</span>
                      <span className="text-[var(--gold)] text-[10px] tracking-[0.2em] uppercase">{img.category}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(0,0,0,0.95)] z-[1000] flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white hover:text-[var(--gold)] transition-colors z-10">
              <X size={28} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 md:left-8 text-white hover:text-[var(--gold)] transition-colors z-10">
              <ChevronLeft size={36} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 md:right-8 text-white hover:text-[var(--gold)] transition-colors z-10">
              <ChevronRight size={36} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] px-4 md:px-12"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox]?.src}
                alt={filtered[lightbox]?.alt}
                className="w-full h-full object-contain"
              />
              <div className="text-center mt-4">
                <p className="font-display text-lg text-white">{filtered[lightbox]?.alt}</p>
                <p className="text-[var(--gold)] text-xs tracking-[0.2em] uppercase mt-1">{filtered[lightbox]?.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
