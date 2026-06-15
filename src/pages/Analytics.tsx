import React, { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { TrendingUp, ShoppingCart, Users, DollarSign } from 'lucide-react'
import { revenueChart, categoryRevenue, cityRevenue, weeklyOrders, topProducts } from '../data'
import { useAdmin } from '../context/AdminContext'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-slate-400 mb-1.5 font-semibold">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.name.toLowerCase().includes('revenue') || p.name.toLowerCase().includes('target') ? `₹${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  )
  return null
}

const Analytics: React.FC = () => {
  const { orders, customers, products } = useAdmin()
  const [period, setPeriod] = useState('7M')
  const totalRevenue = orders.filter(o => o.status !== 'Cancelled' && o.status !== 'Refunded').reduce((s, o) => s + o.total, 0)

  const kpis = [
    { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(2)}L`, change: '+12.4%', icon: DollarSign, color: 'from-brand-500 to-brand-700' },
    { label: 'Total Orders', value: orders.length, change: '+8.1%', icon: ShoppingCart, color: 'from-amber-500 to-amber-700' },
    { label: 'Customers', value: customers.length, change: '+5.3%', icon: Users, color: 'from-cyan-500 to-cyan-700' },
    { label: 'Avg Order Value', value: `₹${Math.round(totalRevenue / orders.length).toLocaleString()}`, change: '+3.8%', icon: TrendingUp, color: 'from-emerald-500 to-emerald-700' },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">Analytics</h2>
          <p className="text-sm text-slate-500">Business performance overview</p>
        </div>
        <div className="flex gap-1.5 bg-slate-800 rounded-xl p-1">
          {['7D', '1M', '7M', '1Y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === p ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-slate-200'}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="card card-hover p-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.color} flex items-center justify-center mb-3 shadow-lg`}>
              <k.icon size={18} className="text-white" />
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">{k.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
            <p className="text-xs text-emerald-400 font-semibold mt-1">{k.change} vs last period</p>
          </div>
        ))}
      </div>

      {/* Revenue + Orders Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Revenue Trend</h3>
          <p className="text-xs text-slate-500 mb-5">Monthly revenue vs target</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueChart}>
              <defs>
                <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#d946ef" strokeWidth={2} fill="url(#rg1)" />
              <Area type="monotone" dataKey="target" name="Target" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#rg2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Weekly Orders & Revenue</h3>
          <p className="text-xs text-slate-500 mb-5">This week's performance by day</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyOrders} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#d946ef" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category + City */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Revenue by Category</h3>
          <p className="text-xs text-slate-500 mb-4">Product category distribution</p>
          <div className="flex justify-center mb-4">
            <PieChart width={180} height={180}>
              <Pie data={categoryRevenue} cx={85} cy={85} innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                {categoryRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }} />
            </PieChart>
          </div>
          <div className="space-y-2.5">
            {categoryRevenue.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-slate-400">{c.name}</span>
                </div>
                <span className="font-bold text-slate-200">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card p-5">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">Revenue by City</h3>
          <p className="text-xs text-slate-500 mb-5">Top performing cities</p>
          <div className="space-y-3">
            {cityRevenue.map((c, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-slate-500 text-xs font-bold w-4">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">{c.city}</span>
                    <span className="text-slate-400">{c.orders} orders</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400 transition-all" style={{ width: `${(c.revenue / 284000) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-bold text-white w-16 text-right">₹{(c.revenue / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="card">
        <div className="px-5 py-4 border-b border-slate-700/50">
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white">Top Products by Revenue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-700/50">
              {['Rank', 'Product', 'Units Sold', 'Revenue', 'Growth'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i} className="table-row">
                  <td className="px-5 py-4">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-slate-600/40 text-slate-300' : i === 2 ? 'bg-amber-700/20 text-amber-600' : 'text-slate-500'}`}>{i + 1}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-200 font-medium text-sm">{p.name}</td>
                  <td className="px-5 py-4 text-slate-300 text-sm">{p.sold.toLocaleString()}</td>
                  <td className="px-5 py-4 font-bold text-white text-sm">₹{p.revenue.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold ${p.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{p.trend}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Analytics
