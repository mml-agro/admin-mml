import React from 'react'
import { Bell, Check, Trash2, ShoppingCart, Package, Star, User, Settings } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'

const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
  order:  { icon: ShoppingCart, color: 'text-brand-400',   bg: 'bg-brand-500/10 border-brand-500/20' },
  stock:  { icon: Package,      color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20' },
  review: { icon: Star,         color: 'text-yellow-400',  bg: 'bg-yellow-500/10 border-yellow-500/20' },
  user:   { icon: User,         color: 'text-cyan-400',    bg: 'bg-cyan-500/10 border-cyan-500/20' },
  system: { icon: Settings,     color: 'text-slate-400',   bg: 'bg-slate-700/50 border-slate-600/30' },
}

const Notifications: React.FC = () => {
  const { notifications, setNotifications, markAllRead, unreadCount } = useAdmin()

  const markRead = (id: number) => setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteNotif = (id: number) => setNotifications(p => p.filter(n => n.id !== id))
  const clearAll = () => setNotifications([])

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">Notifications</h2>
          <p className="text-sm text-slate-500">{unreadCount} unread notifications</p>
        </div>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="btn-secondary"><Check size={15} />Mark all read</button>
          <button onClick={clearAll} className="btn-danger"><Trash2 size={15} />Clear all</button>
        </div>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(typeConfig).map(([type, config]) => {
          const count = notifications.filter(n => n.type === type).length
          return (
            <div key={type} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${config.bg}`}>
              <config.icon size={13} className={config.color} />
              <span className={`text-xs font-semibold capitalize ${config.color}`}>{type}</span>
              <span className="text-xs text-slate-500">({count})</span>
            </div>
          )
        })}
      </div>

      {notifications.length === 0 ? (
        <div className="card p-16 text-center">
          <Bell size={40} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 font-semibold">No notifications</p>
          <p className="text-slate-600 text-sm mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {notifications.map(n => {
            const cfg = typeConfig[n.type]
            return (
              <div key={n.id} className={`card p-4 flex items-start gap-4 transition-all ${!n.read ? 'border-brand-500/20 bg-brand-500/3' : ''}`}>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${cfg.bg}`}>
                  <cfg.icon size={17} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-relaxed ${n.read ? 'text-slate-400' : 'text-slate-200'}`}>{n.message}</p>
                  <p className="text-xs text-slate-600 mt-1">{n.time}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {!n.read && (
                    <button onClick={() => markRead(n.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-emerald-400 transition-colors" title="Mark as read">
                      <Check size={13} />
                    </button>
                  )}
                  {!n.read && <div className="w-2 h-2 bg-brand-500 rounded-full" />}
                  <button onClick={() => deleteNotif(n.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default Notifications
