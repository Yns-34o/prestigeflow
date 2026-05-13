      {/* DELIVERY PLATFORMS */}
      <section className="section-padding bg-[var(--noir)] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center w-full relative z-10">
          <Reveal>
            <div className="mb-16">
              <span className="text-[var(--gold)] text-[11px] tracking-[0.35em] uppercase font-medium">Livraison Premium</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[4.5rem] text-white mt-4 mb-5">
                L'excellence,<br/><span className="italic text-gradient-gold">livrée chez vous</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-[15px] max-w-xl mx-auto">
                Commandez nos créations gastronomiques via nos partenaires de confiance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.a
                href="https://www.ubereats.com/fr/paris/food-delivery/prestigeflow"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#06C167]/20 to-transparent blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-10 hover:border-[#06C167]/30 transition-all duration-500">
                  <div className="w-24 h-24 mx-auto mb-8 bg-[#06C167] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/uber-eats-logo.svg"
                      alt="Uber Eats"
                      className="h-16"
                    />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Uber Eats</h3>
                  <p className="text-[var(--text-secondary)] text-base mb-8 leading-relaxed">
                    Livraison rapide et fiable dans toute Paris. Profitez de nos plats signatures en quelques clics.
                  </p>
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-white text-[#06C167] font-semibold text-base rounded-xl hover:bg-[#05964C] hover:shadow-lg hover:shadow-[#06C167]/30 transition-all duration-300">
                    Commander sur Uber Eats
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
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
                transition={{ delay: 0.2, duration: 0.7 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00CCBC]/20 to-transparent blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-10 hover:border-[#00CCBC]/30 transition-all duration-500">
                  <div className="w-24 h-24 mx-auto mb-8 bg-[#00CCBC] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/deliveroo-logo.svg"
                      alt="Deliveroo"
                      className="h-16"
                    />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Deliveroo</h3>
                  <p className="text-[var(--text-secondary)] text-base mb-8 leading-relaxed">
                    La qualité PrestigeFlow, livrée chez vous. Une expérience gastronomique à votre porte.
                  </p>
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-white text-[#00CCBC] font-semibold text-base rounded-xl hover:bg-[#00A7AB] hover:shadow-lg hover:shadow-[#00CCBC]/30 transition-all duration-300">
                    Commander sur Deliveroo
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>
