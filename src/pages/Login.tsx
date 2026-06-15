import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, signup } = useAuth()


  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const formattedEmail = email.toLowerCase().trim();

      if (!emailRegex.test(formattedEmail)) {
        setError('Please enter a valid email address.');
        return;
      }

      if (formattedEmail && password) {
        const user = await login(formattedEmail, password);

        console.log(user);

        if (
          user &&
          (user?.role === 'SUPER_ADMIN' || user.role === 'ADMIN')
        ) {
          navigate('/');
        } else {
          setError('Unauthorized access');
        }
      } else {
        setError('Email and password are required');
      }
    } catch (error) {
      setError('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-brand-500/30">
            <span className="text-3xl">🌻</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }} className="text-2xl font-black text-white">MML Admin</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your admin panel</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handle} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-9" placeholder="admin@mml.com" required />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block font-medium">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="input-field pl-9 pr-10" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-sm font-bold mt-2">
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</span>
              ) : 'Sign In to Admin'}
            </button>
          </form>

          {/* <div className="mt-4 p-3 bg-slate-900/50 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-500 text-center mb-1">Demo credentials</p>
            <p className="text-xs text-slate-400 text-center"><span className="text-brand-400">admin@mml.com</span> / admin123</p>
          </div>
          */}
        </div>
      </div>
    </div>
  )
}
export default Login
