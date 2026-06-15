import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingCart, Package, Users, Star, Tag, BarChart3, Bell, Settings, ChevronLeft, ChevronRight, LogOut, Megaphone } from 'lucide-react'
import { useAdmin } from '../context/AdminContext'
import { useAuth } from '../context/AuthProvider'

const navItems = [
  {
    group: 'Main', items: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/orders', icon: ShoppingCart, label: 'Orders', badge: 'orders' },
      { to: '/products', icon: Package, label: 'Products' },
      { to: '/customers', icon: Users, label: 'Customers' },
    ]
  },
  {
    group: 'Marketing', items: [
      { to: '/reviews', icon: Star, label: 'Reviews', badge: 'reviews' },
      { to: '/coupons', icon: Tag, label: 'Coupons' },
      // { to: '/promotions', icon: Megaphone, label: 'Promotions' },
    ]
  },
  // { group: 'Reports', items: [
  //   { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  //   { to: '/notifications', icon: Bell, label: 'Notifications', badge: 'notifs' },
  // ]},
  // { group: 'System', items: [
  //   { to: '/settings', icon: Settings, label: 'Settings' },
  // ]},
]

const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, orders, reviews, unreadCount } = useAdmin();
  const { logout } = useAuth();
  const location = useLocation();

  const getBadgeCount = (badge?: string) => {
    if (badge === 'orders') return orders.filter(o => o.status === 'PENDING').length
    if (badge === 'reviews') return reviews.filter(r => r.status === 'PENDING').length
    if (badge === 'notifs') return unreadCount
    return 0
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-16'}
        bg-slate-900 border-r border-slate-800/80
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-800 ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/20">
            <span className="text-lg">🌻</span>
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-sm truncate">MML Agro</div>
              <div className="text-xs text-brand-400 truncate">Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
          {navItems.map(group => (
            <div key={group.group}>
              {sidebarOpen && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-1.5">{group.group}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = location.pathname === item.to
                  const count = getBadgeCount(item.badge)
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`sidebar-link ${sidebarOpen ? '' : 'justify-center px-0'} ${active
                          ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`}
                      title={!sidebarOpen ? item.label : ''}
                    >
                      <item.icon size={18} className={active ? 'text-brand-400' : ''} />
                      {sidebarOpen && (
                        <>
                          <span className="flex-1 text-sm">{item.label}</span>
                          {count > 0 && (
                            <span className="bg-brand-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                              {count}
                            </span>
                          )}
                        </>
                      )}
                      {!sidebarOpen && count > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Admin profile */}
        <div className={`p-3 border-t border-slate-800 ${!sidebarOpen && 'flex justify-center'}`}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-800/60 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold shrink-0">A</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-200 truncate">Admin User</div>
                <div className="text-xs text-slate-500 truncate">admin@mml.com</div>
              </div>
              <LogOut size={15} className="text-slate-500 hover:text-red-400 transition-colors" onClick={logout}/>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer">A</div>
          )}
        </div>

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition-all shadow-lg"
        >
          {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        </button>
      </aside>
    </>
  )
}
export default Sidebar
