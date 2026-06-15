import React, { useState } from 'react'
import { Megaphone, Plus, Edit2, Trash2, ToggleRight, ToggleLeft, X } from 'lucide-react'

interface Promo {
  id: number; title: string; description: string; discount: string
  startDate: string; endDate: string; type: string; active: boolean; color: string
}

const initialPromos: Promo[] = [
  { id: 1, title: 'Summer Health Sale', description: 'Get 15% off on all MML Gold products this summer. Cook healthy, live better!', discount: '15% OFF', startDate: 'May 1, 2025', endDate: 'May 31, 2025', type: 'Seasonal', active: true, color: 'from-amber-500 to-orange-600' },
  { id: 2, title: 'Karthigai Festival Offer', description: 'Special discount on Deepam Oil for the Karthigai festival season.', discount: '₹30 OFF', startDate: 'Nov 15, 2025', endDate: 'Nov 30, 2025', type: 'Festival', active: false, color: 'from-yellow-500 to-amber-600' },
  { id: 3, title: 'Bulk Buyer Bonus', description: 'Order 15L packs and get 10% extra discount on all brands.', discount: '10% OFF', startDate: 'Apr 1, 2025', endDate: 'Jun 30, 2025', type: 'Bulk', active: true, color: 'from-brand-500 to-purple-600' },
  { id: 4, title: 'New Customer Welcome', description: 'First order discount for all new registered customers. One-time use.', discount: '₹50 OFF', startDate: 'Jan 1, 2025', endDate: 'Dec 31, 2025', type: 'New User', active: true, color: 'from-cyan-500 to-blue-600' },
  { id: 5, title: 'Weekend Saver', description: 'Every Saturday and Sunday – extra savings on Sunnova range of products.', discount: '12% OFF', startDate: 'Apr 5, 2025', endDate: 'Jun 28, 2025', type: 'Weekend', active: false, color: 'from-emerald-500 to-teal-600' },
  { id: 6, title: 'Refer & Earn', description: 'Refer a friend and both of you get ₹100 off on your next order.', discount: '₹100 OFF', startDate: 'Mar 1, 2025', endDate: 'Aug 31, 2025', type: 'Referral', active: true, color: 'from-rose-500 to-pink-600' },
]

const Promotions: React.FC = () => {
  const [promos, setPromos] = useState<Promo[]>(initialPromos)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: '', description: '', discount: '', type: 'Seasonal', startDate: '', endDate: '' })

  const toggle = (id: number) => setPromos(p => p.map(pr => pr.id === id ? { ...pr, active: !pr.active } : pr))
  const deletePromo = (id: number) => setPromos(p => p.filter(pr => pr.id !== id))

  const addPromo = () => {
    const colors = ['from-brand-500 to-purple-600', 'from-amber-500 to-orange-600', 'from-cyan-500 to-blue-600', 'from-emerald-500 to-teal-600']
    const newP: Promo = { id: Date.now(), ...form, active: true, color: colors[Math.floor(Math.random() * colors.length)] }
    setPromos(p => [newP, ...p])
    setShowAdd(false)
    setForm({ title: '', description: '', discount: '', type: 'Seasonal', startDate: '', endDate: '' })
  }

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">Promotions</h2>
          <p className="text-sm text-slate-500">{promos.filter(p => p.active).length} active promotions</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><Plus size={15} />Create Promotion</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: 'Total Promos', v: promos.length, c: 'text-white' },
          { l: 'Active', v: promos.filter(p => p.active).length, c: 'text-emerald-400' },
          { l: 'Scheduled', v: promos.filter(p => !p.active).length, c: 'text-amber-400' },
          { l: 'Types', v: new Set(promos.map(p => p.type)).size, c: 'text-brand-400' },
        ].map(s => (
          <div key={s.l} className="card p-4 text-center">
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className={`text-2xl font-bold ${s.c}`}>{s.v}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white">Create Promotion</h3>
              <button onClick={() => setShowAdd(false)}><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="space-y-3">
              <div><label className="text-xs text-slate-400 mb-1 block">Title</label><input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" placeholder="Promotion title" /></div>
              <div><label className="text-xs text-slate-400 mb-1 block">Description</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="input-field resize-none" rows={2} placeholder="Promotion description" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-slate-400 mb-1 block">Discount Label</label><input value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))} className="input-field" placeholder="15% OFF" /></div>
                <div><label className="text-xs text-slate-400 mb-1 block">Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="select-field">
                    {['Seasonal', 'Festival', 'Bulk', 'New User', 'Weekend', 'Referral', 'Flash Sale'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-slate-400 mb-1 block">Start Date</label><input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className="input-field" /></div>
                <div><label className="text-xs text-slate-400 mb-1 block">End Date</label><input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} className="input-field" /></div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={addPromo} className="btn-primary flex-1 justify-center">Create</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {promos.map(promo => (
          <div key={promo.id} className={`card card-hover overflow-hidden ${!promo.active ? 'opacity-60' : ''}`}>
            <div className={`h-2 bg-gradient-to-r ${promo.color}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${promo.color} flex items-center justify-center shrink-0`}>
                    <Megaphone size={16} className="text-white" />
                  </div>
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${promo.color} mb-1`}>{promo.type}</span>
                    <div className={`inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${promo.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${promo.active ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                      {promo.active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggle(promo.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 transition-colors">
                    {promo.active ? <ToggleRight size={16} className="text-emerald-400" /> : <ToggleLeft size={16} />}
                  </button>
                  <button onClick={() => deletePromo(promo.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400"><Trash2 size={13} /></button>
                </div>
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white mb-1">{promo.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{promo.description}</p>
              <div className="flex items-center justify-between">
                <div className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${promo.color} text-white text-sm font-black`}>{promo.discount}</div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500">{promo.startDate}</p>
                  <p className="text-[10px] text-slate-500">→ {promo.endDate}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Promotions
