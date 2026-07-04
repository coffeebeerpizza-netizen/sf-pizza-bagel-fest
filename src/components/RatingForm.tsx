'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import StarRating from './StarRating'
import type { Vendor, Rating } from '@/lib/types'

interface RatingFormProps {
  vendor: Vendor
  existingRating: Rating | null
}

const pizzaCriteria = [
  { key: 'crust', label: 'Crust' },
  { key: 'sauce', label: 'Sauce' },
  { key: 'toppings', label: 'Toppings' },
  { key: 'authenticity', label: 'Authenticity' },
  { key: 'overall', label: 'Overall' },
]

const bagelCriteria = [
  { key: 'chew_texture', label: 'Chew / Texture' },
  { key: 'crust_bagel', label: 'Crust' },
  { key: 'schmear', label: 'Schmear / Toppings' },
  { key: 'freshness', label: 'Freshness' },
  { key: 'overall', label: 'Overall' },
]

export default function RatingForm({ vendor, existingRating }: RatingFormProps) {
  const router = useRouter()
  const criteria = vendor.category === 'pizza' ? pizzaCriteria : bagelCriteria
  const initScores = () => {
    const s: Record<string, number | null> = {}
    criteria.forEach(c => { s[c.key] = existingRating ? (existingRating as any)[c.key] : null })
    return s
  }

  const [scores, setScores] = useState<Record<string, number | null>>(initScores)
  const [notes, setNotes] = useState(existingRating?.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Sign in to rate'); setSaving(false); return }

    const payload = { user_id: user.id, vendor_id: vendor.id, notes, updated_at: new Date().toISOString(), ...scores }

    const { error: err } = existingRating
      ? await supabase.from('ratings').update(payload).eq('id', existingRating.id)
      : await supabase.from('ratings').insert(payload)

    if (err) { setError(err.message); setSaving(false); return }
    setSaved(true)
    setSaving(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {criteria.map(({ key, label }) => (
        <div key={key} className="flex items-center justify-between">
          <span className="text-sm" style={{ color: '#c8a880' }}>{label}</span>
          <StarRating
            value={scores[key]}
            onChange={(val) => setScores(prev => ({ ...prev, [key]: val }))}
            size="lg"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm mb-1" style={{ color: '#8a6040' }}>Notes (optional)</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={2}
          className="w-full rounded px-3 py-2 text-base resize-none"
          style={{ backgroundColor: '#2a1000', border: '1px solid #4a2800', color: '#fdf6e3' }}
          placeholder="What stood out?"
        />
      </div>

      {error && <p className="text-sm" style={{ color: '#d42b2b' }}>{error}</p>}
      {saved && <p className="text-sm" style={{ color: '#4ade80' }}>Rating saved!</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full py-2 rounded font-medium text-sm transition-opacity"
        style={{ backgroundColor: '#d42b2b', color: '#fdf6e3', opacity: saving ? 0.6 : 1 }}
      >
        {saving ? 'Saving…' : existingRating ? 'Update Rating' : 'Submit Rating'}
      </button>
    </form>
  )
}
