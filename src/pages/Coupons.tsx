// import React, { useState } from 'react'
// import { Plus, Copy, Trash2, ToggleLeft, ToggleRight, X, Tag } from 'lucide-react'
// import { statusBadge } from '../components/Badge'
// import { useAdmin } from '../context/AdminContext'
// import type { Coupon } from '../data'

// const Coupons: React.FC = () => {
//   const { coupons, setCoupons } = useAdmin()
//   const [showAdd, setShowAdd] = useState(false)
//   const [copied, setCopied] = useState<number | null>(null)
//   const [newCoupon, setNewCoupon] = useState({ code:'', type:'Percentage', value:10, minOrder:500, maxUses:100, expiry:'' })

//   const copyCode = (id: number, code: string) => {
//     navigator.clipboard.writeText(code).catch(()=>{})
//     setCopied(id)
//     setTimeout(()=>setCopied(null), 1500)
//   }

//   const toggleStatus = (id: number) => {
//     setCoupons(p=>p.map(c=>c.id===id?{...c,status:c.status==='Active'?'Disabled':'Active'}:c))
//   }

//   const deleteCoupon = (id: number) => setCoupons(p=>p.filter(c=>c.id!==id))

//   const addCoupon = () => {
//     const c: Coupon = { id:Date.now(), code:newCoupon.code.toUpperCase(), type:newCoupon.type as any, value:newCoupon.value, minOrder:newCoupon.minOrder, usedCount:0, maxUses:newCoupon.maxUses, expiry:newCoupon.expiry||'Dec 31, 2025', status:'Active' }
//     setCoupons(p=>[...p,c])
//     setShowAdd(false)
//     setNewCoupon({code:'',type:'Percentage',value:10,minOrder:500,maxUses:100,expiry:''})
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-5 animate-fade-in">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-xl font-bold text-white">Coupons</h2>
//           <p className="text-sm text-slate-500">{coupons.filter(c=>c.status==='Active').length} active coupons</p>
//         </div>
//         <button onClick={()=>setShowAdd(true)} className="btn-primary"><Plus size={15}/>Create Coupon</button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         {[
//           {l:'Total Coupons',v:coupons.length,c:'text-white'},
//           {l:'Active',v:coupons.filter(c=>c.status==='Active').length,c:'text-emerald-400'},
//           {l:'Expired',v:coupons.filter(c=>c.status==='Expired').length,c:'text-slate-400'},
//           {l:'Total Uses',v:coupons.reduce((s,c)=>s+c.usedCount,0),c:'text-brand-400'},
//         ].map(s=>(
//           <div key={s.l} className="card p-4 text-center">
//             <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className={`text-2xl font-bold ${s.c}`}>{s.v}</p>
//             <p className="text-xs text-slate-500 mt-0.5">{s.l}</p>
//           </div>
//         ))}
//       </div>

