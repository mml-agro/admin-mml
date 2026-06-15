// import React from 'react'
// import { ShoppingCart, Users, Package, DollarSign, TrendingUp, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react'
// import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
// import StatCard from '../components/StatCard'
// import { statusBadge } from '../components/Badge'
// import { useAdmin } from '../context/AdminContext'
// import { revenueChart, categoryRevenue, topProducts, weeklyOrders } from '../data'

// const Dashboard: React.FC = () => {
//   const { orders, products, customers } = useAdmin()
//   const totalRevenue = orders.filter(o=>o.status!=='Cancelled'&&o.status!=='Refunded').reduce((s,o)=>s+o.total,0)
//   const pendingOrders = orders.filter(o=>o.status==='Pending').length
//   const lowStock = products.filter(p=>p.status==='Low Stock'||p.status==='Out of Stock').length
//   const pendingReviews = 3

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload?.length) return (
//       <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
//         <p className="text-slate-400 mb-1">{label}</p>
//         {payload.map((p: any, i: number) => (
//           <p key={i} style={{color:p.color}} className="font-semibold">{p.name}: {p.name==='Revenue'?`₹${p.value.toLocaleString()}`:p.value}</p>
//         ))}
//       </div>
//     )
//     return null
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-6 animate-fade-in">
//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard title="Total Revenue" value={`₹${(totalRevenue/100000).toFixed(1)}L`} change="+12.4%" positive icon={DollarSign} color="brand" subtitle="This month"/>
//         <StatCard title="Total Orders" value={orders.length.toString()} change="+8.1%" positive icon={ShoppingCart} color="gold" subtitle={`${pendingOrders} pending`}/>
//         <StatCard title="Customers" value={customers.length.toString()} change="+5.3%" positive icon={Users} color="cyan" subtitle="Registered users"/>
//         <StatCard title="Products" value={products.length.toString()} change={lowStock>0?`${lowStock} alerts`:"+2"} positive={lowStock===0} icon={Package} color={lowStock>0?"red":"emerald"} subtitle={`${lowStock} low/out of stock`}/>
//       </div>

//       {/* Alerts */}
//       {(pendingOrders > 0 || lowStock > 0) && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//           {pendingOrders > 0 && (
//             <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
//               <Clock size={16} className="text-amber-400 shrink-0"/>
//               <p className="text-amber-300 text-sm"><span className="font-bold">{pendingOrders} orders</span> awaiting processing</p>
//             </div>
//           )}
//           {lowStock > 0 && (
//             <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
//               <AlertTriangle size={16} className="text-red-400 shrink-0"/>
//               <p className="text-red-300 text-sm"><span className="font-bold">{lowStock} products</span> need restocking</p>
//             </div>
//           )}
//           {pendingReviews > 0 && (
//             <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
//               <CheckCircle2 size={16} className="text-blue-400 shrink-0"/>
//               <p className="text-blue-300 text-sm"><span className="font-bold">{pendingReviews} reviews</span> pending approval</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Charts row 1 */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Revenue chart */}
//         <div className="lg:col-span-2 card p-5">
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white">Revenue Overview</h3>
//               <p className="text-xs text-slate-500 mt-0.5">Monthly revenue vs target</p>
//             </div>
//             <div className="flex items-center gap-4 text-xs">
//               <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block"/>Revenue</span>
//               <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"/>Target</span>
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={200}>
//             <AreaChart data={revenueChart}>
//               <defs>
//                 <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
//                   <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
//               <XAxis dataKey="month" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
//               <YAxis tick={{fill:'#64748b',fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v/1000}k`}/>
//               <Tooltip content={<CustomTooltip/>}/>
//               <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#d946ef" strokeWidth={2} fill="url(#revGrad)"/>
//               <Area type="monotone" dataKey="target" name="Target" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" fill="none"/>
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Category donut */}
//         <div className="card p-5">
//           <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white mb-1">Revenue by Category</h3>
//           <p className="text-xs text-slate-500 mb-4">Product category share</p>
//           <div className="flex justify-center">
//             <PieChart width={160} height={160}>
//               <Pie data={categoryRevenue} cx={75} cy={75} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
//                 {categoryRevenue.map((entry,i)=><Cell key={i} fill={entry.color}/>)}
//               </Pie>
//               <Tooltip formatter={(v)=>`${v}%`} contentStyle={{background:'#1e293b',border:'1px solid #334155',borderRadius:'12px',fontSize:'12px'}}/>
//             </PieChart>
//           </div>
//           <div className="space-y-2 mt-2">
//             {categoryRevenue.map((c,i)=>(
//               <div key={i} className="flex items-center justify-between text-xs">
//                 <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{background:c.color}}/><span className="text-slate-400">{c.name}</span></div>
//                 <span className="font-semibold text-slate-200">{c.value}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Charts row 2 */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Weekly orders bar */}
//         <div className="card p-5">
//           <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white mb-1">Weekly Orders</h3>
//           <p className="text-xs text-slate-500 mb-4">This week's order volume</p>
//           <ResponsiveContainer width="100%" height={150}>
//             <BarChart data={weeklyOrders} barSize={20}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
//               <XAxis dataKey="day" tick={{fill:'#64748b',fontSize:10}} axisLine={false} tickLine={false}/>
//               <YAxis tick={{fill:'#64748b',fontSize:10}} axisLine={false} tickLine={false}/>
//               <Tooltip content={<CustomTooltip/>}/>
//               <Bar dataKey="orders" name="Orders" fill="#d946ef" radius={[4,4,0,0]}/>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Top products */}
//         <div className="lg:col-span-2 card p-5">
//           <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white mb-1">Top Products</h3>
//           <p className="text-xs text-slate-500 mb-4">Best performing products by revenue</p>
//           <div className="space-y-3">
//             {topProducts.map((p,i)=>(
//               <div key={i} className="flex items-center gap-4">
//                 <span className="text-slate-500 text-xs font-bold w-5 text-center">{i+1}</span>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-slate-200 font-medium truncate">{p.name}</p>
//                   <div className="flex items-center gap-3 mt-1">
//                     <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full" style={{width:`${(p.revenue/600000)*100}%`}}/>
//                     </div>
//                     <span className="text-xs text-slate-400 shrink-0">{p.sold.toLocaleString()} sold</span>
//                   </div>
//                 </div>
//                 <div className="text-right shrink-0">
//                   <p className="text-sm font-bold text-white">₹{(p.revenue/1000).toFixed(0)}k</p>
//                   <p className={`text-xs font-semibold ${p.trend.startsWith('+')?'text-emerald-400':'text-red-400'}`}>{p.trend}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent orders */}
//       <div className="card">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
//           <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white">Recent Orders</h3>
//           <a href="/orders" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">View all →</a>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead><tr className="border-b border-slate-700/50">
//               {['Order ID','Customer','Date','Items','Total','Status'].map(h=><th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>)}
//             </tr></thead>
//             <tbody>
//               {orders.slice(0,6).map(o=>(
//                 <tr key={o.id} className="table-row">
//                   <td className="px-5 py-3.5 font-mono text-brand-400 text-xs font-semibold">{o.id}</td>
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{o.customer[0]}</div>
//                       <div><p className="text-slate-200 font-medium text-xs">{o.customer}</p><p className="text-slate-500 text-[10px]">{o.city}</p></div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5 text-slate-400 text-xs">{o.date}</td>
//                   <td className="px-5 py-3.5 text-slate-400 text-xs">{o.items.length} item{o.items.length>1?'s':''}</td>
//                   <td className="px-5 py-3.5 font-bold text-white text-xs">₹{o.total.toLocaleString()}</td>
//                   <td className="px-5 py-3.5">{statusBadge(o.status)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default Dashboard









