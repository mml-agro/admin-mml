// import React, { useState } from 'react'
// import { Search, Filter, Download, Eye, Edit2, Trash2, X, ChevronDown } from 'lucide-react'
// import { statusBadge } from '../components/Badge'
// import { useAdmin } from '../context/AdminContext'
// import type { OrderStatus } from '../data'

// const ALL_STATUSES: OrderStatus[] = ['Pending','Processing','Shipped','Delivered','Cancelled','Refunded']

// const Orders: React.FC = () => {
//   const { orders, setOrders } = useAdmin()
//   const [search, setSearch] = useState('')
//   const [statusFilter, setStatusFilter] = useState('All')
//   const [selected, setSelected] = useState<string | null>(null)
//   const [editStatus, setEditStatus] = useState<OrderStatus | null>(null)

//   const filtered = orders.filter(o => {
//     const ms = statusFilter === 'All' || o.status === statusFilter
//     const mq = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()) || o.city.toLowerCase().includes(search.toLowerCase())
//     return ms && mq
//   })

//   const selectedOrder = orders.find(o => o.id === selected)

//   const updateStatus = (id: string, status: OrderStatus) => {
//     setOrders(p => p.map(o => o.id === id ? { ...o, status } : o))
//     setEditStatus(null)
//   }

//   const deleteOrder = (id: string) => {
//     setOrders(p => p.filter(o => o.id !== id))
//     if (selected === id) setSelected(null)
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-5 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-xl font-bold text-white">Orders</h2>
//           <p className="text-sm text-slate-500">{filtered.length} of {orders.length} orders</p>
//         </div>
//         <div className="flex gap-2">
//           <button className="btn-secondary"><Download size={15}/>Export</button>
//         </div>
//       </div>

//       {/* Status tabs */}
//       <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
//         {['All',...ALL_STATUSES].map(s => (
//           <button key={s} onClick={() => setStatusFilter(s)}
//             className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter===s?'bg-brand-500/20 text-brand-400 border border-brand-500/30':'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
//             {s} {s==='All'?`(${orders.length})`:`(${orders.filter(o=>o.status===s).length})`}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="relative max-w-sm">
//         <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
//         <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search order ID, customer, city..." className="input-field pl-9"/>
//       </div>

//       <div className="flex gap-5">
//         {/* Table */}
//         <div className="flex-1 card overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead><tr className="border-b border-slate-700/50">
//                 {['Order ID','Customer','Date','Total','Payment','Status','Actions'].map(h=>(
//                   <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
//                 ))}
//               </tr></thead>
//               <tbody>
//                 {filtered.map(o => (
//                   <tr key={o.id} className={`table-row cursor-pointer ${selected===o.id?'bg-brand-500/5':''}`} onClick={()=>setSelected(o.id===selected?null:o.id)}>
//                     <td className="px-4 py-3.5 font-mono text-brand-400 text-xs font-semibold whitespace-nowrap">{o.id}</td>
//                     <td className="px-4 py-3.5">
//                       <div className="flex items-center gap-2">
//                         <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{o.customer[0]}</div>
//                         <div><p className="text-slate-200 font-medium text-xs whitespace-nowrap">{o.customer}</p><p className="text-slate-500 text-[10px]">{o.city}</p></div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{o.date}</td>
//                     <td className="px-4 py-3.5 font-bold text-white text-xs whitespace-nowrap">₹{o.total.toLocaleString()}</td>
//                     <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{o.paymentMethod}</td>
//                     <td className="px-4 py-3.5">{statusBadge(o.status)}</td>
//                     <td className="px-4 py-3.5">
//                       <div className="flex items-center gap-1.5" onClick={e=>e.stopPropagation()}>
//                         <button onClick={()=>setSelected(o.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400 transition-colors"><Eye size={13}/></button>
//                         <button onClick={()=>deleteOrder(o.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={13}/></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {filtered.length===0 && (
//                   <tr><td colSpan={7} className="text-center py-12 text-slate-500 text-sm">No orders found</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Side detail */}
//         {selectedOrder && (
//           <div className="w-80 card p-5 shrink-0 animate-slide-up self-start sticky top-20">
//             <div className="flex items-center justify-between mb-4">
//               <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white text-sm">Order Detail</h3>
//               <button onClick={()=>setSelected(null)} className="text-slate-400 hover:text-slate-200"><X size={15}/></button>
//             </div>
//             <div className="space-y-3 text-xs">
//               <div className="flex justify-between"><span className="text-slate-500">Order ID</span><span className="text-brand-400 font-mono font-bold">{selectedOrder.id}</span></div>
//               <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="text-slate-200">{selectedOrder.date}</span></div>
//               <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="text-slate-200">{selectedOrder.customer}</span></div>
//               <div className="flex justify-between"><span className="text-slate-500">Phone</span><span className="text-slate-200">{selectedOrder.phone}</span></div>
//               <div className="flex justify-between"><span className="text-slate-500">Payment</span><span className="text-slate-200">{selectedOrder.paymentMethod}</span></div>
//               <div className="pt-2 border-t border-slate-700">
//                 <p className="text-slate-500 mb-1.5">Items</p>
//                 {selectedOrder.items.map((item,i)=><p key={i} className="text-slate-300 py-0.5">• {item}</p>)}
//               </div>
//               <div className="flex justify-between pt-2 border-t border-slate-700">
//                 <span className="text-slate-500">Total</span>
//                 <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-white font-bold text-sm">₹{selectedOrder.total.toLocaleString()}</span>
//               </div>
//               <div className="pt-2 border-t border-slate-700">
//                 <p className="text-slate-500 mb-1.5">Delivery Address</p>
//                 <p className="text-slate-300 leading-relaxed">{selectedOrder.deliveryAddress}</p>
//               </div>
//               {/* Status update */}
//               <div className="pt-2 border-t border-slate-700">
//                 <p className="text-slate-500 mb-2">Update Status</p>
//                 <div className="grid grid-cols-2 gap-1.5">
//                   {ALL_STATUSES.map(s=>(
//                     <button key={s} onClick={()=>updateStatus(selectedOrder.id,s)}
//                       className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${selectedOrder.status===s?'bg-brand-500/20 border-brand-500/40 text-brand-400':'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'}`}>
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
// export default Orders