//       {/* Add Modal */}
//       {showAdd && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setShowAdd(false)}>
//           <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md animate-slide-up" onClick={e=>e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-5">
//               <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white">Create Coupon</h3>
//               <button onClick={()=>setShowAdd(false)}><X size={18} className="text-slate-400"/></button>
//             </div>
//             <div className="space-y-3">
//               <div><label className="text-xs text-slate-400 mb-1 block">Coupon Code</label><input value={newCoupon.code} onChange={e=>setNewCoupon(p=>({...p,code:e.target.value.toUpperCase()}))} className="input-field uppercase" placeholder="SUMMER20"/></div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div><label className="text-xs text-slate-400 mb-1 block">Type</label>
//                   <select value={newCoupon.type} onChange={e=>setNewCoupon(p=>({...p,type:e.target.value}))} className="select-field">
//                     <option>Percentage</option><option>Flat</option>
//                   </select>
//                 </div>
//                 <div><label className="text-xs text-slate-400 mb-1 block">Value ({newCoupon.type==='Percentage'?'%':'₹'})</label><input type="number" value={newCoupon.value} onChange={e=>setNewCoupon(p=>({...p,value:+e.target.value}))} className="input-field"/></div>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div><label className="text-xs text-slate-400 mb-1 block">Min Order (₹)</label><input type="number" value={newCoupon.minOrder} onChange={e=>setNewCoupon(p=>({...p,minOrder:+e.target.value}))} className="input-field"/></div>
//                 <div><label className="text-xs text-slate-400 mb-1 block">Max Uses</label><input type="number" value={newCoupon.maxUses} onChange={e=>setNewCoupon(p=>({...p,maxUses:+e.target.value}))} className="input-field"/></div>
//               </div>
//               <div><label className="text-xs text-slate-400 mb-1 block">Expiry Date</label><input type="date" value={newCoupon.expiry} onChange={e=>setNewCoupon(p=>({...p,expiry:e.target.value}))} className="input-field"/></div>
//             </div>
//             <div className="flex gap-3 mt-5">
//               <button onClick={()=>setShowAdd(false)} className="btn-secondary flex-1">Cancel</button>
//               <button onClick={addCoupon} className="btn-primary flex-1 justify-center">Create Coupon</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {coupons.map(c=>(
//           <div key={c.id} className={`card card-hover p-5 ${c.status==='Expired'?'opacity-60':''}`}>
//             <div className="flex items-start justify-between mb-3">
//               <div className="flex items-center gap-2">
//                 <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center"><Tag size={16} className="text-brand-400"/></div>
//                 <div>
//                   <code style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-base font-bold text-white tracking-wider">{c.code}</code>
//                   <div className="flex items-center gap-2 mt-0.5">
//                     {statusBadge(c.status)}
//                     {statusBadge(c.type)}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-1.5">
//                 <button onClick={()=>copyCode(c.id,c.code)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400 transition-colors" title="Copy code">
//                   <Copy size={13}/>
//                 </button>
//                 <button onClick={()=>toggleStatus(c.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors" title={c.status==='Active'?'Disable':'Enable'}>
//                   {c.status==='Active'?<ToggleRight size={16} className="text-emerald-400"/>:<ToggleLeft size={16}/>}
//                 </button>
//                 <button onClick={()=>deleteCoupon(c.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={13}/></button>
//               </div>
//             </div>

//             {copied===c.id && <div className="text-xs text-emerald-400 mb-2">✓ Copied!</div>}

//             <div className="grid grid-cols-2 gap-3 text-xs">
//               <div><p className="text-slate-500">Discount</p><p className="text-white font-bold">{c.type==='Percentage'?`${c.value}% OFF`:`₹${c.value} OFF`}</p></div>
//               <div><p className="text-slate-500">Min Order</p><p className="text-white font-semibold">₹{c.minOrder}</p></div>
//               <div><p className="text-slate-500">Expires</p><p className="text-white">{c.expiry}</p></div>
//               <div><p className="text-slate-500">Usage</p><p className="text-white font-semibold">{c.usedCount}/{c.maxUses}</p></div>
//             </div>

//             <div className="mt-3">
//               <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>Usage rate</span><span>{Math.round((c.usedCount/c.maxUses)*100)}%</span></div>
//               <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
//                 <div className={`h-full rounded-full transition-all ${c.usedCount/c.maxUses>0.8?'bg-red-500':c.usedCount/c.maxUses>0.5?'bg-amber-500':'bg-emerald-500'}`} style={{width:`${Math.min((c.usedCount/c.maxUses)*100,100)}%`}}/>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
// export default Coupons





import React, { useState } from 'react'
import { Plus, Copy, Trash2, ToggleLeft, ToggleRight, X, Tag, RefreshCw, AlertCircle } from 'lucide-react'
import { statusBadge } from '../components/Badge'
import { useAdmin } from '../context/AdminContext'
import type { Coupon } from '../context/AdminContext'
import { getCouponsAPI } from '../service'

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Format ISO-8601 date to "MMM D, YYYY" */
const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