// import React, { useState, useEffect } from 'react'
// import { ShoppingCart, Users, Package, DollarSign, TrendingUp, Clock, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
// import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
// import StatCard from '../components/StatCard'
// import { statusBadge } from '../components/Badge'
// import { revenueChart, categoryRevenue, topProducts, weeklyOrders } from '../data'
// import { getDashboardAPI } from '../service'

// interface DashboardStats {
//   totalRevenue: number
//   todayRevenue: number
//   weekRevenue: number
//   totalOrders: number
//   todayOrders: number
//   pendingOrders: number
//   totalCustomers: number
//   newCustomersToday: number
//   totalProducts: number
//   lowStockProducts: number
//   outOfStockProducts: number
//   pendingReviews: number
//   unreadNotifications: number
// }

// const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<DashboardStats | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const fetchDashboard = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const res = await getDashboardAPI()
//       setStats(res.data)
//     } catch {
//       setError('Failed to load dashboard. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload?.length) return (
//       <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
//         <p className="text-slate-400 mb-1">{label}</p>
//         {payload.map((p: any, i: number) => (
//           <p key={i} style={{ color: p.color }} className="font-semibold">
//             {p.name}: {p.name === 'Revenue' ? `₹${p.value.toLocaleString()}` : p.value}
//           </p>
//         ))}
//       </div>
//     )
//     return null
//   }

