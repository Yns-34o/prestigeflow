          {/* Delivery */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-6">Livraison</h4>
            <div className="flex flex-col gap-3">
              {deliveryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                    link.name === 'Uber Eats'
                      ? 'bg-[#06C167] hover:bg-[#05964C] hover:shadow-lg hover:shadow-[#06C167]/30'
                      : 'bg-[#00CCBC] hover:bg-[#00A7AB] hover:shadow-lg hover:shadow-[#00CCBC]/30'
                  }`}
                >
                  <img
                    src={link.name === 'Uber Eats' ? '/uber-eats-logo.svg' : '/deliveroo-logo.svg'}
                    alt={link.name}
                    className="h-8"
                  />
                  <span className="text-white text-sm font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
