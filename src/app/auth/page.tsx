'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      })
      if (error) { setError(error.message); setLoading(false); return }
      setMessage('Check your email to confirm your account, then sign in.')
      setLoading(false)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl p-8" style={{ backgroundColor: '#1e0d00', border: '1px solid #3a1800' }}>
        <h1 className="text-2xl font-bold text-center mb-2" style={{ color: '#f5a623' }}>
          {mode === 'signin' ? 'Welcome Back' : 'Join the Festival'}
        </h1>
        <p className="text-xs text-center mb-6" style={{ color: '#8a6040' }}>
          {mode === 'signin' ? 'Sign in to rate and vote' : 'Create an account to rate and vote'}
        </p>

        <div className="flex rounded-lg overflow-hidden mb-6" style={{ border: '1px solid #3a1800' }}>
          {(['signin', 'signup'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(null); setMessage(null) }}
              className="flex-1 py-2 text-sm font-medium transition-colors"
              style={{ backgroundColor: mode === m ? '#d42b2b' : 'transparent', color: mode === m ? '#fdf6e3' : '#8a6040' }}
            >
              {m === 'signin' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs mb-1" style={{ color: '#8a6040' }}>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded text-base"
                style={{ backgroundColor: '#2a1000', border: '1px solid #4a2800', color: '#fdf6e3' }}
                placeholder="Pizza Lover"
              />
            </div>
          )}

          <div>
            <label className="block text-xs mb-1" style={{ color: '#8a6040' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded text-base"
              style={{ backgroundColor: '#2a1000', border: '1px solid #4a2800', color: '#fdf6e3' }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: '#8a6040' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded text-base"
              style={{ backgroundColor: '#2a1000', border: '1px solid #4a2800', color: '#fdf6e3' }}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs" style={{ color: '#d42b2b' }}>{error}</p>}
          {message && <p className="text-xs" style={{ color: '#4ade80' }}>{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-bold text-sm transition-opacity"
            style={{ backgroundColor: '#d42b2b', color: '#fdf6e3', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? '…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
