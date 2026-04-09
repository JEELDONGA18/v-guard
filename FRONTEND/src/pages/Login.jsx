import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DEMO_EMAIL = 'user@vguard.com'
const DEMO_PASSWORD = 'vguard123'
const DEMO_USER_ID = 'vguardUser'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate a brief network delay for realism
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem('userId', DEMO_USER_ID)
        navigate('/dashboard')
      } else {
        setError('Invalid credentials. Please try again.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-vg-bg flex items-center justify-center px-4 font-inter relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-extrabold text-xl shadow-2xl shadow-blue-500/30 ring-1 ring-white/10">
            VG
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            V-Guard
          </span>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-vg-text mb-2">Welcome Back</h1>
            <p className="text-sm text-vg-text-muted">
              Sign in to access your vehicle dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-vg-text-secondary uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vg-text-muted">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@vguard.com"
                  required
                  autoComplete="email"
                  className="w-full py-3 pl-11 pr-4 rounded-xl bg-white/5 border border-vg-border/40 text-vg-text text-sm placeholder:text-vg-text-muted/50 focus:outline-none focus:border-vg-accent/60 focus:ring-1 focus:ring-vg-accent/30 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold text-vg-text-secondary uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vg-text-muted">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full py-3 pl-11 pr-12 rounded-xl bg-white/5 border border-vg-border/40 text-vg-text text-sm placeholder:text-vg-text-muted/50 focus:outline-none focus:border-vg-accent/60 focus:ring-1 focus:ring-vg-accent/30 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vg-text-muted hover:text-vg-text-secondary transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-login"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="spinner !w-4 !h-4 !border-white/30 !border-t-white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 pt-5 border-t border-vg-border/30">
            <p className="text-xs text-vg-text-muted text-center mb-3">
              Demo Credentials
            </p>
            <div className="flex gap-3">
              <div className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-vg-border/20 text-center">
                <p className="text-[10px] text-vg-text-muted uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-xs text-vg-text-secondary font-mono">user@vguard.com</p>
              </div>
              <div className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-vg-border/20 text-center">
                <p className="text-[10px] text-vg-text-muted uppercase tracking-wider mb-0.5">Password</p>
                <p className="text-xs text-vg-text-secondary font-mono">vguard123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-vg-text-muted mt-6">
          © {new Date().getFullYear()} V-Guard • IoT Vehicle Security
        </p>
      </div>
    </div>
  )
}
