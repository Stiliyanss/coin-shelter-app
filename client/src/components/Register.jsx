import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function Register({ onSwitchToLogin, onAuthSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsSubmitting(true)
    setError('')
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name }
      }
    })

    setIsSubmitting(false)

    if (error) {
      setError(error.message)
      return
    }

    // If email confirmation is ON, session may be null until user confirms.
    if (!data.session) {
      setMessage('Registration successful. Please check your email to confirm your account.')
      return
    }

    onAuthSuccess?.()
  }

  return (
    <div className="bg-black text-white p-8">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="fixed top-0 right-1/4 translate-x-1/2 w-[600px] h-[600px] bg-slate-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/50 mx-auto mb-4">
              🪙
            </div>
            <h1 className="text-3xl font-light tracking-wide text-white/90 mb-2">
              Create Account
            </h1>
            <p className="text-sm text-white/40 font-light">
              Start managing your coin collection
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400 font-light">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-sm text-emerald-300 font-light">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-light tracking-widest uppercase text-white/50 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 border border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20 hover:border-amber-400/70 transition-all duration-300 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="text-sm font-light tracking-widest uppercase text-white/90">
                {isSubmitting ? 'Registering...' : 'Register'}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/40 font-light">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-amber-400/70 hover:text-amber-400 transition-colors font-light"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