/** Discount label consistent with API type field */
const discountLabel = (c: Coupon) =>
    c.type === 'PERCENTAGE' ? `${c.value}% OFF` : `₹${c.value} OFF`

// ─── blank form state ─────────────────────────────────────────────────────────
const blankForm = () => ({
    code: '',
    description: '',
    type: 'PERCENTAGE' as 'PERCENTAGE' | 'FLAT',
    value: 10,
    minOrderValue: 500,
    maxDiscount: '' as number | '',   // empty string = null (FLAT has no maxDiscount)
    maxUses: 100,
    perUserLimit: 1,
    expiresAt: '',
})

// ─── component ────────────────────────────────────────────────────────────────
const Coupons: React.FC = () => {
    const { coupons, setCoupons, couponsLoading, couponsError, refetchCoupons } = useAdmin()

    const [showAdd, setShowAdd]   = useState(false)
    const [copied, setCopied]     = useState<number | null>(null)
    const [form, setForm]         = useState(blankForm)
    const [submitting, setSubmitting] = useState(false)

    // ── copy to clipboard ─────────────────────────────────────────────────────
    const copyCode = (id: number, code: string) => {
        navigator.clipboard.writeText(code).catch(() => {})
        setCopied(id)
        setTimeout(() => setCopied(null), 1500)
    }

    // ── toggle Active ↔ Disabled (skip if Expired) ────────────────────────────
    const toggleStatus = (id: number) => {
        setCoupons(prev =>
            prev.map(c =>
                c.id === id && c.status !== 'EXPIRED'
                    ? { ...c, status: c.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE' }
                    : c
            )
        )
    }

    const deleteCoupon = (id: number) =>
        setCoupons(prev => prev.filter(c => c.id !== id))

    // ── add coupon (local-only until a POST API is available) ─────────────────
    const addCoupon = () => {
        if (!form.code.trim() || !form.expiresAt) return
        setSubmitting(true)

        const now = new Date().toISOString()
        const newEntry: Coupon = {
            id:            Date.now(),
            code:          form.code.trim().toUpperCase(),
            description:   form.description.trim(),
            type:          form.type,
            value:         form.value,
            minOrderValue: form.minOrderValue,
            maxDiscount:   form.type === 'PERCENTAGE' && form.maxDiscount !== '' ? Number(form.maxDiscount) : null,
            maxUses:       form.maxUses,
            usedCount:     0,
            perUserLimit:  form.perUserLimit,
            status:        'ACTIVE',
            startsAt:      now,
            expiresAt:     new Date(form.expiresAt).toISOString(),
        }

        setCoupons(prev => [newEntry, ...prev])
        setShowAdd(false)
        setForm(blankForm())
        setSubmitting(false)
    }

    // ── derived stats ─────────────────────────────────────────────────────────
    const stats = [
        { l: 'Total Coupons', v: coupons.length,                                              c: 'text-white'       },
        { l: 'Active',        v: coupons.filter(c => c.status === 'ACTIVE').length,           c: 'text-emerald-400' },
        { l: 'Expired',       v: coupons.filter(c => c.status === 'EXPIRED').length,          c: 'text-slate-400'   },
        { l: 'Total Uses',    v: coupons.reduce((s, c) => s + c.usedCount, 0),                c: 'text-brand-400'   },
    ]

    // ── render ────────────────────────────────────────────────────────────────
    return (
        <div className="p-4 md:p-6 space-y-5 animate-fade-in">

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">
                        Coupons
                    </h2>
                    <p className="text-sm text-slate-500">
                        {coupons.filter(c => c.status === 'ACTIVE').length} active coupons
                    </p>
                </div>
                <div className="flex gap-2">
                    <button onClick={refetchCoupons} className="btn-secondary" title="Refresh" disabled={couponsLoading}>
                        <RefreshCw size={14} className={couponsLoading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={() => setShowAdd(true)} className="btn-primary">
                        <Plus size={15} /> Create Coupon
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map(s => (
                    <div key={s.l} className="card p-4 text-center">
                        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className={`text-2xl font-bold ${s.c}`}>
                            {s.v}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{s.l}</p>
                    </div>
                ))}
            </div>

            {/* Loading skeleton */}
            {couponsLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="card p-5 animate-pulse space-y-3">
                            <div className="flex gap-3 items-center">
                                <div className="w-9 h-9 rounded-xl bg-slate-700" />
                                <div className="space-y-1.5 flex-1">
                                    <div className="h-4 bg-slate-700 rounded w-28" />
                                    <div className="h-3 bg-slate-700 rounded w-16" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {[1, 2, 3, 4].map(j => (
                                    <div key={j} className="h-8 bg-slate-700 rounded" />
                                ))}
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full" />
                        </div>
                    ))}
                </div>
            )}

            {/* Error state */}
            {!couponsLoading && couponsError && (
                <div className="card p-6 flex flex-col items-center gap-3 text-center">
                    <AlertCircle size={32} className="text-red-400" />
                    <p className="text-slate-300 font-medium">Failed to load coupons</p>
                    <p className="text-slate-500 text-sm">{couponsError}</p>
                    <button onClick={refetchCoupons} className="btn-primary mt-1">
                        <RefreshCw size={14} /> Try Again
                    </button>
                </div>
            )}

            {/* Empty state */}
            {!couponsLoading && !couponsError && coupons.length === 0 && (
                <div className="card p-10 flex flex-col items-center gap-3 text-center">
                    <Tag size={36} className="text-slate-600" />
                    <p className="text-slate-400 font-medium">No coupons yet</p>
                    <button onClick={() => setShowAdd(true)} className="btn-primary mt-1">
                        <Plus size={14} /> Create your first coupon
                    </button>
                </div>
            )}

            {/* Coupon cards */}
            {!couponsLoading && !couponsError && coupons.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {coupons.map(c => (
                        <div key={c.id} className={`card card-hover p-5 ${c.status === 'EXPIRED' ? 'opacity-60' : ''}`}>

                            {/* Top row */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                                        <Tag size={16} className="text-brand-400" />
                                    </div>
                                    <div>
                                        <code style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-base font-bold text-white tracking-wider">
                                            {c.code}
                                        </code>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            {statusBadge(c.status)}
                                            {statusBadge(c.type)}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-1.5">
                                    <button
                                        onClick={() => copyCode(c.id, c.code)}
                                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400 transition-colors"
                                        title="Copy code"
                                    >
                                        <Copy size={13} />
                                    </button>
                                    {c.status !== 'EXPIRED' && (
                                        <button
                                            onClick={() => toggleStatus(c.id)}
                                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
                                            title={c.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                                        >
                                            {c.status === 'ACTIVE'
                                                ? <ToggleRight size={16} className="text-emerald-400" />
                                                : <ToggleLeft size={16} />}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteCoupon(c.id)}
                                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>

                            {/* Copy confirmation */}
                            {copied === c.id && (
                                <div className="text-xs text-emerald-400 mb-2">✓ Copied!</div>
                            )}

                            {/* Description */}
                            {c.description && (
                                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{c.description}</p>
                            )}

                            {/* Detail grid */}
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div>
                                    <p className="text-slate-500">Discount</p>
                                    <p className="text-white font-bold">{discountLabel(c)}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Min Order</p>
                                    <p className="text-white font-semibold">₹{c.minOrderValue}</p>
                                </div>
                                {c.maxDiscount !== null && (
                                    <div>
                                        <p className="text-slate-500">Max Discount</p>
                                        <p className="text-white font-semibold">₹{c.maxDiscount}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-slate-500">Per User</p>
                                    <p className="text-white">{c.perUserLimit}× limit</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Expires</p>
                                    <p className="text-white">{fmtDate(c.expiresAt)}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Usage</p>
                                    <p className="text-white font-semibold">{c.usedCount} / {c.maxUses}</p>
                                </div>
                            </div>

                            {/* Usage progress bar */}
                            <div className="mt-3">
                                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                    <span>Usage rate</span>
                                    <span>{Math.round((c.usedCount / c.maxUses) * 100)}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${
                                            c.usedCount / c.maxUses > 0.8
                                                ? 'bg-red-500'
                                                : c.usedCount / c.maxUses > 0.5
                                                ? 'bg-amber-500'
                                                : 'bg-emerald-500'
                                        }`}
                                        style={{ width: `${Math.min((c.usedCount / c.maxUses) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Create coupon modal ── */}
            {showAdd && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setShowAdd(false)}
                >
                    <div
                        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md animate-slide-up"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white">
                                Create Coupon
                            </h3>
                            <button onClick={() => setShowAdd(false)}>
                                <X size={18} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {/* Code */}
                            <div>
                                <label className="text-xs text-slate-400 mb-1 block">Coupon Code *</label>
                                <input
                                    value={form.code}
                                    onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                                    className="input-field uppercase"
                                    placeholder="SUMMER20"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-xs text-slate-400 mb-1 block">Description</label>
                                <input
                                    value={form.description}
                                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                    className="input-field"
                                    placeholder="Short description for this coupon"
                                />
                            </div>

                            {/* Type + Value */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Type</label>
                                    <select
                                        value={form.type}
                                        onChange={e => setForm(p => ({ ...p, type: e.target.value as 'PERCENTAGE' | 'FLAT' }))}
                                        className="select-field"
                                    >
                                        <option value="PERCENTAGE">Percentage</option>
                                        <option value="FLAT">Flat</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">
                                        Value ({form.type === 'PERCENTAGE' ? '%' : '₹'})
                                    </label>
                                    <input
                                        type="number"
                                        value={form.value}
                                        onChange={e => setForm(p => ({ ...p, value: +e.target.value }))}
                                        className="input-field"
                                        min={1}
                                    />
                                </div>
                            </div>

                            {/* Min order + Max discount (only for PERCENTAGE) */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Min Order (₹)</label>
                                    <input
                                        type="number"
                                        value={form.minOrderValue}
                                        onChange={e => setForm(p => ({ ...p, minOrderValue: +e.target.value }))}
                                        className="input-field"
                                        min={0}
                                    />
                                </div>
                                {form.type === 'PERCENTAGE' && (
                                    <div>
                                        <label className="text-xs text-slate-400 mb-1 block">Max Discount (₹)</label>
                                        <input
                                            type="number"
                                            value={form.maxDiscount}
                                            onChange={e => setForm(p => ({ ...p, maxDiscount: e.target.value === '' ? '' : +e.target.value }))}
                                            className="input-field"
                                            placeholder="No cap"
                                            min={0}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Max uses + Per-user limit */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Max Uses</label>
                                    <input
                                        type="number"
                                        value={form.maxUses}
                                        onChange={e => setForm(p => ({ ...p, maxUses: +e.target.value }))}
                                        className="input-field"
                                        min={1}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 mb-1 block">Per User Limit</label>
                                    <input
                                        type="number"
                                        value={form.perUserLimit}
                                        onChange={e => setForm(p => ({ ...p, perUserLimit: +e.target.value }))}
                                        className="input-field"
                                        min={1}
                                    />
                                </div>
                            </div>

                            {/* Expiry */}
                            <div>
                                <label className="text-xs text-slate-400 mb-1 block">Expiry Date *</label>
                                <input
                                    type="date"
                                    value={form.expiresAt}
                                    onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-5">
                            <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1">
                                Cancel
                            </button>
                            <button
                                onClick={addCoupon}
                                disabled={!form.code.trim() || !form.expiresAt || submitting}
                                className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create Coupon
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Coupons