//   // Derived values
//   const lowStock = (stats?.lowStockProducts ?? 0) + (stats?.outOfStockProducts ?? 0)
//   const pendingOrders = stats?.pendingOrders ?? 0
//   const pendingReviews = stats?.pendingReviews ?? 0

//   if (loading) return (
//     <div className="flex items-center justify-center h-96">
//       <Loader2 size={28} className="animate-spin text-brand-400" />
//     </div>
//   )

//   if (error) return (
//     <div className="flex flex-col items-center justify-center h-96 gap-4">
//       <p className="text-red-400 text-sm">{error}</p>
//       <button
//         onClick={fetchDashboard}
//         className="px-4 py-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 text-sm hover:bg-brand-500/30 transition-all"
//       >
//         Retry
//       </button>
//     </div>
//   )

//   return (
//     <div className="p-4 md:p-6 space-y-6 animate-fade-in">

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           title="Total Revenue"
//           value={`₹${stats!.totalRevenue.toLocaleString()}`}
//           change={`₹${stats!.weekRevenue.toLocaleString()} this week`}
//           positive
//           icon={DollarSign}
//           color="brand"
//           subtitle={`₹${stats!.todayRevenue.toLocaleString()} today`}
//         />
//         <StatCard
//           title="Total Orders"
//           value={stats!.totalOrders.toString()}
//           change={`${stats!.todayOrders} today`}
//           positive
//           icon={ShoppingCart}
//           color="gold"
//           subtitle={`${pendingOrders} pending`}
//         />
//         <StatCard
//           title="Customers"
//           value={stats!.totalCustomers.toString()}
//           change={`+${stats!.newCustomersToday} today`}
//           positive
//           icon={Users}
//           color="cyan"
//           subtitle="Registered users"
//         />
//         <StatCard
//           title="Products"
//           value={stats!.totalProducts.toString()}
//           change={lowStock > 0 ? `${lowStock} alerts` : 'All stocked'}
//           positive={lowStock === 0}
//           icon={Package}
//           color={lowStock > 0 ? 'red' : 'emerald'}
//           subtitle={`${stats!.outOfStockProducts} out · ${stats!.lowStockProducts} low`}
//         />
//       </div>

