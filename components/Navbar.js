      {/* Right: Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Delivery Buttons */}
        <a
          href="https://www.ubereats.com/fr/paris/food-delivery/prestigeflow"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#06C167] rounded-xl hover:bg-[#05964C] hover:shadow-lg hover:shadow-[#06C167]/30 transition-all duration-300"
        >
          <img
            src="/uber-eats-logo.svg"
            alt="Uber Eats"
            className="h-6"
          />
        </a>
        <a
          href="https://www.deliveroo.fr/fr/menu/paris/prestigeflow"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#00CCBC] rounded-xl hover:bg-[#00A7AB] hover:shadow-lg hover:shadow-[#00CCBC]/30 transition-all duration-300"
        >
          <img
            src="/deliveroo-logo.svg"
            alt="Deliveroo"
            className="h-6"
          />
        </a>

        <div className="w-px h-6 bg-white/10" />

        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 rounded-xl hover:bg-white/5 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {count > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--gold)] text-[var(--noir)] text-[10px] font-bold flex items-center justify-center rounded-full"
            >
              {count}
            </motion.span>
          )}
        </motion.button>

        <Link
          href="/reservation"
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] text-[var(--noir)] text-xs tracking-wider uppercase font-semibold rounded-full hover:bg-[var(--gold-light)] transition-colors"
        >
          Réserver
        </Link>
      </div>
