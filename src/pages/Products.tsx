// import React, { useState } from 'react'
// import { Search, Plus, Edit2, Trash2, Star, Package, X, Check } from 'lucide-react'
// import { statusBadge } from '../components/Badge'
// import { useAdmin } from '../context/AdminContext'
// import type { Product } from '../data'

// const Products: React.FC = () => {
//   const { products, setProducts } = useAdmin()
//   const [search, setSearch] = useState('')
//   const [catFilter, setCatFilter] = useState('All')
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [showAdd, setShowAdd] = useState(false)
//   const [newProd, setNewProd] = useState({ name:'', brand:'MML Gold', category:'Sunflower Oil', price1L:0, price5L:0, price15L:0, stock1L:0, stock5L:0, stock15L:0, emoji:'🌻', description:'' })

//   const cats = ['All','Sunflower Oil','Specialty Oil','Traditional Oil']
//   const filtered = products.filter(p => {
//     const mc = catFilter==='All' || p.category===catFilter
//     const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
//     return mc && ms
//   })

//   const updateField = (id: number, field: string, value: any) => {
//     setProducts(p => p.map(pr => pr.id===id ? {...pr,[field]:value} : pr))
//   }

//   const deleteProduct = (id: number) => setProducts(p => p.filter(pr => pr.id !== id))

//   const addProduct = () => {
//     const stockStatus = newProd.stock1L===0 && newProd.stock5L===0 && newProd.stock15L===0 ? 'Out of Stock' : newProd.stock1L < 20 ? 'Low Stock' : 'In Stock'
//     const prod: Product = { ...newProd as any, id: Date.now(), sold:0, rating:0, reviews:0, status:stockStatus as any }
//     setProducts(p => [...p, prod])
//     setShowAdd(false)
//     setNewProd({ name:'', brand:'MML Gold', category:'Sunflower Oil', price1L:0, price5L:0, price15L:0, stock1L:0, stock5L:0, stock15L:0, emoji:'🌻', description:'' })
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-5 animate-fade-in">
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-xl font-bold text-white">Products</h2>
//           <p className="text-sm text-slate-500">{filtered.length} products</p>
//         </div>
//         <button onClick={()=>setShowAdd(true)} className="btn-primary"><Plus size={15}/>Add Product</button>
//       </div>

//       {/* Category tabs */}
//       <div className="flex gap-2 overflow-x-auto pb-1">
//         {cats.map(c=>(
//           <button key={c} onClick={()=>setCatFilter(c)} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${catFilter===c?'bg-brand-500/20 text-brand-400 border border-brand-500/30':'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>{c}</button>
//         ))}
//       </div>

//       <div className="relative max-w-sm">
//         <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
//         <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-9"/>
//       </div>

//       {/* Add Product Modal */}
//       {showAdd && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setShowAdd(false)}>
//           <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg animate-slide-up" onClick={e=>e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-5">
//               <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white">Add New Product</h3>
//               <button onClick={()=>setShowAdd(false)}><X size={18} className="text-slate-400"/></button>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <div className="col-span-2"><label className="text-xs text-slate-400 mb-1 block">Product Name</label><input value={newProd.name} onChange={e=>setNewProd(p=>({...p,name:e.target.value}))} className="input-field" placeholder="Product name"/></div>
//               <div><label className="text-xs text-slate-400 mb-1 block">Brand</label>
//                 <select value={newProd.brand} onChange={e=>setNewProd(p=>({...p,brand:e.target.value}))} className="select-field">
//                   {['MML Gold','Sunnova','Karthigai Jothi'].map(b=><option key={b}>{b}</option>)}
//                 </select>
//               </div>
//               <div><label className="text-xs text-slate-400 mb-1 block">Category</label>
//                 <select value={newProd.category} onChange={e=>setNewProd(p=>({...p,category:e.target.value}))} className="select-field">
//                   {['Sunflower Oil','Specialty Oil','Traditional Oil'].map(c=><option key={c}>{c}</option>)}
//                 </select>
//               </div>
//               <div><label className="text-xs text-slate-400 mb-1 block">Price 1L (₹)</label><input type="number" value={newProd.price1L} onChange={e=>setNewProd(p=>({...p,price1L:+e.target.value}))} className="input-field"/></div>
//               <div><label className="text-xs text-slate-400 mb-1 block">Price 5L (₹)</label><input type="number" value={newProd.price5L} onChange={e=>setNewProd(p=>({...p,price5L:+e.target.value}))} className="input-field"/></div>
//               <div><label className="text-xs text-slate-400 mb-1 block">Price 15L (₹)</label><input type="number" value={newProd.price15L} onChange={e=>setNewProd(p=>({...p,price15L:+e.target.value}))} className="input-field"/></div>
//               <div><label className="text-xs text-slate-400 mb-1 block">Stock 1L</label><input type="number" value={newProd.stock1L} onChange={e=>setNewProd(p=>({...p,stock1L:+e.target.value}))} className="input-field"/></div>
//               <div><label className="text-xs text-slate-400 mb-1 block">Emoji</label><input value={newProd.emoji} onChange={e=>setNewProd(p=>({...p,emoji:e.target.value}))} className="input-field" placeholder="🌻"/></div>
//               <div className="col-span-2"><label className="text-xs text-slate-400 mb-1 block">Description</label><textarea value={newProd.description} onChange={e=>setNewProd(p=>({...p,description:e.target.value}))} className="input-field resize-none" rows={2} placeholder="Short description"/></div>
//             </div>
//             <div className="flex gap-3 mt-5">
//               <button onClick={()=>setShowAdd(false)} className="btn-secondary flex-1">Cancel</button>
//               <button onClick={addProduct} className="btn-primary flex-1 justify-center">Add Product</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//         {filtered.map(p => (
//           <div key={p.id} className="card card-hover p-5">
//             <div className="flex items-start justify-between mb-4">
//               <div className="w-14 h-14 rounded-2xl bg-slate-700/50 flex items-center justify-center text-3xl">{p.emoji}</div>
//               <div className="flex gap-1.5">
//                 {editingId===p.id ? (
//                   <button onClick={()=>setEditingId(null)} className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"><Check size={13}/></button>
//                 ) : (
//                   <button onClick={()=>setEditingId(p.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400"><Edit2 size={13}/></button>
//                 )}
//                 <button onClick={()=>deleteProduct(p.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400"><Trash2 size={13}/></button>
//               </div>
//             </div>

//             {editingId===p.id ? (
//               <input value={p.name} onChange={e=>updateField(p.id,'name',e.target.value)} className="input-field text-xs mb-2"/>
//             ) : (
//               <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="font-bold text-white text-sm mb-1 leading-snug">{p.name}</h3>
//             )}
//             <p className="text-xs text-slate-500 mb-3">{p.brand} · {p.category}</p>

//             <div className="flex items-center gap-3 mb-3">
//               <div className="flex items-center gap-1"><Star size={11} className="text-amber-400"/><span className="text-xs text-slate-300">{p.rating}</span><span className="text-xs text-slate-500">({p.reviews.toLocaleString()})</span></div>
//               <span className="text-xs text-slate-500">{p.sold.toLocaleString()} sold</span>
//             </div>

//             {/* Prices - editable */}
//             <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
//               {(['1L','5L','15L'] as const).map(size=>(
//                 <div key={size} className="bg-slate-900/50 rounded-lg p-2 text-center">
//                   <p className="text-slate-500 mb-1">{size}</p>
//                   {editingId===p.id ? (
//                     <input type="number" value={p[`price${size}`]} onChange={e=>updateField(p.id,`price${size}`,+e.target.value)} className="w-full bg-transparent text-brand-400 font-bold text-center text-xs outline-none"/>
//                   ) : (
//                     <p className="text-brand-400 font-bold">₹{p[`price${size}`]}</p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Stock */}
//             <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
//               {(['1L','5L','15L'] as const).map(size=>(
//                 <div key={size} className="text-center">
//                   <p className="text-slate-500 mb-0.5">{size} Stock</p>
//                   {editingId===p.id ? (
//                     <input type="number" value={p[`stock${size}`]} onChange={e=>updateField(p.id,`stock${size}`,+e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded text-slate-200 text-center text-xs outline-none px-1 py-0.5"/>
//                   ) : (
//                     <p className={`font-semibold ${p[`stock${size}`]===0?'text-red-400':p[`stock${size}`]<20?'text-amber-400':'text-slate-200'}`}>{p[`stock${size}`]}</p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex items-center justify-between">
//               {statusBadge(p.status)}
//               <span className="text-xs text-slate-500">{p.sold.toLocaleString()} units sold</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
// export default Products





// import React, { useState, useEffect, useCallback } from 'react'
// import { Search, Plus, Edit2, Trash2, Star, X, Check, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
// import { statusBadge } from '../components/Badge'
// import { createProductAPI, getProductAPI } from '../service'

// // ─── API Types (matches real API response) ───────────────────────────────────

// export type ProductCategory =
//   | 'SUNFLOWER_OIL'
//   | 'SPECIALTY_OIL'
//   | 'TRADITIONAL_OIL'

// export type StockStatus =
//   | 'IN_STOCK'
//   | 'LOW_STOCK'
//   | 'OUT_OF_STOCK'

// export type ProductSize =
//   | 'SIZE_1L'
//   | 'SIZE_5L'
//   | 'SIZE_15L'

// export interface ProductVariant {
//   id: string
//   size: ProductSize
//   price: number
//   mrp: number
//   stockQuantity: number
//   stockStatus: StockStatus
//   sku: string
//   isActive: boolean
// }

// export interface Product {
//   id: string
//   name: string
//   slug: string
//   brand: string
//   category: ProductCategory
//   description: string
//   shortDesc: string
//   features: string[]
//   imageUrls: string[]
//   emoji: string
//   isActive: boolean
//   isFeatured: boolean
//   badge: string | null
//   avgRating: number
//   reviewCount: number
//   totalSold: number
//   variants: ProductVariant[]
//   createdAt: string
// }

// interface PaginationMeta {
//   total: number
//   page: number
//   totalPages: number
// }

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// const PAGE_SIZE = 20

// const CATEGORY_LABELS: Record<ProductCategory, string> = {
//   SUNFLOWER_OIL: 'Sunflower Oil',
//   SPECIALTY_OIL: 'Specialty Oil',
//   TRADITIONAL_OIL: 'Traditional Oil',
// }

// const SIZE_LABELS: Record<ProductSize, string> = {
//   SIZE_1L: '1L',
//   SIZE_5L: '5L',
//   SIZE_15L: '15L',
// }

// // Ordered sizes for consistent display
// const SIZE_ORDER: ProductSize[] = ['SIZE_1L', 'SIZE_5L', 'SIZE_15L']

// // Derive an overall product stock status from its variants
// function getOverallStatus(variants: ProductVariant[]): StockStatus {
//   const active = variants.filter(v => v.isActive)
//   if (active.length === 0 || active.every(v => v.stockStatus === 'OUT_OF_STOCK')) return 'OUT_OF_STOCK'
//   if (active.some(v => v.stockStatus === 'LOW_STOCK')) return 'LOW_STOCK'
//   return 'IN_STOCK'
// }

// function stockColor(status: StockStatus) {
//   if (status === 'OUT_OF_STOCK') return 'text-red-400'
//   if (status === 'LOW_STOCK') return 'text-amber-400'
//   return 'text-slate-200'
// }

// // ─── Component ───────────────────────────────────────────────────────────────

// const Products: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([])
//   const [meta, setMeta] = useState<PaginationMeta>({ total: 0, page: 0, totalPages: 1 })
//   const [search, setSearch] = useState('')
//   const [catFilter, setCatFilter] = useState<'All' | ProductCategory>('All')
//   const [editingId, setEditingId] = useState<string | null>(null)
//   const [editDraft, setEditDraft] = useState<Partial<Product>>({})
//   const [showAdd, setShowAdd] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   // API uses 0-based pages
//   const [page, setPage] = useState(0)

//   const [newProd, setNewProd] = useState({
//     name: '', brand: 'MML Gold', category: 'SUNFLOWER_OIL' as ProductCategory,
//     emoji: '🌻', description: '', shortDesc: '',
//     price1L: 0, price5L: 0, price15L: 0,
//     stock1L: 0, stock5L: 0, stock15L: 0,
//   })

//   // ── Fetch ──────────────────────────────────────────────────────────────────

//   const fetchProducts = useCallback(async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await getProductAPI(page, PAGE_SIZE)
//       const data = response.data
//       // API shape: { content, page, size, totalElements, totalPages }
//       const items: Product[] = data.content ?? data.data ?? data.products ?? []
//       setProducts(items)
//       setMeta({
//         total: data.totalElements ?? data.total ?? items.length,
//         page: data.page ?? page,
//         totalPages: data.totalPages ?? 1,
//       })
//     } catch {
//       setError('Failed to load products. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }, [page])

//   useEffect(() => { fetchProducts() }, [fetchProducts])

//   // ── Client-side filter (search + category) ─────────────────────────────────

//   const filtered = products.filter(p => {
//     const matchCat = catFilter === 'All' || p.category === catFilter
//     const q = search.toLowerCase()
//     const matchSearch = !search ||
//       p.name.toLowerCase().includes(q) ||
//       p.brand.toLowerCase().includes(q) ||
//       p.shortDesc?.toLowerCase().includes(q)
//     return matchCat && matchSearch
//   })

//   // ── Edit helpers ───────────────────────────────────────────────────────────

//   const startEdit = (p: Product) => {
//     setEditingId(p.id)
//     setEditDraft({ name: p.name, emoji: p.emoji })
//   }

//   const cancelEdit = () => { setEditingId(null); setEditDraft({}) }

//   const saveEdit = (id: string) => {
//     setProducts(prev => prev.map(p => p.id === id ? { ...p, ...editDraft } : p))
//     setEditingId(null)
//     setEditDraft({})
//     // TODO: call updateProductAPI(id, editDraft) here
//   }

//   const updateVariantField = (productId: string, variantId: string, field: keyof ProductVariant, value: number) => {
//     setProducts(prev => prev.map(p => {
//       if (p.id !== productId) return p
//       return {
//         ...p,
//         variants: p.variants.map(v => v.id === variantId ? { ...v, [field]: value } : v),
//       }
//     }))
//     // TODO: call updateVariantAPI(variantId, { [field]: value }) here
//   }

//   // ── Delete ─────────────────────────────────────────────────────────────────

//   const deleteProduct = (id: string) => {
//     setProducts(prev => prev.filter(p => p.id !== id))
//     if (editingId === id) cancelEdit()
//     // TODO: call deleteProductAPI(id) here
//   }

//   // ── Add product ────────────────────────────────────────────────────────────

//   // const addProduct = async () => {
//   //   const makeVariant = (size: ProductSize, price: number, stock: number): ProductVariant => ({
//   //     id: `${Date.now()}-${size}`,
//   //     size,
//   //     price,
//   //     mrp: Math.round(price * 1.1),
//   //     stockQuantity: stock,
//   //     stockStatus: stock === 0 ? 'OUT_OF_STOCK' : stock < 20 ? 'LOW_STOCK' : 'IN_STOCK',
//   //     sku: `NEW-${size}`,
//   //     isActive: true,
//   //   })

//   //   const prod: Product = {
//   //     id: String(Date.now()),
//   //     name: newProd.name,
//   //     slug: newProd.name.toLowerCase().replace(/\s+/g, '-'),
//   //     brand: newProd.brand,
//   //     category: newProd.category,
//   //     description: newProd.description,
//   //     shortDesc: newProd.shortDesc,
//   //     features: [],
//   //     imageUrls: [],
//   //     emoji: newProd.emoji,
//   //     isActive: true,
//   //     isFeatured: false,
//   //     badge: null,
//   //     avgRating: 0,
//   //     reviewCount: 0,
//   //     totalSold: 0,
//   //     variants: [
//   //       makeVariant('SIZE_1L', newProd.price1L, newProd.stock1L),
//   //       makeVariant('SIZE_5L', newProd.price5L, newProd.stock5L),
//   //       makeVariant('SIZE_15L', newProd.price15L, newProd.stock15L),
//   //     ],
//   //     createdAt: new Date().toISOString(),
//   //   }

//   //   setProducts(prev => [prod, ...prev])
//   //   setShowAdd(false)
//   //   setNewProd({ name: '', brand: 'MML Gold', category: 'SUNFLOWER_OIL', emoji: '🌻', description: '', shortDesc: '', price1L: 0, price5L: 0, price15L: 0, stock1L: 0, stock5L: 0, stock15L: 0 })
//   //   console.log(prod);

//   //   // await createProductAPI(prod)
//   // }

//   const addProduct = async () => {
//     try {
//       const req = {
//         name: newProd.name,
//         brand: newProd.brand,
//         category: newProd.category,
//         description: newProd.description,
//         shortDesc: newProd.shortDesc,
//         features: [],
//         imageUrls: [],
//         emoji: newProd.emoji,
//         isFeatured: false,
//         badge: '',
//         isActive: true,

//         price1L: newProd.price1L,
//         price5L: newProd.price5L,
//         price15L: newProd.price15L,

//         stock1L: newProd.stock1L,
//         stock5L: newProd.stock5L,
//         stock15L: newProd.stock15L,

//         mrp1L: Math.round(newProd.price1L * 1.1),
//         mrp5L: Math.round(newProd.price5L * 1.1),
//         mrp15L: Math.round(newProd.price15L * 1.1),
//       };

//       console.log('Create Product Request:', req);

//       const response = await createProductAPI(req);
//       console.log(response?.data);

//       fetchProducts();
//       setShowAdd(false);

//       setNewProd({
//         name: '',
//         brand: 'MML Gold',
//         category: 'SUNFLOWER_OIL',
//         emoji: '🌻',
//         description: '',
//         shortDesc: '',
//         price1L: 0,
//         price5L: 0,
//         price15L: 0,
//         stock1L: 0,
//         stock5L: 0,
//         stock15L: 0,
//       });
//     } catch (error) {
//       console.error('Create Product Error:', error);
//     }
//   };
//   // ─── Render ────────────────────────────────────────────────────────────────

//   return (
//     <div className="p-4 md:p-6 space-y-5 animate-fade-in">

//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div>
//           <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">Products</h2>
//           <p className="text-sm text-slate-500">{meta.total} total products</p>
//         </div>
//         <button onClick={() => setShowAdd(true)} className="btn-primary"><Plus size={15} /> Add Product</button>
//       </div>

//       {/* Category tabs */}
//       <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
//         {(['All', 'SUNFLOWER_OIL', 'SPECIALTY_OIL', 'TRADITIONAL_OIL'] as const).map(c => (
//           <button key={c} onClick={() => setCatFilter(c)}
//             className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${catFilter === c ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
//             {c === 'All' ? 'All' : CATEGORY_LABELS[c]}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="relative max-w-sm">
//         <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
//         <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-9" />
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-center justify-between">
//           {error}
//           <button onClick={() => setError(null)}><X size={13} /></button>
//         </div>
//       )}

//       {/* Add Product Modal */}
//       {showAdd && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
//           <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg animate-slide-up overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-5">
//               <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white">Add New Product</h3>
//               <button onClick={() => setShowAdd(false)}><X size={18} className="text-slate-400" /></button>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <div className="col-span-2">
//                 <label className="text-xs text-slate-400 mb-1 block">Product Name</label>
//                 <input value={newProd.name} onChange={e => setNewProd(p => ({ ...p, name: e.target.value }))} className="input-field" placeholder="Product name" />
//               </div>
//               <div>
//                 <label className="text-xs text-slate-400 mb-1 block">Brand</label>
//                 <select value={newProd.brand} onChange={e => setNewProd(p => ({ ...p, brand: e.target.value }))} className="select-field">
//                   {['MML Gold', 'Sunnova', 'Karthigai Jothi'].map(b => <option key={b}>{b}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="text-xs text-slate-400 mb-1 block">Category</label>
//                 <select value={newProd.category} onChange={e => setNewProd(p => ({ ...p, category: e.target.value as ProductCategory }))} className="select-field">
//                   {(Object.entries(CATEGORY_LABELS) as [ProductCategory, string][]).map(([val, label]) => (
//                     <option key={val} value={val}>{label}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="text-xs text-slate-400 mb-1 block">Emoji</label>
//                 <input value={newProd.emoji} onChange={e => setNewProd(p => ({ ...p, emoji: e.target.value }))} className="input-field" placeholder="🌻" />
//               </div>
//               <div className="col-span-2">
//                 <label className="text-xs text-slate-400 mb-1 block">Short Description</label>
//                 <input value={newProd.shortDesc} onChange={e => setNewProd(p => ({ ...p, shortDesc: e.target.value }))} className="input-field" placeholder="One-line summary" />
//               </div>
//               <div className="col-span-2">
//                 <label className="text-xs text-slate-400 mb-1 block">Description</label>
//                 <textarea value={newProd.description} onChange={e => setNewProd(p => ({ ...p, description: e.target.value }))} className="input-field resize-none" rows={2} placeholder="Full description" />
//               </div>

//               {/* Prices */}
//               <div className="col-span-2 pt-1">
//                 <p className="text-xs font-semibold text-slate-400 mb-2">Prices (₹)</p>
//                 <div className="grid grid-cols-3 gap-2">
//                   {(['1L', '5L', '15L'] as const).map(s => (
//                     <div key={s}>
//                       <label className="text-xs text-slate-500 mb-1 block">{s}</label>
//                       <input type="number" value={(newProd as any)[`price${s}`]} onChange={e => setNewProd(p => ({ ...p, [`price${s}`]: +e.target.value }))} className="input-field" />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Stock */}
//               <div className="col-span-2 pt-1">
//                 <p className="text-xs font-semibold text-slate-400 mb-2">Stock Quantities</p>
//                 <div className="grid grid-cols-3 gap-2">
//                   {(['1L', '5L', '15L'] as const).map(s => (
//                     <div key={s}>
//                       <label className="text-xs text-slate-500 mb-1 block">{s}</label>
//                       <input type="number" value={(newProd as any)[`stock${s}`]} onChange={e => setNewProd(p => ({ ...p, [`stock${s}`]: +e.target.value }))} className="input-field" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-3 mt-5">
//               <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancel</button>
//               <button onClick={addProduct} disabled={!newProd.name.trim()} className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed">
//                 Add Product
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Loading */}
//       {loading ? (
//         <div className="flex items-center justify-center py-20">
//           <Loader2 size={24} className="animate-spin text-brand-400" />
//         </div>
//       ) : (
//         <>
//           {/* Products grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//             {filtered.length === 0 ? (
//               <div className="col-span-3 text-center py-16 text-slate-500 text-sm">No products found</div>
//             ) : filtered.map(p => {
//               const isEditing = editingId === p.id
//               const overallStatus = getOverallStatus(p.variants)

//               // Sort variants in SIZE_ORDER for consistent display
//               const sortedVariants = SIZE_ORDER
//                 .map(size => p.variants.find(v => v.size === size))
//                 .filter((v): v is ProductVariant => !!v)

//               return (
//                 <div key={p.id} className="card card-hover p-5">

//                   {/* Top row: emoji + actions */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-14 h-14 rounded-2xl bg-slate-700/50 flex items-center justify-center text-3xl shrink-0">
//                         {isEditing
//                           ? <input value={editDraft.emoji ?? p.emoji} onChange={e => setEditDraft(d => ({ ...d, emoji: e.target.value }))} className="w-10 bg-transparent text-center text-2xl outline-none" />
//                           : p.emoji}
//                       </div>
//                       <div>
//                         {p.badge && (
//                           <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-400 border border-brand-500/30 px-1.5 py-0.5 rounded-md">{p.badge}</span>
//                         )}
//                         {p.isFeatured && (
//                           <span className="ml-1 text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-md">Featured</span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex gap-1.5 shrink-0">
//                       {isEditing ? (
//                         <>
//                           <button onClick={() => saveEdit(p.id)} className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"><Check size={13} /></button>
//                           <button onClick={cancelEdit} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400"><X size={13} /></button>
//                         </>
//                       ) : (
//                         <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400"><Edit2 size={13} /></button>
//                       )}
//                       <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400"><Trash2 size={13} /></button>
//                     </div>
//                   </div>

//                   {/* Name */}
//                   {isEditing ? (
//                     <input value={editDraft.name ?? p.name} onChange={e => setEditDraft(d => ({ ...d, name: e.target.value }))} className="input-field text-xs mb-2 w-full" />
//                   ) : (
//                     <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-sm mb-1 leading-snug">{p.name}</h3>
//                   )}
//                   <p className="text-xs text-slate-500 mb-1">{p.brand} · {CATEGORY_LABELS[p.category]}</p>
//                   {p.shortDesc && <p className="text-xs text-slate-600 mb-3 leading-relaxed">{p.shortDesc}</p>}

//                   {/* Rating + sold */}
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="flex items-center gap-1">
//                       <Star size={11} className="text-amber-400" />
//                       <span className="text-xs text-slate-300">{p.avgRating?.toFixed(1)}</span>
//                       <span className="text-xs text-slate-500">({p.reviewCount?.toLocaleString()})</span>
//                     </div>
//                     <span className="text-xs text-slate-500">{p.totalSold?.toLocaleString()} sold</span>
//                   </div>

//                   {/* Variants: price + stock per size */}
//                   <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
//                     {sortedVariants.map(v => (
//                       <div key={v.id} className="bg-slate-900/50 rounded-lg p-2 text-center">
//                         <p className="text-slate-500 mb-1">{SIZE_LABELS[v.size]}</p>
//                         {isEditing ? (
//                           <>
//                             <input
//                               type="number"
//                               value={v.price}
//                               onChange={e => updateVariantField(p.id, v.id, 'price', +e.target.value)}
//                               className="w-full bg-transparent text-brand-400 font-bold text-center text-xs outline-none mb-1"
//                             />
//                             <input
//                               type="number"
//                               value={v.stockQuantity}
//                               onChange={e => updateVariantField(p.id, v.id, 'stockQuantity', +e.target.value)}
//                               className="w-full bg-slate-800 border border-slate-700 rounded text-center text-xs outline-none px-1 py-0.5"
//                             />
//                           </>
//                         ) : (
//                           <>
//                             <p className="text-brand-400 font-bold">₹{v.price.toLocaleString()}</p>
//                             <p className="text-[10px] text-slate-600 line-through">₹{v.mrp.toLocaleString()}</p>
//                             <p className={`text-[10px] font-semibold mt-0.5 ${stockColor(v.stockStatus)}`}>
//                               {v.stockQuantity} units
//                             </p>
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Status + SKUs */}
//                   <div className="flex items-center justify-between">
//                     {statusBadge(overallStatus)}
//                     <span className="text-[10px] text-slate-600 font-mono">
//                       {sortedVariants[0]?.sku.split('-').slice(0, 2).join('-')}
//                     </span>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>

//           {/* Pagination */}
//           {meta.totalPages > 1 && (
//             <div className="flex items-center justify-between px-1 py-2">
//               <p className="text-xs text-slate-500">
//                 Page {page + 1} of {meta.totalPages} · {meta.total} products
//               </p>
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => setPage(p => Math.max(0, p - 1))}
//                   disabled={page === 0}
//                   className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
//                   <ChevronLeft size={15} />
//                 </button>
//                 {Array.from({ length: meta.totalPages }, (_, i) => (
//                   <button key={i}
//                     onClick={() => setPage(i)}
//                     className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${page === i ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}>
//                     {i + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage(p => Math.min(meta.totalPages - 1, p + 1))}
//                   disabled={page >= meta.totalPages - 1}
//                   className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
//                   <ChevronRight size={15} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }

// export default Products








import React, { useState, useEffect, useCallback } from 'react'
import {
  Search, Plus, Edit2, Trash2, Star, X, Check, Loader2,
  ChevronLeft, ChevronRight, ToggleLeft, ToggleRight, Sparkles,
  Package, AlertCircle,
} from 'lucide-react'
import { statusBadge } from '../components/Badge'
import {
  createProductAPI,
  getProductAPI,
  updateProductAPI,
  deleteProductAPI,
  toggleActiveAPI,
  toggleFeaturedAPI,
  updateStockAPI,
} from '../service'

// ─── API Types ───────────────────────────────────────────────────────────────

export type ProductCategory = 'SUNFLOWER_OIL' | 'SPECIALTY_OIL' | 'TRADITIONAL_OIL'
export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
export type ProductSize = 'SIZE_1L' | 'SIZE_5L' | 'SIZE_15L'

export interface ProductVariant {
  id: string
  size: ProductSize
  price: number
  mrp: number
  stockQuantity: number
  stockStatus: StockStatus
  sku: string
  isActive: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  brand: string
  category: ProductCategory
  description: string
  shortDesc: string
  features: string[]
  imageUrls: string[]
  emoji: string
  isActive: boolean
  isFeatured: boolean
  badge: string | null
  avgRating: number
  reviewCount: number
  totalSold: number
  variants: ProductVariant[]
  createdAt: string
}

interface PaginationMeta {
  total: number
  page: number
  totalPages: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  SUNFLOWER_OIL: 'Sunflower Oil',
  SPECIALTY_OIL: 'Specialty Oil',
  TRADITIONAL_OIL: 'Traditional Oil',
}

const SIZE_LABELS: Record<ProductSize, string> = {
  SIZE_1L: '1L',
  SIZE_5L: '5L',
  SIZE_15L: '15L',
}

const SIZE_ORDER: ProductSize[] = ['SIZE_1L', 'SIZE_5L', 'SIZE_15L']

function getOverallStatus(variants: ProductVariant[]): StockStatus {
  console.log("variants--->", variants);

  const active = variants.filter(v => v.isActive)
  if (active.length === 0 || active.every(v => v.stockStatus === 'OUT_OF_STOCK')) return 'OUT_OF_STOCK'
  if (active.some(v => v.stockStatus === 'LOW_STOCK')) return 'LOW_STOCK'
  return 'IN_STOCK'
}

function stockColor(status: StockStatus) {
  if (status === 'OUT_OF_STOCK') return 'text-red-400'
  if (status === 'LOW_STOCK') return 'text-amber-400'
  return 'text-slate-200'
}

// Blank new-product form state
const BLANK_PROD = {
  name: '', brand: 'MML Gold', category: 'SUNFLOWER_OIL' as ProductCategory,
  emoji: '🌻', description: '', shortDesc: '',
  price1L: 0, price5L: 0, price15L: 0,
  stock1L: 0, stock5L: 0, stock15L: 0,
}

// ─── Component ───────────────────────────────────────────────────────────────

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [meta, setMeta] = useState<PaginationMeta>({ total: 0, page: 0, totalPages: 1 })
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<'All' | ProductCategory>('All')
  const [page, setPage] = useState(0)

  // Per-card loading state: productId → set of ops in-flight
  const [busy, setBusy] = useState<Record<string, Set<string>>>({})

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState<Partial<Product & {
    price1L: number; price5L: number; price15L: number
    stock1L: number; stock5L: number; stock15L: number
  }>>({})

  // Add product modal
  const [showAdd, setShowAdd] = useState(false)
  const [newProd, setNewProd] = useState(BLANK_PROD)

  // Global loading / error
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Toast
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)

  // ── Helpers ────────────────────────────────────────────────────────────────

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const markBusy = (id: string, op: string) =>
    setBusy(prev => ({ ...prev, [id]: new Set([...(prev[id] ?? []), op]) }))

  const clearBusy = (id: string, op: string) =>
    setBusy(prev => {
      const s = new Set(prev[id] ?? [])
      s.delete(op)
      return { ...prev, [id]: s }
    })

  const isBusy = (id: string, op: string) => busy[id]?.has(op) ?? false

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getProductAPI(page, PAGE_SIZE)
      const data = response.data
      const items: Product[] = data.content ?? data.data ?? data.products ?? []
      setProducts(items)
      setMeta({
        total: data.totalElements ?? data.total ?? items.length,
        page: data.page ?? page,
        totalPages: data.totalPages ?? 1,
      })
    } catch {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // ── Client-side filter ─────────────────────────────────────────────────────

  const filtered = products.filter(p => {
    const matchCat = catFilter === 'All' || p.category === catFilter
    const q = search.toLowerCase()
    const matchSearch = !search ||
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.shortDesc?.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  // ── Edit helpers ───────────────────────────────────────────────────────────

  const startEdit = (p: Product) => {
    const v = (size: ProductSize) => p.variants.find(v => v.size === size)
    setEditingId(p.id)
    setEditDraft({
      name: p.name,
      emoji: p.emoji,
      shortDesc: p.shortDesc,
      description: p.description,
      brand: p.brand,
      category: p.category,
      badge: p.badge ?? '',
      price1L: v('SIZE_1L')?.price ?? 0,
      price5L: v('SIZE_5L')?.price ?? 0,
      price15L: v('SIZE_15L')?.price ?? 0,
      stock1L: v('SIZE_1L')?.stockQuantity ?? 0,
      stock5L: v('SIZE_5L')?.stockQuantity ?? 0,
      stock15L: v('SIZE_15L')?.stockQuantity ?? 0,
    })
  }

  const cancelEdit = () => { setEditingId(null); setEditDraft({}) }

  // PUT /admin/products/{id}  +  PATCH /admin/products/{id}/stock (x3)
  const saveEdit = async (p: Product) => {
    markBusy(p.id, 'save')
    try {
      const req = {
        name: editDraft.name ?? p.name,
        brand: editDraft.brand ?? p.brand,
        category: editDraft.category ?? p.category,
        description: editDraft.description ?? p.description,
        shortDesc: editDraft.shortDesc ?? p.shortDesc,
        emoji: editDraft.emoji ?? p.emoji,
        badge: editDraft.badge ?? p.badge ?? '',
        features: p.features ?? [],
        imageUrls: p.imageUrls ?? [],
        isFeatured: p.isFeatured,
        isActive: p.isActive,

        price1L: editDraft.price1L ?? 0,
        price5L: editDraft.price5L ?? 0,
        price15L: editDraft.price15L ?? 0,
        mrp1L: Math.round((editDraft.price1L ?? 0) * 1.1),
        mrp5L: Math.round((editDraft.price5L ?? 0) * 1.1),
        mrp15L: Math.round((editDraft.price15L ?? 0) * 1.1),

        stock1L: editDraft.stock1L ?? 0,
        stock5L: editDraft.stock5L ?? 0,
        stock15L: editDraft.stock15L ?? 0,
      }

      await updateProductAPI(p.id, req)
      showToast('Product updated')
      await fetchProducts()
      setEditingId(null)
      setEditDraft({})
    } catch {
      showToast('Failed to update product', 'err')
    } finally {
      clearBusy(p.id, 'save')
    }
  }

  // PATCH /admin/products/{id}/stock
  const saveStock = async (productId: string, size: ProductSize, quantity: number, price: number) => {
    markBusy(productId, `stock-${size}`)
    try {
      console.log(size, quantity, price);
      const mrp = price * 1.1
      const res = await updateStockAPI(productId, { size, quantity, price, mrp })
      if (res?.data) {
        setEditingId(null);
        setEditDraft({})
        showToast('Stock updated')
        await fetchProducts()
      }

    } catch {
      showToast('Failed to update stock', 'err')
    } finally {
      clearBusy(productId, `stock-${size}`)
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────

  // DELETE /admin/products/{id}
  const deleteProduct = async (id: string) => {
    if (!window.confirm('Delete this product permanently?')) return
    markBusy(id, 'delete')
    try {
      await deleteProductAPI(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      if (editingId === id) cancelEdit()
      showToast('Product deleted')
    } catch {
      showToast('Failed to delete product', 'err')
    } finally {
      clearBusy(id, 'delete')
    }
  }

  // ── Toggle Active ──────────────────────────────────────────────────────────

  // PATCH /admin/products/{id}/toggle-active
  const toggleActive = async (p: Product) => {
    markBusy(p.id, 'active')
    try {
      await toggleActiveAPI(p.id)
      setProducts(prev => prev.map(x => x.id === p.id ? { ...x, isActive: !x.isActive } : x))
      showToast(`Product ${p.isActive ? 'deactivated' : 'activated'}`)
    } catch {
      showToast('Failed to update status', 'err')
    } finally {
      clearBusy(p.id, 'active')
    }
  }

  // ── Toggle Featured ────────────────────────────────────────────────────────

  // PATCH /admin/products/{id}/toggle-featured
  const toggleFeatured = async (p: Product) => {
    markBusy(p.id, 'featured')
    try {
      await toggleFeaturedAPI(p.id)
      setProducts(prev => prev.map(x => x.id === p.id ? { ...x, isFeatured: !x.isFeatured } : x))
      showToast(`Featured ${p.isFeatured ? 'removed' : 'set'}`)
    } catch {
      showToast('Failed to update featured status', 'err')
    } finally {
      clearBusy(p.id, 'featured')
    }
  }

  // ── Add product ────────────────────────────────────────────────────────────

  // POST /admin/products
  const addProduct = async () => {
    markBusy('__new__', 'add')
    try {
      const req = {
        name: newProd.name,
        brand: newProd.brand,
        category: newProd.category,
        description: newProd.description,
        shortDesc: newProd.shortDesc,
        features: [],
        imageUrls: [],
        emoji: newProd.emoji,
        isFeatured: false,
        badge: '',
        isActive: true,
        price1L: newProd.price1L,
        price5L: newProd.price5L,
        price15L: newProd.price15L,
        mrp1L: Math.round(newProd.price1L * 1.1),
        mrp5L: Math.round(newProd.price5L * 1.1),
        mrp15L: Math.round(newProd.price15L * 1.1),
        stock1L: newProd.stock1L,
        stock5L: newProd.stock5L,
        stock15L: newProd.stock15L,
      }
      console.log("req---->", req);

      await createProductAPI(req)
      showToast('Product created')
      await fetchProducts()
      setShowAdd(false)
      setNewProd(BLANK_PROD)
    } catch {
      showToast('Failed to create product', 'err')
    } finally {
      clearBusy('__new__', 'add')
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium border transition-all
          ${toast.type === 'ok'
            ? 'bg-emerald-900/90 text-emerald-300 border-emerald-700/50'
            : 'bg-red-900/90 text-red-300 border-red-700/50'}`}>
          {toast.type === 'ok' ? <Check size={14} /> : <AlertCircle size={14} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">Products</h2>
          <p className="text-sm text-slate-500">{meta.total} total products</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><Plus size={15} /> Add Product</button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(['All', 'SUNFLOWER_OIL', 'SPECIALTY_OIL', 'TRADITIONAL_OIL'] as const).map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${catFilter === c ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
            {c === 'All' ? 'All' : CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-9" />
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}><X size={13} /></button>
        </div>
      )}

      {/* ── Add Product Modal ── */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg animate-slide-up overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white">Add New Product</h3>
              <button onClick={() => setShowAdd(false)}><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-xs text-slate-400 mb-1 block">Product Name</label>
                <input value={newProd.name} onChange={e => setNewProd(p => ({ ...p, name: e.target.value }))} className="input-field" placeholder="Product name" />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Brand</label>
                <select value={newProd.brand} onChange={e => setNewProd(p => ({ ...p, brand: e.target.value }))} className="select-field">
                  {['MML Gold', 'Sunnova', 'Karthigai Jothi'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Category</label>
                <select value={newProd.category} onChange={e => setNewProd(p => ({ ...p, category: e.target.value as ProductCategory }))} className="select-field">
                  {(Object.entries(CATEGORY_LABELS) as [ProductCategory, string][]).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Emoji</label>
                <input value={newProd.emoji} onChange={e => setNewProd(p => ({ ...p, emoji: e.target.value }))} className="input-field" placeholder="🌻" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-400 mb-1 block">Short Description</label>
                <input value={newProd.shortDesc} onChange={e => setNewProd(p => ({ ...p, shortDesc: e.target.value }))} className="input-field" placeholder="One-line summary" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-400 mb-1 block">Description</label>
                <textarea value={newProd.description} onChange={e => setNewProd(p => ({ ...p, description: e.target.value }))} className="input-field resize-none" rows={2} placeholder="Full description" />
              </div>
              <div className="col-span-2 pt-1">
                <p className="text-xs font-semibold text-slate-400 mb-2">Prices (₹)</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['1L', '5L', '15L'] as const).map(s => (
                    <div key={s}>
                      <label className="text-xs text-slate-500 mb-1 block">{s}</label>
                      <input type="number" value={(newProd as any)[`price${s}`]} onChange={e => setNewProd(p => ({ ...p, [`price${s}`]: +e.target.value }))} className="input-field" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 pt-1">
                <p className="text-xs font-semibold text-slate-400 mb-2">Stock Quantities</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['1L', '5L', '15L'] as const).map(s => (
                    <div key={s}>
                      <label className="text-xs text-slate-500 mb-1 block">{s}</label>
                      <input type="number" value={(newProd as any)[`stock${s}`]} onChange={e => setNewProd(p => ({ ...p, [`stock${s}`]: +e.target.value }))} className="input-field" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancel</button>
              <button
                onClick={addProduct}
                disabled={!newProd.name.trim() || isBusy('__new__', 'add')}
                className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                {isBusy('__new__', 'add') ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-brand-400" />
        </div>
      ) : (
        <>
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-slate-500 text-sm">No products found</div>
            ) : filtered.map(p => {
              const isEditing = editingId === p.id
              const overallStatus = getOverallStatus(p.variants)
              const sortedVariants = SIZE_ORDER
                .map(size => p.variants.find(v => v.size === size))
                .filter((v): v is ProductVariant => !!v)

              return (
                <div key={p.id} className={`card card-hover p-5 transition-opacity ${!p.isActive ? 'opacity-60' : ''}`}>

                  {/* Top row: emoji + actions */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-700/50 flex items-center justify-center text-3xl shrink-0">
                        {isEditing
                          ? <input value={editDraft.emoji ?? p.emoji} onChange={e => setEditDraft(d => ({ ...d, emoji: e.target.value }))} className="w-10 bg-transparent text-center text-2xl outline-none" />
                          : p.emoji}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {p.badge && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-400 border border-brand-500/30 px-1.5 py-0.5 rounded-md">{p.badge}</span>
                        )}
                        {p.isFeatured && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-md">Featured</span>
                        )}
                        {!p.isActive && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-500/10 text-slate-400 border border-slate-500/20 px-1.5 py-0.5 rounded-md">Inactive</span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-1 shrink-0 flex-wrap justify-end">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => saveEdit(p)}
                            disabled={isBusy(p.id, 'save')}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50">
                            {isBusy(p.id, 'save') ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                          </button>
                          <button onClick={cancelEdit} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400">
                            <X size={13} />
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Edit */}
                          <button
                            onClick={() => startEdit(p)}
                            title="Edit product"
                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-brand-400">
                            <Edit2 size={13} />
                          </button>

                          {/* Toggle Active */}
                          <button
                            onClick={() => toggleActive(p)}
                            disabled={isBusy(p.id, 'active')}
                            title={p.isActive ? 'Deactivate' : 'Activate'}
                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-sky-400 disabled:opacity-50">
                            {isBusy(p.id, 'active')
                              ? <Loader2 size={13} className="animate-spin" />
                              : p.isActive ? <ToggleRight size={13} className="text-sky-400" /> : <ToggleLeft size={13} />}
                          </button>

                          {/* Toggle Featured */}
                          <button
                            onClick={() => toggleFeatured(p)}
                            disabled={isBusy(p.id, 'featured')}
                            title={p.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-amber-400 disabled:opacity-50">
                            {isBusy(p.id, 'featured')
                              ? <Loader2 size={13} className="animate-spin" />
                              : <Sparkles size={13} className={p.isFeatured ? 'text-amber-400' : ''} />}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteProduct(p.id)}
                            disabled={isBusy(p.id, 'delete')}
                            title="Delete product"
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 disabled:opacity-50">
                            {isBusy(p.id, 'delete')
                              ? <Loader2 size={13} className="animate-spin" />
                              : <Trash2 size={13} />}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  {isEditing ? (
                    <input
                      value={editDraft.name ?? p.name}
                      onChange={e => setEditDraft(d => ({ ...d, name: e.target.value }))}
                      className="input-field text-xs mb-2 w-full"
                      placeholder="Product name"
                    />
                  ) : (
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-sm mb-1 leading-snug">{p.name}</h3>
                  )}

                  {/* Brand / category (editable) */}
                  {isEditing ? (
                    <div className="flex gap-2 mb-2">
                      <select value={editDraft.brand ?? p.brand} onChange={e => setEditDraft(d => ({ ...d, brand: e.target.value }))} className="select-field text-xs flex-1">
                        {['MML Gold', 'Sunnova', 'Karthigai Jothi'].map(b => <option key={b}>{b}</option>)}
                      </select>
                      <select value={editDraft.category ?? p.category} onChange={e => setEditDraft(d => ({ ...d, category: e.target.value as ProductCategory }))} className="select-field text-xs flex-1">
                        {(Object.entries(CATEGORY_LABELS) as [ProductCategory, string][]).map(([val, label]) => (
                          <option key={val} value={val}>{label}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 mb-1">{p.brand} · {CATEGORY_LABELS[p.category]}</p>
                  )}

                  {/* Short desc */}
                  {isEditing ? (
                    <input
                      value={editDraft.shortDesc ?? p.shortDesc}
                      onChange={e => setEditDraft(d => ({ ...d, shortDesc: e.target.value }))}
                      className="input-field text-xs mb-3 w-full"
                      placeholder="Short description"
                    />
                  ) : (
                    p.shortDesc && <p className="text-xs text-slate-600 mb-3 leading-relaxed">{p.shortDesc}</p>
                  )}

                  {/* Rating + sold */}
                  {!isEditing && (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-amber-400" />
                        <span className="text-xs text-slate-300">{p.avgRating?.toFixed(1)}</span>
                        <span className="text-xs text-slate-500">({p.reviewCount?.toLocaleString()})</span>
                      </div>
                      <span className="text-xs text-slate-500">{p.totalSold?.toLocaleString()} sold</span>
                    </div>
                  )}

                  {/* Variants */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                    {sortedVariants.map(v => {
                      const sizeKey = v.size === 'SIZE_1L' ? '1L' : v.size === 'SIZE_5L' ? '5L' : '15L'
                      const draftPrice = (editDraft as any)[`price${sizeKey}`] as number | undefined
                      const draftStock = (editDraft as any)[`stock${sizeKey}`] as number | undefined
                      const stockBusy = isBusy(p.id, `stock-${v.size}`)

                      return (
                        <div key={v.id} className="bg-slate-900/50 rounded-lg p-2 text-center">
                          <p className="text-slate-500 mb-1">{SIZE_LABELS[v.size]}</p>
                          {isEditing ? (
                            <>
                              {/* Price input (saved on saveEdit) */}
                              <input
                                type="number"
                                value={draftPrice ?? v.price}
                                onChange={e => setEditDraft(d => ({ ...d, [`price${sizeKey}`]: +e.target.value }))}
                                className="w-full bg-transparent text-brand-400 font-bold text-center text-xs outline-none mb-1"
                              />
                              {/* Stock input with its own save button */}
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={draftStock ?? v.stockQuantity}
                                  onChange={e => setEditDraft(d => ({ ...d, [`stock${sizeKey}`]: +e.target.value }))}
                                  className="w-full bg-slate-800 border border-slate-700 rounded text-center text-xs outline-none px-1 py-0.5"
                                />
                                <button
                                  onClick={() => saveStock(p.id, v.size, draftStock ?? v.stockQuantity, draftPrice ?? v.price)}
                                  disabled={stockBusy}
                                  title="Save stock"
                                  className="p-0.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 shrink-0 disabled:opacity-50">
                                  {stockBusy ? <Loader2 size={10} className="animate-spin" /> : <Package size={10} />}
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-brand-400 font-bold">₹{v.price.toLocaleString()}</p>
                              <p className="text-[10px] text-slate-600 line-through">₹{v.mrp.toLocaleString()}</p>
                              <p className={`text-[10px] font-semibold mt-0.5 ${stockColor(v.stockStatus)}`}>
                                {v.stockQuantity} units
                              </p>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Status + SKU */}
                  <div className="flex items-center justify-between">
                    {statusBadge(overallStatus)}
                    <span className="text-[10px] text-slate-600 font-mono">
                      {sortedVariants[0]?.sku.split('-').slice(0, 2).join('-')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="flex items-center justify-between px-1 py-2">
              <p className="text-xs text-slate-500">
                Page {page + 1} of {meta.totalPages} · {meta.total} products
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft size={15} />
                </button>
                {Array.from({ length: meta.totalPages }, (_, i) => (
                  <button key={i}
                    onClick={() => setPage(i)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${page === i ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}>
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(meta.totalPages - 1, p + 1))}
                  disabled={page >= meta.totalPages - 1}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Products