import { useState, useEffect } from 'react'
import Head from 'next/head'
import AdminLayout from '../../components/AdminLayout'
import { ShoppingBag, Euro, Clock, TrendingUp, CheckCircle, XCircle, Truck } from 'lucide-react'

export default function DashboardPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const paidOrders = orders.filter(o => o.status === 'paid').length
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length

  const stats = [
    { label: 'Commandes', value: orders.length, icon: ShoppingBag, color: 'text-[var(--gold)]' },
    { label: 'Chiffre d\'affaires', value: `${totalRevenue.toFixed(2)} €`, icon: Euro, color: 'text-green-400' },
    { label: 'En attente', value: pendingOrders, icon: Clock, color: 'text-yellow-400' },
    { label: 'Livrées', value: deliveredOrders, icon: Truck, color: 'text-blue-400' },
  ]

  const statusLabel = {
    pending: { text: 'En attente', color: 'bg-yellow-400/10 text-yellow-400', icon: Clock },
    paid: { text: 'Payée', color: 'bg-green-400/10 text-green-400', icon: CheckCircle },
    delivered: { text: 'Livrée', color: 'bg-blue-400/10 text-blue-400', icon: Truck },
    canceled: { text: 'Annulée', color: 'bg-red-400/10 text-red-400', icon: XCircle },
  }

  const recentOrders = [...orders].reverse().slice(0, 10)

  return (
    <AdminLayout title="Dashboard">
      <h1 className="font-display text-2xl text-white mb-8">Dashboard</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(stat => (
          <div key={stat.label} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[rgba(255,255,255,0.35)] text-[10px] tracking-[0.2em] uppercase">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <span className="font-display text-2xl text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <h2 className="font-display text-lg text-white mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-[var(--gold)]" /> Commandes récentes
      </h2>

      {loading ? (
        <div className="glass-card p-10 text-center">
          <div className="w-6 h-6 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : recentOrders.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <p className="text-[rgba(255,255,255,0.3)] text-sm">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {recentOrders.map(order => {
            const status = statusLabel[order.status] || statusLabel.pending
            return (
              <div key={order.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white text-sm font-medium truncate">{order.delivery?.name || 'Client'}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${status.color}`}>{status.text}</span>
                  </div>
                  <div className="text-[rgba(255,255,255,0.3)] text-xs">
                    {order.items?.length || 0} article{(order.items?.length || 0) > 1 ? 's' : ''} · {order.paymentMethod} · {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="font-display text-lg text-gradient-gold whitespace-nowrap">
                  {(order.total || 0).toFixed(2)} €
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AdminLayout>
  )
}
