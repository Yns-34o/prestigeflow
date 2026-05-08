import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'La Carte' },
  { href: '/reservation', label: 'Réservation' },
  { href: '/about', label: 'Notre Histoire' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
]

const deliveryLinks = [
  { name: 'Uber Eats', url: 'https://www.ubereats.com/fr/paris/food-delivery/prestigeflow', color: 'bg-[#00CCBC]' },
  { name: 'Deliveroo', url: 'https://www.deliveroo.fr/fr/menu/paris/prestigeflow', color: 'bg-[#00CCBC]' },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--noir)] border-t border-white/5 overflow-x-hidden">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[var(--gold)] rounded-lg flex items-center justify-center">
                <span className="font-display text-[var(--gold)] text-lg font-bold">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base tracking-[0.2em] text-white">PRESTIGE</span>
                <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase">Flow</span>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Une expérience gastronomique d&apos;exception où chaque plat raconte une histoire, chaque instant devient un souvenir inoubliable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--text-secondary)] text-sm hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--text-secondary)] text-sm">42 Avenue des Champs-Élysées<br/>75008 Paris, France</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[var(--gold)] flex-shrink-0" />
                <a href="tel:+33142689900" className="text-[var(--text-secondary)] text-sm hover:text-[var(--gold)] transition-colors">+33 1 42 68 99 00</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[var(--gold)] flex-shrink-0" />
                <span className="text-[var(--text-secondary)] text-sm">contact@prestigeflow.fr</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-6">Horaires</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-white mb-1">Lun — Ven</p>
                  <p className="text-[var(--text-secondary)]">12:00 — 14:30 / 19:00 — 23:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-white mb-1">Sam — Dim</p>
                  <p className="text-[var(--text-secondary)]">12:00 — 15:00 / 19:00 — 00:00</p>
                </div>
              </div>
            </div>
          </div>

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
                  className="group flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg group-hover:bg-[var(--gold)] group-hover:text-[var(--noir)] transition-all">
                    {link.name === 'Uber Eats' ? (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Uber_Eats_2020.svg/1200px-Uber_Eats_2020.svg.png"
                        alt="Uber Eats"
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Deliveroo_logo.svg/1200px-Deliveroo_logo.svg.png"
                        alt="Deliveroo"
                        className="w-6 h-6 object-contain"
                      />
                    )}
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm group-hover:text-white transition-colors">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          <p className="text-[var(--text-muted)] text-[11px] tracking-wider">
            &copy; {new Date().getFullYear()} PrestigeFlow. Tous droits réservés.
          </p>
          <p className="text-[var(--text-muted)] text-[11px] tracking-wider">
            Paris — France
          </p>
        </div>
      </div>
    </footer>
  )
}
