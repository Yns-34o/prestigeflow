import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Camera, Globe } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'La Carte' },
  { href: '/reservation', label: 'Réservation' },
  { href: '/about', label: 'Notre Histoire' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--noir)] border-t border-[rgba(200,169,126,0.08)]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[var(--gold)] flex items-center justify-center">
                <span className="font-display text-[var(--gold)] text-lg font-bold">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg tracking-[0.2em] text-white">PRESTIGE</span>
                <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] uppercase">Flow</span>
              </div>
            </div>
            <p className="text-[rgba(255,255,255,0.4)] text-sm leading-relaxed mb-6">
              Une expérience gastronomique d&apos;exception où l&apos;art culinaire rencontre l&apos;élégance. Chaque plat raconte une histoire, chaque instant devient un souvenir.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-[rgba(200,169,126,0.15)] rounded-xl flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[rgba(200,169,126,0.05)] transition-all duration-300">
                <Camera size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-[rgba(200,169,126,0.15)] rounded-xl flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[rgba(200,169,126,0.05)] transition-all duration-300">
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[rgba(255,255,255,0.4)] text-sm hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
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
                <MapPin size={16} className="text-[var(--gold)] mt-1 flex-shrink-0" />
                <span className="text-[rgba(255,255,255,0.4)] text-sm">42 Avenue des Champs-Élysées<br/>75008 Paris, France</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--gold)] flex-shrink-0" />
                <a href="tel:+33142689900" className="text-[rgba(255,255,255,0.4)] text-sm hover:text-[var(--gold)] transition-colors">+33 1 42 68 99 00</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--gold)] flex-shrink-0" />
                <span className="text-[rgba(255,255,255,0.4)] text-sm">contact@prestigeflow.fr</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-6">Horaires</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[var(--gold)] mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-white">Lun — Ven</p>
                  <p className="text-[rgba(255,255,255,0.4)]">12:00 — 14:30 / 19:00 — 23:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[var(--gold)] mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-white">Sam — Dim</p>
                  <p className="text-[rgba(255,255,255,0.4)]">12:00 — 15:00 / 19:00 — 00:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(200,169,126,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[rgba(255,255,255,0.3)] text-xs tracking-wider">
            &copy; {new Date().getFullYear()} PrestigeFlow. Tous droits réservés.
          </p>
          <p className="text-[rgba(255,255,255,0.3)] text-xs tracking-wider">
            Conçu avec passion et excellence
          </p>
        </div>
      </div>
    </footer>
  )
}
