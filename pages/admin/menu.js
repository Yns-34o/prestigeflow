import { useState } from 'react'
import Head from 'next/head'
import AdminLayout from '../../components/AdminLayout'
import { Plus, Pencil, Trash2, X, Check, UtensilsCrossed } from 'lucide-react'

const initialMenuItems = [
  { id: 1, name: 'Tartare de Saumon', desc: 'Avocat, agrumes, huile de sésame noir', price: 38, category: 'Entrées', tag: 'Populaire' },
  { id: 2, name: 'Foie Gras Mi-Cuit', desc: 'Chutney de figues, brioche toastée', price: 45, category: 'Entrées', tag: 'Signature' },
  { id: 3, name: 'Velouté aux Cèpes', desc: 'Truffe noire, crème fouettée', price: 28, category: 'Entrées' },
  { id: 4, name: 'Carpaccio de Saint-Jacques', desc: 'Agrumes, caviar d\'Aquitaine', price: 42, category: 'Entrées', tag: 'Chef' },
  { id: 5, name: 'Homard Bleu Rôti', desc: 'Émulsion de safran, jus corsé', price: 85, category: 'Plats', tag: 'Signature' },
  { id: 6, name: 'Wagyu A5 Grillé', desc: 'Jus truffé, pommes dauphines', price: 95, category: 'Plats', tag: 'Chef' },
  { id: 7, name: 'Bar de Ligne', desc: 'Croûte d\'herbes, beurre blanc', price: 68, category: 'Plats' },
  { id: 8, name: 'Pigeon en Croûte', desc: 'Farce forestière, sauce Périgueux', price: 72, category: 'Plats' },
  { id: 9, name: 'Risotto aux Truffes', desc: 'Parmesan 36 mois, truffe noire', price: 52, category: 'Plats' },
  { id: 10, name: 'Soufflé au Chocolat', desc: 'Grand Cru 75%, glace vanille', price: 32, category: 'Desserts', tag: 'Signature' },
  { id: 11, name: 'Tarte Tatin', desc: 'Pommes caramélisées, crème fouettée', price: 26, category: 'Desserts' },
  { id: 12, name: 'Paris-Brest', desc: 'Praliné noisette, crème mousseline', price: 28, category: 'Desserts' },
  { id: 13, name: 'Crème Brûlée', desc: 'Vanille Bourbon, tuile croustillante', price: 22, category: 'Desserts' },
  { id: 14, name: 'Matcha Latte Artisanal', desc: 'Matcha ceremonial grade', price: 18, category: 'Boissons' },
  { id: 15, name: 'Elixir de Fruits Rouges', desc: 'Framboise, cassis, menthe fraîche', price: 16, category: 'Boissons' },
  { id: 16, name: 'Café Turc Prestige', desc: 'Cardamome, miel de thym', price: 14, category: 'Boissons' },
  { id: 17, name: 'Thés Rares', desc: 'Sélection de thés du monde', price: 22, category: 'Boissons' },
]

const categories = ['Entrées', 'Plats', 'Desserts', 'Boissons']

export default function MenuAdminPage() {
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [editing, setEditing] = useState(null)
  const [newItem, setNewItem] = useState(null)
  const [filter, setFilter] = useState('all')

  const filteredItems = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter)

  const handleSave = (id, data) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...data } : item))
    setEditing(null)
  }

  const handleAdd = () => {
    const id = Math.max(...menuItems.map(i => i.id), 0) + 1
    const item = { id, name: '', desc: '', price: 0, category: 'Entrées' }
    setMenuItems(prev => [...prev, item])
    setEditing(id)
    setNewItem(id)
  }

  const handleDelete = (id) => {
    if (!confirm('Supprimer cet article ?')) return
    setMenuItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <AdminLayout title="La Carte">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="font-display text-2xl text-white flex items-center gap-2">
          <UtensilsCrossed size={20} className="text-[var(--gold)]" /> La Carte
        </h1>
        <button onClick={handleAdd} className="btn-gold !py-2.5 !text-[11px]">
          <Plus size={14} /> Ajouter un plat
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`text-[10px] tracking-wider uppercase px-3 py-2.5 md:py-1.5 border transition-colors ${filter === 'all' ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-[rgba(200,169,126,0.1)] text-[rgba(255,255,255,0.3)]'}`}
        >
          Tous ({menuItems.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-[10px] tracking-wider uppercase px-3 py-2.5 md:py-1.5 border transition-colors ${filter === cat ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-[rgba(200,169,126,0.1)] text-[rgba(255,255,255,0.3)]'}`}
          >
            {cat} ({menuItems.filter(i => i.category === cat).length})
          </button>
        ))}
      </div>

      {/* Menu items */}
      <div className="flex flex-col gap-3">
        {filteredItems.map(item => (
          <MenuItemRow
            key={item.id}
            item={item}
            editing={editing === item.id}
            onEdit={() => setEditing(item.id)}
            onSave={handleSave}
            onDelete={() => handleDelete(item.id)}
            onCancel={() => {
              setEditing(null)
              if (newItem === item.id) {
                setMenuItems(prev => prev.filter(i => i.id !== item.id))
              }
            }}
          />
        ))}
      </div>
    </AdminLayout>
  )
}

function MenuItemRow({ item, editing, onEdit, onSave, onDelete, onCancel }) {
  const [form, setForm] = useState(item)

  if (editing) {
    return (
      <div className="glass-card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className="input-luxury !text-sm"
            placeholder="Nom du plat"
          />
          <div className="flex gap-3">
            <input
              type="number"
              value={form.price}
              onChange={e => setForm(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
              className="input-luxury !text-sm w-28"
              placeholder="Prix"
              step="0.01"
            />
            <select
              value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="input-luxury !text-sm flex-1"
            >
              {categories.map(c => <option key={c} value={c} style={{ background: '#111' }}>{c}</option>)}
            </select>
          </div>
        </div>
        <input
          type="text"
          value={form.desc || ''}
          onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
          className="input-luxury !text-sm mb-3"
          placeholder="Description"
        />
        <div className="flex gap-2">
          <button onClick={() => onSave(item.id, form)} className="btn-gold !py-2 !text-[10px]">
            <Check size={12} /> Enregistrer
          </button>
          <button onClick={onCancel} className="btn-outline !py-2 !text-[10px]">
            <X size={12} /> Annuler
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-white text-sm font-medium truncate">{item.name}</span>
          {item.tag && (
            <span className="text-[9px] px-2 py-0.5 bg-[rgba(200,169,126,0.08)] text-[var(--gold)]">{item.tag}</span>
          )}
        </div>
        <div className="text-[rgba(255,255,255,0.25)] text-xs truncate">{item.desc}</div>
      </div>
      <span className="text-[10px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">{item.category}</span>
      <span className="font-display text-[var(--gold)] whitespace-nowrap">{item.price.toFixed(2)} €</span>
      <div className="flex gap-1">
        <button onClick={onEdit} className="text-[rgba(255,255,255,0.2)] hover:text-[var(--gold)] transition-colors p-1">
          <Pencil size={13} />
        </button>
        <button onClick={onDelete} className="text-[rgba(255,255,255,0.2)] hover:text-red-400 transition-colors p-1">
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  )
}
