import React from 'react'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface Props {
  title: string
  value: string
  change: string
  positive?: boolean
  icon: LucideIcon
  color: 'brand'|'gold'|'cyan'|'emerald'|'red'
  subtitle?: string
}

const colorMap = {
  brand: { bg:'bg-brand-500/10', icon:'text-brand-400', ring:'ring-brand-500/20', glow:'shadow-brand-500/10' },
  gold:  { bg:'bg-amber-500/10',  icon:'text-amber-400',  ring:'ring-amber-500/20',  glow:'shadow-amber-500/10' },
  cyan:  { bg:'bg-cyan-500/10',   icon:'text-cyan-400',   ring:'ring-cyan-500/20',   glow:'shadow-cyan-500/10' },
  emerald:{bg:'bg-emerald-500/10',icon:'text-emerald-400',ring:'ring-emerald-500/20',glow:'shadow-emerald-500/10'},
  red:   { bg:'bg-red-500/10',    icon:'text-red-400',    ring:'ring-red-500/20',    glow:'shadow-red-500/10' },
}

const StatCard: React.FC<Props> = ({ title, value, change, positive=true, icon:Icon, color, subtitle }) => {
  const c = colorMap[color]
  return (
    <div className={`stat-card shadow-lg ${c.glow}`}>
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center`}>
          <Icon size={20} className={c.icon}/>
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive?'bg-emerald-500/10 text-emerald-400':'bg-red-500/10 text-red-400'}`}>
          {positive ? <TrendingUp size={11}/> : <TrendingDown size={11}/>}
          {change}
        </div>
      </div>
      <div>
        <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}} className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400 mt-0.5">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}
export default StatCard
