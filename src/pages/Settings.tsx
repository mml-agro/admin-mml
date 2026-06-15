import React, { useState } from 'react'
import { Save, Store, Truck, Bell, Shield, Palette, Globe, CreditCard, Mail } from 'lucide-react'

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('store')
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    storeName: 'MML Agro Foods',
    storeEmail: 'admin@mmlagrofoods.com',
    storePhone: '+91-XXXXXXXXXX',
    storeAddress: 'Your Business Address, India',
    currency: 'INR',
    freeDeliveryAbove: 999,
    deliveryCharge: 50,
    gstNumber: '33XXXXX1234X1ZX',
    razorpayKey: 'rzp_live_XXXXXXXXXX',
    emailNotifications: true,
    smsNotifications: true,
    orderAlerts: true,
    stockAlerts: true,
    reviewAlerts: false,
    primaryColor: '#d946ef',
    accentColor: '#f59e0b',
    darkMode: true,
    maintenanceMode: false,
    twoFactorAuth: false,
    autoBackup: true,
  })

  const update = (k: string, v: any) => setSettings(p => ({ ...p, [k]: v }))

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'store', label: 'Store', icon: Store },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  const Toggle: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} className={`relative w-10 h-5.5 rounded-full transition-colors shrink-0 ${value ? 'bg-brand-500' : 'bg-slate-600'}`} style={{ width: 40, height: 22 }}>
      <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-all ${value ? 'left-5' : 'left-0.5'}`} style={{ width: 18, height: 18, top: 2, left: value ? 20 : 2 }} />
    </button>
  )

  return (
    <div className="p-4 md:p-6 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-xl font-bold text-white">Settings</h2>
          <p className="text-sm text-slate-500">Manage your store configuration</p>
        </div>
        <button onClick={save} className={`btn-primary ${saved ? 'bg-emerald-500 from-emerald-500 to-emerald-500' : ''}`}>
          <Save size={15} />{saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 bg-slate-800/50 rounded-2xl p-1.5">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}>
            <t.icon size={14} />{t.label}
          </button>
        ))}
      </div>

      <div className="card p-6">
        {/* STORE */}
        {activeTab === 'store' && (
          <div className="space-y-5">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-base border-b border-slate-700 pb-3">Store Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { k: 'storeName', l: 'Store Name', t: 'text' },
                { k: 'storeEmail', l: 'Store Email', t: 'email' },
                { k: 'storePhone', l: 'Store Phone', t: 'tel' },
                { k: 'gstNumber', l: 'GST Number', t: 'text' },
              ].map(f => (
                <div key={f.k}>
                  <label className="text-xs text-slate-400 mb-1.5 block">{f.l}</label>
                  <input type={f.t} value={settings[f.k as keyof typeof settings] as string} onChange={e => update(f.k, e.target.value)} className="input-field" />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-xs text-slate-400 mb-1.5 block">Store Address</label>
                <textarea value={settings.storeAddress} onChange={e => update('storeAddress', e.target.value)} className="input-field resize-none" rows={2} />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Currency</label>
                <select value={settings.currency} onChange={e => update('currency', e.target.value)} className="select-field">
                  <option>INR</option><option>USD</option><option>EUR</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <div><p className="text-sm font-semibold text-slate-200">Maintenance Mode</p><p className="text-xs text-slate-500 mt-0.5">Temporarily disable the storefront for customers</p></div>
              <Toggle value={settings.maintenanceMode} onChange={v => update('maintenanceMode', v)} />
            </div>
          </div>
        )}

        {/* SHIPPING */}
        {activeTab === 'shipping' && (
          <div className="space-y-5">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-base border-b border-slate-700 pb-3">Shipping Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Free Delivery Above (₹)</label>
                <input type="number" value={settings.freeDeliveryAbove} onChange={e => update('freeDeliveryAbove', +e.target.value)} className="input-field" />
                <p className="text-xs text-slate-600 mt-1">Orders above this amount get free delivery</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Standard Delivery Charge (₹)</label>
                <input type="number" value={settings.deliveryCharge} onChange={e => update('deliveryCharge', +e.target.value)} className="input-field" />
              </div>
            </div>
            <div className="space-y-3">
              {['Standard (3-5 days)', 'Express (1-2 days)', 'Same Day (select cities)'].map(zone => (
                <div key={zone} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div><p className="text-sm font-medium text-slate-200">{zone}</p></div>
                  <Toggle value={zone.includes('Standard')} onChange={() => {}} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="space-y-5">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-base border-b border-slate-700 pb-3">Payment Configuration</h3>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Razorpay API Key</label>
              <input value={settings.razorpayKey} onChange={e => update('razorpayKey', e.target.value)} className="input-field" type="password" />
            </div>
            <div className="space-y-3">
              {[
                { l: 'UPI Payments', s: 'Accept UPI, GPay, PhonePe, Paytm', v: true },
                { l: 'Card Payments', s: 'Accept Visa, Mastercard, RuPay', v: true },
                { l: 'Net Banking', s: 'Accept all major bank transfers', v: true },
                { l: 'Cash on Delivery', s: 'Allow COD for eligible orders', v: true },
                { l: 'EMI Options', s: 'Allow No-cost EMI via cards', v: false },
              ].map(item => (
                <div key={item.l} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div><p className="text-sm font-semibold text-slate-200">{item.l}</p><p className="text-xs text-slate-500 mt-0.5">{item.s}</p></div>
                  <Toggle value={item.v} onChange={() => {}} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-5">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-base border-b border-slate-700 pb-3">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { k: 'emailNotifications', l: 'Email Notifications', s: 'Receive notifications via email', icon: Mail },
                { k: 'smsNotifications', l: 'SMS Notifications', s: 'Receive SMS alerts on your phone', icon: Bell },
                { k: 'orderAlerts', l: 'New Order Alerts', s: 'Get notified when new orders arrive', icon: Bell },
                { k: 'stockAlerts', l: 'Low Stock Alerts', s: 'Alert when products are running low', icon: Bell },
                { k: 'reviewAlerts', l: 'Review Notifications', s: 'Notify when new reviews are submitted', icon: Bell },
              ].map(item => (
                <div key={item.k} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className="text-brand-400" />
                    <div><p className="text-sm font-semibold text-slate-200">{item.l}</p><p className="text-xs text-slate-500 mt-0.5">{item.s}</p></div>
                  </div>
                  <Toggle value={settings[item.k as keyof typeof settings] as boolean} onChange={v => update(item.k, v)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPEARANCE */}
        {activeTab === 'appearance' && (
          <div className="space-y-5">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-base border-b border-slate-700 pb-3">Appearance Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={settings.primaryColor} onChange={e => update('primaryColor', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <input value={settings.primaryColor} onChange={e => update('primaryColor', e.target.value)} className="input-field flex-1" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={settings.accentColor} onChange={e => update('accentColor', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <input value={settings.accentColor} onChange={e => update('accentColor', e.target.value)} className="input-field flex-1" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <div><p className="text-sm font-semibold text-slate-200">Dark Mode</p><p className="text-xs text-slate-500 mt-0.5">Enable dark theme for the admin panel</p></div>
              <Toggle value={settings.darkMode} onChange={v => update('darkMode', v)} />
            </div>
          </div>
        )}

        {/* SECURITY */}
        {activeTab === 'security' && (
          <div className="space-y-5">
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="font-bold text-white text-base border-b border-slate-700 pb-3">Security Settings</h3>
            <div className="space-y-3">
              {[
                { k: 'twoFactorAuth', l: 'Two-Factor Authentication', s: 'Add extra security to admin login' },
                { k: 'autoBackup', l: 'Auto Backup', s: 'Automatically backup data daily' },
              ].map(item => (
                <div key={item.k} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <div><p className="text-sm font-semibold text-slate-200">{item.l}</p><p className="text-xs text-slate-500 mt-0.5">{item.s}</p></div>
                  <Toggle value={settings[item.k as keyof typeof settings] as boolean} onChange={v => update(item.k, v)} />
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-sm font-semibold text-red-400 mb-1">Danger Zone</p>
              <p className="text-xs text-slate-500 mb-3">These actions are irreversible. Please proceed with caution.</p>
              <div className="flex gap-3 flex-wrap">
                <button className="btn-danger text-xs px-3 py-2">Clear All Orders</button>
                <button className="btn-danger text-xs px-3 py-2">Reset Store Data</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Settings
