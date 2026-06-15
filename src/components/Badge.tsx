import React from 'react'

type Color = 'green'|'yellow'|'blue'|'red'|'purple'|'gray'|'cyan'|'orange'

const colorMap: Record<Color,string> = {
  green:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  yellow: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  blue:   'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  red:    'bg-red-500/10 text-red-400 border border-red-500/20',
  purple: 'bg-brand-500/10 text-brand-400 border border-brand-500/20',
  gray:   'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  cyan:   'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
}

interface Props { label: string; color: Color; dot?: boolean }

const Badge: React.FC<Props> = ({ label, color, dot=true }) => (
  <span className={`badge ${colorMap[color]}`}>
    {dot && <span className={`w-1.5 h-1.5 rounded-full ${color==='green'?'bg-emerald-400':color==='red'?'bg-red-400':color==='yellow'?'bg-amber-400':color==='blue'?'bg-blue-400':color==='purple'?'bg-brand-400':color==='cyan'?'bg-cyan-400':color==='orange'?'bg-orange-400':'bg-slate-400'}`}/>}
    {label}
  </span>
)

export const statusBadge = (status: string) => {
  const map: Record<string,{color: Color; label: string}> = {
    Delivered:    {color:'green', label:'Delivered'},
    Processing:   {color:'blue', label:'Processing'},
    Shipped:      {color:'cyan', label:'Shipped'},
    Pending:      {color:'yellow', label:'Pending'},
    Cancelled:    {color:'red', label:'Cancelled'},
    Refunded:     {color:'orange', label:'Refunded'},
    Published:    {color:'green', label:'Published'},
    Pending_r:    {color:'yellow', label:'Pending'},
    Rejected:     {color:'red', label:'Rejected'},
    'In Stock':   {color:'green', label:'In Stock'},
    'Low Stock':  {color:'yellow', label:'Low Stock'},
    'Out of Stock':{color:'red', label:'Out of Stock'},
    Active:       {color:'green', label:'Active'},
    Inactive:     {color:'gray', label:'Inactive'},
    Expired:      {color:'gray', label:'Expired'},
    Disabled:     {color:'red', label:'Disabled'},
    Customer:     {color:'blue', label:'Customer'},
    Distributor:  {color:'purple', label:'Distributor'},
    Wholesaler:   {color:'cyan', label:'Wholesaler'},
    Percentage:   {color:'purple', label:'%'},
    Flat:         {color:'cyan', label:'Flat'},
  }
  const m = map[status] || {color:'gray' as Color, label: status}
  return <Badge label={m.label} color={m.color}/>
}

export default Badge
