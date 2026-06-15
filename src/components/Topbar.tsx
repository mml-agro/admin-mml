import React, { useState } from 'react'
import { Menu, Bell, Search, X, Sun, Moon } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useLocation } from 'react-router-dom'

const pageTitles: Record<string,string> = {
  '/':'Dashboard','/orders':'Orders','/products':'Products','/customers':'Customers',
  '/reviews':'Reviews','/coupons':'Coupons','/promotions':'Promotions',
  '/analytics':'Analytics','/notifications':'Notifications','/settings':'Settings',
}

const Topbar: React.FC = () => {
  const { setSidebarOpen, sidebarOpen, notifications, unreadCount, markAllRead } = useAdmin()
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Admin'

  const typeIcon: Record<string,string> = { order:'🛒', stock:'📦', review:'⭐', user:'👤', system:'⚙️' }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 py-3 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-lg font-bold text-white leading-tight">{title}</h1>
          <p className="text-xs text-slate-500 hidden sm:block">MML Agro Foods Admin Panel</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-2 border border-slate-700 animate-fade-in">
            <Search size={15} className="text-slate-400"/>
            <input
              autoFocus
              value={searchQ}
              onChange={e=>setSearchQ(e.target.value)}
              placeholder="Search orders, products..."
              className="bg-transparent text-slate-200 text-sm outline-none w-40 md:w-56 placeholder-slate-500"
            />
            <button onClick={()=>{setSearchOpen(false);setSearchQ('')}}><X size={14} className="text-slate-400 hover:text-slate-200"/></button>
          </div>
        ) : (
          <button onClick={()=>setSearchOpen(true)} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
            <Search size={18}/>
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={()=>setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Bell size={18}/>
            {unreadCount>0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl shadow-black/40 z-50 overflow-hidden animate-slide-up">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white text-sm">Notifications</span>
                <button onClick={markAllRead} className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0,6).map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer ${!n.read?'bg-brand-500/5':''}`}>
                    <span className="text-lg mt-0.5 shrink-0">{typeIcon[n.type]}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-relaxed ${n.read?'text-slate-400':'text-slate-200'}`}>{n.message}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 bg-brand-500 rounded-full mt-1.5 shrink-0"/>}
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <button className="text-xs text-brand-400 hover:text-brand-300 transition-colors">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer">A</div>
      </div>
    </header>
  )
}
export default Topbar
