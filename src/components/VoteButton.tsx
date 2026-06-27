'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Category } from '@/lib/types'

interface VoteButtonProps {
  vendorId: string
  category: Category
  hasVoted: boolean
  currentVoteIsForThisVendor: boolean
  voteCount: number
}

export default function VoteButton({ vendorId, category, hasVoted, currentVoteIsForThisVendor, voteCount }: VoteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleVote = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Sign in to vote'); setLoading(false); return }

    if (currentVoteIsForThisVendor) {
      await supabase.from('votes').delete().eq('user_id', user.id).eq('category', category)
    } else {
      if (hasVoted) {
        await supabase.from('votes').delete().eq('user_id', user.id).eq('category', category)
      }
      const { error: err } = await supabase.from('votes').insert({ user_id: user.id, vendor_id: vendorId, category })
      if (err) { setError(err.message); setLoading(false); return }
    }
    setLoading(false)
    router.refresh()
  }

  const emoji = category === 'pizza' ? '🍕' : '🥯'

  return (
    <div>
      <button
        onClick={handleVote}
        disabled={loading}
        className="w-full py-3 rounded-lg font-bold text-sm transition-all"
        style={{
          backgroundColor: currentVoteIsForThisVendor ? '#4ade80' : hasVoted ? '#2a1000' : '#d42b2b',
          color: currentVoteIsForThisVendor ? '#1a2a10' : '#fdf6e3',
          border: currentVoteIsForThisVendor ? '2px solid #4ade80' : hasVoted ? '2px solid #d42b2b' : 'none',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {currentVoteIsForThisVendor
          ? `✓ Your Best ${category === 'pizza' ? 'Pizza' : 'Bagel'} Vote (click to remove)`
          : hasVoted
          ? `🏆 Switch My Best ${category === 'pizza' ? 'Pizza' : 'Bagel'} Vote Here`
          : `${emoji} Vote: Best ${category === 'pizza' ? 'Pizza' : 'Bagel'}`
        }
      </button>
      {voteCount > 0 && (
        <p className="text-xs text-center mt-1" style={{ color: '#8a6040' }}>
          {voteCount} best vote{voteCount !== 1 ? 's' : ''} from the crowd
        </p>
      )}
      {error && <p className="text-xs mt-1" style={{ color: '#d42b2b' }}>{error}</p>}
    </div>
  )
}
