import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Customers from './pages/Customers'
import Reviews from './pages/Reviews'
import Coupons from './pages/Coupons'
import Promotions from './pages/Promotions'
import Analytics from './pages/Analytics'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { useAdmin } from './context/AdminContext'
import { AuthProvider, useAuth } from './context/AuthProvider'

const AdminLayout: React.FC = () => {
  const { sidebarOpen } = useAdmin()
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

// ✅ Now safely inside AuthProvider — useAuth() works here
const AppRoutes: React.FC = () => {
  const { user } = useAuth()

  if (!user) return <Login />

  return (
    <AdminProvider>
      <AdminLayout />
    </AdminProvider>
  )
}

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>   {/* ✅ Wraps everything, including Login */}
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
)

export default App