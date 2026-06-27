'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const links = [
  { href: '/', label: 'Home' },
  { href: '/pizza', label: '🍕 Pizza' },
  { href: '/bagels', label: '🥯 Bagels' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/about', label: 'About' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav style={{ backgroundColor: '#1e0d00', borderBottom: '2px solid #d42b2b' }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold" style={{ color: '#f5a623', fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
          🍕 SF Fest
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium transition-colors hover:opacity-100"
              style={{ color: pathname === href ? '#f5a623' : '#fdf6e3', opacity: pathname === href ? 1 : 0.7 }}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: '#8a6040' }}>{user.email?.split('@')[0]}</span>
              <button onClick={handleSignOut} className="text-sm px-3 py-1 rounded" style={{ backgroundColor: '#2a1000', color: '#f5a623', border: '1px solid #d42b2b' }}>
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/auth" className="text-sm px-4 py-1.5 rounded font-medium" style={{ backgroundColor: '#d42b2b', color: '#fdf6e3' }}>
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: '#fdf6e3' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ backgroundColor: '#1e0d00' }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm py-1" style={{ color: pathname === href ? '#f5a623' : '#fdf6e3' }}>
              {label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleSignOut} className="text-sm text-left" style={{ color: '#f5a623' }}>Sign Out</button>
          ) : (
            <Link href="/auth" onClick={() => setMenuOpen(false)} className="text-sm" style={{ color: '#f5a623' }}>Sign In / Register</Link>
          )}
        </div>
      )}
    </nav>
  )
}
