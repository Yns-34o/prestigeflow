import { useState, useEffect } from 'react'
import Head from 'next/head'
import AdminLayout from '../../components/AdminLayout'
import { ShoppingBag, CheckCircle, Truck, XCircle, Clock, Eye, Trash2 } from 'lucide-react'

const statusOptions = [
  { value: 'pending', label: 'En attente', icon: Clock, color: 'text-yellow-400' },
  { value: 'paid', label: 'Payée', icon: CheckCircle, color: 'text-green-400' },
  { value: 'delivered', label: 'Livrée', icon: Truck, color: 'text-blue-400' },
  { value: 'canceled', label: 'Annulée', icon: XCircle, color: 'text-red-400' },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState('all')

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = async (id, status) => {
    await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    fetchOrders()
    if (selectedOrder?.id === id) {
      setSelectedOrder(prev => ({ ...prev, status }))
    }
  }

  const deleteOrder = async (id) => {
    if (!confirm('Supprimer cette commande ?')) return
    await fetch('/api/orders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchOrders()
    setSelectedOrder(null)
  }

  const filteredOrders = filter === 'all'
    ? [...orders].reverse()
    : [...orders].reverse().filter(o => o.status === filter)

  const getStatus = (status) => statusOptions.find(s => s.value === status) || statusOptions[0]

  return (
    <AdminLayout title="Commandes">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="font-display text-2xl text-white">Commandes</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`text-[10px] tracking-wider uppercase px-3 py-2.5 md:py-1.5 border transition-colors ${filter === 'all' ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-[rgba(200,169,126,0.1)] text-[rgba(255,255,255,0.3)] hover:text-white'}`}
          >
            Toutes ({orders.length})
          </button>
          {statusOptions.map(s => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`text-[10px] tracking-wider uppercase px-3 py-2.5 md:py-1.5 border transition-colors ${filter === s.value ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-[rgba(200,169,126,0.1)] text-[rgba(255,255,255,0.3)] hover:text-white'}`}
            >
              {s.label} ({orders.filter(o => o.status === s.value).length})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-10 text-center">
          <div className="w-6 h-6 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <p className="text-[rgba(255,255,255,0.3)] text-sm">Aucune commande trouvée</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredOrders.map(order => {
            const status = getStatus(order.status)
            return (
              <div key={order.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white text-sm font-medium">{order.delivery?.name || 'Client'}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.03)] ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-[rgba(255,255,255,0.2)] text-[10px]">{order.paymentMethod}</span>
                  </div>
                  <div className="text-[rgba(255,255,255,0.3)] text-xs">
                    {order.items?.map(i => `${i.name} x${i.qty}`).join(' · ') || '—'}
                  </div>
                  <div className="text-[rgba(255,255,255,0.15)] text-[10px] mt-1">
                    {new Date(order.createdAt).toLocaleString('fr-FR')}
                    {order.delivery?.type === 'delivery' ? ` · Livraison · ${order.delivery.address || ''}` : ' · Retrait'}
                    {order.delivery?.time ? ` · ${order.delivery.time}` : ''}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-display text-lg text-gradient-gold whitespace-nowrap">
                    {(order.total || 0).toFixed(2)} €
                  </span>
                  <button onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)} className="text-[rgba(255,255,255,0.3)] hover:text-[var(--gold)] transition-colors">
                    <Eye size={16} />
                  </button>
                  <button onClick={() => deleteOrder(order.id)} className="text-[rgba(255,255,255,0.2)] hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>

                {selectedOrder?.id === order.id && (
                  <div className="w-full border-t border-[var(--noir-border)] pt-3 mt-2">
                    <div className="text-[10px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.3)] mb-2">Changer le statut</div>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map(s => (
                        <button
                          key={s.value}
                          onClick={() => updateStatus(order.id, s.value)}
                          className={`text-[10px] px-3 py-2.5 md:py-1.5 border transition-colors flex items-center gap-1.5 ${
                            order.status === s.value
                              ? 'border-[var(--gold)] text-[var(--gold)]'
                              : 'border-[rgba(200,169,126,0.1)] text-[rgba(255,255,255,0.3)] hover:text-white'
                          }`}
                        >
                          <s.icon size={10} />
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {order.note && (
                      <div className="mt-3 text-xs text-[rgba(255,255,255,0.2)] border-t border-[var(--noir-border)] pt-2">
                        Note : {order.note}
                      </div>
                    )}
                    {order.delivery?.email && (
                      <div className="mt-1 text-xs text-[rgba(255,255,255,0.2)]">
                        Email : {order.delivery.email} · Tél : {order.delivery.phone}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </AdminLayout>
  )
}