//       {/* Alerts */}
//       {(pendingOrders > 0 || lowStock > 0 || pendingReviews > 0) && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//           {pendingOrders > 0 && (
//             <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
//               <Clock size={16} className="text-amber-400 shrink-0" />
//               <p className="text-amber-300 text-sm">
//                 <span className="font-bold">{pendingOrders} orders</span> awaiting processing
//               </p>
//             </div>
//           )}
//           {lowStock > 0 && (
//             <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
//               <AlertTriangle size={16} className="text-red-400 shrink-0" />
//               <p className="text-red-300 text-sm">
//                 <span className="font-bold">{lowStock} products</span> need restocking
//               </p>
//             </div>
//           )}
//           {pendingReviews > 0 && (
//             <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
//               <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
//               <p className="text-blue-300 text-sm">
//                 <span className="font-bold">{pendingReviews} reviews</span> pending approval
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Charts row 1 */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Revenue chart */}
//         <div className="lg:col-span-2 card p-5">
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white">Revenue Overview</h3>
//               <p className="text-xs text-slate-500 mt-0.5">Monthly revenue vs target</p>
//             </div>
//             <div className="flex items-center gap-4 text-xs">
//               <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" />Revenue</span>
//               <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />Target</span>
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={200}>
//             <AreaChart data={revenueChart}>
//               <defs>
//                 <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//               <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
//               <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
//               <Tooltip content={<CustomTooltip />} />
//               <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#d946ef" strokeWidth={2} fill="url(#revGrad)" />
//               <Area type="monotone" dataKey="target" name="Target" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Category donut */}
//         <div className="card p-5">
//           <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Revenue by Category</h3>
//           <p className="text-xs text-slate-500 mb-4">Product category share</p>
//           <div className="flex justify-center">
//             <PieChart width={160} height={160}>
//               <Pie data={categoryRevenue} cx={75} cy={75} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
//                 {categoryRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
//               </Pie>
//               <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }} />
//             </PieChart>
//           </div>
//           <div className="space-y-2 mt-2">
//             {categoryRevenue.map((c, i) => (
//               <div key={i} className="flex items-center justify-between text-xs">
//                 <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} /><span className="text-slate-400">{c.name}</span></div>
//                 <span className="font-semibold text-slate-200">{c.value}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Charts row 2 */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Weekly orders bar */}
//         <div className="card p-5">
//           <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Weekly Orders</h3>
//           <p className="text-xs text-slate-500 mb-4">This week's order volume</p>
//           <ResponsiveContainer width="100%" height={150}>
//             <BarChart data={weeklyOrders} barSize={20}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
//               <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
//               <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
//               <Tooltip content={<CustomTooltip />} />
//               <Bar dataKey="orders" name="Orders" fill="#d946ef" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Top products */}
//         <div className="lg:col-span-2 card p-5">
//           <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Top Products</h3>
//           <p className="text-xs text-slate-500 mb-4">Best performing products by revenue</p>
//           <div className="space-y-3">
//             {topProducts.map((p, i) => (
//               <div key={i} className="flex items-center gap-4">
//                 <span className="text-slate-500 text-xs font-bold w-5 text-center">{i + 1}</span>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-slate-200 font-medium truncate">{p.name}</p>
//                   <div className="flex items-center gap-3 mt-1">
//                     <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
//                       <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full" style={{ width: `${(p.revenue / 600000) * 100}%` }} />
//                     </div>
//                     <span className="text-xs text-slate-400 shrink-0">{p.sold.toLocaleString()} sold</span>
//                   </div>
//                 </div>
//                 <div className="text-right shrink-0">
//                   <p className="text-sm font-bold text-white">₹{(p.revenue / 1000).toFixed(0)}k</p>
//                   <p className={`text-xs font-semibold ${p.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{p.trend}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stock breakdown */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="card p-5 flex items-center gap-4">
//           <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
//             <Package size={18} className="text-emerald-400" />
//           </div>
//           <div>
//             <p className="text-xs text-slate-500">In Stock Products</p>
//             <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">
//               {stats!.totalProducts - stats!.lowStockProducts - stats!.outOfStockProducts}
//             </p>
//           </div>
//         </div>
//         <div className="card p-5 flex items-center gap-4">
//           <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
//             <AlertTriangle size={18} className="text-amber-400" />
//           </div>
//           <div>
//             <p className="text-xs text-slate-500">Low Stock</p>
//             <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">
//               {stats!.lowStockProducts}
//             </p>
//           </div>
//         </div>
//         <div className="card p-5 flex items-center gap-4">
//           <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
//             <TrendingUp size={18} className="text-red-400" />
//           </div>
//           <div>
//             <p className="text-xs text-slate-500">Out of Stock</p>
//             <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">
//               {stats!.outOfStockProducts}
//             </p>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Dashboard




