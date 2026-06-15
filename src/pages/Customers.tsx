// import React, { useState } from 'react'
// import { Search, Eye, Mail, Phone, Trash2, X } from 'lucide-react'
// import { statusBadge } from '../components/Badge'
// import { useAdmin } from '../context/AdminContext'

// const Customers: React.FC = () => {
//   const { customers, setCustomers } = useAdmin()
//   const [search, setSearch] = useState('')
//   const [roleFilter, setRoleFilter] = useState('All')
//   const [selected, setSelected] = useState<number | null>(null)

//   const filtered = customers.filter(c => {
//     const mr = roleFilter==='All' || c.role===roleFilter
//     const ms = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase())
//     return mr && ms
//   })

//   const selectedCust = customers.find(c => c.id === selected)
//   const cOrders = ['#MML10234','#MML10230','#MML10224']

//   const getAvatarColor = (name: string) => {
//     const colors = ['from-brand-500 to-brand-700','from-amber-500 to-amber-700','from-cyan-500 to-cyan-700','from-emerald-500 to-emerald-700','from-blue-500 to-blue-700']
//     return colors[name.charCodeAt(0) % colors.length]
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-5 animate-fade-in">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-xl font-bold text-white">Customers</h2>
//           <p className="text-sm text-slate-500">{filtered.length} of {customers.length} customers</p>
//         </div>
//       </div>

//       <div className="flex gap-2 flex-wrap">
//         {['All','Customer','Distributor','Wholesaler'].map(r=>(
//           <button key={r} onClick={()=>setRoleFilter(r)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${roleFilter===r?'bg-brand-500/20 text-brand-400 border border-brand-500/30':'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>{r}</button>
//         ))}
//       </div>

//       <div className="relative max-w-sm">
//         <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
//         <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, email, city..." className="input-field pl-9"/>
//       </div>

//       <div className="flex gap-5">
//         <div className="flex-1 card overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead><tr className="border-b border-slate-700/50">
//                 {['Customer','City','Role','Orders','Total Spent','Status','Actions'].map(h=>(
//                   <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
//                 ))}
//               </tr></thead>
//               <tbody>
//                 {filtered.map(c=>(
//                   <tr key={c.id} className={`table-row cursor-pointer ${selected===c.id?'bg-brand-500/5':''}`} onClick={()=>setSelected(c.id===selected?null:c.id)}>
//                     <td className="px-4 py-3.5">
//                       <div className="flex items-center gap-2.5">
//                         <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(c.name)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{c.avatar}</div>
//                         <div><p className="text-slate-200 font-medium text-xs whitespace-nowrap">{c.name}</p><p className="text-slate-500 text-[10px]">{c.email}</p></div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{c.city}</td>
//                     <td className="px-4 py-3.5">{statusBadge(c.role)}</td>
//                     <td className="px-4 py-3.5 text-slate-200 text-xs font-semibold">{c.orders}</td>
//                     <td className="px-4 py-3.5 text-white font-bold text-xs whitespace-nowrap">₹{c.totalSpent.toLocaleString()}</td>
//                     <td className="px-4 py-3.5">{statusBadge(c.status)}</td>
//                     <td className="px-4 py-3.5">
//                       <div className="flex items-center gap-1.5" onClick={e=>e.stopPropagation()}>
//                         <button onClick={()=>setSelected(c.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400"><Eye size={13}/></button>
//                         <a href={`mailto:${c.email}`} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-cyan-400"><Mail size={13}/></a>
//                         <button onClick={()=>setCustomers(p=>p.filter(x=>x.id!==c.id))} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400"><Trash2 size={13}/></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {filtered.length===0&&<tr><td colSpan={7} className="text-center py-12 text-slate-500 text-sm">No customers found</td></tr>}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {selectedCust && (
//           <div className="w-72 card p-5 shrink-0 animate-slide-up self-start sticky top-20">
//             <div className="flex items-center justify-between mb-4">
//               <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white text-sm">Customer Detail</h3>
//               <button onClick={()=>setSelected(null)}><X size={15} className="text-slate-400"/></button>
//             </div>
//             <div className="text-center mb-5">
//               <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarColor(selectedCust.name)} flex items-center justify-center text-white text-xl font-bold mx-auto mb-2`}>{selectedCust.avatar}</div>
//               <h4 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white">{selectedCust.name}</h4>
//               <p className="text-xs text-slate-400">{selectedCust.email}</p>
//               <div className="mt-2">{statusBadge(selectedCust.role)}</div>
//             </div>
//             <div className="space-y-2.5 text-xs mb-4">
//               <div className="flex justify-between"><span className="text-slate-500">Phone</span><span className="text-slate-200">{selectedCust.phone}</span></div>
//               <div className="flex justify-between"><span className="text-slate-500">City</span><span className="text-slate-200">{selectedCust.city}</span></div>
//               <div className="flex justify-between"><span className="text-slate-500">Joined</span><span className="text-slate-200">{selectedCust.joinDate}</span></div>
//               <div className="flex justify-between"><span className="text-slate-500">Status</span>{statusBadge(selectedCust.status)}</div>
//             </div>
//             <div className="grid grid-cols-2 gap-2 mb-4">
//               <div className="bg-slate-900/50 rounded-xl p-3 text-center">
//                 <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-lg font-bold text-brand-400">{selectedCust.orders}</p>
//                 <p className="text-[10px] text-slate-500">Orders</p>
//               </div>
//               <div className="bg-slate-900/50 rounded-xl p-3 text-center">
//                 <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-sm font-bold text-white">₹{(selectedCust.totalSpent/1000).toFixed(0)}k</p>
//                 <p className="text-[10px] text-slate-500">Spent</p>
//               </div>
//             </div>
//             <p className="text-xs text-slate-500 mb-2">Recent Orders</p>
//             {cOrders.map(o=><p key={o} className="text-xs text-brand-400 font-mono mb-1">{o}</p>)}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// export default Customers







