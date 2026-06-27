import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StarRating from '@/components/StarRating'
import RatingForm from '@/components/RatingForm'
import VoteButton from '@/components/VoteButton'
import type { Rating } from '@/lib/types'

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

function avg(arr: (number | null)[]): number | null {
  const vals = arr.filter((v): v is number => v !== null && v !== undefined)
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
}

export default async function VendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: vendor } = await supabase.from('vendors').select('*').eq('id', id).single()
  if (!vendor) notFound()

  const { data: allRatings } = await supabase.from('ratings').select('*').eq('vendor_id', id)
  const { data: allVotes } = await supabase.from('votes').select('*').eq('vendor_id', id)

  const userRating: Rating | null = user
    ? (allRatings ?? []).find((r: any) => r.user_id === user.id) ?? null
    : null

  const { data: userCategoryVote } = user
    ? await supabase.from('votes').select('vendor_id').eq('user_id', user.id).eq('category', vendor.category).maybeSingle()
    : { data: null }

  const hasVotedInCategory = !!userCategoryVote
  const votedForThis = userCategoryVote?.vendor_id === id
  const voteCount = allVotes?.length ?? 0
  const ratingCount = allRatings?.length ?? 0

  const criteria = vendor.category === 'pizza' ? pizzaCriteria : bagelCriteria
  const avgScores = criteria.map(c => ({
    ...c,
    avg: avg((allRatings ?? []).map((r: any) => r[c.key])),
  }))

  const backHref = vendor.category === 'pizza' ? '/pizza' : '/bagels'
  const emoji = vendor.category === 'pizza' ? '🍕' : '🥯'

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href={backHref} className="text-sm mb-6 inline-block" style={{ color: '#8a6040' }}>
        ← Back to {vendor.category === 'pizza' ? 'Pizza' : 'Bagels'}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-3">
          <span className="text-4xl">{emoji}</span>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#fdf6e3' }}>{vendor.name}</h1>
            {vendor.is_notable && vendor.notable_person && (
              <p className="text-sm mt-1" style={{ color: '#f5a623' }}>Featured: {vendor.notable_person}</p>
            )}
            {(vendor.city !== 'San Francisco' || vendor.state !== 'CA') && (
              <p className="text-sm mt-1" style={{ color: '#8a6040' }}>{vendor.city}, {vendor.state}</p>
            )}
            {vendor.website && (
              <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-sm mt-1 block underline" style={{ color: '#e8621a' }}>
                {vendor.website}
              </a>
            )}
          </div>
        </div>
        {vendor.description && (
          <p className="mt-4 text-sm leading-relaxed" style={{ color: '#c8a880' }}>{vendor.description}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Aggregate scores */}
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1e0d00', border: '1px solid #3a1800' }}>
          <h2 className="font-bold text-lg mb-4" style={{ color: '#f5a623' }}>
            Community Ratings <span className="text-sm font-normal" style={{ color: '#8a6040' }}>({ratingCount})</span>
          </h2>
          {ratingCount === 0 ? (
            <p className="text-sm" style={{ color: '#8a6040' }}>No ratings yet — be the first!</p>
          ) : (
            <div className="space-y-3">
              {avgScores.map(({ key, label, avg: a }) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: '#c8a880' }}>{label}</span>
                    <span style={{ color: '#f5a623' }}>{a ? a.toFixed(1) : '—'}</span>
                  </div>
                  <StarRating value={a ? Math.round(a) : null} readonly size="sm" />
                </div>
              ))}
            </div>
          )}

          {/* Vote section */}
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid #3a1800' }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: '#f5a623' }}>🏆 Best {vendor.category === 'pizza' ? 'Pizza' : 'Bagel'} Vote</h3>
            {user ? (
              <VoteButton
                vendorId={id}
                category={vendor.category}
                hasVoted={hasVotedInCategory}
                currentVoteIsForThisVendor={votedForThis}
                voteCount={voteCount}
              />
            ) : (
              <p className="text-sm" style={{ color: '#8a6040' }}>
                <Link href="/auth" className="underline" style={{ color: '#e8621a' }}>Sign in</Link> to vote
              </p>
            )}
          </div>
        </div>

        {/* Rating form */}
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1e0d00', border: '1px solid #3a1800' }}>
          <h2 className="font-bold text-lg mb-4" style={{ color: '#f5a623' }}>
            {userRating ? 'Your Rating' : 'Rate This Spot'}
          </h2>
          {user ? (
            <RatingForm vendor={vendor} existingRating={userRating} />
          ) : (
            <div className="text-center py-8">
              <p className="text-sm mb-4" style={{ color: '#8a6040' }}>Sign in to leave a rating</p>
              <Link
                href="/auth"
                className="px-6 py-2 rounded font-medium text-sm"
                style={{ backgroundColor: '#d42b2b', color: '#fdf6e3' }}
              >
                Sign In / Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
