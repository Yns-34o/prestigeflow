          {/* Delivery Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 pt-12 border-t border-white/5"
          >
            <div className="text-center mb-12">
              <span className="text-[var(--gold)] text-[11px] tracking-[0.35em] uppercase font-medium">Livraison Express</span>
              <h3 className="font-display text-2xl md:text-3xl text-white mt-4 mb-4">
                Commandez via nos <span className="italic text-gradient-gold">partenaires</span>
              </h3>
              <p className="text-[var(--text-secondary)] text-sm max-w-lg mx-auto">Nos créations livrées chez vous en 30-45 minutes</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.a
                href="https://www.ubereats.com/fr/paris/food-delivery/prestigeflow"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#06C167]/15 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-8 hover:border-[#06C167]/30 transition-all duration-400">
                  <div className="w-20 h-20 mx-auto mb-6 bg-[#06C167] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-400">
                    <img
                      src="/uber-eats-logo.svg"
                      alt="Uber Eats"
                      className="h-14"
                    />
                  </div>
                  <h4 className="font-display text-xl text-white mb-3">Uber Eats</h4>
                  <p className="text-[var(--text-secondary)] text-sm mb-6">Livraison rapide et fiable</p>
                  <div className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#06C167] font-semibold text-sm rounded-lg hover:bg-[#05964C] hover:shadow-lg hover:shadow-[#06C167]/20 transition-all duration-300">
                    Commander
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://www.deliveroo.fr/fr/menu/paris/prestigeflow"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00CCBC]/15 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-8 hover:border-[#00CCBC]/30 transition-all duration-400">
                  <div className="w-20 h-20 mx-auto mb-6 bg-[#00CCBC] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-400">
                    <img
                      src="/deliveroo-logo.svg"
                      alt="Deliveroo"
                      className="h-14"
                    />
                  </div>
                  <h4 className="font-display text-xl text-white mb-3">Deliveroo</h4>
                  <p className="text-[var(--text-secondary)] text-sm mb-6">La qualité livrée</p>
                  <div className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#00CCBC] font-semibold text-sm rounded-lg hover:bg-[#00A7AB] hover:shadow-lg hover:shadow-[#00CCBC]/20 transition-all duration-300">
                    Commander
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