import React, { useState, useEffect, useCallback } from 'react'
import { Search, Eye, Mail, Trash2, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { statusBadge } from '../components/Badge'
import { getUsersAPI } from '../service'

const PAGE_SIZE = 10

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: string
  emailVerified: boolean
  phoneVerified: boolean
  createdAt?: string
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pagination state
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)

  // Filters & selection
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)

  const fetchCustomers = useCallback(async (p: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await getUsersAPI(p, PAGE_SIZE)
      const data = res.data
      setCustomers(data.content ?? [])
      setTotalPages(data.totalPages ?? 1)
      setTotalElements(data.totalElements ?? 0)
    } catch {
      setError('Failed to load customers. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCustomers(page)
  }, [page, fetchCustomers])

  // Client-side filter on the current page
  const filtered = customers.filter(c => {
    const mr = roleFilter === 'All' || c.role === roleFilter
    const ms =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone ?? '').toLowerCase().includes(search.toLowerCase())
    return mr && ms
  })

  const selectedCust = customers.find(c => c.id === selected)

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-brand-500 to-brand-700',
      'from-amber-500 to-amber-700',
      'from-cyan-500 to-cyan-700',
      'from-emerald-500 to-emerald-700',
      'from-blue-500 to-blue-700',
    ]
    return colors[name.charCodeAt(0) % colors.length]
  }

  const getAvatar = (name: string) =>
    name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id))
    if (selected === id) setSelected(null)
  }

  const roles = ['All', 'CUSTOMER', 'DISTRIBUTOR', 'WHOLESALER', 'ADMIN', 'SUPER_ADMIN']

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            className="text-xl font-bold text-white"
          >
            Customers
          </h2>
          <p className="text-sm text-slate-500">
            {loading ? 'Loading…' : `${filtered.length} of ${totalElements} customers`}
          </p>
        </div>
      </div>

      {/* Role filter */}
      <div className="flex gap-2 flex-wrap">
        {roles.map(r => (
          <button
            key={r}
            onClick={() => { setRoleFilter(r); setSelected(null) }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              roleFilter === r
                ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, phone…"
          className="input-field pl-9"
        />
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 flex items-center justify-between">
          {error}
          <button onClick={() => fetchCustomers(page)} className="underline text-xs ml-4">
            Retry
          </button>
        </div>
      )}

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  {['Customer', 'Phone', 'Role', 'Email Verified', 'Status', 'Actions'].map(h => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <Loader2 size={22} className="animate-spin text-brand-400 mx-auto" />
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500 text-sm">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  filtered.map(c => (
                    <tr
                      key={c.id}
                      className={`table-row cursor-pointer ${selected === c.id ? 'bg-brand-500/5' : ''}`}
                      onClick={() => setSelected(c.id === selected ? null : c.id)}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(c.name)} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                          >
                            {getAvatar(c.name)}
                          </div>
                          <div>
                            <p className="text-slate-200 font-medium text-xs whitespace-nowrap">{c.name}</p>
                            <p className="text-slate-500 text-[10px]">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{c.phone}</td>
                      <td className="px-4 py-3.5">{statusBadge(c.role)}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`text-xs font-semibold ${c.emailVerified ? 'text-emerald-400' : 'text-slate-500'}`}
                        >
                          {c.emailVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">{statusBadge(c.status)}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => setSelected(c.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400"
                          >
                            <Eye size={13} />
                          </button>
                          <a
                            href={`mailto:${c.email}`}
                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-cyan-400"
                          >
                            <Mail size={13} />
                          </a>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700/50">
              <p className="text-xs text-slate-500">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={15} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i).map(i => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                      page === i
                        ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selectedCust && (
          <div className="w-72 card p-5 shrink-0 animate-slide-up self-start sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                className="font-bold text-white text-sm"
              >
                Customer Detail
              </h3>
              <button onClick={() => setSelected(null)}>
                <X size={15} className="text-slate-400" />
              </button>
            </div>
            <div className="text-center mb-5">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarColor(selectedCust.name)} flex items-center justify-center text-white text-xl font-bold mx-auto mb-2`}
              >
                {getAvatar(selectedCust.name)}
              </div>
              <h4
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                className="font-bold text-white"
              >
                {selectedCust.name}
              </h4>
              <p className="text-xs text-slate-400">{selectedCust.email}</p>
              <div className="mt-2">{statusBadge(selectedCust.role)}</div>
            </div>
            <div className="space-y-2.5 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Phone</span>
                <span className="text-slate-200">{selectedCust.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email Verified</span>
                <span className={selectedCust.emailVerified ? 'text-emerald-400' : 'text-slate-500'}>
                  {selectedCust.emailVerified ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone Verified</span>
                <span className={selectedCust.phoneVerified ? 'text-emerald-400' : 'text-slate-500'}>
                  {selectedCust.phoneVerified ? 'Yes' : 'No'}
                </span>
              </div>
              {selectedCust.createdAt && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Joined</span>
                  <span className="text-slate-200">
                    {new Date(selectedCust.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                {statusBadge(selectedCust.status)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Customers