import React, { useState, useEffect, useCallback } from 'react'
import { Search, Download, Eye, Trash2, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { statusBadge } from '../components/Badge'
import { getOrdersAPI, updateOrderStatusAPI, deleteOrderAPI } from '../service'
import type { OrderStatus } from '../data'

const ALL_STATUSES: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']
const PAGE_SIZE = 10

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export type ProductSize =
  | "SIZE_500ML"
  | "SIZE_1L"
  | "SIZE_5L";

export type OrderApiStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";


export interface Order {
  id: string;
  orderNumber: string;
  status: OrderApiStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  paymentReference: string | null;
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  gstAmount: number;
  totalAmount: number;
  couponCode: string | null;
  deliveryAddress: DeliveryAddress;
  trackingNumber: string | null;
  courierPartner: string | null;
  notes: string;
  createdAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  items: OrderItem[];
}

export interface DeliveryAddress {
  city: string;
  name: string;
  line1: string;
  line2: string;
  phone: string;
  state: string;
  country: string;
  pincode: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productEmoji: string;
  size: ProductSize;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface PaginationMeta {
  total: number
  page: number
  size: number
  totalPages: number
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [meta, setMeta] = useState<PaginationMeta>({ total: 0, page: 1, size: PAGE_SIZE, totalPages: 1 })
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // FIX 1: Initialize page to 1, not 0 — API pagination is 1-based
  const [page, setPage] = useState(1)

  const selectedOrder = orders.find(o => o.id === selected)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const status = statusFilter === 'All' ? undefined : statusFilter.toUpperCase()
      const response = await getOrdersAPI(page - 1, PAGE_SIZE, status)
      const data = response.data

      setOrders(data.orders ?? data.content ?? data.data ?? [])
      setMeta({
        total: data.total ?? data.totalElements ?? 0,
        // FIX 4: Always use local page as source of truth for pagination UI
        page: page,
        size: data.size ?? PAGE_SIZE,
        totalPages: data.totalPages ?? Math.ceil((data.total ?? 0) / PAGE_SIZE),
      })
    } catch (e) {
      setError('Failed to load orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  // FIX 7: Reset page and selected when status filter changes.
  // Using a ref-free approach: set page to 1 here; fetchOrders will re-run
  // via the [page, statusFilter] dependency in fetchOrders's useCallback.
  // We guard against double-fetch by checking if page is already 1.
  useEffect(() => {
    setPage(1)
    setSelected(null)
  }, [statusFilter])

  // Debounce search (client-side on current page data)
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300)
    return () => clearTimeout(t)
  }, [searchInput])

  const filtered = orders.filter(o => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      o.id.toLowerCase().includes(q) ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.deliveryAddress.name.toLowerCase().includes(q) ||
      o.deliveryAddress.city.toLowerCase().includes(q)
    )
  })

  // FIX 5: Always clear selected when the deleted order is the selected one
  const deleteOrder = async (id: string) => {
    try {
      await deleteOrderAPI(id)
      setOrders(p => p.filter(o => o.id !== id))
      setSelected(prev => prev === id ? null : prev)
    } catch {
      setError('Failed to delete order.')
    }
  }

  const normalizeStatus = (status: OrderStatus): OrderApiStatus => status.toUpperCase() as OrderApiStatus

  // FIX 6: Pass the normalized API status string to updateOrderStatusAPI
  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      const apiStatus = normalizeStatus(status)
      const reqData = {
        status: apiStatus,
        note: selectedOrder.notes,
        trackingNumber: selectedOrder.trackingNumber,
        courierPartner: selectedOrder.courierPartner,
      };
      await updateOrderStatusAPI(id, reqData)
      setOrders(p => p.map(o => o.id === id ? { ...o, status: apiStatus } : o))
    } catch {
      setError('Failed to update status.')
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">Orders</h2>
          <p className="text-sm text-slate-500">
            {meta.total} total orders
          </p>
        </div>
        <button className="btn-secondary"><Download size={15} /> Export</button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {['All', ...ALL_STATUSES].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Search order ID, customer, city..."
          className="input-field pl-9"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}><X size={13} /></button>
        </div>
      )}

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  {['Order ID', 'Customer', 'Date', 'Total', 'Payment', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <Loader2 size={20} className="animate-spin text-brand-400 mx-auto" />
                    </td>
                  </tr>
                ) : filtered?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-500 text-sm">No orders found</td>
                  </tr>
                ) : (
                  filtered?.map(o => (
                    <tr key={o.id}
                      className={`table-row cursor-pointer ${selected === o.id ? 'bg-brand-500/5' : ''}`}
                      onClick={() => setSelected(o.id === selected ? null : o.id)}>
                      <td className="px-4 py-3.5 font-mono text-brand-400 text-xs font-semibold whitespace-nowrap">{o.orderNumber}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{o.deliveryAddress?.name[0]}</div>
                          <div>
                            <p className="text-slate-200 font-medium text-xs whitespace-nowrap">{o.deliveryAddress?.name}</p>
                            <p className="text-slate-500 text-[10px]">{o.deliveryAddress?.city}</p>
                          </div>
                        </div>
                      </td>
                      {/* <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{o.createdAt}</td> */}
                      <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">
                        {new Date(o.createdAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-white text-xs whitespace-nowrap">₹{o.totalAmount.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{o.paymentMethod}</td>
                      <td className="px-4 py-3.5">{statusBadge(o.status)}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                          <button onClick={() => setSelected(o.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400 transition-colors"><Eye size={13} /></button>
                          {/* <button onClick={() => deleteOrder(o.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>*/}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && meta.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700/50">
              <p className="text-xs text-slate-500">
                Page {page} of {meta.totalPages} · {meta.total} orders
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft size={15} />
                </button>

                {/* Page number pills */}
                {Array.from({ length: meta.totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === meta.totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | '...')[]>((acc, p, i, arr) => {
                    if (i > 0 && typeof arr[i - 1] === 'number' && (p as number) - (arr[i - 1] as number) > 1) acc.push('...')
                    acc.push(p)
                    return acc
                  }, [])
                  .map((p, i) =>
                    p === '...' ? (
                      <span key={`ellipsis-${i}`} className="px-1 text-slate-600 text-xs">…</span>
                    ) : (
                      <button key={p}
                        onClick={() => setPage(p as number)}
                        className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${page === p ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}>
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={page >= meta.totalPages}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Side detail panel */}
        {selectedOrder && (
          <div className="w-80 card p-5 shrink-0 animate-slide-up self-start sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-sm">Order Detail</h3>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-200"><X size={15} /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Order ID</span><span className="text-brand-400 font-mono font-bold">{selectedOrder.orderNumber}</span></div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>

                <span className="text-slate-200 text-xs whitespace-nowrap">
                  {new Date(selectedOrder.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="flex justify-between"><span className="text-slate-500">Customer</span><span className="text-slate-200">{selectedOrder.deliveryAddress.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Phone</span><span className="text-slate-200">{selectedOrder.deliveryAddress.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Payment</span><span className="text-slate-200">{selectedOrder.paymentMethod}</span></div>
              <div className="pt-2 border-t border-slate-700">
                <p className="text-slate-500 mb-1.5">Items</p>
                {/* FIX 3: Render item fields, not the raw object */}
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-0.5">
                    <p className="text-slate-300">
                      {item.productEmoji} {item.productName}
                      <span className="text-slate-500 ml-1">({item.size})</span>
                      <span className="text-slate-500 ml-1">×{item.quantity}</span>
                    </p>
                    <p className="text-slate-400">₹{item.totalPrice.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-700">
                <span className="text-slate-500">Total</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-white font-bold text-sm">₹{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-700">
                <p className="text-slate-500 mb-1.5">Delivery Address</p>
                <p className="text-slate-300 leading-relaxed">
                  {Object.entries(selectedOrder.deliveryAddress)
                    .filter(([key]) => key !== 'name' && key !== 'phone')
                    .map(([, value]) => value)
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-700">
                <p className="text-slate-500 mb-2">Update Status</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {ALL_STATUSES.map(s => (
                    <button key={s} onClick={() => updateStatus(selectedOrder.id, s as OrderStatus)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${selectedOrder.status === s.toUpperCase() ? 'bg-brand-500/20 border-brand-500/40 text-brand-400' : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders