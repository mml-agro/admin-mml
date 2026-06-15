import React, { useState } from 'react'
import { Search, Check, X, Trash2, Star, RefreshCw, AlertCircle } from 'lucide-react'
import { statusBadge } from '../components/Badge'
import { useAdmin } from '../context/AdminContext'
import type { Review } from '../context/AdminContext'
import { editReviewsStatusAPI } from '../service'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

type FilterOption = 'All' | 'PENDING' | 'PUBLISHED' | 'REJECTED'

const Reviews: React.FC = () => {
  const { reviews, setReviews, reviewsLoading, reviewsError, refetchReviews } = useAdmin()
  const [filter, setFilter] = useState<FilterOption>('All')
  const [search, setSearch] = useState('')

  // ── filtering ─────────────────────────────────────────────────────────
  const filtered = reviews.filter(r => {
    const matchFilter = filter === 'All' || r.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q ||
      r.customerName.toLowerCase().includes(q) ||
      r.productName.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  // ── actions ───────────────────────────────────────────────────────────
  const updateStatus = async (id: string, status: Review['status']) => {
    console.log(status);
    const responce = await editReviewsStatusAPI(id, status)
    if (responce?.data) {
      setReviews(p => p.map(r => r.id === id ? { ...r, status } : r))
    }

  }

  const deleteReview = (id: string) =>
    setReviews(p => p.filter(r => r.id !== id))

  // ── stat counts ───────────────────────────────────────────────────────
  const pendingCount = reviews.filter(r => r.status === 'PENDING').length
  const publishedCount = reviews.filter(r => r.status === 'PUBLISHED').length
  const rejectedCount = reviews.filter(r => r.status === 'REJECTED').length

  // ── render ────────────────────────────────────────────────────────────
  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">
            Reviews
          </h2>
          <p className="text-sm text-slate-500">{pendingCount} pending approval</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Stat pills */}
          <div className="flex gap-3 text-sm">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 text-center">
              <p className="font-bold text-amber-400">{pendingCount}</p>
              <p className="text-[10px] text-slate-500">Pending</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 text-center">
              <p className="font-bold text-emerald-400">{publishedCount}</p>
              <p className="text-[10px] text-slate-500">Published</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-center">
              <p className="font-bold text-red-400">{rejectedCount}</p>
              <p className="text-[10px] text-slate-500">Rejected</p>
            </div>
          </div>
          <button
            onClick={() => refetchReviews()}
            disabled={reviewsLoading}
            className="btn-secondary"
            title="Refresh"
          >
            <RefreshCw size={14} className={reviewsLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['All', 'PENDING', 'PUBLISHED', 'REJECTED'] as FilterOption[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f
              ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by customer, product or title..."
          className="input-field pl-9"
        />
      </div>

      {/* Loading skeleton */}
      {reviewsLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-700 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-40" />
                  <div className="h-3 bg-slate-700 rounded w-32" />
                  <div className="h-3 bg-slate-700 rounded w-full" />
                  <div className="h-3 bg-slate-700 rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!reviewsLoading && reviewsError && (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <AlertCircle size={32} className="text-red-400" />
          <p className="text-slate-300 font-medium">Failed to load reviews</p>
          <p className="text-slate-500 text-sm">{reviewsError}</p>
          <button onClick={() => refetchReviews()} className="btn-primary mt-1">
            <RefreshCw size={14} /> Try Again
          </button>
        </div>
      )}

      {/* Review list */}
      {!reviewsLoading && !reviewsError && (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r.id} className="card card-hover p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {r.customerName[0].toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name + stars + badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-sm">
                        {r.customerName}
                      </span>
                      {r.isVerified && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-1.5 py-0.5">
                          ✓ Verified
                        </span>
                      )}
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            fill={i < r.rating ? '#f59e0b' : 'none'}
                            stroke={i < r.rating ? '#f59e0b' : '#475569'}
                          />
                        ))}
                      </div>
                      {statusBadge(r.status)}
                    </div>

                    {/* Product */}
                    <p className="text-xs text-brand-400 mb-1">📦 {r.productName}</p>

                    {/* Title + comment */}
                    {r.title && (
                      <p className="text-sm font-semibold text-slate-200 mb-0.5">{r.title}</p>
                    )}
                    <p className="text-sm text-slate-300 leading-relaxed">"{r.comment}"</p>

                    {/* Admin reply */}
                    {r.adminReply && (
                      <div className="mt-2 pl-3 border-l-2 border-brand-500/40">
                        <p className="text-xs text-slate-400 italic">Admin: {r.adminReply}</p>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 mt-2">{fmtDate(r.createdAt)}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-1.5 shrink-0">
                  {r.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => updateStatus(r.id, 'PUBLISHED')}
                        className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                        title="Approve"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, 'REJECTED')}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Reject"
                      >
                        <X size={14} />
                      </button>
                    </>
                  )}
                  {r.status === 'REJECTED' && (
                    <button
                      onClick={() => updateStatus(r.id, 'PUBLISHED')}
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                      title="Approve"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  {r.status === 'PUBLISHED' && (
                    <button
                      onClick={() => updateStatus(r.id, 'REJECTED')}
                      className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors"
                      title="Unpublish"
                    >
                      <X size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(r.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">No reviews found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Reviews