import React, { useState, useEffect } from 'react'
import { ShoppingCart, Users, Package, DollarSign, TrendingUp, Clock, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StatCard from '../components/StatCard'
import { getDashboardAPI } from '../service'

interface RevenueChartPoint { month: string; revenue: number; target: number }
interface CategoryRevenue { name: string; value: number; color: string }
interface WeeklyOrderPoint { day: string; orders: number }
interface TopProduct { name: string; revenue: number; sold: number; trend: string }

interface DashboardStats {
  totalRevenue: number
  todayRevenue: number
  weekRevenue: number
  totalOrders: number
  todayOrders: number
  pendingOrders: number
  totalCustomers: number
  newCustomersToday: number
  totalProducts: number
  lowStockProducts: number
  outOfStockProducts: number
  pendingReviews: number
  unreadNotifications: number
  revenueChart: RevenueChartPoint[]
  categoryRevenue: CategoryRevenue[]
  weeklyOrders: WeeklyOrderPoint[]
  topProducts: TopProduct[]
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getDashboardAPI()
      setStats(res.data)
    } catch {
      setError('Failed to load dashboard. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
        <p className="text-slate-400 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.name === 'Revenue' ? `₹${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    )
    return null
  }

  const lowStock = (stats?.lowStockProducts ?? 0) + (stats?.outOfStockProducts ?? 0)
  const pendingOrders = stats?.pendingOrders ?? 0
  const pendingReviews = stats?.pendingReviews ?? 0

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <Loader2 size={28} className="animate-spin text-brand-400" />
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <p className="text-red-400 text-sm">{error}</p>
      <button
        onClick={fetchDashboard}
        className="px-4 py-2 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 text-sm hover:bg-brand-500/30 transition-all"
      >
        Retry
      </button>
    </div>
  )

  const revenueChart = stats!.revenueChart ?? []
  const categoryRevenue = stats!.categoryRevenue ?? []
  const weeklyOrders = stats!.weeklyOrders ?? []
  const topProducts = stats!.topProducts ?? []
  const maxTopRevenue = Math.max(...topProducts.map(p => p.revenue), 1)

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`₹${stats!.totalRevenue.toLocaleString()}`}
          change={`₹${stats!.weekRevenue.toLocaleString()} this week`}
          positive
          icon={DollarSign}
          color="brand"
          subtitle={`₹${stats!.todayRevenue.toLocaleString()} today`}
        />
        <StatCard
          title="Total Orders"
          value={stats!.totalOrders.toString()}
          change={`${stats!.todayOrders} today`}
          positive
          icon={ShoppingCart}
          color="gold"
          subtitle={`${pendingOrders} pending`}
        />
        <StatCard
          title="Customers"
          value={stats!.totalCustomers.toString()}
          change={`+${stats!.newCustomersToday} today`}
          positive
          icon={Users}
          color="cyan"
          subtitle="Registered users"
        />
        <StatCard
          title="Products"
          value={stats!.totalProducts.toString()}
          change={lowStock > 0 ? `${lowStock} alerts` : 'All stocked'}
          positive={lowStock === 0}
          icon={Package}
          color={lowStock > 0 ? 'red' : 'emerald'}
          subtitle={`${stats!.outOfStockProducts} out · ${stats!.lowStockProducts} low`}
        />
      </div>

      {/* Alerts */}
      {(pendingOrders > 0 || lowStock > 0 || pendingReviews > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pendingOrders > 0 && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Clock size={16} className="text-amber-400 shrink-0" />
              <p className="text-amber-300 text-sm">
                <span className="font-bold">{pendingOrders} orders</span> awaiting processing
              </p>
            </div>
          )}
          {lowStock > 0 && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle size={16} className="text-red-400 shrink-0" />
              <p className="text-red-300 text-sm">
                <span className="font-bold">{lowStock} products</span> need restocking
              </p>
            </div>
          )}
          {pendingReviews > 0 && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
              <p className="text-blue-300 text-sm">
                <span className="font-bold">{pendingReviews} reviews</span> pending approval
              </p>
            </div>
          )}
        </div>
      )}

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white">Revenue Overview</h3>
              <p className="text-xs text-slate-500 mt-0.5">Monthly revenue vs target</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" />Revenue</span>
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />Target</span>
            </div>
          </div>
          {revenueChart.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-sm text-slate-500">No revenue data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueChart}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#d946ef" strokeWidth={2} fill="url(#revGrad)" />
                <Area type="monotone" dataKey="target" name="Target" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category donut */}
        <div className="card p-5">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Revenue by Category</h3>
          <p className="text-xs text-slate-500 mb-4">Product category share</p>
          {categoryRevenue.length === 0 ? (
            <div className="h-[160px] flex items-center justify-center text-sm text-slate-500">No category data yet</div>
          ) : (
            <>
              <div className="flex justify-center">
                <PieChart width={160} height={160}>
                  <Pie data={categoryRevenue} cx={75} cy={75} innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {categoryRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }} />
                </PieChart>
              </div>
              <div className="space-y-2 mt-2">
                {categoryRevenue.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} /><span className="text-slate-400">{c.name}</span></div>
                    <span className="font-semibold text-slate-200">{c.value}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly orders bar */}
        <div className="card p-5">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Weekly Orders</h3>
          <p className="text-xs text-slate-500 mb-4">This week's order volume</p>
          {weeklyOrders.length === 0 ? (
            <div className="h-[150px] flex items-center justify-center text-sm text-slate-500">No order data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={weeklyOrders} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" name="Orders" fill="#d946ef" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top products */}
        <div className="lg:col-span-2 card p-5">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Top Products</h3>
          <p className="text-xs text-slate-500 mb-4">Best performing products by revenue</p>
          {topProducts.length === 0 ? (
            <div className="h-[150px] flex items-center justify-center text-sm text-slate-500">No product sales yet</div>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-slate-500 text-xs font-bold w-5 text-center">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 font-medium truncate">{p.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full" style={{ width: `${(p.revenue / maxTopRevenue) * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">{p.sold.toLocaleString()} sold</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">₹{(p.revenue / 1000).toFixed(0)}k</p>
                    <p className={`text-xs font-semibold ${p.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{p.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stock breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Package size={18} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500">In Stock Products</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">
              {stats!.totalProducts - stats!.lowStockProducts - stats!.outOfStockProducts}
            </p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Low Stock</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">
              {stats!.lowStockProducts}
            </p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
            <TrendingUp size={18} className="text-red-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Out of Stock</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">
              {stats!.outOfStockProducts}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard